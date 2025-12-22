// components/DuoSvgSilhouettes.jsx
import { useEffect, useRef } from "react";

export default function DuoSvgSilhouettes({
  leftSvg,
  rightSvg,
  color = "#ffffff",
  // solid silhouette
  fillOpacity = 0.18,
  // stroke-only detail overlay
  detailOpacity = 0.32,
  detailStroke = 1.4,
  // remove tiny segments from the overlay (px in source coords)
  detailMinLen = 6,
  // layout
  centerGap = 420,
  targetHeight = 420,
  leftOffset = 0,
  rightOffset = 0,
}) {
  const svgRef = useRef(null);
  const vbW = 1200, vbH = 600;
  const NS = "http://www.w3.org/2000/svg";

  useEffect(() => {
    const root = svgRef.current;
    if (!root) return;
    const LROOT = root.querySelector("#left-root");
    const RROOT = root.querySelector("#right-root");
    LROOT.innerHTML = "";
    RROOT.innerHTML = "";

    const measureBBox = (el, w, h) => {
      try {
        const scratch = document.createElementNS(NS, "svg");
        scratch.setAttribute("viewBox", `0 0 ${w} ${h}`);
        scratch.style.cssText = "position:absolute;opacity:0;width:0;height:0;pointer-events:none;";
        document.body.appendChild(scratch);
        const tmp = el.cloneNode(true);
        scratch.appendChild(tmp);
        const bb = tmp.getBBox();
        scratch.remove();
        return bb;
      } catch {
        return null;
      }
    };

    const stripBigBackgrounds = (scope, w, h) => {
      const looksLikeBG = (bb) =>
        bb && bb.width >= 0.92 * w && bb.height >= 0.92 * h && bb.x <= 1 && bb.y <= 1;

      scope.querySelectorAll("rect,path").forEach((el) => {
        const bb = measureBBox(el, w, h);
        if (looksLikeBG(bb)) el.remove();
      });

      // Inkscape slice guides: very tall & skinny or wide & short helper rects
      scope.querySelectorAll("rect").forEach((el) => {
        const bb = measureBBox(el, w, h);
        if (!bb) return;
        const tallSkinny = bb.height >= 0.90 * h && bb.width <= 0.06 * w;
        const wideThin   = bb.width  >= 0.90 * w && bb.height <= 0.06 * h;
        if (tallSkinny || wideThin) el.remove();
      });
    };

    const parse = (raw) => {
      if (!raw) return null;

      const doc = new DOMParser().parseFromString(raw, "image/svg+xml");
      // remove editor constructs
      doc.querySelectorAll("style,defs,clipPath,mask,filter,pattern").forEach((n) => n.remove());

      const src = doc.documentElement;
      let w = 1024, h = 1024;
      const vb = src.getAttribute("viewBox");
      if (vb) {
        const n = vb.trim().split(/\s+/).map(Number);
        if (n.length === 4) [, , w, h] = n;
      } else {
        const W = Number(src.getAttribute("width"));
        const H = Number(src.getAttribute("height"));
        if (W > 0 && H > 0) { w = W; h = H; }
      }

      const inner = doc.querySelector("svg > g") ?? src;

      // 1) Solid silhouette
      const paint = inner.cloneNode(true);

      // 2) Stroke-only overlay (detail)
      const overlay = inner.cloneNode(true);

      const scrub = (group, opts) => {
        const all = [group, ...group.querySelectorAll("*")];
        all.forEach((el) => {
          // drop presentational attributes that cause artifacts/dots
          ["class","style","stroke","stroke-width","stroke-dasharray","stroke-dashoffset",
           "opacity","filter","mask","clip-path"].forEach(a => el.removeAttribute(a));

          if (opts.mode === "paint") {
            el.setAttribute("fill", color);
            el.setAttribute("fill-opacity", String(fillOpacity));
          } else {
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", color);
            el.setAttribute("stroke-opacity", String(detailOpacity));
            el.setAttribute("stroke-width", String(detailStroke));
            el.setAttribute("stroke-linecap", "round");
            el.setAttribute("stroke-linejoin", "round");
            el.setAttribute("vector-effect", "non-scaling-stroke");
          }
        });

        if (opts.mode === "overlay") {
          // remove tiny fragments from overlay to stop speckling / dotted look
          const scratch = document.createElementNS(NS, "svg");
          scratch.setAttribute("viewBox", `0 0 ${w} ${h}`);
          scratch.style.cssText = "position:absolute;opacity:0;width:0;height:0;pointer-events:none;";
          document.body.appendChild(scratch);

          [...group.querySelectorAll("path,line,polyline,polygon,rect,circle,ellipse")].forEach((el) => {
            let L = 0;
            try {
              if (el.tagName.toLowerCase() === "path") {
                const tmp = el.cloneNode(true);
                scratch.appendChild(tmp);
                L = tmp.getTotalLength();
                tmp.remove();
              } else {
                const bb = el.getBBox();
                L = 2 * (bb.width + bb.height);
              }
            } catch {}
            if (L < detailMinLen) el.remove();
          });

          scratch.remove();
        }
      };

      scrub(paint,   { mode: "paint"   });
      stripBigBackgrounds(paint, w, h);
      scrub(overlay, { mode: "overlay" });
      stripBigBackgrounds(overlay, w, h);

      const wrap = document.createElementNS(NS, "g");
      wrap.appendChild(paint);
      wrap.appendChild(overlay);
      return { node: wrap, w, h };
    };

    const place = (mount, parsed, side) => {
      if (!parsed) return;
      const { node, w, h } = parsed;
      const scale = targetHeight / h;
      const scaledW = w * scale;

      let x = side === "left"
        ? vbW / 2 - centerGap / 2 - scaledW
        : vbW / 2 + centerGap / 2;

      // fine-tune per-side position
      if (side === "left") x += leftOffset;
      else x += rightOffset;

      const y = vbH / 2 - (h * scale) / 2;

      const g = document.createElementNS(NS, "g");
      g.setAttribute("transform", `translate(${x.toFixed(2)},${y.toFixed(2)}) scale(${scale.toFixed(5)})`);
      g.appendChild(node);
      mount.appendChild(g);
    };

    const L = parse(leftSvg);
    const R = parse(rightSvg);
    place(LROOT, L, "left");
    place(RROOT, R, "right");
  }, [
    leftSvg, rightSvg, color,
    fillOpacity, detailOpacity, detailStroke, detailMinLen,
    centerGap, targetHeight, leftOffset, rightOffset
  ]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <g id="left-root" />
      <g id="right-root" />
    </svg>
  );
}
