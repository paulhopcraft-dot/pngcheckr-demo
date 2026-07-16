import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pickaxe,
  HardHat,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Palmtree,
  Wheat,
  Wifi,
  Landmark,
  Building2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { JobCard } from "@/components/JobCard";
import { CATEGORIES, PROVINCES, JOBS } from "@/lib/jobs";

const CATEGORY_ICONS: Record<string, typeof Pickaxe> = {
  "Mining & Resources": Pickaxe,
  "Construction & Engineering": HardHat,
  "Health & Medical": Stethoscope,
  "Education & Training": GraduationCap,
  "Admin & Office": Briefcase,
  "Hospitality & Tourism": Palmtree,
  "Agriculture & Fisheries": Wheat,
  "IT & Telecommunications": Wifi,
  "Banking & Finance": Landmark,
  "Government & NGO": Building2,
};

const STATS = [
  { label: "Live jobs", value: "214" },
  { label: "Registered employers", value: "486" },
  { label: "Job seekers", value: "52,300+" },
  { label: "Provinces covered", value: "22" },
];

export function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (category) params.set("category", category);
    if (province) params.set("province", province);
    navigate(`/jobs?${params.toString()}`);
  }

  const featured = JOBS.filter((job) => job.featured || job.urgent).slice(0, 6);
  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    count: JOBS.filter((job) => job.category === cat).length,
  }));

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance">
            Papua New Guinea's jobs, <span className="text-secondary">in one place.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From the Highlands to the coast — find work, or find your next hire, across every province.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 mx-auto max-w-3xl bg-card border border-card-border rounded-xl p-3 shadow-sm flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-2">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keyword, or company"
                className="border-0 shadow-none focus-visible:ring-0 px-0"
              />
            </div>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="sm:w-56"
            >
              <option value="">Any category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            <Select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="sm:w-56"
            >
              <option value="">Any province</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Select>
            <Button type="submit" size="lg" variant="secondary" className="shrink-0">
              Search Jobs
            </Button>
          </form>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-2xl font-semibold mb-8">Browse by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCounts.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.name];
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                className="text-left rounded-lg border border-border bg-card p-4 hover-elevate transition-colors"
              >
                <Icon className="size-5 text-secondary mb-3" />
                <p className="text-sm font-medium leading-snug">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} jobs</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-semibold">Featured &amp; urgent roles</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/jobs")}>
            View all jobs
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Hiring across PNG?</h2>
            <p className="text-primary-foreground/80 mt-1 max-w-md">
              Reach jobseekers in every province, from Port Moresby to the Highlands.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="shrink-0"
          >
            <a href="/employers">Post a Job</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
