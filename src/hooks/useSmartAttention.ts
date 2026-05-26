import { useEffect, useRef, useCallback } from "react";
import type { SmartEvent } from "@/types/orb";

const IDLE_TIME_MS = 15000; // 15 segundos
const SCROLL_DEEP_THRESHOLD = 0.5; // 50% da viewport
const BACK_TO_TOP_THRESHOLD = 200; // px
const SECTION_DWELL_TIME_MS = 10000; // 10 segundos

interface UseSmartAttentionOptions {
  onEvent: (event: SmartEvent, sectionName?: string) => void;
  enabled?: boolean;
}

export function useSmartAttention({ onEvent, enabled = true }: UseSmartAttentionOptions) {
  const lastActivityTime = useRef<number>(Date.now());
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dwellTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);
  const currentVisibleSection = useRef<string | null>(null);
  const hasTriggeredScrollDeep = useRef<boolean>(false);
  const hasTriggeredBackToTop = useRef<boolean>(false);

  const resetIdleTimer = useCallback(() => {
    lastActivityTime.current = Date.now();
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

    if (enabled) {
      idleTimeoutRef.current = setTimeout(() => {
        onEvent("user_idle");
      }, IDLE_TIME_MS);
    }
  }, [onEvent, enabled]);

  const handleScroll = useCallback(() => {
    lastActivityTime.current = Date.now();
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = docHeight > 0 ? scrollY / docHeight : 0;

    // Back to Top
    if (scrollY < BACK_TO_TOP_THRESHOLD && hasTriggeredBackToTop.current === false) {
      hasTriggeredBackToTop.current = true;
      hasTriggeredScrollDeep.current = false;
      onEvent("back_to_top");
    } else if (scrollY >= BACK_TO_TOP_THRESHOLD) {
      hasTriggeredBackToTop.current = false;
    }

    // Scroll Deep
    if (scrollPercentage > SCROLL_DEEP_THRESHOLD && !hasTriggeredScrollDeep.current) {
      hasTriggeredScrollDeep.current = true;
      onEvent("scroll_deep");
    } else if (scrollPercentage <= SCROLL_DEEP_THRESHOLD) {
      hasTriggeredScrollDeep.current = false;
    }

    lastScrollY.current = scrollY;
  }, [onEvent]);

  const handleMouseMove = useCallback(() => {
    lastActivityTime.current = Date.now();
    resetIdleTimer();
  }, [resetIdleTimer]);

  const handleClick = useCallback(() => {
    lastActivityTime.current = Date.now();
    resetIdleTimer();
  }, [resetIdleTimer]);

  const handleProjectCardHover = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.closest("[data-project-card]")) {
      onEvent("project_hover");
    }
  }, [onEvent]);

  const detectSectionDwell = useCallback(() => {
    const sections = document.querySelectorAll("section");
    const viewportCenter = window.innerHeight / 2;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Seção está visível no viewport
      if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
        const sectionName = section.id || section.className || "unknown";

        if (currentVisibleSection.current !== sectionName) {
          currentVisibleSection.current = sectionName;
          if (dwellTimeoutRef.current) clearTimeout(dwellTimeoutRef.current);

          dwellTimeoutRef.current = setTimeout(() => {
            if (currentVisibleSection.current === sectionName) {
              onEvent("section_dwell", sectionName);
            }
          }, SECTION_DWELL_TIME_MS);
        }
      }
    });
  }, [onEvent]);

  useEffect(() => {
    if (!enabled) return;

    resetIdleTimer();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("mouseover", handleProjectCardHover, { passive: true });

    const scrollInterval = setInterval(detectSectionDwell, 500);

    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (dwellTimeoutRef.current) clearTimeout(dwellTimeoutRef.current);
      clearInterval(scrollInterval);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleProjectCardHover);
    };
  }, [enabled, resetIdleTimer, handleScroll, handleMouseMove, handleClick, handleProjectCardHover, detectSectionDwell]);
}
