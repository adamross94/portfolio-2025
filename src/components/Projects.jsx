import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { FaExternalLinkAlt, FaFilePdf, FaGithub } from "react-icons/fa";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { useTheme } from "../context/ThemeContext";

export default function Projects() {
  const { isDark } = useTheme();
  const isPdfLink = (url = "") => /\.pdf($|[?#])/i.test(url);
  const shellColors = isDark
    ? "bg-[#020805] text-white"
    : "bg-[#f3faf6] text-slate-900";
  const cardShell = isDark
    ? "border-white/5 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.55)] hover:border-emerald-400/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
    : "border-emerald-900/5 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_35px_80px_rgba(15,23,42,0.14)]";
  const tagClass = isDark
    ? "border-emerald-400/30 text-emerald-100"
    : "border-emerald-200 text-emerald-800";
  const metricClass = isDark
    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
    : "border-emerald-100 bg-emerald-50 text-emerald-800";
  const linkColor = isDark
    ? "text-emerald-200/80 hover:text-emerald-100"
    : "text-emerald-700 hover:text-emerald-900";
  const ctaColor = isDark
    ? "bg-emerald-500/90 text-black hover:bg-emerald-400"
    : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_8px_24px_rgba(16,185,129,0.35)]";

  return (
    <section
      id="projects"
      className={`relative isolate -mt-16 md:-mt-24 overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-28 ${shellColors}`}
    >
      {/* Ambient glows + divider to blend back into the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[520px]"
          style={{
            background: isDark
              ? "linear-gradient(180deg, #000000 0%, #020805 70%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(180deg, #f6fbf8 0%, #ffffff 60%, rgba(255,255,255,0) 100%)",
            opacity: 0.95,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: isDark
              ? "linear-gradient(0deg, #000 0%, #010403 60%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(0deg, #fff 0%, #dfeee6 70%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-[60%] h-[260px] blur-[220px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.12) 50%, rgba(16,185,129,0) 100%)",
            opacity: isDark ? 0.5 : 0.8,
          }}
        />
        <div
          className="absolute -left-12 bottom-10 h-64 w-64 rounded-full blur-[140px]"
          style={{
            background: isDark
              ? "rgba(52,211,153,0.2)"
              : "rgba(52,211,153,0.35)",
          }}
        />
        <div
          className="absolute right-0 top-[70%] h-72 w-72 rounded-full blur-[240px]"
          style={{
            background: isDark
              ? "rgba(16,185,129,0.18)"
              : "rgba(16,185,129,0.25)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <header
          className={`mx-auto mb-12 flex max-w-2xl flex-col items-center text-center ${
            isDark ? "text-emerald-50" : "text-emerald-900"
          }`}
        >
          <span className="mb-5 h-1 w-36 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-200 to-transparent opacity-70" />
          <p
            className={`text-sm uppercase tracking-[0.35em] ${
              isDark ? "text-emerald-300/70" : "text-emerald-700/70"
            }`}
          >
            Selected Work
          </p>
          <h2
            className={`mt-2 text-4xl font-extrabold md:text-5xl ${
              isDark ? "text-white" : "text-[#0b1f17]"
            }`}
          >
            Featured Projects
          </h2>
          <p
            className={`mt-4 text-base ${
              isDark ? "text-emerald-100/70" : "text-emerald-800/80"
            }`}
          >
            A few things I&apos;ve shipped recently.
          </p>
        </header>

        <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => {
            const siteIsPdf = isPdfLink(p.siteUrl);
            return (
              <li
                key={p.slug}
                className={`group flex flex-col overflow-hidden rounded-[26px] border transition duration-300 hover:-translate-y-1 ${cardShell}`}
              >
              <Link
                to={`/projects/${p.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80"
                aria-label={`${p.title} - read case study`}
              >
                {/* MEDIA */}
                <div
                  className="relative aspect-video overflow-hidden"
                  // Prevent opening the link when dragging/using the slider
                  onMouseDownCapture={(e) => e.stopPropagation()}
                  onTouchStartCapture={(e) => e.stopPropagation()}
                  onClickCapture={(e) => e.stopPropagation()}
                >
                  {p.slider ? (
                    <BeforeAfterSlider
                      beforeSrc={p.slider.previewBefore || p.slider.before}
                      afterSrc={p.slider.previewAfter || p.slider.after}
                      beforeAlt={p.slider.beforeAlt || "Before"}
                      afterAlt={p.slider.afterAlt || "After"}
                      beforeLabel={p.slider.beforeLabel || "Before"}
                      afterLabel={p.slider.afterLabel || "After"}
                      initial={p.slider.initial ?? 55}
                      aspect="aspect-video"
                    />
                  ) : p.mediaType === "video" ? (
                    <video
                      src={p.mediaUrl}
                      muted
                      playsInline
                      autoPlay
                      loop
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={p.mediaUrl}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? "from-black/60 via-black/20"
                        : "from-black/20 via-black/5"
                    } to-transparent opacity-0 transition duration-300 group-hover:opacity-100`}
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div
                    className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest ${
                      isDark ? "text-emerald-300/80" : "text-emerald-700/70"
                    }`}
                  >
                    {p.year && <span>{p.year}</span>}
                    {p.tags?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-2 py-0.5 text-[0.68rem] ${tagClass}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`mt-2 text-xl font-semibold ${
                      isDark ? "text-white" : "text-[#0b1f17]"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isDark ? "text-emerald-50/70" : "text-slate-600"
                    }`}
                  >
                    {p.shortDesc}
                  </p>

                  {p.metrics?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.metrics.map((m) => (
                        <li
                          key={m.label}
                          className={`rounded-full border px-3 py-1 text-xs ${metricClass}`}
                        >
                          <span className="font-semibold">{m.value}</span>{" "}
                          <span className={isDark ? "opacity-75" : "opacity-70"}>
                            {m.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 font-medium transition ${ctaColor}`}
                    >
                      Read case study
                    </span>
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 ${linkColor}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {p.siteUrl && (
                      <a
                        href={p.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 ${linkColor}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {siteIsPdf ? <FaFilePdf /> : <FaExternalLinkAlt />}
                        {siteIsPdf ? "PDF" : "Live"}
                      </a>
                    )}
                  </div>
                </div>
              </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
