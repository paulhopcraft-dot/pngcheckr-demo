import { Link, NavLink } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/jobs", label: "Find Jobs" },
  { to: "/employers", label: "For Employers" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground">
            <Compass className="size-4" />
          </span>
          <span className="font-serif font-semibold text-xl tracking-tight">
            PNG <span className="text-secondary">JobSeek</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link to="/employers">Post a Job</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
