import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-card">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-serif font-semibold text-lg mb-2">
            PNG <span className="text-secondary">JobSeek</span>
          </p>
          <p className="text-muted-foreground max-w-xs">
            Connecting employers and jobseekers across Papua New Guinea's provinces.
          </p>
        </div>
        <div>
          <p className="font-medium mb-2">For Jobseekers</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/jobs" className="hover:text-foreground transition-colors">Browse jobs</Link></li>
            <li><Link to="/jobs" className="hover:text-foreground transition-colors">Job alerts</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">For Employers</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/employers" className="hover:text-foreground transition-colors">Post a job</Link></li>
            <li><Link to="/employers" className="hover:text-foreground transition-colors">Pricing</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} PNG JobSeek</p>
        <p>Concept redesign — all listings shown are illustrative.</p>
      </div>
    </footer>
  );
}
