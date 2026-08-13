import { useCallback, useEffect, useState } from 'react';

/**
 * Measures its subject and reports the height.
 *
 * `react-use-measure` is what the upstream `TransitionPanelCard` imports for
 * this. It is a dependency for one `ResizeObserver`, and the dossier stepper is
 * the only thing on the site that needs one.
 *
 * A CALLBACK REF, NOT A `useRef` OBJECT — and that is the whole reason this is
 * worth a comment. The first version held a `useRef` and observed it from an
 * effect with an empty dependency list, which is the shape every example uses
 * and is wrong the moment the measured element is mounted conditionally: the
 * subject here lives inside a dialog that does not exist when this hook runs,
 * so `ref.current` was `null`, the observer was never attached, and the height
 * stayed 0 for the life of the page. It failed silently, because 0 falls back
 * to `height: auto`, which looks fine until you notice the panel is cutting
 * rather than growing.
 *
 * A callback ref fires when the element actually arrives, and again when it
 * leaves.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [height, setHeight] = useState(0);

  const ref = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(node);
    return () => ro.disconnect();
  }, [node]);

  return [ref, height] as const;
}
