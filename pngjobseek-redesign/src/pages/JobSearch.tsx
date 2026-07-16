import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { JobCard } from "@/components/JobCard";
import { CATEGORIES, PROVINCES, JOBS } from "@/lib/jobs";

export function JobSearch() {
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState(params.get("q") ?? "");
  const category = params.get("category") ?? "";
  const province = params.get("province") ?? "";

  const results = JOBS.filter((job) => {
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = !category || job.category === category;
    const matchesProvince = !province || job.province === province;
    return matchesKeyword && matchesCategory && matchesProvince;
  });

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-serif text-3xl font-semibold mb-6">Browse jobs</h1>

      <div className="bg-card border border-card-border rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-2">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <Input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              updateParam("q", e.target.value);
            }}
            placeholder="Job title, keyword, or company"
            className="border-0 shadow-none focus-visible:ring-0 px-0"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="sm:w-56"
        >
          <option value="">Any category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
        <Select
          value={province}
          onChange={(e) => updateParam("province", e.target.value)}
          className="sm:w-56"
        >
          <option value="">Any province</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {results.length} job{results.length === 1 ? "" : "s"} found
      </p>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No jobs match those filters yet — try widening your search.
        </div>
      )}
    </div>
  );
}
