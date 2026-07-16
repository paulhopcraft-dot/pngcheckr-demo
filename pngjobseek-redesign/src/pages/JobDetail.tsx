import { Link, useParams } from "react-router-dom";
import { MapPin, Clock, CalendarClock, Briefcase, ArrowLeft, Bookmark, Share2, ShieldCheck } from "lucide-react";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getJob, JOBS } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";

export function JobDetail() {
  const { id } = useParams();
  const job = id ? getJob(id) : undefined;

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg font-medium">Job not found.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/jobs">Back to job search</Link>
        </Button>
      </div>
    );
  }

  const related = JOBS.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="size-3.5" />
        Back to job search
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold">{job.title}</h1>
                <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
              </div>
              {job.featured && <Badge variant="secondary">Featured</Badge>}
              {job.urgent && !job.featured && <Badge variant="destructive">Urgent</Badge>}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {job.province}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="size-4" />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {job.postedDaysAgo === 0 ? "Posted today" : `Posted ${job.postedDaysAgo}d ago`}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-4" />
                Closes {job.closingDate}
              </span>
              {job.verifiedPreferred && (
                <span className="inline-flex items-center gap-1.5 text-[#0e7c7b] font-medium">
                  <ShieldCheck className="size-4" />
                  Prefers verified applicants
                </span>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="font-semibold mb-2">About the role</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
              <div>
                <h2 className="font-semibold mb-2">Requirements</h2>
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                  {job.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="font-semibold text-lg">{job.salary}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{job.category}</p>
              </div>
              <Button size="lg" variant="secondary" className="w-full">
                Apply Now
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Bookmark className="size-3.5" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Share2 className="size-3.5" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#0e7c7b]/30">
            <CardContent className="pt-6 space-y-3">
              <VerifiedBadge status="verified" />
              <p className="text-sm font-semibold">Stand out with verification</p>
              <p className="text-sm text-muted-foreground">
                {job.verifiedPreferred
                  ? "This employer prefers verified applicants. "
                  : ""}
                One PNGcheckr check covers your identity, credentials, and clearances —
                your badge then follows every application you make, without exposing the
                documents behind it.
              </p>
              <Button variant="outline" size="sm" className="w-full text-[#0e7c7b]">
                Get verified with PNGcheckr
              </Button>
            </CardContent>
          </Card>

          {related.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-3">More in {job.category}</p>
              <div className="space-y-3">
                {related.map((r) => (
                  <JobCard key={r.id} job={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
