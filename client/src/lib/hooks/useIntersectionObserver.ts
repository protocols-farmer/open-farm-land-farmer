import { useEffect, useState, useCallback } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  rootMargin = "200px",
  threshold = 0.1,
}: UseIntersectionObserverProps) => {
  // 🚜 CHANGE: Use state instead of useRef. This forces a re-render
  // and re-runs the useEffect when the DOM element actually attaches.
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled],
  );

  useEffect(() => {
    // 🚜 Now 'target' will safely trigger this effect once it's set
    if (!enabled || !target) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [enabled, rootMargin, threshold, observerCallback, target]); // 🚜 target added to dependencies

  // Return the state setter. React will call this function with the DOM node when it renders.
  return setTarget;
};
