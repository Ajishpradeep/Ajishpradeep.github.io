/**
 * Original schematic graphics. Each one depicts something real about the work
 * rather than acting as decoration.
 */

/** 24-keypoint skeleton with club, i.e. the actual subject of the pose research. */
export function PoseFigure({ className = '' }: { className?: string }) {
  // Normalised joint positions, roughly a golf address posture.
  const j: Record<string, [number, number]> = {
    head: [50, 12],
    neck: [50, 22],
    lsh: [40, 26],
    rsh: [60, 26],
    lel: [34, 40],
    rel: [66, 40],
    lwr: [43, 52],
    rwr: [57, 52],
    spine: [50, 42],
    lhip: [43, 56],
    rhip: [57, 56],
    lkn: [40, 74],
    rkn: [60, 74],
    lank: [38, 92],
    rank: [62, 92],
    grip: [50, 54],
    club: [78, 88],
  };

  const bones: [string, string][] = [
    ['head', 'neck'],
    ['neck', 'lsh'],
    ['neck', 'rsh'],
    ['lsh', 'lel'],
    ['rsh', 'rel'],
    ['lel', 'lwr'],
    ['rel', 'rwr'],
    ['neck', 'spine'],
    ['spine', 'lhip'],
    ['spine', 'rhip'],
    ['lhip', 'rhip'],
    ['lsh', 'rsh'],
    ['lhip', 'lkn'],
    ['rhip', 'rkn'],
    ['lkn', 'lank'],
    ['rkn', 'rank'],
  ];

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      {/* club shaft, highlighted — the hard part of the problem */}
      <line
        x1={j.grip[0]}
        y1={j.grip[1]}
        x2={j.club[0]}
        y2={j.club[1]}
        stroke="rgb(var(--amber))"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx={j.club[0]} cy={j.club[1]} r="2.4" fill="rgb(var(--amber))" />

      {bones.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={j[a][0]}
          y1={j[a][1]}
          x2={j[b][0]}
          y2={j[b][1]}
          stroke="rgb(var(--cyan))"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}

      {Object.entries(j).map(([k, [x, y]]) => (
        <circle
          key={k}
          cx={x}
          cy={y}
          r={k === 'club' ? 0 : 1.6}
          fill="rgb(var(--cyan-hot))"
          fillOpacity="0.9"
        />
      ))}
    </svg>
  );
}

/** Schematic globe with great-circle arcs between the places the work has travelled. */
export function RouteMap({ className = '' }: { className?: string }) {
  const nodes = [
    { id: 'tpe', label: 'Taipei', x: 300, y: 128, primary: true },
    { id: 'waw', label: 'Warsaw', x: 152, y: 84 },
    { id: 'nyc', label: 'New York', x: 62, y: 106 },
  ];

  return (
    <svg viewBox="0 0 360 200" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--cyan))" stopOpacity="0.15" />
          <stop offset="50%" stopColor="rgb(var(--amber))" stopOpacity="0.75" />
          <stop offset="100%" stopColor="rgb(var(--cyan))" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* latitude / longitude scaffold */}
      {[40, 70, 100, 130, 160].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="350"
          y2={y}
          stroke="rgb(var(--cyan))"
          strokeOpacity="0.09"
          strokeWidth="1"
        />
      ))}
      {[40, 100, 160, 220, 280, 340].map((x) => (
        <path
          key={x}
          d={`M ${x} 30 Q ${x + (180 - x) * 0.18} 100 ${x} 170`}
          stroke="rgb(var(--cyan))"
          strokeOpacity="0.09"
          strokeWidth="1"
        />
      ))}

      {/* routes */}
      <path
        d="M 300 128 Q 226 34 152 84"
        stroke="url(#arc)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />
      <path
        d="M 152 84 Q 107 52 62 106"
        stroke="url(#arc)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />

      {nodes.map((n) => (
        <g key={n.id}>
          {n.primary && (
            <circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="rgb(var(--amber))"
              fillOpacity="0.28"
              className="pulse-ring"
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="3.4"
            fill={n.primary ? 'rgb(var(--amber))' : 'rgb(var(--cyan-hot))'}
          />
          <text
            x={n.x}
            y={n.y - 12}
            textAnchor="middle"
            fill={n.primary ? 'rgb(var(--amber))' : 'rgb(var(--dim))'}
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.5"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Small accuracy bar — before vs after, drawn to scale. */
export function DeltaBar({
  from,
  to,
  className = '',
}: {
  from: number;
  to: number;
  className?: string;
}) {
  const max = Math.max(from, to);
  return (
    <svg viewBox="0 0 100 26" className={className} aria-hidden>
      <rect x="0" y="3" width={(from / max) * 100} height="7" fill="rgb(var(--cyan))" fillOpacity="0.28" />
      <rect x="0" y="15" width={(to / max) * 100} height="7" fill="rgb(var(--amber))" />
    </svg>
  );
}
