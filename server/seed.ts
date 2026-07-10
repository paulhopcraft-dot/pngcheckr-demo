/**
 * Seeds the Attestli demo database with 3 fictional candidates and their
 * fully scripted verification outcomes. Nothing here is computed — every
 * check result, confidence score, and email is fixed data for the demo.
 *
 * Run with: npm run db:seed
 */
import { db, pool } from "./db/index.ts";
import { candidates, verificationRequests, checks, verdicts, activityEvents } from "./db/schema.ts";

const EMPLOYER = "Marowa Resources Ltd";
const SIGNATORY = "Andrea Reyes, Lead Verifier";

async function seed() {
  console.log("[seed] clearing existing data...");
  await db.execute(`TRUNCATE TABLE activity_events, verdicts, checks, verification_requests, candidates RESTART IDENTITY CASCADE`);

  console.log("[seed] inserting candidates...");
  const [joseph, ruth, daniel] = await db
    .insert(candidates)
    .values([
      { name: "Joseph Kaupa", role: "Site Logistics Supervisor", employerName: EMPLOYER },
      { name: "Ruth Ovia", role: "Accounts Officer", employerName: EMPLOYER },
      { name: "Daniel Wambi", role: "Electrical Technician", employerName: EMPLOYER },
    ])
    .returning();

  console.log("[seed] inserting verification requests...");
  const [josephReq, ruthReq, danielReq] = await db
    .insert(verificationRequests)
    .values([
      { candidateId: joseph.id, employerName: EMPLOYER, tier: "badge", status: "completed" },
      { candidateId: ruth.id, employerName: EMPLOYER, tier: "dossier", status: "completed" },
      { candidateId: daniel.id, employerName: EMPLOYER, tier: "dossier", status: "completed" },
    ])
    .returning();

  console.log("[seed] inserting checks...");
  await db.insert(checks).values([
    // Joseph Kaupa — Verified, clean across the board
    { requestId: josephReq.id, checkType: "identity", result: "pass", evidenceNote: "Name, DOB, and ID number cross-matched cleanly against CCR and BCRC records." },
    { requestId: josephReq.id, checkType: "credential", result: "pass", evidenceNote: "CCR confirmed registered logistics supervisor certification, no discrepancies." },
    { requestId: josephReq.id, checkType: "police_clearance", result: "pass", evidenceNote: "BCRC confirmed clear record, received day 8." },
    { requestId: josephReq.id, checkType: "employment_history", result: "pass", evidenceNote: "Both listed referees confirmed dates and role." },
    { requestId: josephReq.id, checkType: "document_forensics", result: "pass", evidenceNote: "Submitted ID and certificates assessed as genuine, no alteration detected." },

    // Ruth Ovia — Verified with Exceptions
    {
      requestId: ruthReq.id,
      checkType: "identity",
      result: "flag",
      confidenceScore: 87,
      evidenceNote: "CCR records: 'Ruth Kila Ovia' · BCRC records: 'Ruth Ovia' · clan-name variant, confirmed by reviewer Andrea Reyes.",
    },
    { requestId: ruthReq.id, checkType: "credential", result: "pass", evidenceNote: "CCR confirmed registered bookkeeping certificate, no discrepancies." },
    { requestId: ruthReq.id, checkType: "police_clearance", result: "pass", evidenceNote: "BCRC confirmed clear record." },
    {
      requestId: ruthReq.id,
      checkType: "employment_history",
      result: "flag",
      evidenceNote: "2 of 3 employer references confirmed; third referee (Accounts Manager, previous employer) unconfirmed as of day 10 despite two follow-ups.",
    },
    { requestId: ruthReq.id, checkType: "document_forensics", result: "pass", evidenceNote: "Submitted payslips and ID documents assessed as consistent, no signs of alteration." },

    // Daniel Wambi — Not-Verifiable
    { requestId: danielReq.id, checkType: "identity", result: "pass", evidenceNote: "Name and ID number cross-matched cleanly against CCR and BCRC records." },
    {
      requestId: danielReq.id,
      checkType: "credential",
      result: "fail",
      evidenceNote: "CCR could not confirm the claimed electrical trade qualification against its registry — no matching certification record found.",
    },
    {
      requestId: danielReq.id,
      checkType: "police_clearance",
      result: "pending",
      evidenceNote: "BCRC has not responded to repeated requests; escalated to Talasi Bridge Recruitment's local team on day 10.",
    },
    { requestId: danielReq.id, checkType: "employment_history", result: "pass", evidenceNote: "Previous employer confirmed 2019–2022 tenure as Electrical Technician." },
    {
      requestId: danielReq.id,
      checkType: "document_forensics",
      result: "pass",
      evidenceNote: "Submitted certificates assessed as physically genuine; underlying registry record could not be matched (see credential check).",
    },
  ]);

  console.log("[seed] inserting verdicts...");
  await db.insert(verdicts).values([
    { requestId: josephReq.id, verdict: "verified", signatoryName: SIGNATORY, referenceCode: "ATT-7Q3K9M" },
    { requestId: ruthReq.id, verdict: "verified_with_exceptions", signatoryName: SIGNATORY, referenceCode: "ATT-2C91K4" },
    { requestId: danielReq.id, verdict: "not_verifiable", signatoryName: SIGNATORY, referenceCode: "ATT-N4XZ08" },
  ]);

  console.log("[seed] inserting activity timeline...");
  await db.insert(activityEvents).values([
    // Joseph Kaupa
    {
      requestId: josephReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Police Clearance Verification Request — Joseph Kaupa",
      body: "Talasi Bridge Recruitment is conducting a pre-employment verification for Joseph Kaupa on behalf of Marowa Resources Ltd, for the role of Site Logistics Supervisor. Could you please confirm whether BCRC holds any current police clearance record or outstanding matter against the applicant's registered name and date of birth (details attached)? We would appreciate confirmation at your earliest convenience.",
    },
    {
      requestId: josephReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Companies & Credentials Registry (CCR)",
      subject: "Credential & Identity Records Check — Joseph Kaupa",
      body: "We are verifying the employment credentials of Joseph Kaupa, currently under consideration for a supervisory role with Marowa Resources Ltd. Please confirm whether your records hold any registered trade certification or business association under this name, and advise of any discrepancies. Supporting documents are attached for reference.",
    },
    {
      requestId: josephReq.id,
      dayOffset: 3,
      eventType: "reminder",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Follow-up: Police Clearance Request — Joseph Kaupa (sent 3 days ago)",
      body: "Following up on our request sent three days ago regarding Joseph Kaupa's police clearance check. We have not yet received a response and would appreciate an update on processing status. Please let us know if any additional documentation is required to complete this request.",
    },
    {
      requestId: josephReq.id,
      dayOffset: 7,
      eventType: "reminder",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Second Follow-up: Police Clearance Request — Joseph Kaupa — Response Required",
      body: "This is our second follow-up regarding Joseph Kaupa's police clearance verification, originally requested seven days ago. Marowa Resources Ltd's placement timeline depends on this confirmation. Please respond within 48 hours, or advise of an alternative contact who can action this request.",
    },

    // Ruth Ovia
    {
      requestId: ruthReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Police Clearance & Identity Records Check — Ruth Ovia",
      body: "Talasi Bridge Recruitment is verifying Ruth Ovia for an Accounts Officer placement with Marowa Resources Ltd. Please confirm whether BCRC holds any clearance record under 'Ruth Ovia' or any recorded name variant, as her registered documents differ slightly across agencies. Supporting ID is attached.",
    },
    {
      requestId: ruthReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Companies & Credentials Registry (CCR)",
      subject: "Credential Verification & Identity Cross-check — Ruth Ovia",
      body: "We are verifying a registered bookkeeping certification for Ruth Ovia (also recorded as 'Ruth Kila Ovia' in some documents). Could you confirm whether your records match either name, and confirm the certification is current and unrevoked? Please flag any name discrepancy you find.",
    },
    {
      requestId: ruthReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Former Employer HR Contacts (3 referees)",
      subject: "Employment Reference Confirmation Request — Ruth Ovia",
      body: "Ruth Ovia has listed your organisation as a referee for a prior Accounts Officer role. Could you please confirm her employment dates, position held, and reason for leaving? A reply at your earliest convenience would help us complete this verification for Marowa Resources Ltd.",
    },
    {
      requestId: ruthReq.id,
      dayOffset: 3,
      eventType: "reminder",
      recipient: "Former Employer HR Contacts (3 referees)",
      subject: "Follow-up: Reference Request — Ruth Ovia",
      body: "We are still awaiting confirmation of employment dates from one of the three referees listed for Ruth Ovia. BCRC and CCR have already responded on the other checks. Could you please confirm receipt of our original request and let us know an expected response time?",
    },
    {
      requestId: ruthReq.id,
      dayOffset: 7,
      eventType: "reminder",
      recipient: "Former Employer HR Contacts (3 referees)",
      subject: "Second Follow-up: Outstanding Reference — Ruth Ovia — Action Requested",
      body: "This is our second attempt to reach one of Ruth Ovia's three listed referees. Marowa Resources Ltd's onboarding decision is pending this final confirmation. If we do not hear back shortly, this reference will be recorded as unconfirmed in the final report.",
    },

    // Daniel Wambi
    {
      requestId: danielReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Police Clearance Verification Request — Daniel Wambi",
      body: "Talasi Bridge Recruitment is verifying Daniel Wambi for an Electrical Technician placement with Marowa Resources Ltd. Could you confirm whether BCRC holds any current clearance record or outstanding matter against the applicant's registered name and date of birth? Supporting ID is attached.",
    },
    {
      requestId: danielReq.id,
      dayOffset: 0,
      eventType: "sent",
      recipient: "Companies & Credentials Registry (CCR)",
      subject: "Electrical Trade Credential Verification — Daniel Wambi",
      body: "We are verifying an electrical trade qualification claimed by Daniel Wambi, certificate number provided in the attached documents. Could you confirm whether this certification is registered and current under your records?",
    },
    {
      requestId: danielReq.id,
      dayOffset: 3,
      eventType: "reminder",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Follow-up: Police Clearance Request — Daniel Wambi (sent 3 days ago)",
      body: "Following up on our clearance request for Daniel Wambi sent three days ago. We have not yet received a response from BCRC. Please advise on processing status or any additional documentation required.",
    },
    {
      requestId: danielReq.id,
      dayOffset: 7,
      eventType: "reminder",
      recipient: "Bureau of Civil Records & Clearance (BCRC)",
      subject: "Second Follow-up: Police Clearance Still Outstanding — Daniel Wambi",
      body: "This is our second follow-up on Daniel Wambi's police clearance, now seven days outstanding. Separately, CCR has advised it cannot confirm his claimed electrical trade certification, so this clearance is now the sole open item on this file. Please respond within 48 hours.",
    },
    {
      requestId: danielReq.id,
      dayOffset: 10,
      eventType: "escalation",
      recipient: "Talasi Bridge Recruitment (Local Team)",
      subject: "Escalation — BCRC Non-Response on Daniel Wambi's Police Clearance (Day 10)",
      body: "Hi team — flagging that BCRC still hasn't responded on Daniel's police clearance despite three follow-ups over the past ten days. Combined with the credential registry not being able to confirm his qualification, we're not going to be able to close this one out as a clean verified. Could someone on the ground try the BCRC front counter directly? Keen to get Marowa an answer either way rather than leave it hanging. Thanks, Andrea.",
    },
  ]);

  console.log("[seed] done.");
}

seed()
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
