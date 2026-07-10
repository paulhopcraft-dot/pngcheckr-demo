import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeStatusCard } from "@/components/BadgeStatusCard";
import { CheckList } from "@/components/CheckList";
import { VerificationTimeline } from "@/components/VerificationTimeline";
import { QRPlaceholder } from "@/components/QRPlaceholder";
import { CANDIDATES } from "@/lib/candidates";
import type { FullResult } from "@/lib/types";

const PIPELINE_STAGES = ["Intake", "Screen", "Chase", "Verdict", "Certify"];
const PROCESSING_MS = 1500;

type Step = "form" | "processing" | "result";

export function Employer() {
  const [step, setStep] = useState<Step>("form");
  const [candidateId, setCandidateId] = useState(String(CANDIDATES[0].id));
  const [employerName, setEmployerName] = useState("Marowa Resources Ltd");
  const [tier, setTier] = useState("badge");
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState<FullResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("processing");
    setStageIndex(0);

    const stageDuration = PROCESSING_MS / PIPELINE_STAGES.length;
    timerRef.current = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, PIPELINE_STAGES.length - 1));
    }, stageDuration);

    try {
      const [createRes] = await Promise.all([
        fetch("/api/verification-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ candidateId: Number(candidateId), employerName, tier }),
        }),
        new Promise((resolve) => setTimeout(resolve, PROCESSING_MS)),
      ]);

      if (!createRes.ok) throw new Error("Could not create verification request");
      const { id } = await createRes.json();

      const resultRes = await fetch(`/api/verification-requests/${id}`);
      if (!resultRes.ok) throw new Error("Could not load verification result");
      const data: FullResult = await resultRes.json();

      if (timerRef.current) clearInterval(timerRef.current);
      setResult(data);
      setStep("result");
    } catch (err) {
      if (timerRef.current) clearInterval(timerRef.current);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("form");
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setStep("form");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Employer verification</h1>
        <p className="text-muted-foreground mt-1">Request and review a candidate verification.</p>
      </div>

      {step === "form" && (
        <Card>
          <CardHeader>
            <CardTitle>New request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate</Label>
                <select
                  id="candidate"
                  required
                  value={candidateId}
                  onChange={(e) => setCandidateId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
                >
                  {CANDIDATES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employer">Employer</Label>
                <Input
                  id="employer"
                  required
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier">Tier</Label>
                <select
                  id="tier"
                  required
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
                >
                  <option value="badge">Badge</option>
                  <option value="dossier">Dossier</option>
                </select>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full">
                Run verification
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "processing" && (
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <p className="text-muted-foreground">Running verification pipeline…</p>
            <div className="flex justify-center gap-3">
              {PIPELINE_STAGES.map((stage, i) => (
                <span
                  key={stage}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    i <= stageIndex
                      ? "bg-secondary text-secondary-foreground border-secondary-border"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {stage}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "result" && result && result.verdict && (
        <div className="space-y-6">
          <BadgeStatusCard
            candidateName={result.candidate.name}
            role={result.candidate.role}
            verdict={result.verdict.verdict}
            referenceCode={result.verdict.referenceCode}
            signatoryName={result.verdict.signatoryName}
            issuedAt={result.verdict.issuedAt}
            expiresAt={result.verdict.expiresAt}
          />
          <CheckList mode="full" checks={result.checks} />
          <VerificationTimeline events={result.timeline} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Candidate-facing badge</CardTitle>
            </CardHeader>
            <CardContent>
              <QRPlaceholder code={result.verdict.referenceCode} />
            </CardContent>
          </Card>
          <Button variant="outline" onClick={reset}>
            Try another candidate
          </Button>
        </div>
      )}
    </div>
  );
}
