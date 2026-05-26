"use client";

import { memo } from "react";

interface NexusOrbProps {
  isThinking?: boolean;
  isBubbleVisible?: boolean;
  showLabel?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NexusOrb = memo(function NexusOrb({
  isThinking = false,
  isBubbleVisible = false,
  showLabel = true,
  onClick,
  className = "",
}: NexusOrbProps) {
  // Determinar opacity do label baseado no estado
  const labelOpacity = isThinking ? "opacity-60" : isBubbleVisible ? "opacity-80" : "opacity-100";

  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2
        cursor-pointer
        transition-all duration-300
        focus:outline-none
        ${className}
      `}
      aria-label="NEX - Consultor IA Nexus"
      type="button"
    >
      {/* Orb Container */}
      <div
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
      >
        {/* Background glow layer */}
        <div className={`absolute inset-0 rounded-full ${
          isThinking ? "nexus-orb-thinking" : "nexus-orb-idle"
        }`} />

        {/* SVG Circle with accent color */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow circle (faint) */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
            className="text-accent"
          />

          {/* Main circle */}
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="currentColor"
            className="text-accent"
          />

          {/* Inner highlight (gloss effect) */}
          <circle
            cx="24"
            cy="24"
            r="8"
            fill="white"
            opacity="0.2"
          />
        </svg>

        {/* Breathing animation container */}
        <div className={`
          absolute inset-0 rounded-full
          ${isThinking ? "animate-none" : "nexus-breathing"}
        `} />

        {/* Hover indicator (subtle) */}
        <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 bg-accent transition-opacity duration-300" />
      </div>

      {/* Label "NEX AI" — M10.1 Identity */}
      {showLabel && (
        <span
          className={`
            text-sm font-semibold text-accent whitespace-nowrap
            transition-opacity duration-300
            ${labelOpacity}
          `}
        >
          NEX AI
        </span>
      )}
    </button>
  );
});
