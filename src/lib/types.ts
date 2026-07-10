export type CheckType =
  | "identity"
  | "credential"
  | "police_clearance"
  | "employment_history"
  | "document_forensics";

export type CheckResult = "pass" | "flag" | "pending" | "fail";

export type VerdictType = "verified" | "verified_with_exceptions" | "not_verifiable";

export interface Check {
  id: number;
  requestId: number;
  checkType: CheckType;
  result: CheckResult;
  confidenceScore: number | null;
  evidenceNote: string | null;
}

export interface Verdict {
  id: number;
  requestId: number;
  verdict: VerdictType;
  signatoryName: string;
  issuedAt: string;
  expiresAt: string;
  referenceCode: string;
}

export interface ActivityEvent {
  id: number;
  requestId: number;
  dayOffset: number;
  eventType: "sent" | "reminder" | "escalation" | string;
  recipient: string;
  subject: string;
  body: string;
}

export interface Candidate {
  id: number;
  name: string;
  role: string;
  employerName: string;
}

export interface VerificationRequestRow {
  id: number;
  candidateId: number;
  employerName: string;
  tier: string;
  status: string;
  submittedAt: string;
}

export interface FullResult {
  request: VerificationRequestRow;
  candidate: Candidate;
  checks: Check[];
  verdict: Verdict | null;
  timeline: ActivityEvent[];
}

export interface BadgeResult {
  candidateName: string | null;
  role: string | null;
  verdict: VerdictType;
  referenceCode: string;
  signatoryName: string;
  issuedAt: string;
  expiresAt: string;
  checkCategoriesCompleted: CheckType[];
}

export const CHECK_TYPE_LABELS: Record<CheckType, string> = {
  identity: "Identity",
  credential: "Credential",
  police_clearance: "Police Clearance",
  employment_history: "Employment History",
  document_forensics: "Document Forensics",
};
