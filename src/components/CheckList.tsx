import { CheckCircle2, AlertTriangle, Clock, XCircle, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CHECK_TYPE_LABELS, type Check, type CheckType } from "@/lib/types";

const RESULT_META: Record<Check["result"], { label: string; variant: "success" | "warning" | "critical" }> = {
  pass: { label: "Pass", variant: "success" },
  flag: { label: "Flag", variant: "warning" },
  pending: { label: "Pending", variant: "warning" },
  fail: { label: "Fail", variant: "critical" },
};

interface FullCheckListProps {
  mode: "full";
  checks: Check[];
}

interface RestrictedCheckListProps {
  mode: "restricted";
  categories: CheckType[];
}

type CheckListProps = FullCheckListProps | RestrictedCheckListProps;

export function CheckList(props: CheckListProps) {
  if (props.mode === "restricted") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Verification categories completed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {props.categories.map((category) => (
              <li key={category} className="flex items-center gap-2 text-sm">
                <CircleDot className="size-4 text-secondary shrink-0" />
                {CHECK_TYPE_LABELS[category]}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            Detailed results and evidence are only available to the requesting employer.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Checks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {props.checks.map((check) => {
          const isSpecialConfidence = check.checkType === "identity" && check.confidenceScore != null;
          const meta = RESULT_META[check.result];

          return (
            <div key={check.id} className="border border-border rounded-md p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-sm">{CHECK_TYPE_LABELS[check.checkType]}</span>
                {isSpecialConfidence ? (
                  <Badge variant="warning" className="flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5" />
                    {check.confidenceScore}% match confidence
                  </Badge>
                ) : (
                  <Badge variant={meta.variant} className="flex items-center gap-1.5">
                    <ResultIcon result={check.result} />
                    {meta.label}
                  </Badge>
                )}
              </div>
              {check.evidenceNote && (
                <p className="text-sm text-muted-foreground mt-2">{check.evidenceNote}</p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ResultIcon({ result }: { result: Check["result"] }) {
  switch (result) {
    case "pass":
      return <CheckCircle2 className="size-3.5" />;
    case "flag":
      return <AlertTriangle className="size-3.5" />;
    case "pending":
      return <Clock className="size-3.5" />;
    case "fail":
      return <XCircle className="size-3.5" />;
  }
}
