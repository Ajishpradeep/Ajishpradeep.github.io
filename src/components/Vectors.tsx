/**
 * Original schematic graphics. Each one depicts something real about the work
 * rather than acting as decoration.
 */

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
