import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * A small animated diagram per case study. Each one depicts the actual
 * mechanism of that system, so nothing here ships as a GIF.
 *
 * Motion is SVG SMIL, which the stylesheet's reduced-motion rules cannot touch
 * — they only reach CSS animations and transitions. So every diagram takes
 * `still` and renders a resolved end state instead: the measurements already at
 * the gate, the shelf already scanned, the noise already assembled. The
 * argument each diagram makes survives without the movement.
 */
/** 'solver' is rendered by the interactive ConstraintLab, not by this module. */
export type VisualKind = 'solver' | 'llm' | 'geometry' | 'retail' | 'generative';

const C = 'rgb(var(--cyan))';
const A = 'rgb(var(--amber))';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 240 130" className="h-full w-full" aria-hidden fill="none">
      {/* faint working grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 26} x2="240" y2={i * 26} stroke={C} strokeOpacity="0.07" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`v${i}`} x1={i * 26} y1="0" x2={i * 26} y2="130" stroke={C} strokeOpacity="0.07" />
      ))}
      {children}
    </svg>
  );
}

/** Measurements enter; numbers are locked, prose is generated. */
function Llm({ still }: { still: boolean }) {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={still ? 74 : 12}
          y={22 + i * 18}
          width="14"
          height="8"
          fill={C}
          fillOpacity={still ? 0.7 : 0.4}
          rx="1"
        >
          {!still && (
            <>
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
            </>
          )}
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
function Geometry({ still }: { still: boolean }) {
  return (
    <Frame>
      {[
        { x: 26, y: 34 },
        { x: 26, y: 96 },
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
        {!still && <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />}
      </circle>
      <circle cx="168" cy="65" r="12" stroke={A} strokeOpacity="0.4" strokeWidth="1">
        {!still && (
          <>
            <animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" />
            <animate
              attributeName="stroke-opacity"
              values="0.5;0;0.5"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      <text x="196" y="68" fill={A} fontSize="9" fontFamily="JetBrains Mono, monospace">
        3D
      </text>
    </Frame>
  );
}

const RETAIL_CELLS = Array.from({ length: 18 }, (_, i) => ({
  i,
  x: 20 + (i % 6) * 34,
  y: 24 + Math.floor(i / 6) * 30,
}));

/** Shelf cells scanned and matched against a catalogue. */
function Retail({ still }: { still: boolean }) {
  return (
    <Frame>
      {RETAIL_CELLS.map((c) => (
        <g key={c.i}>
          <rect x={c.x} y={c.y} width="26" height="22" stroke={C} strokeOpacity="0.35" strokeWidth="1" rx="1.5" />
          <rect
            x={c.x}
            y={c.y}
            width="26"
            height="22"
            fill={A}
            /* Still: a partial scan reads as a matched shelf; all-zero read as an empty one. */
            fillOpacity={still ? (c.i % 3 === 0 ? 0.45 : 0.12) : 0}
            rx="1.5"
          >
            {!still && (
              <animate
                attributeName="fill-opacity"
                values="0;0.55;0"
                dur="4s"
                begin={`${(c.i % 6) * 0.18 + Math.floor(c.i / 6) * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
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

/*
 * Fixed once at module load. Computing these during render re-rolled every dot
 * whenever the parent re-rendered, so the diagram twitched on unrelated state
 * changes. The values only need to look unstructured, not be unpredictable.
 */
const GENERATIVE_DOTS = Array.from({ length: 40 }, (_, i) => {
  // Cheap deterministic scatter — stable across renders and across reloads.
  const noise = (n: number, k: number) => ((Math.sin(n * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    i,
    ox: 20 + noise(i, 1) * 200,
    oy: 15 + noise(i, 2) * 100,
    tx: 30 + (i % 10) * 20,
    ty: 35 + Math.floor(i / 10) * 22,
  };
});

/** Noise resolving into structure. */
function Generative({ still }: { still: boolean }) {
  return (
    <Frame>
      {GENERATIVE_DOTS.map((d) => (
        <circle
          key={d.i}
          /* Still: show the resolved structure, which is the point being made. */
          cx={still ? d.tx : d.ox}
          cy={still ? d.ty : d.oy}
          r="2.4"
          fill={d.i % 5 === 0 ? A : C}
          fillOpacity="0.7"
        >
          {!still && (
            <>
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
            </>
          )}
        </circle>
      ))}
    </Frame>
  );
}

const map = {
  llm: Llm,
  geometry: Geometry,
  retail: Retail,
  generative: Generative,
} as const;

export default function CaseVisual({ kind }: { kind: VisualKind }) {
  const still = useReducedMotion();
  const V = map[kind as keyof typeof map];
  return V ? <V still={still} /> : null;
}
