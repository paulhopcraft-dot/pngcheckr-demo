import { CheckCircle2, Users, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VerifiedBadge, type VerificationStatus } from "@/components/VerifiedBadge";

/* Fictional applicants for the screening demo — no real people. */
const MOCK_APPLICANTS: { name: string; role: string; status: VerificationStatus }[] = [
  { name: "Maryanne Kaupa", role: "Site Engineer — Port Upgrade", status: "verified" },
  { name: "Joseph Temu", role: "Site Engineer — Port Upgrade", status: "pending" },
  { name: "David Arek", role: "Site Engineer — Port Upgrade", status: "unverified" },
];

const VALUE_PROPS = [
  {
    icon: Users,
    title: "Reach every province",
    copy: "Your listing is seen by jobseekers from Port Moresby to the Highlands, not just the capital.",
  },
  {
    icon: Zap,
    title: "Post in minutes",
    copy: "A simple form, no back-and-forth — your role goes live the same day.",
  },
  {
    icon: ShieldCheck,
    title: "Verified applicants",
    copy: "Optional pre-screening integrations so you spend less time filtering unqualified applications.",
  },
];

const PLANS = [
  {
    name: "Basic",
    price: "K250",
    period: "per listing",
    features: ["30-day listing", "Standard placement", "Email applications"],
  },
  {
    name: "Featured",
    price: "K650",
    period: "per listing",
    highlighted: true,
    features: ["30-day listing", "Featured badge + top placement", "Email + dashboard applications", "Social media boost"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "monthly",
    features: ["Unlimited listings", "Dedicated account manager", "Applicant tracking dashboard", "Bulk province targeting"],
  },
];

export function Employers() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            Hire across Papua New Guinea
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            PNG JobSeek connects your vacancies with jobseekers in every province — from Lae to Milne Bay.
          </p>
          <Button size="lg" variant="secondary" className="mt-8">
            Post Your First Job
          </Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title}>
              <prop.icon className="size-6 text-secondary mb-3" />
              <p className="font-semibold mb-1">{prop.title}</p>
              <p className="text-sm text-muted-foreground">{prop.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e7c7b] mb-3">
              <ShieldCheck className="size-4" />
              Powered by PNGcheckr
            </p>
            <h2 className="font-serif text-2xl font-semibold mb-3">
              See who's verified before you shortlist
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Request a verification on any applicant — identity, credentials, and clearances
              checked by a named reviewer. You see the verdict on your shortlist; the evidence
              stays private. Applicants who already hold a PNGcheckr badge show it instantly.
            </p>
            <p className="text-xs text-muted-foreground">
              Verification from K150 per applicant, billed only on completed checks.
              Pricing illustrative.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-4">
                Applicants · Site Engineer — Port Upgrade
              </p>
              <div className="divide-y divide-border">
                {MOCK_APPLICANTS.map((applicant) => (
                  <div
                    key={applicant.name}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{applicant.name}</p>
                      <p className="text-xs text-muted-foreground">{applicant.role}</p>
                    </div>
                    <VerifiedBadge status={applicant.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="font-serif text-2xl font-semibold text-center mb-2">Simple, transparent pricing</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Choose the plan that fits your hiring needs.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-secondary ring-1 ring-secondary" : ""}
            >
              <CardContent className="pt-6 flex flex-col h-full">
                <p className="font-semibold text-lg">{plan.name}</p>
                <p className="mt-2">
                  <span className="text-3xl font-serif font-semibold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground"> {plan.period}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "secondary" : "outline"}
                  className="mt-6 w-full"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="font-serif text-xl leading-relaxed">
            "We filled our site engineer role in nine days — most of our applicants came from
            outside Lae, which never happened with our old listings."
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Illustrative employer testimonial</p>
        </div>
      </section>
    </div>
  );
}
