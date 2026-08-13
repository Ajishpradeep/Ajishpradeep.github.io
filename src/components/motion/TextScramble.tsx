import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type TextScrambleProps = {
  children: string;
  className?: string;
  /** Total run, seconds. */
  duration?: number;
  /** Seconds between frames. Also the resolution of the effect. */
  speed?: number;
  characterSet?: string;
  /** Re-scramble whenever this changes. */
  trigger?: unknown;
};

/**
 * The site's own alphabet, and that is deliberate.
 *
 * Motion Primitives ships `ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+`, which
 * resolves toward the target through a wall of punctuation — a decoding
 * effect. The strings this is used on are technical domain labels set in
 * JetBrains Mono, and scrambling them through `#$%^&*` reads as a glitch:
 * something broke and is repairing itself. Wrong claim on a page whose one
 * rule is that nothing may imply a state the system is not in.
 *
 * Letters, digits and the middot the labels already contain. The intermediate
 * frames then look like the readout retuning through neighbouring values,
 * which is what a settling instrument does.
 */
const DEFAULT_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·';

/**
 * A mono label that resolves into place, character by character.
 *
 * Used on exactly one thing: the domain line of the work console's readout,
 * which changes every time the reader picks a different case. It is a
 * measurement label on an instrument that has just been retuned, and settling
 * is what that looks like.
 *
 * Two properties this needs and the upstream version does not have:
 *
 * - **The real string is what gets announced.** The scrambling node is
 *   `aria-hidden` and the target sits in an `sr-only` span beside it. Without
 *   that, a screen reader on a live region announces 20 frames of
 *   "K7·QX MZ8·PT" and the label never arrives.
 * - **The interval is cleared on unmount and on re-trigger.** The demo leaks
 *   one interval per run; this component is driven by a control the visitor
 *   can press five times a second.
 */
export default function TextScramble({
  children,
  className,
  duration = 0.7,
  speed = 0.035,
  characterSet = DEFAULT_SET,
  trigger,
}: TextScrambleProps) {
  const still = useReducedMotion();
  const [shown, setShown] = useState(children);
  const timer = useRef<number>();

  useEffect(() => {
    window.clearInterval(timer.current);

    if (still) {
      setShown(children);
      return;
    }

    const text = children;
    const steps = Math.max(1, Math.round(duration / speed));
    let step = 0;

    timer.current = window.setInterval(() => {
      step += 1;
      const settled = (step / steps) * text.length;

      let out = '';
      for (let i = 0; i < text.length; i += 1) {
        // Spaces hold their place. Scrambling them makes the label's word
        // boundaries jitter, and the length is the one thing that must not
        // move — this sits in a fixed row above a heading.
        if (text[i] === ' ') out += ' ';
        else if (i < settled) out += text[i];
        else out += characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      setShown(out);

      if (step >= steps) {
        window.clearInterval(timer.current);
        setShown(text);
      }
    }, speed * 1000);

    return () => window.clearInterval(timer.current);
  }, [children, duration, speed, characterSet, still, trigger]);

  return (
    <span className={className}>
      {/*
        `select-none`: `aria-hidden` only removes this from the accessibility
        tree, not from a Select All / Copy — without it, copying this label
        grabs whatever frame `shown` was on (mid-scramble, literal noise
        characters) immediately followed by the clean `sr-only` copy. Same
        fix as `TextRoll`, same reason.
      */}
      <span aria-hidden className="select-none">{shown}</span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
