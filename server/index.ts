import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eq } from "drizzle-orm";
import { db } from "./db/index.ts";
import { candidates, verificationRequests, checks, verdicts, activityEvents } from "./db/schema.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;
const BADGE_EXPIRY_DAYS = 180;

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Creates a verification request for a candidate. In this demo nothing is
// actually processed — this looks up the pre-seeded scripted outcome for
// the candidate and refreshes it with the submitted tier/employer/date.
app.post("/api/verification-requests", async (req, res) => {
  try {
    const candidateId = Number(req.body?.candidateId);
    const tier = String(req.body?.tier ?? "");
    const employerName = req.body?.employerName ? String(req.body.employerName) : undefined;

    if (!candidateId || !tier) {
      res.status(400).json({ error: "candidateId and tier are required" });
      return;
    }

    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, candidateId)).limit(1);
    if (!candidate) {
      res.status(404).json({ error: "Candidate not found" });
      return;
    }

    const [existing] = await db
      .select()
      .from(verificationRequests)
      .where(eq(verificationRequests.candidateId, candidateId))
      .limit(1);
    if (!existing) {
      res.status(404).json({ error: "No scripted verification outcome seeded for this candidate" });
      return;
    }

    const [updated] = await db
      .update(verificationRequests)
      .set({
        tier,
        employerName: employerName || candidate.employerName,
        submittedAt: new Date(),
      })
      .where(eq(verificationRequests.id, existing.id))
      .returning();

    res.json({ id: updated.id });
  } catch (err) {
    console.error("[POST /api/verification-requests]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Full result for the employer view: candidate, all checks, verdict, timeline.
app.get("/api/verification-requests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [request] = await db.select().from(verificationRequests).where(eq(verificationRequests.id, id)).limit(1);
    if (!request) {
      res.status(404).json({ error: "Verification request not found" });
      return;
    }

    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, request.candidateId)).limit(1);
    const requestChecks = await db.select().from(checks).where(eq(checks.requestId, id));
    const [verdict] = await db.select().from(verdicts).where(eq(verdicts.requestId, id)).limit(1);
    const timeline = await db.select().from(activityEvents).where(eq(activityEvents.requestId, id));

    timeline.sort((a, b) => a.dayOffset - b.dayOffset || a.id - b.id);

    res.json({
      request,
      candidate,
      checks: requestChecks,
      verdict: verdict ? { ...verdict, expiresAt: addDays(verdict.issuedAt, BADGE_EXPIRY_DAYS) } : null,
      timeline,
    });
  } catch (err) {
    console.error("[GET /api/verification-requests/:id]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Public verdict-only lookup by reference code. Deliberately restricted:
// no raw documents, evidence notes, confidence scores, or email timeline.
app.get("/api/badge/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const [verdict] = await db.select().from(verdicts).where(eq(verdicts.referenceCode, code)).limit(1);
    if (!verdict) {
      res.status(404).json({ error: "No badge found for this reference code" });
      return;
    }

    const [request] = await db
      .select()
      .from(verificationRequests)
      .where(eq(verificationRequests.id, verdict.requestId))
      .limit(1);
    const [candidate] = request
      ? await db.select().from(candidates).where(eq(candidates.id, request.candidateId)).limit(1)
      : [undefined];
    const requestChecks = request ? await db.select().from(checks).where(eq(checks.requestId, request.id)) : [];

    res.json({
      candidateName: candidate?.name ?? null,
      role: candidate?.role ?? null,
      verdict: verdict.verdict,
      referenceCode: verdict.referenceCode,
      signatoryName: verdict.signatoryName,
      issuedAt: verdict.issuedAt,
      expiresAt: addDays(verdict.issuedAt, BADGE_EXPIRY_DAYS),
      checkCategoriesCompleted: requestChecks.map((c) => c.checkType),
    });
  } catch (err) {
    console.error("[GET /api/badge/:code]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve the built frontend (single Render web service serves API + static app).
const distPath = path.resolve(__dirname, "../dist");
app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] PNGcheckr demo API + web listening on port ${PORT}`);
});
