//src/lib/hooks/useIntersectionObserver.tsa
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
  }, [enabled, rootMargin, threshold, observerCallback, target]);

  return setTarget;
};
