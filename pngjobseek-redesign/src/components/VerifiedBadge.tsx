import { ShieldCheck, Clock3, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

/* PNGcheckr partner-brand colors (teal / gold) — deliberately distinct from
 * the JobSeek palette so verification reads as a partner service. */
export type VerificationStatus = "verified" | "pending" | "unverified";

const STATUS_CONFIG: Record<
  VerificationStatus,
  { icon: typeof ShieldCheck; label: string; classes: string }
> = {
  verified: {
    icon: ShieldCheck,
    label: "PNGcheckr Verified",
    classes: "bg-[#0e7c7b]/12 text-[#0e7c7b]",
  },
  pending: {
    icon: Clock3,
    label: "Verification pending",
    classes: "bg-[#c9962e]/15 text-[#8a6820]",
  },
  unverified: {
    icon: ShieldQuestion,
    label: "Not verified",
    classes: "bg-muted text-muted-foreground",
  },
};

export function VerifiedBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        config.classes,
        className
      )}
    >
      <Icon className="size-3.5" />
      {config.label}
    </span>
  );
}
