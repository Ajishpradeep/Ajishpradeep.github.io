import { useEffect, useRef } from 'react';

/**
 * Animated backdrop: a drifting constellation of keypoints wired into a skeleton
 * graph, plus orthogonal circuit traces that route and re-route.
 * Drawn from scratch on canvas — the motif is pose estimation, which is the work.
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
    let w = 0;
    let h = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Trace = { x: number; y: number; segs: { dx: number; dy: number }[]; t: number; hue: string };

    let nodes: Node[] = [];
    let traces: Trace[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.round((w * h) / 26000);
      nodes = Array.from({ length: Math.min(Math.max(density, 22), 90) }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.09, 0.09),
        vy: rand(-0.09, 0.09),
        r: rand(0.8, 2.1),
      }));

      // Orthogonal traces that step across the field like PCB routing.
      traces = Array.from({ length: Math.round(w / 130) }, () => {
        const segs = Array.from({ length: Math.round(rand(3, 7)) }, (_, i) => ({
          dx: i % 2 === 0 ? rand(30, 120) : 0,
          dy: i % 2 === 1 ? rand(-70, 70) : 0,
        }));
        return {
          x: rand(-100, w),
          y: rand(0, h),
          segs,
          t: rand(0, 1),
          hue: Math.random() > 0.72 ? 'amber' : 'cyan',
        };
      });
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);

      // Circuit traces
      traces.forEach((tr) => {
        tr.t += 0.0013;
        if (tr.t > 1.6) tr.t = 0;
        const on = tr.t < 1;
        ctx!.strokeStyle =
          tr.hue === 'amber' ? 'rgba(245,176,35,0.22)' : 'rgba(122,255,232,0.16)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        let px = tr.x;
        let py = tr.y;
        ctx!.moveTo(px, py);
        let drawn = 0;
        const total = tr.segs.length;
        tr.segs.forEach((s, i) => {
          const frac = Math.max(0, Math.min(1, tr.t * total - i));
          px += s.dx * frac;
          py += s.dy * frac;
          if (frac > 0) {
            ctx!.lineTo(px, py);
            drawn = i;
          }
        });
        ctx!.stroke();

        // travelling head
        if (on && drawn >= 0) {
          ctx!.fillStyle = tr.hue === 'amber' ? 'rgba(255,190,60,0.9)' : 'rgba(0,255,231,0.75)';
          ctx!.fillRect(px - 1.5, py - 1.5, 3, 3);
        }
      });

      // Keypoint graph
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      });

      const link = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx!.strokeStyle = `rgba(122,255,232,${(1 - d / link) * 0.2})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        const pulse = 0.55 + 0.45 * Math.sin(time * 0.0011 + i);
        ctx!.fillStyle = `rgba(0,255,231,${0.28 * pulse})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    build();
    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
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
