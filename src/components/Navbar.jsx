// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import ARShieldLogo from "./ARShieldLogo";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  // scroll-aware header
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 120 && y - lastY > 4) setHidden(true);
      if (y < lastY) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBase =
    "fixed inset-x-0 top-0 z-50 transition-all duration-300 will-change-transform";

  const scrolledSurface =
    theme === "dark"
      ? "bg-[#050b09]/96 border-b border-emerald-500/10 text-white shadow-[0_12px_32px_rgba(0,0,0,0.55)] supports-[backdrop-filter]:backdrop-blur"
      : "bg-white/85 border-b border-emerald-700/10 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.08)] supports-[backdrop-filter]:backdrop-blur";

  const topSurface =
    theme === "dark"
      ? "bg-gradient-to-b from-[#050b09]/85 via-[#050b09]/40 to-transparent text-white border-b border-transparent"
      : "bg-gradient-to-b from-white/80 via-white/30 to-transparent text-slate-900";

  const navSurface = scrolled ? scrolledSurface : topSurface;

  return (
    <header
      className={`${navBase} ${navSurface} ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="container mx-auto flex h-20 md:h-28 items-center px-4 md:px-8">
        <Link
          to="/"
          aria-label="Home"
          className="group relative inline-flex items-center justify-center h-16 w-14 md:h-20 md:w-16 text-emerald-600 dark:text-emerald-400"
        >
          <span
            aria-hidden
            className="absolute -inset-1 rounded-xl bg-emerald-400/0 group-hover:bg-emerald-400/10 transition"
          />
          <ARShieldLogo
            className="relative h-full w-full drop-shadow-[0_0_10px_rgba(16,185,129,.25)]"
            tone={theme === "dark" ? "#34d399" : "#10b981"}
            textTone={theme === "dark" ? "#ecfdf5" : "#065f46"}
            initials="AR"
          />
          <span className="sr-only">Adam Ross</span>
        </Link>

        <div className="flex-1" />

        <button
          onClick={toggleTheme}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-600/20 bg-white text-emerald-700 shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:bg-emerald-50 transition dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}
