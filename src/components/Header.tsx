import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-primary">
          <ShieldCheck className="size-5" />
          PNGcheckr
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/employer" className="hover:text-secondary transition-colors">
            Employer
          </Link>
          <Link to="/candidate" className="hover:text-secondary transition-colors">
            Candidate
          </Link>
        </nav>
      </div>
    </header>
  );
}
