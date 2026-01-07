// src/data/projects.js

// AE SitRep
import aeBefore from '../assets/ae-sitrep/before-spreadsheet.png';
import aeAfter  from '../assets/ae-sitrep/after-powerbi.png';

// SDEC
import sdecBefore from '../assets/sdec-waiting-screen/before-ssrs.png';
import sdecAfter  from '../assets/sdec-waiting-screen/after-powerbi.png';

//Cancer 62-Day PTL
import ptlBefore from '../assets/cancer-ptl/cancerptl-excel.png';
import ptlAfter  from '../assets/cancer-ptl/cancerptl-powerbi.png';

//DSIT Email
import dsitBefore from '../assets/dsit-email/dsit-outlook-email.png';
import dsitAfter  from '../assets/dsit-email/dsit-mjml-email.png';

//HCAS
import hcas from '../assets/mft-hcas/mfthcas.png';

//GIRFT
import girft from '../assets/girft-metrics/girft-logo.png';

//NHS Dev Tools
import nhsdevtools from '../assets/nhs-dev-tools/nhs-dev-tools.png';

export const projects = [
  {
    slug: 'cancer-62day-ptl-weekly-snapshot',
    title: 'Cancer 62-Day PTL — Weekly Snapshot (Power BI)',
    shortDesc:
      'A Power BI rebuild of the NHS Cancer 62-day PTL weekly review (Sections 1–5), designed for fast operational review: synced Pathway/Tumour/Threshold slicers, “focusable” KPIs that don’t break stacked visuals, export-ready tables, a true one-click Reset, and a stable “Week ending” banner.',
    mediaType: 'image',
    mediaUrl: '/images/ptl62/ptl62-cover.png',
    siteUrl: '/media/cancer-62day-ptl-weekly-snapshot.pdf',
  
    
  
    hero: {
      type: 'slider',
      beforeSrc: ptlBefore,
      afterSrc: ptlAfter,
      beforeAlt: 'Legacy PTL spreadsheet (excerpt)',
      afterAlt: 'Power BI dashboard (Sections 1–5)',
      beforeLabel: 'Spreadsheet',
      afterLabel: 'Dashboard',
      initial: 54,
    },
  
    slider: {
      before: ptlBefore,
      after: ptlAfter,
      beforeAlt: 'Legacy PTL extract (excerpt)',
      afterAlt: 'Power BI dashboard (Sections 1–5)',
      beforeLabel: 'Baseline',
      afterLabel: 'Dashboard',
      initial: 56,
      aspect: 'aspect-[21/9]',
    },
  
    sections: [
      {
        heading: 'The problem this solves',
        content:
          'The weekly Cancer 62-day PTL review existed as a large Excel workbook with multiple tabs (S1–S5). It worked, but it was slow to review, easy to misinterpret at speed, and vulnerable to inconsistencies (manual edits, version-control via email attachments, and lots of scrolling). I first captured the requirements as a Collection Review, then built an HTML proof-of-concept to validate the interaction model (filters, layout, KPI language). The final deliverable is the Power BI version—built for ongoing weekly use and confident decision-making.',
      },
  
      {
        heading: 'What I built',
        content: `A multi-page Power BI report that mirrors the weekly PTL structure:
  
  - S1: No-DTT waits + passings
  - S2: With-DTT waits + passings
  - S3: treated in last 7 days, bracketed
  - S4: referrals/upgrades in last 7 days
  - S5: first seen in last 7 days
  
  Each section uses the same global slicers, consistent KPI language, and export-ready tables, so users do not have to re-learn each page.`,
      },
  
      {
        heading: 'The hardest technical constraint (and how I solved it)',
        content:
          'Users wanted a “Waiting Threshold (focus)” slicer to highlight a single bracket for KPIs (e.g., >104) without blanking stacked charts, which must continue showing full distributions for context. I solved this with a base-measures + display-measures pattern: base measures compute the true bracket counts and passings (e.g., S1_0_28, S1_29_62, S1_Pass62). Display measures wrap base measures using SWITCH/IF so KPI cards can focus a chosen bracket while stacked visuals still render all segments. This keeps semantics stable and enables the UX stakeholders asked for.',
      },
  
      {
        heading: 'Data model and architecture',
        content: `Sources:
  - weekly section views for S1–S5
  - Date_Check for the Week Ending banner
  
  Model:
  - facts: q_S1–q_S5, q_DateCheck
  - dimensions: Tumour, Pathway, WaitingBracket_S1S2 (0–28 / 29–62 / 63–104 / >104 with sort + passing helpers)
  - treated-bracket table for S3 (<=62 / 63–104 / >104)
  
  Relationships:
  - one-to-many from dimensions to facts
  - single-direction filters to minimise ambiguity
  
  Outcome:
  - consistent slicer behaviour across pages
  - tables retain Pathway × Tumour granularity without fragile workarounds.`,
      },
  
      {
        heading: 'Interactions and UX',
        content: `- Global slicers: Pathway chips (multi-select), Tumour dropdown, Threshold focus.
  - KPI cards designed for fast scanning and consistent language across sections.
  - Reset uses per-page bookmarks + synced slicers for a one-click default state.
  - Week Ending label uses Date_Check with MAX + slicer-ignoring logic for reliable screenshots and exports.`,
      },
  
      {
        heading: 'Section design (S1–S5)',
        content: `- S1: stacked distribution by Tumour for 0–28 / 29–62 / 63–104 / >104 + grid with Passing 28/62/104.
  - S2: same pattern for pathways with Decision to Treat.
  - S3: treated in last 7 days (<=62 / 63–104 / >104) as a donut or bar + bracket table.
  - S4: referrals/upgrades in last 7 days by tumour + supporting list.
  - S5: first seen (2WW) in last 7 days by tumour + supporting list.
  
  All tables are exportable and slicer-aware.`,
      },
  
      {
        heading: 'Why these choices',
        content:
          'Separating base and display measures protects measure meaning while enabling the threshold focus experience. A star-style model with shared dimensions keeps slicers consistent and avoids relationship ambiguity. Bookmarks + synced slicers deliver a trustworthy reset. Mirroring the HTML PoC reduces adoption friction because users get the same interaction model and visual language they approved early.',
      },
  
      {
        heading: 'Data governance and auditability',
        content: `- Definitions are made explicit in measures (base vs display) so each KPI remains stable and traceable.
  - Numerator/denominator-style tables back up headline KPIs for quick reconciliation.
  - Week Ending is derived from a controlled Date_Check source to keep screenshots/exports consistent.
  - A predictable model (shared dimensions + single-direction filtering) reduces ambiguity and “why did that change?” behaviour.`,
      },
  
      {
        heading: 'Improvements delivered',
        content: `- Faster weekly review with focused KPIs that keep distribution context.
  - Consistent KPI language across Sections 1–5.
  - NHS-styled layout with a stable Week Ending label.
  - CSV-ready export tables.
  - Globally synced slicers with a genuine one-click Reset.`,
      },
  
      {
        heading: 'What I’d ship next',
        content: `1) Validation/reconciliation page (bracket sums vs totals, S1–S4 consistency checks).
  2) Config-driven table for KPI labels and thresholds.
  3) Trend history (8–12 week lines, week-on-week deltas, variance flags).
  4) Drill-through to patient-level review where permitted.
  5) Role-based views/RLS or workspace separation for operational vs leadership audiences.`,
      },
  
      {
        heading: 'References (selected)',
        content: `- NHS Digital: Cancer 62 Day Patient Target List (CANPTL62).
  - NHS England: National Cancer Waiting Times Monitoring Dataset Guidance.
  - Microsoft: DAX SWITCH() patterns for display measures.
  - Microsoft: Power BI slicers (including synced slicers) and report navigation patterns.`,
      },
    ],
  },  
  {
    slug: 'girft-metrics',
    title: 'GIRFT Specialty Metrics — Metadata-driven SQL + Power BI/SSRS',
    shortDesc:
      'A metadata-driven SQL framework that compiles GIRFT metric definitions (code groups, recipes, flags, windows) into reproducible queries against DB_Medway—published in Power BI/SSRS for benchmarking, validation, and patient-level drill-down.',
    mediaType: 'image',
    mediaUrl: girft, // keep your original single hero image
    mediaCaption:
      'Metadata-driven GIRFT pipeline: definitions → SQL → Power BI/SSRS outputs with traceable drill-down.',
    repoUrl: 'https://github.com/adamross94/GIRFT',
  
    // Primary button -> your repo (as requested)
    primaryCta: {
      href: 'https://github.com/adamross94/GIRFT',
      label: 'View on GitHub',
      icon: 'github', // if unsupported, switch to 'link'
    },
  
    // Optional secondary button
    secondaryCta: {
      href: 'https://gettingitrightfirsttime.co.uk/',
      label: 'GIRFT Programme',
      icon: 'link',
    },
  
    sections: [
      {
        heading: 'The problem this solves',
        content:
          'GIRFT provides specialty benchmarking through defined metrics, but the hardest part locally is turning those definitions into consistent, reviewable SQL across a trust’s own data model. Without a standard approach, analysts end up rewriting logic per metric/specialty, results drift between reports, and clinical review slows because it’s unclear how the headline numbers were produced.',
      },
  
      {
        heading: 'What I built',
        content: `A reusable “metadata → SQL → visuals” pipeline:
  
  - Reads GIRFT metric metadata (metrics, recipes, code groups, standard flags)
  - Materialises code groups into executable sets (ICD-10 / OPCS-4 / clinic codes, etc.)
  - Builds a canonical spell-level working table (plus OP equivalents where needed)
  - Applies recipe logic to derive variables/flags deterministically
  - Calculates numerators/denominators with the correct windows and inclusion rules
  - Publishes outputs to Power BI (exploration) and SSRS (operational drill-through)`,
      },
  
      {
        heading: 'The hardest technical constraint (and how I solved it)',
        content:
          'The hardest constraint was balancing **maintainability** (hundreds of specialty metrics) with **auditability** (clinicians need to see exactly why a patient is counted). I solved this by keeping a stable, canonical spell table and treating recipes/code groups as the “single source of truth”. Every metric can be traced back through: metric → variable → recipe clause → code group hit(s), so validation is fast and disagreements are diagnosable rather than subjective.',
      },
  
      {
        heading: 'Data model and architecture',
        content: `**Inputs**
  - GIRFT metadata spreadsheets (Metrics / Recipes / CodeGroups / Flags)
  - DB_Medway spell/episode/procedure/diagnosis sources (plus supporting lookup tables)
  
  **Working sets**
  - #Spells_With_Variables (spell-level canonical table)
  - #OP_Spells (outpatient pathway variant where required)
  - #CodeGroup_* temp tables (materialised metadata)
  
  **Outputs**
  - Metric-level aggregates (trust-level benchmarking, trends)
  - Patient-level drill-through datasets (case review / reconciliation)
  - Power BI pages for exploration; SSRS for operational delivery`,
        image: '/images/girft-arch.png',
        caption: 'End-to-end: Metadata → CodeGroups → Variables/Flags → Metrics → Power BI/SSRS.',
      },
  
      {
        heading: 'How it runs (end-to-end flow)',
        content: `The framework mirrors how GIRFT metrics are described, but in a form the database can execute:
  
  1) **Code groups**: each named group becomes a temp table (e.g. #CodeGroup_*).
  2) **Base cohort**: build a single “one row per spell” working set (e.g. #Spells_With_Variables).
  3) **Recipes → variables**: recipe rows compile into update logic (AND/OR rules, prefix matches, ranges, thresholds).
  4) **Standard flags**: index events, returns/readmissions, mortality windows, exclusions—computed once, reused everywhere.
  5) **Metric evaluation**: numerator/denominator queries run against derived variables with parameterised periods (e.g. quarter-end / trailing-12).
  
  Specialty and reporting window are parameterised so re-runs don’t require rewriting logic.`,
        image: '/images/girft-recipes.png',
        caption: 'Recipes and CodeGroups compiled into deterministic spell variables.',
      },
  
      {
        heading: 'Interactions and UX (Power BI & SSRS)',
        content: `Power BI surfaces trust-level results, trends, and peer comparisons with filters for specialty, period, and operational groupings. SSRS provides operational, printable outputs and drill-through to patient-level lines for clinical case review. Both are powered by the same derived variables/flags to keep definitions consistent and reduce “two versions of the truth”.`,
      },
  
      {
        heading: 'Why these choices',
        content:
          'A canonical spell table keeps variable derivation stable, reusable, and performance-friendly. Treating metadata as the source of truth makes changes safer: updates happen in code groups/recipes rather than bespoke query edits. Splitting “derive once, reuse everywhere” (standard flags) from “evaluate per metric” reduces duplication and makes reconciliation quicker.',
      },
  
      {
        heading: 'Data governance and auditability',
        content: `- Metrics are traceable end-to-end (headline → patient list → rule hit), supporting clinical review and reconciliation.
  - Assumptions are made explicit (spell construction, anchor dates, windows, exclusions) so reruns are reviewable.
  - Metadata + SQL can be change-controlled together to keep history and reproducibility intact.
  - Outputs separate aggregate benchmarking from patient-level drill-through to support least-privilege access models.`,
      },
  
      {
        heading: 'Improvements delivered',
        content: `- Faster onboarding of new specialties (reuse patterns instead of rewriting logic).
  - Clear audit trail from headline KPI to patient list for clinical review.
  - More consistent benchmarking and fewer “why is this number different?” loops.
  - A single, repeatable route from GIRFT definitions to BI outputs.`,
      },
  
      {
        heading: 'What I’d ship next',
        content: `1) A “new specialty wizard” that scaffolds code groups/recipes/flags from a metadata file.
  2) A validation pack page (rule coverage, missing-code checks, numerator/denominator sanity tests).
  3) Automated refresh + parameterised quarter-end runs (SQL Agent).
  4) A compact glossary/data dictionary that maps GIRFT language to local fields consistently.`,
      },
  
      {
        heading: 'References (selected)',
        content: `- GIRFT (Getting It Right First Time): https://gettingitrightfirsttime.co.uk/
  - Model Health System / Model Hospital context: https://model.nhs.uk/ (access-dependent)
  - Microsoft Learn (Power BI / SSRS): https://learn.microsoft.com/power-bi/ and https://learn.microsoft.com/sql/reporting-services/`,
      },
    ],
  },  
  {
    slug: 'nhs-dev-tools',
    title: 'NHS Dev Tools — Role-based Quickstarts for NHS Analytics & Apps',
    shortDesc:
      'A Docusaurus documentation hub of NHS-ready quickstarts and patterns. Role-based journeys help BI analysts, data scientists, developers and clinicians ship small, safe dashboards, APIs and pipelines with practical IG guardrails and reproducible defaults.',
    mediaType: 'image',
    mediaUrl: nhsdevtools,
    mediaCaption:
      'Role-based journeys + “Learn” modules: install fast, build safely, share repeatably.',
    repoUrl: 'https://github.com/adamross94/nhs-dev-tools',
    siteUrl: 'https://nhsdev.tools/',
  
    // Primary -> live docs (portfolio-friendly)
    primaryCta: {
      href: 'https://nhsdev.tools/',
      label: 'Visit the docs',
      icon: 'link',
    },
  
    // Secondary -> repo
    secondaryCta: {
      href: 'https://github.com/adamross94/nhs-dev-tools',
      label: 'View on GitHub',
      icon: 'github', // use 'link' if you don’t have a github icon key
    },
  
    sections: [
      {
        heading: 'The problem this solves',
        content:
          'NHS analytics and digital teams often lose weeks to “getting started” work that should be repeatable: environment setup, safe SQL access, secrets/config, refresh patterns, deployment steps, and basic governance checks. That creates uneven quality, slows onboarding, and makes small projects feel risky to ship. NHS Dev Tools reduces that friction with opinionated, copy-ready quickstarts and consistent guardrails—so teams can deliver something small and safe this week, not next quarter.',
      },
  
      {
        heading: 'What I built',
        content: `A documentation + quickstart site designed around real NHS roles and delivery constraints:
  
  - **Role-based journeys (Personas)**: BI Analyst, Data Scientist, Developer, Data Engineer, Clinician-Researcher, IG lead
  - **Technology “Learn” modules**: languages, databases, dashboards, web/API frameworks, cloud/hosting, tooling
  - **Practical build paths**: 10-minute installs, 90-minute builds, and “week-one” plans
  - **Safe-by-default examples**: synthetic/de-identified data patterns, secrets practices, and small-number considerations`,
        image: '/images/nhs-dev-tools-overview.png',
        caption: 'Discover → Personas → Learn → Build → Share → AI & ML.',
      },
  
      {
        heading: 'How it works (the site flow)',
        content: `The navigation follows a single journey from “I’m new here” to “I shipped something”:
  
  1) **Discover** — what the site is for and how to use it
  2) **Personas** — role-based quickstarts that set safe defaults fast
  3) **Learn** — short modules grouped by domain (SQL, Python, Dash, React, APIs, etc.)
  4) **Build** — end-to-end mini patterns (connect → transform → visualise/API)
  5) **Share** — deployment notes, screenshots/export hints, and “what to measure”
  6) **AI & ML** — practical starter patterns with guardrails`,
        image: '/images/nhs-dev-tools-ia.png',
        caption: 'Information architecture and Learn taxonomy.',
      },
  
      {
        heading: 'The hardest technical constraint (and how I handled it)',
        content:
          'The hardest constraint is balancing simplicity (fast starts) with NHS reality (governance, IG, operational safety). I handle this with a consistent “safe-by-default” structure on every page: minimal working example first, then NHS-specific constraints (secrets, de-identification, suppression considerations, logging, refresh safety) presented as checklists and callouts—so speed doesn’t come at the cost of good practice.',
      },
  
      {
        heading: 'Architecture and authoring model',
        content: `The site stays consistent by combining predictable structure with reusable components:
  
  - **Markdown-first** docs with MDX for rich, repeatable patterns
  - Shared components such as **JourneyStrip**, **NextSteps**, **SeeAlso**, and **Tabs/TabItem**
  - A repeatable page recipe: install → hello-world → NHS notes → next steps
  - A predictable docs/ folder layout and IDs to keep sidebars and routes stable`,
      },
  
      {
        heading: 'Tech stack and delivery',
        content: `- **Docusaurus 2** (React + MDX) for fast authoring and navigation
  - TypeScript components + CSS modules for reusable UI patterns
  - Static-hosting friendly deployment (with CI builds and link checks)
  - Lightweight governance: consistent front-matter, consistent slugs, consistent “next steps”`,
      },
  
      {
        heading: 'Data governance and safety guardrails',
        content: `Every quickstart leans on practical guardrails:
  
  - Synthetic / de-identified examples by default
  - Secrets stored outside the repo (secret store + .env patterns)
  - “Least privilege” principles and secure connection patterns where applicable
  - Clear callouts for small-number handling and safe publishing habits
  - “What not to do” sections to reduce accidental unsafe patterns`,
      },
  
      {
        heading: 'Improvements delivered',
        content: `- Faster onboarding: one place to learn the shared patterns
  - More consistent delivery: reusable defaults for secrets, refresh, and publishing
  - Reduced review friction: repeatable scaffolds and clearer expectations
  - Better reuse: common mini-patterns become templates rather than one-offs`,
      },
  
      {
        heading: 'Operational metrics (what success looks like)',
        content: `- **Time to first working dashboard/API** from a clean clone
  - **% of examples that run end-to-end** without manual edits
  - PR review time and doc build failure rate (broken links/builds)
  - Page completion rate (do users reach “Next steps”?)
  - Adoption signals: reuse of templates and guardrail checklists`,
      },
  
      {
        heading: 'What I’d ship next',
        content: `1) **Template repos per persona** (one-click “start here” projects)
  2) More **end-to-end kits** (SQL → transform → API → UI)
  3) Better **search and task-based entry points**
  4) “Printable packs” export (PDF bundles for onboarding/training)
  5) A “golden path” CI preset for link checks + example validation`,
      },
  
      {
        heading: 'References (selected)',
        content: `- Docusaurus docs: https://docusaurus.io/docs
  - NHS England digital & transformation context: https://www.england.nhs.uk/transforming-care/
  - NHS Digital (now NHS England) data collections context (where relevant): https://digital.nhs.uk/data-and-information
  - UK GDPR / ICO guidance (handling personal data): https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/
  - OWASP (secure defaults / secrets hygiene): https://owasp.org/`,
      },
    ],
  },  
  {
    slug: 'medway-hcas-fringe',
    title: 'MFT HCAS — Evidence Pack for 5% Fringe Eligibility',
    shortDesc:
      'A data-driven case that Medway NHS Foundation Trust operates under fringe-level cost and labour-market pressures (housing, rent, commuting, workforce churn) and should be added to the 5% High Cost Area Supplement (HCAS) “Fringe” zone.',
    mediaType: 'image',
    mediaUrl: hcas,
    mediaCaption:
      'Evidence-led case pack: cost-of-living parity + London-edge corridor dynamics + workforce risk + policy route.',
    repoUrl: 'https://github.com/adamross94/mft-hcas-report',
    siteUrl: 'https://main.d1rj09o2hxnq73.amplifyapp.com/',
  
    // Portfolio-friendly: primary = the built artefact, secondary = the code
    primaryCta: {
      href: 'https://main.d1rj09o2hxnq73.amplifyapp.com/',
      label: 'View the Report',
      icon: 'link',
    },
    secondaryCta: {
      href: 'https://github.com/adamross94/mft-hcas-report',
      label: 'View on GitHub',
      icon: 'github', // use 'link' if you don’t have a github icon key
    },
  
    sections: [
      {
        heading: 'The problem this solves',
        content:
          'Medway sits in a London-edge labour market with fringe-level living costs, but staff do not receive the 5% High Cost Area Supplement (HCAS). That creates a take-home pay gap versus nearby fringe and outer-London employers, increases churn risk, and can unwind hard-won vacancy improvements—especially where fast rail/road links widen staff options.',
      },
  
      {
        heading: 'The ask (clear and specific)',
        content:
          'Add Medway NHS Foundation Trust to the **5% HCAS “Fringe” zone** in line with neighbouring comparators, so pay reflects the real labour market Medway competes in and the cost pressures staff experience.',
      },
  
      {
        heading: 'What I built',
        content: `An audit-friendly evidence pack and report that converts a complex policy question into a refreshable, comparable set of indicators:
  
  - Executive summary (Problem → Ask → Impact)
  - Key indicators card set (cost + workforce)
  - Cost-of-living comparisons (housing, rent, rail, council tax)
  - London-edge corridor and service/catchment narrative
  - Workforce impact narrative (turnover, vacancy, agency risk)
  - Policy route map (who does what, when)
  - Sources & methods + verification checklist (so figures can be re-run consistently)`,
      },
  
      {
        heading: 'Key indicators (at a glance)',
        content: `A small set of “signal” metrics aligned to a standard comparator set (e.g., Dartford / Gravesham / Thurrock):
  
  - **Rent YoY:** +13.1% (Jan 2025 vs Jan 2024)
  - **Rail season:** £6,784 (Gillingham → London Terminals, 2025 annual)
  - **Turnover:** ~14% vs ~10–12% in nearby fringe trusts
  - **Vacancy trend:** 34% → 9% (improved, but fragile without pay parity)
  - **Value signal:** retention over agency ≈ £2m/year (illustrative scenario)`,
      },
  
      {
        heading: 'How it works (evidence → decision narrative)',
        content: `The report keeps one core rule: **standardise periods and units, then state one clear insight per domain**.
  
  1) Align periods (e.g., HPI to Dec 2024; rents Jan 2024→Jan 2025; 2025 annual seasons; council tax 2023/24).
  2) Compare Medway vs a fixed fringe comparator set.
  3) Convert comparisons into decision-relevant statements (pay gap risk, churn sensitivity, operational fragility).
  4) Map evidence to the real policy route (NHSPRB → Staff Council → DHSC implementation).`,
      },
  
      {
        heading: 'The hardest constraint (and how I handled it)',
        content:
          'This isn’t a single dataset problem—it blends policy text (AfC annexes), legacy geographies, heterogeneous cost indicators, and workforce context. I handled that by treating the output as a **refreshable evidence system**: fixed comparators, aligned periods, explicit assumptions, and a verification checklist that lets any stakeholder re-run or challenge a figure without breaking the narrative.',
      },
  
      {
        heading: 'Cost-of-living parity (Medway vs fringe)',
        content:
          'The cost section focuses on the pressures staff feel in take-home terms: housing inflation trends, private rent acceleration, commuting costs (including HS1 realities), and fixed local costs like council tax. The goal is not “more charts”, but a consistent claim: **Medway’s household pressures match or exceed fringe comparators while pay does not.**',
        image: '/images/hcas/hcas-arch.png',
        caption: 'High-level pipeline: ingest → validate → compare → narrate → policy mapping.',
      },
  
      {
        heading: 'London-edge corridor, catchment and system reality',
        content:
          'Medway operates in a London-influenced corridor where staff choice sets and service networks cross boundaries. The report captures how fast links (HS1, A2/M2) widen employment options, and how regional pathway reality strengthens the case that Medway competes in a fringe ecosystem rather than a closed local market.',
        image: '/images/hcas/hcas-flows.png',
        caption: 'Cross-boundary flows and corridor dynamics used to support “London-edge” positioning.',
      },
  
      {
        heading: 'Workforce impact (retention risk and rota stability)',
        content:
          'The workforce section connects the pay differential to practical operating risk: churn, rota fragility, and agency dependence. It frames vacancy improvements as an asset worth protecting—arguing the 5% HCAS helps lock in gains by reducing the pull of fringe/outer-London employers in the same accessible labour market.',
        image: '/images/hcas/hcas-workforce.png',
        caption: 'Workforce pressure signals: turnover/vacancy trends and the risk of reversal without pay parity.',
      },
  
      {
        heading: 'Policy route and implementation pathway',
        content:
          'HCAS sits within Agenda for Change. The report includes a simple route map from local evidence pack → ICS and staff-side backing → NHSPRB evidence window → Staff Council negotiation → DHSC sign-off and implementation. This turns “nice analysis” into a plan stakeholders can actually execute.',
        image: '/images/hcas/hcas-policy.png',
        caption: 'Route map: local case → system backing → national decision → implementation.',
      },
  
      {
        heading: 'Architecture and reproducibility',
        content: `Designed as a repeatable pipeline rather than a one-off slide deck:
  
  - Python ETL (requests/pandas) for ingest + shaping
  - Postgres warehouse (cost_of_living / fares / council_tax / flows / workforce)
  - dbt transforms to standardise comparable tables
  - Visual layer: Power BI *or* React/Chart.js microsite
  - Versioned snapshots (CSV/Parquet) + metadata (source/date/method)
  - “Sources & methods” + verification checklist to refresh safely`,
        image: '/images/hcas/hcas-stack.png',
        caption: 'Reproducible pipeline feeding an auditable narrative and evidence table.',
      },
  
      {
        heading: 'Outcomes and impact',
        content: `If implemented, a 5% HCAS aims to:
  - Reduce churn pressure by closing the most visible pay gap vs fringe comparators
  - Stabilise rota fill and protect elective/UEC/theatres capacity
  - Lower premium agency reliance (illustrative ≈ £2m/year signal when paired with tight controls)
  - Improve perceived fairness and retention confidence in a shared London-edge labour market`,
      },
  
      {
        heading: 'What I’d ship next',
        content: `1) Quantify corridor effects with a postcode-level inflow sample (where permitted) to strengthen the catchment story.
  2) Expand fare comparisons (HS1 vs classic products) across a wider commuter matrix.
  3) Produce a formal board-ready dossier: 1-page evidence table, 10-page case PDF, comparator appendix, and endorsement pack aligned to NHSPRB expectations.`,
      },
  
      {
        heading: 'References (selected)',
        content: `- AfC Handbook — Annex 8 (zones) & Annex 9 (rates/caps)
  - NHSPRB reports / evidence submission process references
  - ONS / UKHPI house price series (to Dec 2024)
  - ONS Private Rental Market statistics (Jan 2024 → Jan 2025 comparison)
  - Local authority Band D council tax schedules (2023/24)
  - Rail season ticket references (standard annual products; HS1 vs classic notes)
  - Trust/ICS workforce indicators (turnover/vacancy context)`,
      },
    ],
  }
,  
{
  slug: 'dsit-aws-signoff',
  title: 'Automated AWS-Based DSIT Email & Sign-Off',
  shortDesc:
    'Serverless pipeline that generates Outlook-safe DSIT emails from daily outputs and captures one-click sign-offs via secure, trackable links—logging approvals for real-time visibility and audit trails.',
  mediaType: 'image',
  mediaUrl: '/images/dsit/aws-dsit-cover.png',

  // ✅ Keep slider for this project
  hero: {
    type: 'slider',
    beforeSrc: dsitBefore,
    afterSrc: dsitAfter,
    beforeAlt: 'Legacy DSIT Outlook email (excerpt)',
    afterAlt: 'Rebuilt DSIT email template (excerpt)',
    beforeLabel: 'Legacy',
    afterLabel: 'Rebuilt',
    initial: 52,
  },

  slider: {
    before: dsitBefore,
    after: dsitAfter,
    beforeAlt: 'Legacy DSIT Outlook email (excerpt)',
    afterAlt: 'Rebuilt DSIT email template (excerpt)',
    beforeLabel: 'Legacy',
    afterLabel: 'Rebuilt',
    initial: 55,
    aspect: 'aspect-[21/9]',
  },

  sections: [
    {
      heading: 'The problem this solves',
      content:
        'DSIT reporting often relies on manual steps and static attachments, which creates avoidable friction: version drift, low engagement (because insights are buried), and a sign-off process that is easy to miss and difficult to audit. The goal was to make the email itself the product—clear, consistent, and reliably approved.',
    },

    {
      heading: 'What I built',
      content: `A production-shaped “daily DSIT → email → approval” workflow:

- Scheduled generation of a daily DSIT email (no manual sending)
- Outlook-safe, table-based HTML with inline CSS (“bulletproof” layout + CTAs)
- Per-recipient one-click Sign Off links
- DynamoDB-backed approval logging for live status and audit trails
- CloudWatch observability (errors, retries, deliverability signals)`,
    },

    {
      heading: 'How it works (end-to-end)',
      content: `The design fits the real operational flow, including validation gates:

1) Morning ETL prepares Type 3 data and produces the consolidated DSIT dataset (often exported to CSV).
2) A scheduled AWS Lambda retrieves the dataset (commonly from S3), merges metrics into the email template, and produces Outlook-safe HTML.
3) Lambda sends the email via Amazon SES to the distribution list.
4) Each recipient gets a unique Sign Off link containing a signed, time-limited token.
5) Clicking Sign Off hits an API endpoint; a Lambda validates the token and writes the approval record to DynamoDB (deduped + auditable).`,
      image: '/images/dsit/arch.jpg',
      caption:
        'High-level flow: ETL → HTML render → SES send → tokenised sign-off → DynamoDB log.',
    },

    {
      heading: 'The hardest constraint (and how I solved it)',
      content:
        'The hardest constraint was balancing Outlook’s rendering constraints with secure, auditable sign-off. Outlook clients are sensitive to modern CSS, so the template uses conservative patterns (tables + inline CSS) and resilient CTAs. On the approval side, sign-off must be tamper-resistant and replay-safe, so tokens are signed, time-bound, and verified server-side before any write is accepted.',
    },

    {
      heading: 'Architecture overview',
      content: `**Core services**
- S3 (optional): stores daily CSV / artefacts and versioned templates
- Lambda: (a) compose+send job, (b) sign-off validation endpoint
- SES: outbound email delivery
- API Gateway: front door for sign-off clicks
- DynamoDB: approvals + token state
- CloudWatch: logs, metrics, alarms

**Key design choices**
- Split “send” and “sign-off” into separate functions/roles (least privilege).
- Use idempotent writes in DynamoDB so duplicate clicks do not create duplicate approvals.
- Version templates so you can roll back instantly if an email change breaks rendering.`,
      image: '/images/dsit/stack.png',
      caption: 'Serverless stack: S3, Lambda, SES, API Gateway, DynamoDB, CloudWatch.',
    },

    {
      heading: 'Email template engineering (Outlook-first)',
      content:
        'The template uses table-based layout and inline CSS only; CTAs are “bulletproof buttons” so they stay clickable and styled across Outlook variants. Text styling is protected with a nested span so font weight and colour remain stable across Outlook desktop and OWA. Spacing and lists use email-safe patterns for consistent line-height and reliable hit-targets.',
      image: '/images/dsit/email.png',
      caption: 'Outlook-safe layout patterns to keep rendering consistent.',
    },

    {
      heading: 'Secure one-click sign-off',
      content:
        'Each email includes a personalised sign-off URL (tokenised). The token encodes recipient + send ID and expiry; the endpoint verifies signature and freshness before writing an approval record. Duplicate clicks are deduped using a composite key, and tokens can be made single-use to prevent replay.',
    },

    {
      heading: 'Data model & governance',
      content: `DynamoDB table (example: \`dsit_signoffs\`)
- PK: recipient_id
- SK: send_id
- attributes: signed_at, status, template_version, user_agent, ip_hash (optional)
- TTL: optional expiry for stale token state
- GSI: by send_id for “who has signed today” views

Governance patterns:
- least-privilege IAM by function (send vs sign-off)
- versioned templates and deterministic “what was sent” artefacts
- deliverability hygiene via SES events (bounces/complaints) if enabled`,
    },

    {
      heading: 'Operations & reliability',
      content: `- Health signals: CloudWatch alarms on Lambda failures and API 5xx.
- Delivery posture: SES verified identities; domain auth (SPF/DKIM/DMARC) when using a custom domain.
- Rollback: template version pinning + quick revert.
- Auditability: sign-offs stored immutably per send_id, enabling daily reconciliation and historical reporting.`,
    },

    {
      heading: 'Costs',
      content:
        'The running shape is low-cost at DSIT scale: SES is priced per 1,000 emails, Lambda per request/duration, and DynamoDB per read/write/storage. Daily sends plus a single sign-off click per recipient typically stays in the low single-digit range monthly unless the list or payload size grows significantly.',
      image: '/images/dsit/costs.png',
      caption: 'Cost drivers are primarily email volume and payload size, not compute.',
    },

    {
      heading: 'What I shipped',
      content: `- Outlook-safe email template suitable for daily operational use
- Scheduled send workflow via SES + Lambda
- Tokenised sign-off endpoint + DynamoDB logging
- Monitoring hooks for reliability and (optionally) deliverability feedback`,
    },

    {
      heading: 'What I’d ship next',
      content: `1) Step Functions orchestration for retries and optional human-in-the-loop holds.
2) Admin UI for resend/override and a live sign-off board.
3) Higher-assurance sign-off option (SSO-confirmed) for strict workflows.
4) Embedded trends (sparklines / deltas) while remaining Outlook-safe.`,
    },

    {
      heading: 'References (selected)',
      content: `- Amazon SES: pricing, sandbox vs production, deliverability events
- AWS Lambda: scheduling + execution + monitoring
- Amazon DynamoDB: idempotency patterns, TTL, and table design
- API Gateway: token validation patterns (authorizers / Lambda handlers)
- Outlook-safe email techniques (tables, inline CSS, bulletproof CTAs)`,
    },
  ],
}
,
{
  slug: 'medocc-dsit-rpa',
  title: 'MedOCC DSIT RPA: Email → Excel Normalisation → SQL Import',
  shortDesc:
    'Windows-scheduled Python robot that ingests MedOCC Excel attachments from Outlook, converts volatile workbooks into ETL-safe files, and optionally triggers a SQL Server Agent import—built with retries, logging, and date-based idempotency.',
  mediaType: 'image',
  mediaUrl: '/media/medocc_dsit_rpa.svg',
  repoUrl: 'https://github.com/adamross94/Automated-Outlook-Email-Processing-and-SQL-Job-Execution-Script',

  // Optional (if your ProjectPage supports it and you want a button):
  // primaryCta: { href: 'https://github.com/adamross94/Automated-Outlook-Email-Processing-and-SQL-Job-Execution-Script', label: 'View repo', icon: 'link' },

  sections: [
    {
      heading: 'The problem this solves',
      content:
        'DSIT’s MedOCC feed arrived as emailed spreadsheets that needed manual downloading, tidying, and “making safe” before import. That created predictable failure points: missed attachments, inconsistent workbook shapes, formulas breaking ETL, and fragile handoffs into SQL jobs—right when the morning timeline is tight.',
    },

    {
      heading: 'What I built',
      content: `A scheduled “email → hardened workbook → optional SQL import” automation:

- Outlook mailbox ingestion via COM (filtered by ReceivedTime + sender allowlist)
- Attachment saving to a controlled path with bounded retries
- Excel hardening: formulas → values, consistent sheet shape, freeze panes, and formatting fixes
- Optional SQL Server Agent trigger to kick off the downstream import
- File + console logging for quick diagnosis and support`,
    },

    {
      heading: 'How it works (end-to-end)',
      content: `1) **Trigger**: Windows Task Scheduler runs a wrapper at a fixed time.
2) **Ingestion**: Outlook COM filters a tight ReceivedTime window and scans only approved senders; matching attachments are saved.
3) **Idempotency**: the date parsed from the filename becomes the run key—preventing duplicate processing for the same day.
4) **Normalisation**: the workbook is rewritten into an ETL-safe shape (values-only + consistent layout).
5) **Handoff (optional)**: a SQL Server Agent job can be started once the file is ready.`,
      image: '/images/rpa/medocc-arch.png',
      caption: 'Task Scheduler → Outlook COM → Workbook normaliser → SQL Agent (optional).',
    },

    {
      heading: 'The hardest constraint (and how I handled it)',
      content:
        'The hardest constraint was reliability across three “quirky” surfaces: Outlook filtering, Excel volatility, and the operational handoff to SQL Agent. The design keeps each step small and testable (filter → save → harden → trigger) with explicit logging and bounded retries, so a failure is diagnosable and does not silently corrupt the pipeline.',
    },

    {
      heading: 'Outlook ingestion design',
      content: `Key ingestion decisions:

- **Restrict window**: query only the messages received within a defined timeframe (avoids scanning a whole inbox) using Outlook’s Restrict filtering. :contentReference[oaicite:1]{index=1}
- **Sender allowlist**: process only known senders to reduce false positives.
- **Attachment rules**: match filenames to an expected pattern, then extract the date to drive naming and idempotency.
- **SaveAsFile**: persist each attachment deterministically on disk. :contentReference[oaicite:2]{index=2}`,
    },

    {
      heading: 'Workbook hardening (Excel → ETL-safe)',
      content: `The incoming workbooks can contain formulas, inconsistent row structures, and formatting artifacts that break imports. The hardening step focuses on producing a predictable file:

- Replace formulas with stored values (openpyxl’s data-only load pattern)
- Remove/tidy header rows when needed
- Freeze panes / apply consistent layout rules
- Save back to the same path so the SQL import sees a stable schema

Note: openpyxl reads cached formula results; it does not calculate formulas itself—so this pattern works best when the source file is already calculated at send-time. :contentReference[oaicite:3]{index=3}`,
    },

    {
      heading: 'Optional SQL Agent handoff',
      content: `When enabled, the script starts the downstream import using SQL Server Agent via \`msdb\` (so email latency and the warehouse pipeline stay decoupled). This keeps the operational control point in SQL Agent while still automating the “last mile” from mailbox to import-ready file. :contentReference[oaicite:4]{index=4}`,
    },

    {
      heading: 'Reliability, retries, and observability',
      content: `Reliability is “designed in” rather than bolted on:

- **Bounded retries** for attachment saves (with delay) to handle transient Outlook/IO failures
- **Path checks** (writability + length sanity) before writes
- **Dual logging** (file + console) so you can troubleshoot both scheduled runs and interactive tests
- **Idempotency key** derived from the attachment date so reruns don’t reprocess the same day`,
    },

    {
      heading: 'Security & governance',
      content: `Practical governance choices for a shared environment:

- Keep a tight sender allowlist and filename rules to reduce accidental ingestion
- Write to a controlled location (ideally a UNC path with least-privilege permissions)
- Keep SQL triggering optional and run it under a dedicated credential with only the rights needed to start the job`,
    },

    {
      heading: 'What I shipped',
      content: `- Outlook → disk attachment harvesting with ReceivedTime filtering + sender allowlist
- Date-based idempotency so “today” only runs once
- Workbook normalisation that produces an import-safe Excel file
- Optional SQL Agent trigger for downstream ETL
- Structured logging + bounded retries for operational reliability`,
    },

    {
      heading: 'What I’d ship next',
      content: `1) **Config-driven rules** (YAML/JSON) for senders, filename patterns, save paths, and timing.
2) **Replay/backfill mode** (rolling N-day window) for late deliveries and controlled reruns.
3) **Better formula handling** (optional Excel COM open/recalc) when cached results can’t be trusted.
4) **Run summary email** (success/failure + saved path + row counts) to reduce “did it run?” queries.
5) **Health checks**: confirm saved file shape/columns before triggering SQL Agent.`,
    },

    {
      heading: 'References (selected)',
      content: `- Outlook Items.Restrict (filtering mail items). :contentReference[oaicite:5]{index=5}
- Outlook Attachment.SaveAsFile (persisting attachments). :contentReference[oaicite:6]{index=6}
- openpyxl load_workbook(..., data_only=...) behaviour. :contentReference[oaicite:7]{index=7}
- SQL Server Agent job start procedure (msdb). :contentReference[oaicite:8]{index=8}`,
    },
  ],
},

{
  slug: 'cancer-ptl-rpa',
  title: 'Cancer 62-Day PTL Weekly RPA — Roll-forward, Refresh, Outlook Mail-Merge',
  shortDesc:
    'Windows-scheduled Python automation that rolls forward the weekly PTL folder, refreshes the master Excel workbook, renders an Outlook-safe KPI table for the email body, attaches approved outputs, and sends—reliably and repeatably.',
  mediaType: 'image',
  mediaUrl: '/media/cancer_ptl_rpa.svg',
  repoUrl: 'https://github.com/your-username/cancer-ptl-rpa',

  // Optional but useful if your ProjectPage supports it (like GIRFT/PTL)
  primaryCta: {
    href: 'https://github.com/your-username/cancer-ptl-rpa',
    label: 'View on GitHub',
    icon: 'github',
  },

  sections: [
    {
      heading: 'The problem this solves',
      content:
        'The weekly Cancer 62-Day PTL review needs a consistent “week ending” pack that people can trust at speed. Manually rolling folders forward, refreshing Excel connections, copying KPIs into an email, and attaching the right files is slow and error-prone—especially when deadlines are tight and outputs must be consistently named and easy to audit.',
    },

    {
      heading: 'What I built',
      content: `A weekly robot that turns a repeatable operational routine into a single scheduled run:

- Creates the new **week folder** (YYYY.MM.DD, previous Sunday)
- Copies forward the canonical artefacts from last week (with standard naming)
- Refreshes the master workbook **twice** to stabilise connections
- Renders a clean KPI grid from the **Summary** sheet into an **Outlook-safe HTML table**
- Opens a .MSG/.OFT template, injects the KPI table into a placeholder, attaches deliverables, and sends
- Avoids sending the raw CANPTL workbook unless explicitly required`,
    },

    {
      heading: 'How it works (weekly flow)',
      content: `The run is designed around the operational “week ending” cadence:

1) **Date anchor**: compute previous Sunday → use YYYY.MM.DD as the folder key.
2) **Roll-forward**: create the new folder → copy the master workbook unchanged.
3) **Canonical naming**: rename the first “CANPTL V3…” file to **CANPTL V3 - {YYYY.MM.DD}.xlsx**.
4) **Refresh**: open Excel via xlwings (visible mode allows authentication prompts), run RefreshAll twice, save, close.
5) **Email merge**: read Summary A1:G6 → generate an inline-CSS HTML table → replace **[INSERT TABLE]** in the template.
6) **Attachments**: attach outputs from the weekly folder (skip *.tmp and the CANPTL V3 raw workbook).
7) **Send**: deliver to the distribution list through Outlook COM automation.`,
      image: '/images/rpa/cancer-ptl-arch.png',
      caption: 'Weekly cadence: date anchor → roll-forward → refresh → render KPI grid → template merge → attach → send.',
    },

    {
      heading: 'The hardest constraint (and how I solved it)',
      content:
        'The hardest constraint is that stakeholders want the KPIs *in the email body* (fast scanning), but Outlook rendering is fragile and inconsistent across clients. The solution was to generate a compact, table-based HTML KPI grid with inline CSS only (Calibri, borders, banding), and inject it into a pre-approved Outlook template using a single placeholder replacement—so the email remains readable even when formatting support is limited.',
    },

    {
      heading: 'Excel refresh strategy (stability over cleverness)',
      content:
        'Instead of trying to be “smart” about which connections to refresh, the script uses a simple, repeatable pattern: open the workbook, wait briefly for connections to initialise, run RefreshAll twice with short waits, then save and close. This reduces intermittent failures caused by timing, authentication, or background refresh behaviour.',
    },

    {
      heading: 'HTML KPI table rendering',
      content: `The bot reads a fixed Summary range (A1:G6) into a DataFrame and emits a small, high-contrast table:

- Section headers span columns for readability
- Header banding matches NHS-style scanning patterns
- Integer formatting avoids “.0” noise
- Inline CSS keeps the layout stable in Outlook/OWA`,
    },

    {
      heading: 'COM robustness (UNC paths + template handling)',
      content: `Two operational gotchas are handled explicitly:

- **UNC conversion**: mapped drives can fail under COM contexts, so S:\\ paths are converted to a UNC root before Outlook opens templates/paths.
- **Template safety**: when using a .msg, the script opens it and works on a **Copy()** so the source template is never modified or left locked.`,
    },

    {
      heading: 'Operations & safety',
      content: `This is built for predictable weekly execution:

- Excel is closed via **finally** blocks to prevent orphaned processes.
- Attachments are **whitelisted by rules** (skip temp files; skip CANPTL V3 by default).
- Console telemetry makes it obvious what happened (folder created, files copied, refresh completed, attachments added, email sent).`,
    },

    {
      heading: 'What I shipped',
      content: `- One-run weekly roll-forward with canonical naming (week ending folders)
- Resilient Excel refresh via xlwings (double RefreshAll)
- Outlook-safe KPI HTML table injected into a controlled template
- Attachment policy that avoids shipping raw CANPTL unless needed
- UNC-path hardening to reduce COM “file not found” failures`,
    },

    {
      heading: 'What I’d ship next',
      content: `1) **Dry-run / preview mode** (generate draft email, don’t send).
2) **Late delivery handling** (rolling N-day window or backfill switch).
3) **Run summary email** to the owner (success/failure + what was attached).
4) **Config file** for paths/ranges/placeholders so changes don’t require code edits.`,
    },

    {
      heading: 'References (selected)',
      content: `- Excel: Workbook.RefreshAll semantics
- Outlook: CreateItemFromTemplate (.oft) and OpenSharedItem (.msg)
- xlwings patterns for driving Excel via COM
- Windows scheduling patterns (Task Scheduler / schtasks)`,
    },
  ],
},
{
  slug: 'sdec-waiting-screen',
  title: 'SDEC-EC Assessment Unit — Waiting Screen',
  shortDesc:
    'A wallboard-ready Power BI flow board that replaces a legacy SSRS screen with snapshot-safe KPIs (queue, occupancy, waits) and an NHS-styled UI designed for continuous display.',
  mediaType: 'image',
  mediaUrl: '/images/sdec-waiting/sdec-waiting-cover.png',
  siteUrl: '/media/sdec-waiting-screen.pdf',

  hero: {
    type: 'slider',
    beforeSrc: sdecBefore,
    afterSrc: sdecAfter,
    beforeAlt: 'SSRS Report (excerpt)',
    afterAlt: 'Power BI dashboard (Overview)',
    beforeLabel: 'SSRS',
    afterLabel: 'Dashboard',
    initial: 52,
  },

  slider: {
    before: sdecBefore,
    after: sdecAfter,
    beforeAlt: 'SSRS Report (excerpt)',
    afterAlt: 'Power BI dashboard (Overview)',
    beforeLabel: 'SSRS',
    afterLabel: 'Dashboard',
    initial: 55,
    aspect: 'aspect-[21/9]',
  },

  sections: [
    {
      heading: 'The problem this solves',
      content:
        'The existing SDEC waiting board worked, but it was hard to read at speed, visually dated, and fragile when definitions drifted between EC extracts and trust-wide reporting. For a corridor screen, the goal is simple: a small set of clinically meaningful “right now” signals that stay correct at every refresh and stay legible from a distance.',
    },

    {
      heading: 'What I built',
      content: `A Power BI rebuild of the SDEC-EC waiting screen designed for unattended wallboard use:

- Snapshot-safe “current position” KPIs (queue, occupancy, assessment wait, clinician wait)
- A clear “Last updated” timestamp derived from the latest extract
- A flow-status bar (“stable / constrained / high pressure”) driven by agreed thresholds
- NHS-styled cards, typography, and colour system for fast scanning`,
    },

    {
      heading: 'The hardest technical constraint (and how I solved it)',
      content:
        'The hardest part is **being correct at a single point in time**. EC feeds update frequently, so you can’t mix rows from different extracts and call it “current”. The solution is a strict snapshot pattern: every “now” KPI is evaluated against the latest Extract_Date_Time, so counts and averages are computed from one consistent cut of the data (not a rolling blend).',
    },

    {
      heading: 'Data sources and semantic model',
      content: `**Sources**
- DB_Medway..EC_Attendance (attendance timestamps and event fields)
- DB_Medway_Metrics..M0001_EC_Attendance (derived operational flags and time-to metrics)

**Scope**
- Filtered to Department_Name = "SDEC-EC ASSESSMENT UNIT"

**Model**
- Attendance_ID as the join key (supporting a shared “attendance grain”)
- Measures-only KPIs (keeps the wallboard logic centralised and reusable)
- A date/time helper dimension if you later extend this into trend/analysis pages`,
    },

    {
      heading: 'Key measures and KPI logic',
      content: `The report is powered by a small, disciplined measure set:

- **[Last Extract]** = MAX(Extract_Date_Time) to anchor the snapshot.
- **[Current Patients]** = count of attendances flagged as currently in department at [Last Extract].
- **[Awaiting Treatment]** = current attendances with no recorded treatment start (using the attendance relationship to check event presence).
- **[Mean Time to Initial Assessment]** and **[Mean Wait to Clinician]** = AVERAGEX over the relevant time-to fields, excluding blanks and implausible values.
- **[Flow Status]** = a rules-based measure that evaluates waits/occupancy vs thresholds and returns a label + formatting hooks for the status pill.

This keeps definitions auditable and avoids “same number, different meaning” drift across pages.`,
    },

    {
      heading: 'Wallboard UX (minimal but reusable)',
      content: `The primary mode is unattended display, so the layout stays intentionally minimal:

- Strong header + unit name for instant context
- “Last updated” timestamp users can trust
- One status bar that explains the operational state in plain language
- Four KPI cards designed for distance readability

Because everything is measure-driven, the same semantic layer can power a future “analysis” page with slicers and drill-through without rewriting KPI logic.`,
    },

    {
      heading: 'Design system (NHS-style)',
      content: `The UI follows NHS-style colour emphasis and legibility:

- Dominant NHS Blue / white with restrained highlights (status colours used sparingly)
- High-contrast numerals and muted label text for fast scanning
- Rounded, lightly-bordered KPI cards that read cleanly on large displays
- Status pill uses accessible background tints with darker text for contrast

This is deliberately “quiet” UI: fewer distractions, clearer signal.`,
    },

    {
      heading: 'Governance, safety, and validation',
      content: `- Wallboard uses operational measures and avoids exposing names or free-text identifiers.
- Snapshot anchoring makes results explainable (“this is the latest extract”) and avoids partial-refresh confusion.
- Thresholds for status are designed to be clinically agreed and documented.
- The same measures can be reused elsewhere, reducing the chance of competing local definitions.`,
    },

    {
      heading: 'Outcomes and impact',
      content: `- Faster situational awareness for the unit (queue + occupancy + waits in one glance)
- More consistent operational definitions versus ad-hoc derived numbers
- A template pattern that can be reused for other areas (ED Majors/Minors/UTC) with parameterised department scope`,
    },

    {
      heading: 'What I’d ship next',
      content: `1) A “Flow Board Template” model parameterised by Department_Name (reuse across units).
2) A small configuration table for capacities + thresholds so changes don’t require a redeploy.
3) An analysis page (trends, time bands, distributions) powered by the same measures.
4) A lightweight validation page (sanity checks: snapshot completeness, null rates, outlier rates).`,
    },

    {
      heading: 'References (selected)',
      content: `- NHS Identity Guidelines — Colours (palette + colour emphasis): https://www.england.nhs.uk/nhsidentity/identity-guidelines/colours/
- Microsoft Learn — MAX (DAX): https://learn.microsoft.com/en-us/dax/max-function-dax
- Microsoft Learn — Automatic page refresh in Power BI Desktop (DirectQuery): https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh
- Microsoft Learn — Visual calculations (examples returning colours for formatting patterns): https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview`,
    },
  ],
}
,
{
  slug: 'ae-monthly-sitrep-powerbi',
  title: 'A&E Monthly SitRep — Provider vs Peer Performance (Power BI)',
  shortDesc:
    'Clean, NHS-styled Power BI report for A&E Attendances & Emergency Admissions with benchmarking against England and a configurable peer group, month selector, and focused pages for Overview, Long Waits, Admissions, and Trends.',
  mediaType: 'image',
  mediaUrl: '/images/ae-sitrep/ae-sitrep-cover.png',
  siteUrl: '/media/ae-monthly-sitrep-powerbi.pdf',
  hero: {
    type: 'slider',
    beforeSrc: aeBefore,
    afterSrc: aeAfter,
    beforeAlt: 'A&E Monthly publication spreadsheet (excerpt)',
    afterAlt: 'Power BI dashboard (Overview)',
    beforeLabel: 'Spreadsheet',
    afterLabel: 'Dashboard',
    initial: 52,
  },

  slider: {
    before: aeBefore,
    after: aeAfter,
    beforeAlt: 'A&E Monthly publication spreadsheet (excerpt)',
    afterAlt: 'Power BI dashboard (Overview)',
    beforeLabel: 'Spreadsheet',
    afterLabel: 'Dashboard',
    initial: 55,
    aspect: 'aspect-[21/9]',
  },

  sections: [
    {
      heading: 'The problem this solves',
      content:
        'The NHS England A&E Monthly SitRep is essential, but spreadsheet-based review makes it hard to answer the operational questions quickly: “Where are we vs England?”, “Are we drifting vs peers?”, and “Is pressure coming from breaches, admissions, or long waits?”. It also creates practical friction: month scanning is slow, definitions get lost, version-control can drift via emailed copies, and Type 3 quirks can confuse conversations if the context is not explicit.',
    },

    {
      heading: 'What I built',
      content: `A calm, audit-friendly Power BI report that turns the monthly publication into an interactive benchmarking tool:

- **Shared controls**: Month selector, Attendance Type (T1/T2/T3/All), Benchmark scope (Provider / Peers / England)
- **Focused pages**: Overview, Long Waits, Admissions, Trends
- **Consistent KPI language** across pages (same definitions, same numerator/denominator semantics)
- **Built-in “Help / definitions”** so Type 1/2/3, 4-hour standard, 12-hour waits, and DTA > 4h are never “tribal knowledge”
- **Reset per page** using bookmarks so users can recover a default view instantly`,
    },

    {
      heading: 'The hardest constraint (and how I solved it)',
      content:
        'The hardest constraint was balancing “fast scanning” with “no ambiguity.” Stakeholders needed a single-click answer for performance, but also a way to validate figures without reopening the spreadsheet. I solved this with a measures-first semantic layer: every headline KPI has a paired audit view (numerator, denominator, derived rate/count) so the report stays decision-grade while remaining reconcilable back to the publication.',
    },

    {
      heading: 'Data model and architecture',
      content: `**Source**
- NHS England monthly A&E Attendances and Emergency Admissions publication (XLS/CSV)

**Model**
- Fact table in long format (Provider-month rows with the published totals)
- Dates dimension generated from min/max period dates (Month label + sortable YearMonth key)

**Measure design**
- “Who” selector drives Provider vs Peers vs England totals without duplicating visuals
- Attendance Type drives T1/T2/T3/All consistently across every page
- Rates are always derived from explicit numerators/denominators (audit-ready)

This structure keeps the UX simple while ensuring new months append cleanly as fresh publications are released.`,
    },

    {
      heading: 'How the pages map to real review behaviour',
      content: `**Overview**
- KPI ribbon: Attendances, 4-hour %, Admissions %, 12-hour waits, DTA > 4h
- Visual summary for “Within vs Over 4 Hours”
- Audit table that shows Provider/Peers/England side-by-side

**Long waits**
- A dedicated view for breach volume and >12h waits so “pressure” is visible even when rates are stable

**Admissions**
- Conversion (Admissions ÷ Attendances) plus supporting counts to show whether flow pressure is driven by admissions volume vs attendances

**Trends**
- Month-by-month view with stable axes so changes are visually trustworthy, not chart-scale artefacts`,
    },

    {
      heading: 'Benchmarking and peer groups',
      content:
        'Peers are treated as a first-class benchmark, not an afterthought: the report can show Provider vs England vs a defined peer set on the same semantic basis. The peer view uses the publication’s compatible totals, so comparisons remain apples-to-apples rather than mixing local definitions with national ones. Where Type 3 variation risks misinterpretation, the report is designed to surface that context via definitions/help and page-level cues.',
    },

    {
      heading: 'Design system and accessibility',
      content:
        'The UI follows NHS-style visual discipline: restrained palette, readable typography, clear hierarchy, soft card borders, and consistent legends. KPI emphasis is used sparingly so the page remains calm on repeat viewing (monthly rhythm), and the layout is designed to work well in screenshots for papers and updates. Colour usage aligns with NHS brand conventions (e.g., NHS Blue #005EB8 and Dark Blue #003087).',
    },

    {
      heading: 'Data governance and auditability',
      content: `Governance is built into the interaction model:

- The Dates table is derived from actual available months (no “empty months” in slicers).
- Every rate has an audit path (numerator/denominator visible).
- Page-level Reset prevents “filter debt” when screenshots are needed quickly.
- The structure supports scheduled refresh as new NHS England months drop, without redesign.`,
    },

    {
      heading: 'Improvements delivered',
      content: `- Faster monthly review: “where are we vs peers/England?” in seconds.
- Reduced confusion: consistent KPI language + in-report definitions.
- Less version drift: one governed dashboard replaces many emailed spreadsheets.
- Better trend visibility: month-on-month patterns become obvious without manual scanning.`,
    },

    {
      heading: 'What I’d ship next',
      content: `1) Automated ingestion from NHS England CSVs with validation checks (missing months, revised files, variance flags).
2) Parameterised peer groups (config table) so the same template can be reused across teams/ICSs.
3) A “Data Quality / Notes” banner that can highlight Type 3 attribution caveats when relevant.
4) Exec Summary bookmark: current month deltas vs last month + vs peer median.
5) Accessibility pass: contrast validation, keyboard navigation checks, and screen-reader-friendly ordering.`,
    },

    {
      heading: 'References (selected)',
      content: `- NHS England Statistics: A&E Attendances and Emergency Admissions (monthly publication hub, XLS/CSV downloads, guidance and context).
- NHS brand / style guidance (colour palette and usage conventions).`,
    },
  ],
}

       
  // …other projects…
]
