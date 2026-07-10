import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestrictedBadgeView } from "@/components/RestrictedBadgeView";
import { findCandidateByNameOrCode } from "@/lib/candidates";
import type { BadgeResult } from "@/lib/types";

export function Candidate() {
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState<BadgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBadge(null);
    setLoading(true);

    try {
      const match = findCandidateByNameOrCode(query);
      const code = match ? match.referenceCode : query.trim();
      const res = await fetch(`/api/badge/${encodeURIComponent(code)}`);
      if (!res.ok) throw new Error("No badge found for that name or reference code");
      const data: BadgeResult = await res.json();
      setBadge(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-primary">Check a badge</h1>
        <p className="text-muted-foreground mt-1">
          Search by candidate name or reference code to see a verdict-only summary.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Look up a badge</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="query">Name or reference code</Label>
              <Input
                id="query"
                required
                placeholder="e.g. Ruth Ovia or ATT-2C91K4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching…" : "Search"}
            </Button>
          </form>
          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
        </CardContent>
      </Card>

      {badge && <RestrictedBadgeView badge={badge} />}
    </div>
  );
}
