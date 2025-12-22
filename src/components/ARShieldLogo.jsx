// src/components/ARShieldLogo.jsx
import React from "react";

/**
 * ARShieldLogo
 * - Scales cleanly in the navbar (non-scaling strokes for crisp edges)
 * - Optically centered “AR” with tighter tracking
 * - Soft inner gradient + ring so it reads at small sizes
 */
export default function ARShieldLogo({
  className = "",
  initials = "AR",
  tone = "#34d399", // emerald-500
  textTone = "#d1fae5", // emerald-100
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      role="img"
      aria-label={`${initials} shield`}
      className={className}
    >
      <defs>
        {/* soft vertical wash so it blends with your hero */}
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stopColor={tone} stopOpacity="0.22" />
          <stop offset="0.6" stopColor={tone} stopOpacity="0.10" />
          <stop offset="1"   stopColor={tone} stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Shield shape */}
      <path
        d="
          M60 6
          C 86 16, 100 18, 106 18
          L106 70
          C106 99, 86 115, 60 125
          C 34 115, 14 99, 14 70
          L14 18
          C 20 18, 34 16, 60 6 Z"
        fill="url(#shieldGrad)"
        stroke={tone}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
      />

      {/* Inner ring for definition at small sizes */}
      <path
        d="
          M60 16
          C 82 24, 94 26, 100 26
          L100 68
          C100 92, 84 106, 60 115
          C 36 106, 20 92, 20 68
          L20 26
          C 26 26, 38 24, 60 16 Z"
        fill="transparent"
        stroke={tone}
        strokeOpacity="0.5"
        strokeWidth="2.4"
        vectorEffect="non-scaling-stroke"
      />

      {/* Monogram */}
      <text
        x="60"
        y="67"                 /* optical center – slightly lower than 70 */
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="46"
        fontWeight="400"
        letterSpacing=".03em"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, sans-serif"
        fill={textTone}
      >
        {initials}
      </text>
    </svg>
  );
}
