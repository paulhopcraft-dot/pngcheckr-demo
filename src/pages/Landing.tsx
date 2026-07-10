import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ScanEye, Repeat, Gavel, Award } from "lucide-react";

const PIPELINE = [
  {
    icon: Search,
    name: "Intake",
    copy: "The employer submits a candidate and the checks they need — a name, a role, and a tier.",
  },
  {
    icon: ScanEye,
    name: "Screen",
    copy: "Requests go out to the relevant registries and referees for identity, credentials, and history.",
  },
  {
    icon: Repeat,
    name: "Chase",
    copy: "Automated reminders follow up on anything outstanding, then a human escalates what's still stuck.",
  },
  {
    icon: Gavel,
    name: "Verdict",
    copy: "A named reviewer signs off on a clear outcome — verified, verified with exceptions, or not-verifiable.",
  },
  {
    icon: Award,
    name: "Certify",
    copy: "The employer gets the full file. The candidate gets a badge they can share, without exposing the evidence behind it.",
  },
];

const ROADMAP = [
  {
    year: "2026",
    title: "Verification",
    copy: "Pre-employment identity, credential, and clearance checks — the product in this demo.",
    current: true,
  },
  {
    year: "Near-term",
    title: "Aftercare & succession",
    copy: "Coming later: modules covering onboarding follow-up and role succession planning.",
    current: false,
  },
  {
    year: "2030",
    title: "Full placement-lifecycle trust platform",
    copy: "The vision: one trust layer covering the entire employment lifecycle for PNG's workforce.",
    current: false,
  },
];

export function Landing() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight">Attestli</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Employment verification that gives employers the full picture and candidates a badge they can
          actually share — without ever handing over the underlying evidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild size="lg">
            <Link to="/employer">I'm an employer</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/candidate">Check my badge</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">How a verification moves</h2>
        <div className="grid sm:grid-cols-5 gap-4">
          {PIPELINE.map((stage, i) => (
            <Card key={stage.name} className="relative">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <stage.icon className="size-5 text-secondary" />
                  <span className="text-xs font-mono text-muted-foreground">{i + 1}</span>
                </div>
                <p className="font-semibold">{stage.name}</p>
                <p className="text-sm text-muted-foreground">{stage.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-12">
        <h2 className="text-xl font-semibold text-center mb-2">Where this is going</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Verification is the foundation. Here's the roadmap.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {ROADMAP.map((step) => (
            <div
              key={step.year}
              className={`rounded-lg border p-5 ${
                step.current ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <p className="text-xs font-mono uppercase tracking-wide text-secondary mb-1">{step.year}</p>
              <p className="font-semibold mb-1">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
