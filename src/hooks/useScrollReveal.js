import { useEffect, useRef } from "react";

/**
 * Hook that attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, 'is-visible' is added to its classList.
 * Combines with `.reveal-on-scroll` CSS class for entrance animations.
 *
 * @param {number} threshold - 0–1, default 0.12
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
