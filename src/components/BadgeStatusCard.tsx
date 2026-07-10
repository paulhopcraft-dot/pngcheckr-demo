import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { VerdictType } from "@/lib/types";

interface BadgeStatusCardProps {
  candidateName: string;
  role?: string | null;
  verdict: VerdictType;
  referenceCode: string;
  signatoryName: string;
  issuedAt: string;
  expiresAt: string;
}

const VERDICT_META: Record<
  VerdictType,
  { label: string; icon: typeof ShieldCheck; badgeVariant: "success" | "warning" | "outline"; note?: string }
> = {
  verified: {
    label: "Verified",
    icon: ShieldCheck,
    badgeVariant: "success",
  },
  verified_with_exceptions: {
    label: "Verified with Exceptions",
    icon: ShieldAlert,
    badgeVariant: "warning",
  },
  not_verifiable: {
    label: "Not-Verifiable",
    icon: ShieldQuestion,
    badgeVariant: "outline",
    note: "Not-Verifiable is a valid, honest outcome — not a failure. It means one or more checks could not be confirmed within the review window.",
  },
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BadgeStatusCard({
  candidateName,
  role,
  verdict,
  referenceCode,
  signatoryName,
  issuedAt,
  expiresAt,
}: BadgeStatusCardProps) {
  const meta = VERDICT_META[verdict];
  const Icon = meta.icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{candidateName}</CardTitle>
          {role && <p className="text-sm text-muted-foreground mt-1">{role}</p>}
        </div>
        <Badge variant={meta.badgeVariant} className="flex items-center gap-1.5 text-sm px-3 py-1">
          <Icon className="size-4" />
          {meta.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {meta.note && (
          <p className="text-sm text-muted-foreground bg-muted/60 border border-border rounded-md p-3">
            {meta.note}
          </p>
        )}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Reference code</dt>
          <dd className="font-mono font-medium">{referenceCode}</dd>

          <dt className="text-muted-foreground">Issued</dt>
          <dd>{formatDate(issuedAt)}</dd>

          <dt className="text-muted-foreground">Valid until</dt>
          <dd>{formatDate(expiresAt)}</dd>

          <dt className="text-muted-foreground">Signed off by</dt>
          <dd>{signatoryName}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
