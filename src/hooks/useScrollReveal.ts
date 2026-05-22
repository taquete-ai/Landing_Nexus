"use client";

import { useRef, useEffect, useState, useMemo } from "react";

interface UseScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const observerOptions = useMemo(() => {
    const { threshold = 0.1, rootMargin = "-50px" } = options;
    return { threshold, rootMargin };
  }, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [observerOptions]);

  return { ref, isVisible };
}
