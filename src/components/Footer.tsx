export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} PNGcheckr. Verification you can hand someone.</p>
        <p>This is a demonstration build. All names and outcomes shown are illustrative.</p>
      </div>
    </footer>
  );
}
