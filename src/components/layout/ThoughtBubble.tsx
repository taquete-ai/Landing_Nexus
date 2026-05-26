"use client";

import { useEffect, useState, memo } from "react";
import { X } from "lucide-react";

interface ThoughtBubbleProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoCloseDuration?: number;
}

export const ThoughtBubble = memo(function ThoughtBubble({
  message,
  isVisible,
  onClose,
  autoCloseDuration = 6000, // 6 segundos padrão
}: ThoughtBubbleProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);

      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onClose) onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isVisible, autoCloseDuration, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed bottom-32 right-6 sm:bottom-40 sm:right-8
        z-40
        max-w-xs sm:max-w-sm
        transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="bg-surface-2 border border-border rounded-lg p-4 sm:p-5 shadow-lg">
        {/* Close button */}
        <button
          onClick={() => {
            setShouldRender(false);
            if (onClose) onClose();
          }}
          className="absolute top-2 right-2 p-1 text-text-secondary hover:text-text transition-colors"
          aria-label="Fechar pensamento"
          type="button"
        >
          <X size={16} />
        </button>

        {/* Message text */}
        <p className="text-sm sm:text-base text-text leading-relaxed pr-6">
          {message}
        </p>

        {/* Glow border accent */}
        <div className="absolute inset-0 rounded-lg pointer-events-none border border-accent/20" />
      </div>

      {/* Pointer to orb */}
      <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-surface-2" />
    </div>
  );
});
