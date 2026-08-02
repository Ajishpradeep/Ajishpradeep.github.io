import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Trace = { x: number; y: number; segs: { dx: number; dy: number }[]; t: number; hue: string };

/** Link distance, and therefore the spatial-hash cell size. */
const LINK = 140;
/** Edge alphas are quantised into this many tiers so each tier strokes once. */
const TIERS = 4;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Animated backdrop: a drifting field of keypoints wired into a graph, plus
 * orthogonal circuit traces that route and re-route.
 *
 * Three things keep it cheap. Neighbour search runs over a spatial hash rather
 * than every pair, edges are batched into a handful of alpha tiers rather than
 * one stroke each, and the loop is suspended whenever the canvas is off screen.
 * Two of these are mounted per page, so the naive version cost real battery.
 */
export default function HudCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;

    let nodes: Node[] = [];
    let traces: Trace[] = [];
    /** Spatial hash: one bucket of node indices per cell. Reused every frame. */
    let cells: number[][] = [];

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Narrow viewports are the ones most likely to be a phone on battery.
      const ceiling = w < 640 ? 30 : w < 1024 ? 55 : 90;
      const density = Math.round((w * h) / 26000);
      nodes = Array.from({ length: Math.min(Math.max(density, 22), ceiling) }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.09, 0.09),
        vy: rand(-0.09, 0.09),
        r: rand(0.8, 2.1),
      }));

      cols = Math.max(1, Math.ceil(w / LINK));
      rows = Math.max(1, Math.ceil(h / LINK));
      cells = Array.from({ length: cols * rows }, () => []);

      // Orthogonal traces that step across the field like PCB routing.
      traces = Array.from({ length: Math.round(w / 130) }, () => ({
        x: rand(-100, w),
        y: rand(0, h),
        segs: Array.from({ length: Math.round(rand(3, 7)) }, (_, i) => ({
          dx: i % 2 === 0 ? rand(30, 120) : 0,
          dy: i % 2 === 1 ? rand(-70, 70) : 0,
        })),
        t: rand(0, 1),
        hue: Math.random() > 0.72 ? 'amber' : 'cyan',
      }));
    }

    function drawTraces(advance: boolean) {
      for (const tr of traces) {
        if (advance) {
          tr.t += 0.0013;
          if (tr.t > 1.6) tr.t = 0;
        }
        ctx!.strokeStyle =
          tr.hue === 'amber' ? 'rgba(245,176,35,0.22)' : 'rgba(122,255,232,0.16)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        let px = tr.x;
        let py = tr.y;
        ctx!.moveTo(px, py);
        const total = tr.segs.length;
        tr.segs.forEach((s, i) => {
          const frac = Math.max(0, Math.min(1, tr.t * total - i));
          px += s.dx * frac;
          py += s.dy * frac;
          if (frac > 0) ctx!.lineTo(px, py);
        });
        ctx!.stroke();

        if (tr.t < 1) {
          ctx!.fillStyle = tr.hue === 'amber' ? 'rgba(255,190,60,0.9)' : 'rgba(0,255,231,0.75)';
          ctx!.fillRect(px - 1.5, py - 1.5, 3, 3);
        }
      }
    }

    function drawEdges() {
      for (const bucket of cells) bucket.length = 0;

      for (let i = 0; i < nodes.length; i += 1) {
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(nodes[i].x / LINK)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(nodes[i].y / LINK)));
        cells[cy * cols + cx].push(i);
      }

      // One path per alpha tier, so the whole graph costs TIERS strokes.
      const tiers: number[][] = Array.from({ length: TIERS }, () => []);

      for (let cy = 0; cy < rows; cy += 1) {
        for (let cx = 0; cx < cols; cx += 1) {
          const bucket = cells[cy * cols + cx];
          if (!bucket.length) continue;

          for (let ny = cy; ny <= cy + 1; ny += 1) {
            for (let nx = cx - 1; nx <= cx + 1; nx += 1) {
              if (ny === cy && nx < cx) continue;
              if (nx < 0 || nx >= cols || ny >= rows) continue;
              const other = cells[ny * cols + nx];
              const same = nx === cx && ny === cy;

              for (let a = 0; a < bucket.length; a += 1) {
                for (let b = same ? a + 1 : 0; b < other.length; b += 1) {
                  const p = nodes[bucket[a]];
                  const q = nodes[other[b]];
                  const dx = p.x - q.x;
                  const dy = p.y - q.y;
                  const d2 = dx * dx + dy * dy;
                  if (d2 >= LINK * LINK) continue;
                  const closeness = 1 - Math.sqrt(d2) / LINK;
                  const tier = Math.min(TIERS - 1, Math.floor(closeness * TIERS));
                  tiers[tier].push(p.x, p.y, q.x, q.y);
                }
              }
            }
          }
        }
      }

      ctx!.lineWidth = 1;
      for (let t = 0; t < TIERS; t += 1) {
        const flat = tiers[t];
        if (!flat.length) continue;
        ctx!.strokeStyle = `rgba(122,255,232,${(((t + 0.5) / TIERS) * 0.2).toFixed(3)})`;
        ctx!.beginPath();
        for (let k = 0; k < flat.length; k += 4) {
          ctx!.moveTo(flat[k], flat[k + 1]);
          ctx!.lineTo(flat[k + 2], flat[k + 3]);
        }
        ctx!.stroke();
      }
    }

    function render(time: number, advance: boolean) {
      ctx!.clearRect(0, 0, w, h);
      drawTraces(advance);

      if (advance) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      drawEdges();

      nodes.forEach((n, i) => {
        const pulse = 0.55 + 0.45 * Math.sin(time * 0.0011 + i);
        ctx!.fillStyle = `rgba(0,255,231,${0.28 * pulse})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      });
    }

    const loop = (time: number) => {
      render(time, true);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    render(0, false);

    // Off-screen canvases stop entirely rather than burning frames unseen.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: '160px',
    });
    io.observe(canvas);

    const onResize = () => {
      build();
      render(performance.now(), false);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
