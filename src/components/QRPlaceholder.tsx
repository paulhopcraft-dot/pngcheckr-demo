import { Link } from "react-router-dom";

interface QRPlaceholderProps {
  code: string;
}

// Decorative, deterministic pseudo-QR grid derived from the reference code.
// Not a real scannable QR code — clicking it simulates "scanning" it.
export function QRPlaceholder({ code }: QRPlaceholderProps) {
  const size = 9;
  const cells: boolean[] = [];
  let seed = 0;
  for (let i = 0; i < code.length; i++) {
    seed = (seed * 31 + code.charCodeAt(i)) >>> 0;
  }
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    cells.push((seed >> 16) % 3 !== 0);
  }

  const cellSize = 12;
  const dim = size * cellSize;

  return (
    <Link
      to={`/verify/${code}`}
      className="inline-flex flex-col items-center gap-2 group"
      aria-label="Simulate scanning this candidate's verification badge"
    >
      <svg
        viewBox={`0 0 ${dim} ${dim}`}
        width={dim}
        height={dim}
        className="rounded-md border border-border bg-card p-2 transition-transform group-hover:scale-105"
      >
        {cells.map((filled, i) => {
          if (!filled) return null;
          const x = (i % size) * cellSize;
          const y = Math.floor(i / size) * cellSize;
          return <rect key={i} x={x} y={y} width={cellSize} height={cellSize} className="fill-primary" />;
        })}
        {/* Finder-pattern corners, like a real QR code */}
        {[
          [0, 0],
          [dim - cellSize * 3, 0],
          [0, dim - cellSize * 3],
        ].map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={cellSize * 3}
            height={cellSize * 3}
            className="fill-none stroke-secondary"
            strokeWidth={3}
          />
        ))}
      </svg>
      <p className="text-xs text-muted-foreground text-center max-w-[10rem]">
        Simulated QR — click to view what scanning this badge would show
      </p>
    </Link>
  );
}
