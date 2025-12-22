import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { projects } from "../data/projects";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import {
  LuSparkles,
  LuWorkflow,
  LuLayers,
  LuLayoutPanelLeft,
  LuFileText,
  LuImages,
} from "react-icons/lu";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { useTheme } from "../context/ThemeContext";

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const sectionIcon = (heading = "") => {
  const key = heading.toLowerCase();
  if (key.includes("introdu")) return LuSparkles;
  if (key.includes("challenge")) return LuWorkflow;
  if (key.includes("architect")) return LuLayers;
  if (key.includes("design") || key.includes("experience")) return LuLayoutPanelLeft;
  if (key.includes("data") || key.includes("sql")) return LuFileText;
  return LuImages;
};

const splitParagraphs = (content) => {
  if (Array.isArray(content)) {
    return content.map((c) => `${c}`.trim()).filter(Boolean);
  }
  if (!content) return [];
  return `${content}`
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
};

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? projects[idx] : null;

  if (!project) {
    return (
      <>
        <div className="pt-20 min-h-screen flex items-center justify-center bg-white text-slate-900 dark:bg-black dark:text-white">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              We couldn’t find “{slug}”.
            </p>
            <Link to="/" className="underline text-emerald-500">
              ← Back to home
            </Link>
          </div>
        </div>
      </>
    );
  }

  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  const sections = useMemo(
    () =>
      (project.sections || []).map((s) => ({
        ...s,
        id: s.id || slugify(s.heading || ""),
      })),
    [project.sections],
  );

  const [activeId, setActiveId] = useState(sections?.[0]?.id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <Navbar />

      <div
        className={`pt-28 min-h-screen ${
          isDark ? "bg-[#040708] text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(600px 300px at 50% -10%, rgba(16,185,129,0.18), transparent 60%)",
            }}
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 relative">
            <div
              className={`overflow-hidden border shadow-xl rounded-3xl ${
                isDark
                  ? "border-white/10 bg-zinc-900/60"
                  : "border-emerald-900/10 bg-emerald-50/60"
              }`}
            >
              <div className="aspect-video relative">
                {project.hero?.type === "slider" ? (
                    <BeforeAfterSlider
                      beforeSrc={project.hero.beforeSrc}
                      afterSrc={project.hero.afterSrc}
                      beforeAlt={project.hero.beforeAlt || "Before"}
                      afterAlt={project.hero.afterAlt || "After"}
                      beforeLabel={project.hero.beforeLabel || "Before"}
                      afterLabel={project.hero.afterLabel || "After"}
                      initial={project.hero.initial ?? 50}
                      aspect="aspect-video"
                      showCaption={false}
                      className="rounded-t-3xl lg:rounded-t-3xl"
                    />
                ) : project.mediaType === "video" ? (
                  <video
                    src={project.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {project.hero?.type === "slider" && (
                <div
                  className={`flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? "text-emerald-200" : "text-emerald-800"
                  }`}
                >
                  <span>{project.hero.beforeAlt}</span>
                  <span>{project.hero.afterAlt}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className={`text-sm flex flex-wrap items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <span>/</span>
                <Link to="/projects" className="hover:underline">
                  Projects
                </Link>
                <span>/</span>
                <span className={isDark ? "text-gray-100" : "text-gray-900"}>
                  {project.title}
                </span>
              </div>

              <h1 className={`text-4xl md:text-5xl font-extrabold ${isDark ? "text-white" : ""}`}>
                {project.title}
              </h1>

              {project.shortDesc && (
                <p className={`text-lg md:text-xl ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  {project.shortDesc}
                </p>
              )}

              {(project.tech?.length ||
                project.role ||
                project.year ||
                project.duration) && (
                <div className="flex flex-wrap gap-2">
                  {project.role && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 text-xs">
                      {project.role}
                    </span>
                  )}
                  {project.year && (
                    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs">
                      {project.year}
                    </span>
                  )}
                  {project.duration && (
                    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs">
                      {project.duration}
                    </span>
                  )}
                  {project.tech?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow transition ${
                      isDark
                        ? "bg-emerald-500 text-black hover:bg-emerald-400"
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    }`}
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
                {project.siteUrl && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition ${
                      isDark
                        ? "border-white/20 hover:bg-white/10"
                        : "border-emerald-900/10 hover:bg-emerald-100/50"
                    }`}
                  >
                    <FaGlobe /> Visit Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body & TOC */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-10 px-6 py-8 mt-3">
          <article className="space-y-10">
            {(project.outcomes?.length || project.metrics?.length) && (
              <div
                className={`rounded-[28px] border p-6 ${
                  isDark
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-emerald-100 bg-emerald-50"
                }`}
              >
                {project.outcomes?.length && (
                  <>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <LuSparkles className="text-emerald-500" />
                      Key outcomes
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-base text-gray-800 dark:text-gray-100">
                      {project.outcomes.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </>
                )}
                {project.metrics?.length && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl border p-4 ${
                          isDark
                            ? "border-white/10 bg-white/5"
                            : "border-emerald-100 bg-white"
                        }`}
                      >
                        <div className="text-2xl font-extrabold text-emerald-500">
                          {m.value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {sections.map((sec) => {
              const Icon = sectionIcon(sec.heading);
              const paragraphs = splitParagraphs(sec.content);
              const hasMedia = Boolean(sec.image || sec.gallery?.length);
              const align = sec.imageAlign === "left" ? "lg:flex-row-reverse" : "";

              return (
                <section
                  key={sec.id}
                  className={`rounded-[28px] border p-6 md:p-10 shadow-sm ${
                    isDark
                      ? "border-white/10 bg-white/5"
                      : "border-emerald-100 bg-white"
                  }`}
                >
                  <div
                    className={`flex flex-col gap-8 ${
                      hasMedia ? `lg:flex-row ${align}` : ""
                    }`}
                  >
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-300">
                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                        <h2
                          id={sec.id}
                          className="text-2xl md:text-3xl font-bold scroll-mt-24"
                        >
                          {sec.heading}
                        </h2>
                      </div>
                      <div className={`space-y-4 text-lg leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                        {paragraphs.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    </div>

                    {hasMedia && (
                      <div className="w-full lg:w-[360px] space-y-4">
                        {sec.image && (
                          <figure className="rounded-2xl border border-emerald-100/50 dark:border-white/10 overflow-hidden shadow">
                            <img
                              src={sec.image}
                              alt={sec.caption || sec.heading}
                              className="w-full object-cover"
                            />
                            {sec.caption && (
                              <figcaption className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {sec.caption}
                              </figcaption>
                            )}
                          </figure>
                        )}
                        {sec.gallery?.length && (
                          <div className="grid gap-3">
                            {sec.gallery.map((img) => (
                              <figure
                                key={img.src}
                                className="rounded-xl border border-emerald-100/40 dark:border-white/10 overflow-hidden"
                              >
                                <img
                                  src={img.src}
                                  alt={img.caption || sec.heading}
                                  className="w-full object-cover"
                                />
                                {img.caption && (
                                  <figcaption className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                                    {img.caption}
                                  </figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              {prev ? (
                <button
                  onClick={() => navigate(`/projects/${prev.slug}`)}
                  className="text-emerald-500 hover:underline"
                >
                  ← {prev.title}
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button
                  onClick={() => navigate(`/projects/${next.slug}`)}
                  className="text-emerald-500 hover:underline"
                >
                  {next.title} →
                </button>
              ) : (
                <span />
              )}
            </div>

            <div className="text-center">
              <Link to="/" className="underline text-emerald-500">
                ← Back to home
              </Link>
            </div>
          </article>

          {sections.length > 1 && (
            <aside className="xl:sticky xl:top-24 space-y-3 h-fit">
              <div className="xl:hidden">
                <details>
                  <summary className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-md border border-white/15">
                    <FiChevronDown /> Jump to section
                  </summary>
                  <ul className="mt-2 space-y-2 pl-1">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block px-3 py-1 rounded hover:bg-white/10"
                        >
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              <div className="hidden xl:block rounded-xl border border-white/10 p-4">
                <div className="text-sm font-semibold mb-2">On this page</div>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block rounded px-2 py-1 text-sm transition ${
                        activeId === s.id
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
