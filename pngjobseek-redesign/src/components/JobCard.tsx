import { Link } from "react-router-dom";
import { MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="hover-elevate transition-shadow h-full">
        <CardContent className="pt-6 flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold leading-snug">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            {job.featured && (
              <Badge variant="secondary" className="shrink-0 gap-1">
                <Star className="size-3" />
                Featured
              </Badge>
            )}
            {job.urgent && !job.featured && (
              <Badge variant="destructive" className="shrink-0">
                Urgent
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {job.province}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {job.postedDaysAgo === 0 ? "Posted today" : `Posted ${job.postedDaysAgo}d ago`}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <Badge variant="outline">{job.type}</Badge>
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
