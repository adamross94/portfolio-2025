import React, { useState, useCallback } from "react";

/**
 * Before/After image slider (pure JSX)
 * - Works with Tailwind CDN or your build.
 * - Keyboard + pointer accessible.
 * - No external deps.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 50,                // 0—100
  aspect = "aspect-video",     // e.g. "aspect-[21/9]" | "aspect-[4/3]"
  showCaption = true,
  className = "",
}) {
  const clamp = (v) => Math.max(0, Math.min(100, v));
  const [pct, setPct] = useState(clamp(initial));

  const onPointer = useCallback((e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ?? (e.touches?.[0]?.clientX ?? 0);
    const next = ((x - box.left) / box.width) * 100;
    setPct(clamp(next));
  }, []);

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPct((p) => clamp(p - step));
    if (e.key === "ArrowRight") setPct((p) => clamp(p + step));
  };

  return (
    <figure className={`relative w-full ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl shadow ${aspect} select-none`}
        onMouseDown={onPointer}
        onMouseMove={(e) => e.buttons === 1 && onPointer(e)}
        onTouchStart={onPointer}
        onTouchMove={onPointer}
      >
        {/* After image (base) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          aria-hidden="true"
          draggable={false}
        />

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border border-black/10 bg-white p-2 shadow"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 text-black/70">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Hidden native range for keyboard/AT control */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pct}
          onChange={(e) => setPct(clamp(Number(e.target.value)))}
          onKeyDown={onKeyDown}
          aria-label="Before and after slider"
          className="absolute inset-0 w-full appearance-none bg-transparent focus:outline-none"
          style={{ cursor: "ew-resize" }}
        />

        {/* Labels */}
        <div className="pointer-events-none absolute left-3 top-3 text-xs font-medium">
          <span className="rounded-md bg-black/60 px-2 py-1 text-white backdrop-blur">{beforeLabel}</span>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 text-xs font-medium">
          <span className="rounded-md bg-black/60 px-2 py-1 text-white backdrop-blur">{afterLabel}</span>
        </div>
      </div>

      {showCaption && (
        <figcaption className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>{beforeAlt}</span>
          <span>{afterAlt}</span>
        </figcaption>
      )}
    </figure>
  );
}
