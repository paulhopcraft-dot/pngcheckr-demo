import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestrictedBadgeView } from "@/components/RestrictedBadgeView";
import type { BadgeResult } from "@/lib/types";

export function VerifyCode() {
  const { code } = useParams<{ code: string }>();
  const [badge, setBadge] = useState<BadgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    setError(null);
    fetch(`/api/badge/${encodeURIComponent(code)}`)
      .then((res) => {
        if (!res.ok) throw new Error("No badge found for this reference code");
        return res.json();
      })
      .then((data: BadgeResult) => setBadge(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong"))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Verification badge</h1>
        <p className="text-muted-foreground mt-1">
          Reference code <span className="font-mono">{code}</span>
        </p>
      </div>

      {loading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {badge && <RestrictedBadgeView badge={badge} />}
    </div>
  );
}
