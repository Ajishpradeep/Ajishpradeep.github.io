/*
  THE IMAGE THE EXPANDABLE CARD NEEDS, WHICH THIS SITE DOES NOT HAVE.

  `ExpandableEventCard` is image-led: a photograph is the thing that morphs, and
  the title and description ride on top of it. There are two images on this
  entire site — a portrait and a résumé — and filling the gap with Unsplash
  stock would put five photographs of laboratories and code on a page whose one
  rule is that nothing appears without being the actual thing.

  So each research entry gets a drawn plate: a small diagram of what the work
  actually is. A GAN's two networks, a shelf and its planogram, a body lifted
  from two views, one row of attention, a spline replacing a dense layer. They
  are keyed by the entry's own `plate` field rather than by array position, for
  the reason the lab's icons were deleted — a diagram assigned by position makes
  a claim and reassigns it silently the next time the list is reordered.

  Every plate is built from the same ingredients as `CaseVisual`: the site's two
  colours, a working grid, hairline strokes. They read as figures out of one
  notebook, which is what they are.
*/
export type PlateKind = 'planogram' | 'inpainting' | 'lifting' | 'transformer' | 'kan';

const C = 'rgb(var(--cyan))';
const A = 'rgb(var(--amber))';

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 112" className="h-full w-full" aria-hidden fill="none">
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 16} x2="200" y2={i * 16} stroke={C} strokeOpacity="0.06" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`} x1={i * 16} y1="0" x2={i * 16} y2="112" stroke={C} strokeOpacity="0.06" />
      ))}
      {children}
    </svg>
  );
}

/** Detection boxes over a shelf, and the embedding space they resolve against. */
function Planogram() {
  return (
    <Sheet>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={16 + col * 22}
            y={20 + row * 26}
            width="17"
            height="20"
            rx="1"
            stroke={row === 1 && col === 2 ? A : C}
            strokeOpacity={row === 1 && col === 2 ? 0.95 : 0.4}
            strokeWidth={row === 1 && col === 2 ? 1.4 : 0.8}
            fill={row === 1 && col === 2 ? A : C}
            fillOpacity={row === 1 && col === 2 ? 0.14 : 0.05}
          />
        )),
      )}
      {/* shelf rules */}
      {[0, 1, 2].map((row) => (
        <line
          key={row}
          x1="12"
          y1={41 + row * 26}
          x2="108"
          y2={41 + row * 26}
          stroke={C}
          strokeOpacity="0.3"
          strokeWidth="0.9"
        />
      ))}
      {/* the embedding space the new SKU lands in without retraining */}
      <circle cx="158" cy="56" r="30" stroke={C} strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="2 2" />
      {[
        [148, 44], [166, 50], [154, 66], [170, 64], [140, 58], [162, 38],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill={C} fillOpacity="0.5" />
      ))}
      <circle cx="157" cy="55" r="3.2" fill={A} />
      <line x1="97" y1="56" x2="126" y2="56" stroke={A} strokeOpacity="0.6" strokeWidth="0.9" strokeDasharray="3 2" />
    </Sheet>
  );
}

/** A hole in a field, and the context the model pulls across it. */
function Inpainting() {
  return (
    <Sheet>
      <rect x="24" y="16" width="152" height="80" rx="2" stroke={C} strokeOpacity="0.35" strokeWidth="0.9" />
      {/* the field: horizontal texture */}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1="28"
          y1={22 + i * 9}
          x2="172"
          y2={22 + i * 9}
          stroke={C}
          strokeOpacity="0.16"
          strokeWidth="1.6"
        />
      ))}
      {/* the hole */}
      <rect x="76" y="36" width="48" height="40" rx="1.5" fill="rgb(var(--void))" stroke={A} strokeOpacity="0.9" strokeWidth="1.2" />
      {/* attention pulled in from both sides — content and spatial */}
      {[44, 56, 68].map((y, i) => (
        <g key={i}>
          <path d={`M 60 ${y} Q 76 ${y - 6} 92 ${y}`} stroke={A} strokeOpacity="0.55" strokeWidth="0.9" />
          <path d={`M 140 ${y} Q 124 ${y + 6} 108 ${y}`} stroke={A} strokeOpacity="0.55" strokeWidth="0.9" />
        </g>
      ))}
      <circle cx="100" cy="56" r="2.4" fill={A} />
    </Sheet>
  );
}

/** Two views, one body — the 2D-to-3D lift. */
function Lifting() {
  const joints2d: [number, number][] = [
    [44, 26], [44, 40], [34, 50], [54, 50], [44, 62], [37, 84], [51, 84],
  ];
  const bones: [number, number][] = [[0, 1], [1, 2], [1, 3], [1, 4], [4, 5], [4, 6]];

  return (
    <Sheet>
      {/* left: the 2D detection */}
      <rect x="16" y="14" width="60" height="84" rx="2" stroke={C} strokeOpacity="0.25" strokeWidth="0.8" />
      {bones.map(([a, b], i) => (
        <line
          key={i}
          x1={joints2d[a][0]}
          y1={joints2d[a][1]}
          x2={joints2d[b][0]}
          y2={joints2d[b][1]}
          stroke={C}
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
      ))}
      {joints2d.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={C} fillOpacity="0.8" />
      ))}

      {/* the lift */}
      <path d="M 82 56 L 108 56" stroke={A} strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M 104 52 L 108 56 L 104 60" stroke={A} strokeOpacity="0.9" strokeWidth="1" />

      {/* right: the same body with depth, on a ground plane */}
      <g transform="translate(74 0)">
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={44 - i * 3}
            y1={92 - i * 5}
            x2={92 + i * 3}
            y2={92 - i * 5}
            stroke={C}
            strokeOpacity="0.12"
          />
        ))}
        {bones.map(([a, b], i) => (
          <line
            key={i}
            x1={joints2d[a][0] + 24}
            y1={joints2d[a][1]}
            x2={joints2d[b][0] + 24}
            y2={joints2d[b][1]}
            stroke={A}
            strokeOpacity="0.8"
            strokeWidth="1.4"
          />
        ))}
        {joints2d.map(([x, y], i) => (
          <circle key={i} cx={x + 24} cy={y} r="1.8" fill={A} />
        ))}
        {/* the depth axis that was recovered */}
        <line x1="68" y1="62" x2="82" y2="72" stroke={C} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="2 2" />
      </g>
    </Sheet>
  );
}

/** One query attending across a row of keys — the walkthrough's own figure. */
function Transformer() {
  const tokens = [0, 1, 2, 3, 4, 5, 6];
  const weights = [0.15, 0.35, 0.9, 0.5, 0.2, 0.65, 0.25];

  return (
    <Sheet>
      {tokens.map((i) => (
        <rect
          key={`k${i}`}
          x={20 + i * 23}
          y={74}
          width="16"
          height="16"
          rx="1"
          stroke={C}
          strokeOpacity="0.4"
          strokeWidth="0.8"
          fill={C}
          fillOpacity="0.06"
        />
      ))}
      {/* the query */}
      <rect x="89" y="18" width="18" height="18" rx="1" stroke={A} strokeOpacity="0.95" strokeWidth="1.3" fill={A} fillOpacity="0.16" />

      {/* attention, thickness = weight */}
      {tokens.map((i) => (
        <path
          key={`a${i}`}
          d={`M 98 38 Q ${28 + i * 23} 58 ${28 + i * 23} 72`}
          stroke={A}
          strokeOpacity={0.15 + weights[i] * 0.6}
          strokeWidth={0.4 + weights[i] * 1.6}
        />
      ))}
      {/* the masked future the decoder cannot see */}
      <line x1="152" y1="70" x2="188" y2="94" stroke="rgb(var(--signal))" strokeOpacity="0.45" strokeWidth="0.9" />
      <line x1="188" y1="70" x2="152" y2="94" stroke="rgb(var(--signal))" strokeOpacity="0.45" strokeWidth="0.9" />
    </Sheet>
  );
}

/** A dense block, and the learned spline that replaces it. */
function Kan() {
  return (
    <Sheet>
      {/* left: dense MLP — every edge a fixed weight */}
      {[0, 1, 2].map((a) =>
        [0, 1, 2].map((b) => (
          <line
            key={`${a}-${b}`}
            x1="34"
            y1={30 + a * 26}
            x2="78"
            y2={30 + b * 26}
            stroke={C}
            strokeOpacity="0.22"
            strokeWidth="0.7"
          />
        )),
      )}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="34" cy={30 + i * 26} r="3.4" fill={C} fillOpacity="0.55" />
          <circle cx="78" cy={30 + i * 26} r="3.4" fill={C} fillOpacity="0.55" />
        </g>
      ))}

      <path d="M 96 56 L 118 56" stroke={A} strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M 114 52 L 118 56 L 114 60" stroke={A} strokeOpacity="0.9" strokeWidth="1" />

      {/* right: the same edge carrying a learned univariate function */}
      <rect x="130" y="24" width="56" height="64" rx="2" stroke={C} strokeOpacity="0.25" strokeWidth="0.8" />
      <path
        d="M 136 78 C 146 78 148 40 158 40 C 168 40 170 68 180 34"
        stroke={A}
        strokeOpacity="0.9"
        strokeWidth="1.4"
      />
      {[[136, 78], [158, 40], [180, 34]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={A} />
      ))}
      <line x1="136" y1="84" x2="182" y2="84" stroke={C} strokeOpacity="0.3" strokeWidth="0.7" />
    </Sheet>
  );
}

const PLATES: Record<PlateKind, () => JSX.Element> = {
  planogram: Planogram,
  inpainting: Inpainting,
  lifting: Lifting,
  transformer: Transformer,
  kan: Kan,
};

export default function ResearchPlate({ kind }: { kind: PlateKind }) {
  const Plate = PLATES[kind];
  return <Plate />;
}
