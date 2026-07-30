/**
 * A small animated diagram per case study. Each one depicts the actual
 * mechanism of that system, and all motion is CSS so nothing ships as a GIF.
 */
export type VisualKind = 'pose' | 'llm' | 'geometry' | 'retail' | 'generative';

const C = 'rgb(var(--cyan))';
const A = 'rgb(var(--amber))';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 240 130" className="h-full w-full" aria-hidden fill="none">
      {/* faint working grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 26}
          x2="240"
          y2={i * 26}
          stroke={C}
          strokeOpacity="0.07"
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={i * 26}
          y1="0"
          x2={i * 26}
          y2="130"
          stroke={C}
          strokeOpacity="0.07"
        />
      ))}
      {children}
    </svg>
  );
}

/** Detection reticle sweeping a subject, keypoints lighting up behind it. */
function Pose() {
  const pts: [number, number][] = [
    [120, 26], [120, 44], [104, 50], [136, 50], [96, 70], [144, 70],
    [110, 66], [130, 66], [110, 92], [130, 92], [106, 114], [134, 114],
  ];
  return (
    <Frame>
      <g stroke={C} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round">
        <line x1="120" y1="26" x2="120" y2="66" />
        <line x1="104" y1="50" x2="136" y2="50" />
        <line x1="104" y1="50" x2="96" y2="70" />
        <line x1="136" y1="50" x2="144" y2="70" />
        <line x1="110" y1="66" x2="130" y2="66" />
        <line x1="110" y1="66" x2="110" y2="92" />
        <line x1="130" y1="66" x2="130" y2="92" />
        <line x1="110" y1="92" x2="106" y2="114" />
        <line x1="130" y1="92" x2="134" y2="114" />
      </g>
      {/* club, the hard part */}
      <line x1="120" y1="68" x2="168" y2="112" stroke={A} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="168" cy="112" r="3.5" fill={A} />

      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={C}>
          <animate
            attributeName="fill-opacity"
            values="0.25;1;0.25"
            dur="2.6s"
            begin={`${i * 0.12}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* sweeping reticle */}
      <g>
        <rect x="70" y="12" width="46" height="106" stroke={A} strokeOpacity="0.9" strokeWidth="1" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-56 0; 116 0; -56 0"
          dur="5s"
          repeatCount="indefinite"
        />
      </g>
    </Frame>
  );
}

/** Measurements enter; numbers are locked, prose is generated. */
function Llm() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="12" y={22 + i * 18} width="14" height="8" fill={C} fillOpacity="0.4" rx="1">
          <animate
            attributeName="x"
            values="12;74;74"
            dur="3s"
            begin={`${i * 0.3}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.4;0.9;0"
            dur="3s"
            begin={`${i * 0.3}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}

      {/* the gate */}
      <rect x="92" y="18" width="30" height="94" stroke={A} strokeWidth="1.4" rx="2" />
      <text x="107" y="70" textAnchor="middle" fill={A} fontSize="9" fontFamily="JetBrains Mono, monospace">
        gate
      </text>

      {/* deterministic branch */}
      <line x1="122" y1="42" x2="176" y2="42" stroke={A} strokeWidth="1.2" strokeDasharray="4 3" className="drift" />
      <rect x="176" y="32" width="52" height="20" stroke={A} strokeWidth="1.2" rx="2" />
      <text x="202" y="46" textAnchor="middle" fill={A} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        numbers
      </text>

      {/* generated branch */}
      <line x1="122" y1="88" x2="176" y2="88" stroke={C} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="4 3" className="drift" />
      <rect x="176" y="78" width="52" height="20" stroke={C} strokeOpacity="0.6" strokeWidth="1.2" rx="2" />
      <text x="202" y="92" textAnchor="middle" fill={C} fillOpacity="0.75" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        prose
      </text>
    </Frame>
  );
}

/** Two cameras triangulating one point. */
function Geometry() {
  return (
    <Frame>
      {[
        { x: 26, y: 34, flip: 1 },
        { x: 26, y: 96, flip: 1 },
      ].map((cam, i) => (
        <g key={i}>
          <path
            d={`M ${cam.x} ${cam.y - 10} L ${cam.x + 18} ${cam.y} L ${cam.x} ${cam.y + 10} Z`}
            stroke={C}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <line
            x1={cam.x + 18}
            y1={cam.y}
            x2="168"
            y2="65"
            stroke={A}
            strokeOpacity="0.7"
            strokeWidth="1"
            strokeDasharray="5 4"
            className="drift"
          />
        </g>
      ))}

      <circle cx="168" cy="65" r="5" fill={A}>
        <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="168" cy="65" r="12" stroke={A} strokeOpacity="0.4" strokeWidth="1">
        <animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>

      <text x="196" y="68" fill={A} fontSize="9" fontFamily="JetBrains Mono, monospace">
        3D
      </text>
    </Frame>
  );
}

/** Shelf cells scanned and matched against a catalogue. */
function Retail() {
  const cells = Array.from({ length: 18 }, (_, i) => ({
    x: 20 + (i % 6) * 34,
    y: 24 + Math.floor(i / 6) * 30,
    i,
  }));
  return (
    <Frame>
      {cells.map((c) => (
        <g key={c.i}>
          <rect x={c.x} y={c.y} width="26" height="22" stroke={C} strokeOpacity="0.35" strokeWidth="1" rx="1.5" />
          <rect x={c.x} y={c.y} width="26" height="22" fill={A} fillOpacity="0" rx="1.5">
            <animate
              attributeName="fill-opacity"
              values="0;0.55;0"
              dur="4s"
              begin={`${(c.i % 6) * 0.18 + Math.floor(c.i / 6) * 0.5}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      <line x1="16" y1="18" x2="16" y2="116" stroke={A} strokeWidth="1.4" />
      <text x="20" y="14" fill={C} fillOpacity="0.6" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
        planogram vs realogram
      </text>
    </Frame>
  );
}

/** Noise resolving into structure. */
function Generative() {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    i,
    ox: 20 + Math.random() * 200,
    oy: 15 + Math.random() * 100,
    tx: 30 + (i % 10) * 20,
    ty: 35 + Math.floor(i / 10) * 22,
  }));
  return (
    <Frame>
      {dots.map((d) => (
        <circle key={d.i} cx={d.ox} cy={d.oy} r="2.4" fill={d.i % 5 === 0 ? A : C} fillOpacity="0.7">
          <animate
            attributeName="cx"
            values={`${d.ox};${d.tx};${d.ox}`}
            dur="6s"
            begin={`${(d.i % 8) * 0.1}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${d.oy};${d.ty};${d.oy}`}
            dur="6s"
            begin={`${(d.i % 8) * 0.1}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </Frame>
  );
}

const map = {
  pose: Pose,
  llm: Llm,
  geometry: Geometry,
  retail: Retail,
  generative: Generative,
} as const;

export default function CaseVisual({ kind }: { kind: VisualKind }) {
  const V = map[kind] ?? Pose;
  return <V />;
}
