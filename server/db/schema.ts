import { pgTable, serial, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const checkTypeEnum = pgEnum("check_type", [
  "identity",
  "credential",
  "police_clearance",
  "employment_history",
  "document_forensics",
]);

export const checkResultEnum = pgEnum("check_result", ["pass", "flag", "pending", "fail"]);

export const verdictEnum = pgEnum("verdict_type", [
  "verified",
  "verified_with_exceptions",
  "not_verifiable",
]);

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  employerName: text("employer_name").notNull(),
});

export const verificationRequests = pgTable("verification_requests", {
  id: serial("id").primaryKey(),
  candidateId: integer("candidate_id")
    .notNull()
    .references(() => candidates.id, { onDelete: "cascade" }),
  employerName: text("employer_name").notNull(),
  tier: text("tier").notNull(), // 'badge' | 'dossier'
  status: text("status").notNull().default("completed"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const checks = pgTable("checks", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id")
    .notNull()
    .references(() => verificationRequests.id, { onDelete: "cascade" }),
  checkType: checkTypeEnum("check_type").notNull(),
  result: checkResultEnum("result").notNull(),
  confidenceScore: integer("confidence_score"),
  evidenceNote: text("evidence_note"),
});

export const verdicts = pgTable("verdicts", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id")
    .notNull()
    .references(() => verificationRequests.id, { onDelete: "cascade" }),
  verdict: verdictEnum("verdict").notNull(),
  signatoryName: text("signatory_name").notNull(),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
  referenceCode: text("reference_code").notNull().unique(),
});

// Scripted email/activity log shown (in full) on the employer view only.
export const activityEvents = pgTable("activity_events", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id")
    .notNull()
    .references(() => verificationRequests.id, { onDelete: "cascade" }),
  dayOffset: integer("day_offset").notNull(),
  eventType: text("event_type").notNull(), // 'sent' | 'reminder' | 'escalation'
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
});
