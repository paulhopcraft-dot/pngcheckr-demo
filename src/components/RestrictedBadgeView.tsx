import { BadgeStatusCard } from "@/components/BadgeStatusCard";
import { CheckList } from "@/components/CheckList";
import type { BadgeResult } from "@/lib/types";

// Verdict-only rendering shared by /candidate and /verify/:code. Deliberately
// thinner than the employer view: no checks/evidence detail, no timeline.
export function RestrictedBadgeView({ badge }: { badge: BadgeResult }) {
  return (
    <div className="space-y-6">
      <BadgeStatusCard
        candidateName={badge.candidateName ?? "Unknown candidate"}
        role={badge.role}
        verdict={badge.verdict}
        referenceCode={badge.referenceCode}
        signatoryName={badge.signatoryName}
        issuedAt={badge.issuedAt}
        expiresAt={badge.expiresAt}
      />
      <CheckList mode="restricted" categories={badge.checkCategoriesCompleted} />
    </div>
  );
}
