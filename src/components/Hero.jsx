import React from "react";
import DuoSvgSilhouettes from "./DuoSvgSilhouettes";
import soldier from "../assets/Fighting_Man_Banner_of_Harold_Godwinson.svg?raw";
import wyvern from "../assets/Wessex_Wyvern.svg?raw";
import { FaLinkedin, FaGithub, FaFilePdf, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { isDark } = useTheme();

  const shellColors = isDark
    ? "bg-[#0b1513] text-white"
    : "bg-[#f6fbf8] text-slate-900";
  const silhouetteColor = isDark ? "text-white" : "text-emerald-700";
  const headingColor = isDark ? "text-white" : "text-[#052217]";
  const subtitleColor = isDark ? "text-emerald-200/85" : "text-emerald-800";
  const ctaPrimary = isDark
    ? "border-emerald-400/40 bg-black/30 text-emerald-50 hover:bg-emerald-500/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
    : "border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_18px_35px_rgba(16,185,129,0.25)]";
  const ctaSecondary = isDark
    ? "border-emerald-300/40 text-emerald-100 hover:bg-emerald-300/10"
    : "border-emerald-100 text-emerald-800 bg-white/70 hover:bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]";
  const socialColor = isDark ? "text-emerald-300" : "text-emerald-600";

  const topGlow = isDark
    ? "radial-gradient(60% 55% at 50% 45%, rgba(16,185,129,.12), rgba(16,185,129,.05) 45%, transparent 70%)"
    : "radial-gradient(70% 60% at 50% 35%, rgba(16,185,129,.08), rgba(255,255,255,0) 70%)";
  const overlayGlow = isDark
    ? "radial-gradient(120% 90% at 50% 110%, transparent, rgba(1,8,7,.9))"
    : "radial-gradient(120% 120% at 50% 120%, transparent, rgba(255,255,255,.9))";
  const lowerFade = isDark
    ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, #04140e 70%, #010705 100%)"
    : "linear-gradient(180deg, rgba(0,0,0,0) 0%, #e4f2eb 78%, #f3faf5 100%)";
  const lowerBlur = isDark
    ? "linear-gradient(180deg, rgba(1,7,5,0.8) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)"
    : "linear-gradient(180deg, rgba(243,250,245,0.8) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)";

  return (
    <section
      className={`relative min-h-[72vh] w-full overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16 -mb-px ${shellColors}`}
    >
      <div
        className={`absolute inset-0 z-10 pointer-events-none -translate-y-6 md:-translate-y-3 lg:-translate-y-1 ${silhouetteColor}`}
      >
        <DuoSvgSilhouettes
          leftSvg={wyvern}
          rightSvg={soldier}
          color="currentColor"
          fillOpacity={1.54}
          detailOpacity={5.82}
          detailStroke={1.4}
          detailMinLen={46}
          detailMinLenRight={26}
          centerGap={450}
          targetHeight={300}
          leftOffset={70}
          rightOffset={0}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: topGlow }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 mix-blend-multiply"
        style={{ background: overlayGlow, mixBlendMode: isDark ? "normal" : "multiply" }}
      />

      <div className="relative z-20 mx-auto flex h-full max-w-2xl flex-col items-center justify-end gap-6 px-6 pb-6 text-center translate-y-6 md:translate-y-10">
        <h1
          className={`text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_6px_28px_rgba(16,185,129,.2)] ${headingColor}`}
        >
          Adam Ross
        </h1>

        <p className={`text-lg md:text-2xl [text-wrap:balance] ${subtitleColor}`}>
          Data specialist who loves building with Python and TypeScript
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/resume.pdf"
            className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${ctaPrimary}`}
          >
            <FaFilePdf />
            Resume
          </a>
          <a
            href="mailto:adamross1994@gmail.com"
            className={`flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition ${ctaSecondary}`}
          >
            <FaEnvelope />
            Get in Touch
          </a>
        </div>

        <div className={`flex space-x-6 text-2xl ${socialColor}`}>
          <a
            href="https://www.linkedin.com/in/adam-ross-34b79478/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:scale-110 hover:text-emerald-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/adamross94"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:scale-110 hover:text-emerald-400 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-80 md:h-[360px]"
        style={{ backgroundImage: lowerFade }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 z-0 h-56 opacity-70 blur-[140px]"
        style={{ backgroundImage: lowerBlur }}
      />
    </section>
  );
};

export default Hero;
