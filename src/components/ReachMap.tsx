/**
 * Where the work travelled.
 *
 * This is the schematic globe that used to sit in a seven-column "Reach" block
 * with a heading, a paragraph and a list beside it — half a page to say three
 * things. The objection recorded in DESIGN.md was never to the drawing; it was
 * that a map of three *office cities* is an employer's global-presence slide.
 *
 * So the drawing comes back at a third of the size and the nodes changed
 * meaning: they mark where this work was built, deployed and shown, and each
 * one is a fact stated in a sourced card directly above. It is an illustration
 * of the dossier, not of a company's footprint.
 *
 * `aria-hidden` because every label here is also written in the list beside it —
 * a screen reader that read both would hear the same three facts twice.
 */
export default function ReachMap({ className = '' }: { className?: string }) {
  /*
    Taipei's note is the widest label this drawing carries, and `textAnchor`
    is "middle" — an SVG's default `overflow: hidden` clips a centered label
    the moment its half-width crosses the viewBox edge. `x: 300` in a
    360-wide viewBox left only 60 units of margin for a ~126-unit-wide
    string; 282 leaves enough on both sides at every width the card renders.
  */
  const nodes = [
    { id: 'tpe', label: 'Taipei', note: 'built · 7,000+ stores', x: 282, y: 128, primary: true },
    { id: 'waw', label: 'Warsaw', note: 'shown · Jun 2026', x: 152, y: 84, primary: false },
  ];

  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      aria-hidden
      fill="none"
      role="presentation"
    >
      <defs>
        <linearGradient id="reach-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--cyan))" stopOpacity="0.15" />
          <stop offset="50%" stopColor="rgb(var(--amber))" stopOpacity="0.75" />
          <stop offset="100%" stopColor="rgb(var(--cyan))" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Latitude / longitude scaffold — enough to read as a globe, not a chart. */}
      {[40, 70, 100, 130, 160].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="350"
          y2={y}
          stroke="rgb(var(--cyan))"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
      ))}
      {[40, 100, 160, 220, 280, 340].map((x) => (
        <path
          key={x}
          d={`M ${x} 30 Q ${x + (180 - x) * 0.18} 100 ${x} 170`}
          stroke="rgb(var(--cyan))"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
      ))}

      {/* Taipei → Warsaw: the one journey the dossier actually documents. */}
      <path
        d="M 282 128 Q 217 34 152 84"
        stroke="url(#reach-arc)"
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
            y={n.y - 13}
            textAnchor="middle"
            fill={n.primary ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
            fontSize="13"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.5"
          >
            {n.label}
          </text>
          <text
            x={n.x}
            y={n.y + 20}
            textAnchor="middle"
            fill="rgb(var(--dim))"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            {n.note}
          </text>
        </g>
      ))}
    </svg>
  );
}
