import React from "react";
import BeforeAfterSlider, { DemoBeforeAfterSlider } from "../components/BeforeAfterSlider"; // if you added it here
import cover from "../assets/ae-sitrep/cover.webp"; // optional: if you want to show the hero image from src

export default function AeSitrep() {
  React.useEffect(() => { document.title = "A&E Monthly SitRep — Case Study"; }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <img
          src={cover /* or "/images/ae-sitrep/cover.webp" if placed in /public */}
          alt="A&E Monthly SitRep - Provider vs Peer (Power BI)"
          className="w-full rounded-2xl shadow-sm object-cover"
        />
        <h1 className="mt-6 text-3xl font-bold">
          A&E Monthly SitRep — Provider vs Peer Performance (Power BI)
        </h1>
        <p className="mt-2 text-gray-600">
          Clean, NHS-styled Power BI report with month selector, benchmark scope, and focused pages.
        </p>
      </header>

      {/* Optional: the before/after slider demo */}
      <section className="mb-10">
        <DemoBeforeAfterSlider />
      </section>

      {/* Your portfolio write-up sections here */}
      <section className="prose max-w-none">
        <h2>Introduction</h2>
        <p>…</p>
        <h2>What I built</h2>
        <ul>
          <li>Overview, Long Waits, Admissions, Trends</li>
          <li>KPI cards: Attendances, 4h %, % Admitted, 12h waits, DTA&gt;4h</li>
          <li>Benchmark scope & peers filter, attendance type 1–3, month slicer</li>
        </ul>
        {/* etc. */}
      </section>
    </main>
  );
}
