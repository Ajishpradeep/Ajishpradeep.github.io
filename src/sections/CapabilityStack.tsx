import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { springOr, SPRING } from '@/lib/motion';

/*
  THE FIVE AREAS AS A STACK, BECAUSE THAT IS WHAT THEY ARE.

  Capabilities was a five-row matrix, which is the correct shape for reference
  material and says nothing about the one thing that is actually interesting
  about this particular list: it is *ordered*. "Mathematical foundations" is not
  a peer of "Deployment & inference" — it is what deployment is standing on. The
  site's whole positioning claim is that the foundation is what transferred
  between generative models, retail vision, biomechanics and agentic systems,
  and a matrix draws five equal boxes.

  So it is drawn as a section through a stack: maths at the base, spanning the
  full width, and each layer above it narrower and resting on what is beneath.
  The narrowing is the argument — the higher you go the more domain-specific and
  the less transferable, which is exactly why the base is the part that moved
  with him.

  Flat rectangles, not an isometric skew — the fake-3D "tech stack" illustration
  is a stock SaaS-marketing shape, and the ordering argument reads just as
  clearly as a plain stratigraphic section. Labels are HTML on top, at the
  site's own sizes, because the viewBox scales and 14px does not.
*/

type Layer = {
  area: string;
  /** 0 = base. Width narrows with height. */
  span: number;
};

export default function CapabilityStack({
  areas,
  activeIndex,
  onSelect,
}: {
  areas: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const still = useReducedMotion();
  const t = springOr(still, SPRING.panel);

  /*
    A COMMON LEFT EDGE, AND A GENTLER TAPER.

    The slabs were centred and narrowed 13% a layer, which put the narrowest
    one — Research leadership, and also the longest label — at 48% of the base.
    "RESEARCH LEADERSHIP" at 14px is wider than that slab renders, so the label
    hung off both ends of the thing it was naming.

    Left-aligned they read as a stratigraphic section rather than a wedding
    cake, every label starts inside its own slab at any width, and the taper
    still carries the argument: each layer reaches less far than the one under
    it. 9% a step keeps the top slab at 64% of the base, which holds the
    longest name with room.
  */
  const layers: Layer[] = areas.map((area, i) => ({
    area,
    span: 1 - i * 0.09,
  }));

  const LEFT = 18;

  const H = 34; // layer height in viewBox units
  const GAP = 8;
  const total = layers.length * (H + GAP);

  return (
    /*
      `overflow-hidden`: the labels are absolutely positioned by `left` alone
      (see the note below), so nothing stops the widest of them —
      "RESEARCH LEADERSHIP" — from running past this box at the narrowest
      phone widths. Letting it wrap risked a two-line label colliding with the
      row above it in a stack this tightly spaced; clipping the rare overflow
      here, scoped to this component alone, is the safer failure than either.
    */
    <div className="relative overflow-hidden">
      <svg
        viewBox={`0 0 240 ${total + 20}`}
        className="h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        {/* the sheet the stack sits on */}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * ((total + 20) / 8)}
            x2="240"
            y2={i * ((total + 20) / 8)}
            stroke="rgb(var(--cyan))"
            strokeOpacity="0.06"
          />
        ))}

        {/*
          Bottom layer drawn first so the ones above overlap it, which is what
          "resting on" looks like. The array is reversed for painting only; the
          indices stay in reading order.
        */}
        {[...layers].reverse().map((layer, r) => {
          const i = layers.length - 1 - r;
          const on = i === activeIndex;
          const w = 204 * layer.span;
          const x = LEFT;
          const y = 10 + r * (H + GAP);

          return (
            <motion.g
              key={layer.area}
              animate={{ opacity: on ? 1 : 0.42 }}
              transition={t}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(i)}
            >
              <motion.rect
                x={x}
                y={y}
                width={w}
                height={H}
                rx="2"
                animate={{
                  fill: on ? 'rgb(var(--amber) / 0.16)' : 'rgb(var(--cyan) / 0.06)',
                }}
                transition={t}
                stroke={on ? 'rgb(var(--amber))' : 'rgb(var(--cyan))'}
                strokeOpacity={on ? 0.9 : 0.32}
                strokeWidth="0.9"
              />
            </motion.g>
          );
        })}
      </svg>

      {/*
        The labels are HTML over the drawing, positioned by the same arithmetic
        the slabs use. Inside the SVG they would be whatever the viewBox scaled
        them to, which on a phone is 6px.
      */}
      <ul className="pointer-events-none absolute inset-0">
        {layers.map((layer, i) => {
          const r = layers.length - 1 - i;
          const on = i === activeIndex;
          const y = 10 + r * (H + GAP);

          return (
            <li
              key={layer.area}
              className="absolute"
              style={{
                top: `${((y + 18) / (total + 20)) * 100}%`,
                left: `${((LEFT + 9) / 240) * 100}%`,
              }}
            >
              <span
                className={`whitespace-nowrap font-mono text-micro uppercase transition-colors duration-500 ${
                  on ? 'text-amber' : 'text-dim'
                }`}
              >
                {layer.area}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
