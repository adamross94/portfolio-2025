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

export const projects = [
  {
    slug: 'cancer-62day-ptl-weekly-snapshot',
    title: 'Cancer 62-Day PTL — Weekly Snapshot (Power BI)',
    shortDesc:
      'An NHS-styled Power BI remake of the 62-day PTL weekly review (Sections 1–5), with synced Pathway/Tumour/Threshold slicers, focusable KPIs, exportable tables, and a one-click Reset that mirrors the HTML PoC.',
    mediaType: 'image',
    mediaUrl: '/images/ptl62/ptl62-cover.png',
    repoUrl: 'https://github.com/your-username/cancer-62day-ptl', // optional
    siteUrl: 'https://your-site/cancer-62day-ptl', // optional
  
    hero: {
      type: 'slider',
      beforeSrc: ptlBefore,
      afterSrc:  ptlAfter,
      beforeAlt: 'Legacy PTL spreadsheet (excerpt)',
      afterAlt:  'Power BI dashboard (Sections 1–5)',
      beforeLabel: 'Spreadsheet',
      afterLabel:  'Dashboard',
      initial: 54
    },
    slider: {
      before: ptlBefore,
      after:  ptlAfter,
      beforeAlt: 'Legacy PTL extract (excerpt)',
      afterAlt:  'Power BI dashboard (Sections 1–5)',
      beforeLabel: 'Baseline',
      afterLabel:  'Dashboard',
      initial: 56,
      aspect: 'aspect-[21/9]'
    },
  
    sections: [
      {
        heading: 'Introduction',
        content:
          'This project turns the weekly Cancer 62-day PTL review into a clean, filter-aware Power BI report that mirrors an HTML PoC. Five sections cover: S1 no-DTT waits, S2 with-DTT waits, S3 treated in the last 7 days, S4 referrals/upgrades (7d), and S5 first seen (2WW, 7d). The design keeps NHS styling, clear KPIs, and exportable tables.'
      },
      {
        heading: 'The Technical Challenge',
        content:
          'Different shapes per section (stock vs treated vs 7-day flows), a “Waiting Threshold (focus)” that should highlight a single bracket without blanking stacked charts, and table visuals that must retain Pathway × Tumour granularity. The report also needed synced slicers across pages, a true Reset, and a stable Week-ending banner.'
      },
      {
        heading: 'Architecture Overview',
        content:
          'Sources: weekly section views for S1–S5 plus Date_Check for the banner. Model: facts (q_S1…q_S5, q_DateCheck) with simple dims—Dim_Tumour, Dim_Pathway, Dim_Threshold_S1S2 (0–28/29–62/63–104/>104 + Passing columns for tables), and Dim_TreatedBracket (≤62/63–104/>104). Relationships are one-to-many from dims to facts with single-direction filters to avoid ambiguity.'
      },
      {
        heading: 'DAX Patterns & Measure Strategy',
        content:
          'Base measures per section compute waits and passings (e.g., S1_0_28 (M), S1_29_62 (M), S1_Pass28 (M)). Display measures wrap base measures with SWITCH/IF logic so the Threshold slicer can “focus” a bracket for KPIs while stacked charts still show all segments. Section 3 uses bracketed treated measures; Sections 4–5 use simple 7-day counts. The Week-ending label uses MAX over q_DateCheck with ALL to ignore slicers.'
      },
      {
        heading: 'Interactions & UX',
        content:
          'Global sync for Pathway chips, Tumour dropdown, and Waiting Threshold dropdown. KPI cards use “Card (new)” plus a small multi-row overlay for pill labels (in scope / breach risk / high risk / throughput / completions). A per-page bookmark + synced slicers provides a one-click Reset. Icons are watermark PNG/SVGs in card corners for PoC parity.'
      },
      {
        heading: 'Section Design',
        content:
          'S1: stacked column by Tumour for 0–28/29–62/63–104/>104 and a grid with those waits + Passing 28/62/104. S2: same pattern with DTT. S3: treated (≤62/63–104/>104) donut or bar + simple bracket table. S4: 7-day referrals/upgrades by Tumour and a list. S5: 7-day first-seen by Tumour and a list. All tables are exportable and slicer-aware.'
      },
      {
        heading: 'Why These Choices',
        content:
          'Separating base and display measures keeps visuals complete while enabling a threshold focus. Dim tables built from facts reduce brittleness and resolve relationship ambiguity. Synced slicers and page bookmarks deliver a trustworthy reset. UI parity with the PoC lowers adoption friction.'
      },
      {
        heading: 'Improvements Delivered',
        content:
          'Consistent KPIs and language across S1–S5; threshold focus without losing stacked context; NHS-styled header and cards; stable “Week ending” label; CSV-ready tables; globally synced slicers with a genuine Reset.'
      },
      {
        heading: 'What I Shipped',
        content:
          'A multi-page Power BI dashboard mirroring the HTML PoC for the 62-day PTL: NHS header, KPI row with pill labels and icons, stacked charts, exportable tables, synced slicers, Reset button, and a Week-ending banner. Robust DAX underpins waits, passings, treated, and 7-day flows.'
      },
      {
        heading: 'What I’d Ship Next',
        content:
          'Unit tests/validation page for measures; a config table for labels and threshold colours; drill-through to patient-level review where permitted; incremental history for trend analyses; RLS/workspace split for clinical vs managerial audiences.'
      },
      {
        heading: 'Reference List (selected)',
        content:
          'Sectioned PTL weekly views (S1–S5) and Date_Check; NHS identity standards; DAX patterns for SWITCH-based focus measures, synced slicers with bookmarks, and measure-driven conditional formatting.'
      }
    ]
  },
  {
    slug:      'girft-metrics',
    title:     'GIRFT Specialty Metrics: SQL Development & Visualisation',
    shortDesc:
      'A standardised SQL + Power BI/SSRS framework that converts GIRFT specialty metric metadata into reproducible queries against DB_Medway, delivering patient-level detail and trust-level benchmarking aligned with the Model Health System.',
    mediaType: 'image',
    mediaUrl:  girft, // replace with a dashboard/architecture hero image
    repoUrl:   '#',                      // internal/private — leave as "#" or swap for a doc link
    siteUrl:   '#',                      // optional landing/report link, or keep "#"
    sections: [
      {
        heading: 'Introduction',
        content:
          'GIRFT (Getting It Right First Time) provides specialty-specific metrics for NHS benchmarking. Each metric ships with metadata—definitions for numerators/denominators, code groups, inclusion rules, and time windows. This project turns that metadata into executable SQL for DB_Medway and presents results via Power BI and SSRS, enabling clinicians and managers to explore trust performance and drill down to patient-level records that underpin Model Hospital numbers.',
        image:   '/images/girft-model-hospital.png',
        caption: 'Model Hospital/GIRFT context used to align local calculations with national metrics.'
      },
      {
        heading: 'Problem & Rationale',
        content:
          'Trusts often have the GIRFT metric recipes but not a consistent, maintainable way to translate them into SQL across local data models. As a result, benchmarking and case-review workflows are slow and inconsistent. This framework closes the gap by codifying GIRFT metadata into reusable SQL patterns and publishing interactive visuals so teams can validate, compare, and act on the metrics with confidence.'
      },
      {
        heading: 'Architecture & Data Flow',
        content:
          'The pipeline reads GIRFT metadata spreadsheets (Metrics, Recipes, CodeGroups, Flags/Standard Flags), materialises code groups as temp tables, builds a unified #Spells_With_Variables table (and #OP_Spells for outpatient), applies “recipes” to derive variables/flags, and then calculates metrics. Outputs feed Power BI dashboards for exploration and SSRS for operational reporting/drill-through. The design mirrors Model Hospital definitions to keep local and national numbers aligned.',
        image:   '/images/girft-arch.png',
        caption: 'High-level flow: Metadata → CodeGroups → Variables/Flags → Metrics → Power BI/SSRS.'
      },
      {
        heading: 'SQL Translation Framework',
        content:
          '1) CodeGroups: each GIRFT group (e.g., ICD-10/OPCS lists) is created as a temp table (#CodeGroup_*). 2) Variables via Recipes: update statements apply priority rules and logical operators (AND/OR, ranges, LEFT(code,3)) from the Recipes sheet to derive variables in #Spells_With_Variables. 3) Flags: additional spell/episode flags (e.g., index/return admissions, readmissions windows, mortality windows) are computed to match GIRFT logic. 4) Metrics: each metric query (e.g., PN7103 day-case rate) aggregates over the derived variables with configurable date windows.',
        image:   '/images/girft-recipes.png',
        caption: 'Recipes + CodeGroups drive deterministic, repeatable SQL derivations.'
      },
      {
        heading: 'How It Runs',
        content:
          'The framework executes in five steps: (1) optionally drop temp tables for a clean run; (2) create/populate #CodeGroup_* temp tables from the CodeGroups sheet; (3) build and populate #Spells_With_Variables (and #OP_Spells if needed) from DB_Medway sources; (4) apply Recipes/Flags update statements to derive GIRFT variables; (5) run metric queries from the Metrics sheet (e.g., numerator/denominator with 12-month windows to quarter end). Parameters allow switching specialties and periods without rewriting logic.',
        image:   '/images/girft-run.png',
        caption: 'Stepwise execution enables specialty/date re-runs and quick validation.'
      },
      {
        heading: 'Visualisation (Power BI & SSRS)',
        content:
          'Power BI dashboards surface trust-level results, trends, and peer comparisons, with filters for specialty, period, and points-of-delivery. SSRS reports provide operational, printable outputs and drill-through to patient-level lines for clinical case review. Together they serve both exploratory and formal reporting needs while keeping definitions consistent with Model Hospital.',
        image:   '/images/girft-dashboard.png',
        caption: 'Interactive dashboards for exploration; SSRS for operational views and drill-through.'
      },
      {
        heading: 'Validation & Governance',
        content:
          'Each metric is cross-checked against existing reports/Model Hospital values using the same windows and inclusion rules. Discrepancies trigger a trace-through from metric → variable → codegroup hit to verify data lineage. The framework is documented end-to-end (inputs, assumptions, SQL patterns) and designed for repeatability with change-controlled metadata and scripts.'
      },
      {
        heading: 'Challenges & Mitigations',
        content:
          '• Data variability across trusts: abstracted codegroups and parameterised recipes reduce rewrites. • Large volumes: careful indexing and batching on #Spells build; only necessary joins for updates; temp tables scoped per run. • User adoption: role-specific views (management vs. clinical), clear glossary mapping to GIRFT terminology, and training built into dashboards.'
      },
      {
        heading: 'Outcomes & Impact',
        content:
          'The framework standardises GIRFT calculations locally, enabling fast reproduction of specialty metrics and patient-level drill downs. Clinical teams gain a transparent path from headline figures to individual cases for review; management gains comparable, trusted numbers for benchmarking and performance improvement; analysts gain a reusable pattern to add specialties without starting from scratch.'
      },
      {
        heading: 'Next Steps',
        content:
          'Extend coverage to additional specialties; add automated refresh via SQL Agent; integrate parameter pickers for quarter-end dates; publish a lightweight data dictionary and validation pack; and template a “new specialty wizard” that reads a metadata file and scaffolds the required codegroups, recipes, flags, and metric queries automatically.'
      }
    ]
  },  
  {
    slug: 'nhs-dev-tools',
    title: 'NHS Dev Tools: Role-based Open-Source Quickstarts',
    shortDesc:
      'A documentation site of NHS-ready quickstarts and patterns. It helps BI analysts, data scientists, developers and clinicians ship small, safe dashboards, APIs and pipelines aligned to the NHS 10-Year Plan.',
    mediaType: 'image',
    mediaUrl: '/images/nhs-dev-tools-hero.png',     // replace with your hero image
    repoUrl: 'https://github.com/your-org/nhs-dev-tools', // or '#'
    siteUrl: 'https://your-site-url.example',        // live docs URL or '#'
    sections: [
      {
        heading: 'Introduction',
        content:
          'NHS Dev Tools is a documentation and quickstart hub that reduces time-to-value for NHS data and digital teams. It provides 10-minute installs, 90-minute builds, and week-one plans for dashboards, APIs and data pipelines. The content is role-based (Personas) and technology-based (Learn) with built-in IG guardrails, so teams can ship something small and safe this week, not next quarter.',
        image: '/images/nhs-dev-tools-overview.png',
        caption: 'Discover → Personas → Learn → Build → Share → AI & ML.'
      },
      {
        heading: 'Problem & Rationale',
        content:
          'NHS teams face choice overload and inconsistent patterns across analytics and apps. Many projects stall on basics like secrets, safe refreshes, or deployment steps. The site addresses this with opinionated quickstarts that show exactly how to install, connect to SQL safely, publish a minimal dashboard or API, and measure impact. It aligns with the 10-Year Plan by focusing on data + AI foundations that enable digital access, prevention and productivity.'
      },
      {
        heading: 'Who It’s For',
        content:
          '• BI Analysts who need reproducible KPIs and dashboards.\n• Data Scientists who want clean pipelines and small deployments.\n• Developers building secure APIs and thin UIs over NHS data.\n• Data Engineers standardising ETL and validation.\n• Clinician-Researchers sharing reproducible analysis.\n• Information Governance leads defining safe defaults and checks.'
      },
      {
        heading: 'Information Architecture',
        content:
          'The site is organised around a simple journey: Discover → Personas → Learn → Build → Share → AI & ML. Personas provide role-based quickstarts. Learn is grouped into Languages, Databases, Dashboards, Web & API Frameworks, Cloud & Hosting and Tooling. Each page offers 10-minute setup, a “hello NHS” example, IG notes and next steps.',
        image: '/images/nhs-dev-tools-ia.png',
        caption: 'Navigation map and Learn taxonomy used across the docs.'
      },
      {
        heading: 'Authoring Model',
        content:
          'Markdown-first with MDX components for consistency: JourneyStrip (journey banner), NextSteps (guided navigation), SeeAlso (related links), Tabs/TabItem for OS-specific steps, and card-grid helpers. Content uses consistent slugs, front-matter and emoji-labelled sidebars. Examples emphasise parity across Python, R and JS where helpful.'
      },
      {
        heading: 'Tech Stack',
        content:
          'Built on Docusaurus 2 (React + MDX), TypeScript components and CSS Modules for styling. Sidebar is category-driven with a generated index for each domain. Hosted on static-friendly platforms (e.g., GitHub Pages, CloudFront, Azure Static Web Apps). CI can validate links and build on pull requests.'
      },
      {
        heading: 'IG & Safety',
        content:
          'Every quickstart emphasises synthetic/de-identified data, secrets in a secret store (Key Vault/Secrets Manager), TLS for SQL connections, suppression rules for small numbers, and documentation of data definitions. Pages include copyable IG checklists and “what not to do” callouts.'
      },
      {
        heading: 'What’s Included',
        content:
          '• 6 persona quickstarts (BI Analyst, Data Scientist, Developer, Data Engineer, Clinician-Researcher, Information Governance).\n• Learn pages for Python, R, SQL (generalised), JavaScript, DuckDB, Dash, Shiny, Evidence.dev, React, Next.js, FastAPI, Express, Docker, VS Code, Git/GitHub, Secrets & .env, Azure, AWS, plus FDP and PowerToys.\n• Build/Share overview pages with deployment presets and operational metrics.'
      },
      {
        heading: 'Architecture & Page System',
        content:
          'Content lives under docs/ with predictable folders and IDs to match the sidebar. MDX pages import shared components for journey strips and callouts, keeping visuals and tone consistent. The sidebar groups Learn into domains and adds emoji labels to improve wayfinding.'
      },
      {
        heading: 'Outcomes & Impact',
        content:
          'Teams move faster from zero to something clickable, with consistent IG guardrails. Common patterns (SQL view → Parquet extract → Dash/Evidence.dev) become repeatable. New joiners get a single place to learn the stack; experienced staff get standardised scaffolds that reduce review time.'
      },
      {
        heading: 'Operational Metrics',
        content:
          '• Time to first working dashboard/API from a clean clone.\n• % of examples that run end-to-end without manual edits.\n• PR review time and change failure rate for doc updates.\n• Page views and completion of “next steps”.\n• Adoption of IG checklists and secrets patterns.'
      },
      {
        heading: 'Challenges & Mitigations',
        content:
          'Keeping examples simple yet realistic; solved by using synthetic NHS-like schemas and minimal, auditable pipelines. MDX syntax pitfalls; addressed with a component kit and linting. Sidebar sprawl; addressed with a domain taxonomy and generated indices.'
      },
      {
        heading: 'Roadmap',
        content:
          'Template repos for each persona; more end-to-end kits (SQL → API → UI); search improvements; a print/PDF export path for packs; and more FDP-specific patterns as regional capabilities mature.'
      }
    ]
  },
  {
    slug: 'medway-hcas-fringe',
    title: 'Medway HCAS Fringe Eligibility',
    shortDesc:
      'A data-driven case arguing that Medway NHS Foundation Trust meets the criteria for the 5% Fringe High Cost Area Supplement (HCAS) through cost-of-living parity, cross-boundary patient flows, and workforce evidence.',
    mediaType: 'image',
    mediaUrl: hcas,
    repoUrl: 'https://github.com/your-username/medway-hcas-fringe', // optional
    siteUrl: 'https://your-site/medway-hcas-fringe', // optional
    sections: [
      {
        heading: 'Introduction',
        content: `This project builds an evidence base that Medway NHS Foundation Trust operates under pressures comparable to recognised 5% “Fringe” HCAS zones. It triangulates official pay policy, local house price and rent trends, commuting costs, cross-border patient flows, and workforce stability to show that Medway aligns with fringe-area dynamics and should be considered for inclusion at the next policy review.`
      },
      {
        heading: 'The Technical Challenge',
        content: `Unlike a single-API dataset, this problem blends policy text, geography locked to legacy PCT boundaries, and heterogeneous indicators (ONS/UKHPI, local councils, rail fares, workforce papers). The challenge was to (1) normalise sources into a comparable frame for Medway versus nearby fringe areas, (2) quantify practical parity (rents, housing, commuting, council tax), (3) evidence London-adjacent service patterns, and (4) connect findings to the actual decision pathway (NHSPRB ↔ NHS Staff Council ↔ DHSC).`,
        image: '/images/hcas/hcas-arch.png',
        caption: 'High-level pipeline: ingest → validate → compare → narrate → policy mapping.'
      },
      {
        heading: 'Data & Methodology',
        content: `• Sources: NHSPRB remit & AfC Handbook (HCAS Annexes), ONS/UKHPI for prices & rents, council tax schedules, rail season-ticket guidance, democracy minutes for stroke network flows, Medway FT publications, and case studies on recruitment/retention.\n
  • Approach: ETL into a small warehouse (schema: cost_of_living, fares, council_tax, flows, workforce). Standardise geography to current LAs; map fringe zones via Annex 8 legacy PCT lists. Build comparators for Medway vs Dartford/Gravesham/Thurrock/West Herts cohorts.\n
  • Outputs: narrative sections, comparison table, and evidence links the reader can audit.`
      },
      {
        heading: 'Cost of Living: Medway vs Fringe Areas',
        content: `🏠 Housing & Rents\nONS/UKHPI shows sustained house-price growth in Medway with private rents rising materially year-on-year—comparable to fringe districts around London. This pushes take-home affordability in ways similar to Dartford, Gravesham and Thurrock.\n\n🚆 Commuting\nSeason-ticket costs for Medway’s London commuters (e.g., Gillingham) are substantial—especially when high-speed validity is required—often comparable to or above some Essex/Kent fringe routes on non-HS lines. This erodes disposable income similarly to recognised fringe zones.\n\n💡 Council Tax & Everyday Costs\nBand D council tax levels for Medway sit in the same ballpark as neighbouring Kent/Essex authorities, adding to baseline household pressure. Day-to-day utilities and groceries are regionally typical, so housing + transport + council tax become the differentiators.\n\n**Takeaway:** On multiple real-world cost fronts (rents, mortgage/price trends, rail, council tax), Medway looks and feels like a fringe-area trust for staff wallets.`
      },
      {
        heading: 'London Patient Inflows & Catchment',
        content: `Fringe trusts treat appreciable volumes from bordering London boroughs. Kent & Medway stroke planning explicitly acknowledged Bexley flows into Darent Valley Hospital (Dartford). Medway itself anchors regional specialist work (e.g., West Kent Urology Cancer Centre at Medway), and wider mutual-aid pathways during COVID reinforced London-adjacent service networks. While Medway sits further from the boundary than Dartford, its role in a London-influenced system means patient demand patterns and operational realities mirror fringe trusts.`,
        image: '/images/hcas/hcas-flows.png',
        caption: 'Cross-boundary flows and regional service arrangements.'
      },
      {
        heading: 'Workforce Stability & Retention',
        content: `Evidence highlights a historically high nursing vacancy at Medway that was driven down via targeted recruitment, yet retention pressure persists. Turnover around the low-mid-teens keeps the system sensitive to pay differentials. Staff living within commuting range of fringe/outer-London providers can earn more via HCAS—an asymmetry that encourages leakage unless addressed.`,
        image: '/images/hcas/hcas-workforce.png',
        caption: 'Recruitment successes vs. ongoing retention risk from HCAS differential.'
      },
      {
        heading: 'Policy & Decision Pathway',
        content: `HCAS is part of Agenda for Change. Annex 8 defines the inner/outer/fringe zones (fringe defined on legacy PCT geographies), while Annex 9 sets rates (fringe = 5% with min/max caps). Crucially, it is open to the NHS Pay Review Body (NHSPRB) to recommend future geographic coverage of HCAS, and employers/staff organisations can propose supplements where none exist. Practically, a credible, evidence-led case from Medway FT and partners can be escalated via Staff Council/PRB, with DHSC sign-off.`,
        image: '/images/hcas/hcas-policy.png',
        caption: 'How an evidence pack flows into the AfC/PRB process.'
      },
      {
        heading: 'Key Findings',
        content: `• Cost parity: Rent growth, house-price trends, and council-tax levels put Medway close to fringe comparators; rail costs amplify the squeeze.\n• System role: Cross-boundary pathways (e.g., stroke flows to DVH; regional urology cancer centre at Medway) reflect London-adjacent operations.\n• Workforce: Retention remains sensitive to HCAS differentials; historic vacancy reductions show progress but also the cost of churn.\n• Feasibility: The PRB/Staff Council pathway exists to consider boundary updates where evidence shows de-facto fringe conditions.`
      },
      {
        heading: 'Architecture & Implementation',
        content: `Stack: Python ETL (requests/pandas) → Postgres warehouse (schemas for prices/rents/fares/council_tax/flows/workforce) → dbt transforms for tidy, comparable tables → visual layer (Power BI or a React/Chart.js microsite) → narrative report with linked references.\n\nReproducibility: every chart derives from versioned CSV/parquet snapshots with metadata (source, date, method).`,
        image: '/images/hcas/hcas-stack.png',
        caption: 'Reproducible pipeline feeding the narrative.'
      },
      {
        heading: 'What I’d Ship Next',
        content: `1) Add postcode-level HES inflow sampling (DA postcodes) to quantify London-origin volumes; 2) expand fare comparisons (high-speed vs classic) across candidate commuter routes; 3) produce a formal business-case pack aligned to NHSPRB/Staff Council expectations (exec summary, evidence tables, stakeholder endorsements).`
      },
      {
        heading: 'Reference List (selected)',
        content: `• AfC Handbook – Annex 8 (zones) & Annex 9 (rates)\n• Parliamentary written answer on HCAS coverage recommendations\n• ONS/UKHPI Medway prices and ONS rents bulletins\n• Medway Council/Kent CC council-tax bulletins\n• Kent & Medway stroke review minutes (Bexley → DVH flows)\n• Medway FT: West Kent Urology Cancer Centre\n• Workforce evidence (turnover/vacancy case study)\n• Rail season-ticket guidance and Campaign for Better Transport tables`
      }
    ]
  },
  {
    slug: 'dsit-aws-signoff',
    title: 'Automated AWS-Based DSIT Email & Sign-Off',
    shortDesc:
      'Serverless pipeline that builds Outlook-perfect DSIT emails and captures one-click sign-offs via secure, trackable links.',
    mediaType: 'image',
    mediaUrl: '/images/dsit/aws-dsit-cover.png',
    repoUrl: 'https://github.com/your-username/dsit-aws-signoff', // optional
    siteUrl: 'https://your-site/dsit-aws-signoff', // optional
    hero: {                            // ⬅️ add this
      type: 'slider',
      beforeSrc: dsitBefore,
      afterSrc:  dsitAfter,
      beforeAlt: 'Outlook Email (excerpt)',
      afterAlt:  'MJML Email (excerpt)',
      beforeLabel: 'Plain Text',
      afterLabel:  'MJML',
      initial: 52
    },
     // ↓↓↓ NEW: this makes ProjectPage render the slider instead of the static image
     slider: {
      before: dsitBefore,
      after:  dsitAfter,
      beforeAlt: 'Outlook Email (excerpt)',
      afterAlt:  'MJML Email (excerpt)',
      beforeLabel: 'Plain Text',
      afterLabel:  'MJML',
      initial: 55,             // starting split %
      aspect: 'aspect-[21/9]', // or 'aspect-video'
    },
    sections: [
      {
        heading: 'Introduction',
        content: `This project converts DSIT’s manual, attachment-based emails into a fully automated, auditable workflow on AWS. A Lambda job merges fresh metrics into a bulletproof HTML template tailored for Outlook, sends via SES, and embeds a unique “Sign Off” link per recipient. Clicks are validated and recorded in DynamoDB for real-time approval tracking.`
      },
      {
        heading: 'The Technical Challenge',
        content: `Outlook rendering quirks, reliable daily scheduling, and secure one-click approvals were the three big hurdles. The system needed: (1) table-based, inline-CSS email that survives Outlook; (2) deterministic daily generation/sending; (3) a tamper-resistant sign-off token flow that logs approvals instantly—without exposing internal systems.`,
        image: '/images/dsit/arch.jpg',
        caption: 'High-level flow: ETL → HTML render → SES send → tokenised sign-off → DynamoDB log.'
      },
      {
        heading: 'Architecture Overview',
        content: `• Data layer: Daily CSV (or direct SQL) exported to S3.\n• Email render: Lambda reads CSV → fills merge fields in an HTML/MJML-to-HTML template → inlines CSS → produces Outlook-safe HTML.\n• Delivery: Lambda sends via Amazon SES (production access + verified identities).\n• Sign-off: Each email carries a unique URL with a signed token to an API Gateway endpoint. A Lambda authorizer validates the token; a handler records the decision in DynamoDB (with TTL and idempotency keys).\n• Observability: CloudWatch metrics/alarms on Lambda errors, SES bounces/complaints, API 4xx/5xx; optional Slack/Teams webhooks.`,
        image: '/images/dsit/stack.png',
        caption: 'Serverless stack: S3, Lambda, SES, API Gateway, DynamoDB, CloudWatch.'
      },
      {
        heading: 'Email Template Engineering (Outlook-First)',
        content: `The template uses table-based layout and inline CSS only; CTAs are “bulletproof buttons” (VML-backed) so they render even with images off. A nested <span> keeps text weight/colour stable across OWA/desktop Outlook. Lists and spacing use email-safe patterns for consistent line-height and hit-targets.`,
        image: '/images/dsit/email.png',
        caption: 'Bulletproof table layout and VML-backed CTA ensure consistent Outlook rendering.'
      },
      {
        heading: 'Secure One-Click Sign-Off',
        content: `Every recipient gets a unique link (e.g., https://api.example/signoff?token=...). The token encodes recipient+send ID and expiry; the API Gateway front door uses a Lambda/JWT authorizer to validate signature and freshness before the sign-off Lambda writes an approval record to DynamoDB. Duplicate clicks are deduped using a composite key, and tokens can be single-use.`
      },
      {
        heading: 'End-to-End Workflow',
        content: `1) Morning ETL prepares Type 3 data and exports consolidated DSIT metrics to CSV.\n2) Scheduled Lambda loads CSV from S3 and merges metrics (Overall, Type 1, Type 3, etc.) into the HTML.\n3) Lambda sends the email via SES to the distribution list; each row gets a personalised tokenised link.\n4) Recipient reviews KPIs and clicks “Sign Off”.\n5) API Gateway → Lambda authorizer validates → handler writes an immutable sign-off record to DynamoDB and confirms to the team (email/Teams).`
      },
      {
        heading: 'Data Model & Governance',
        content: `DynamoDB table “dsit_signoffs”\n• PK: recipient_id | SK: send_id\n• attrs: timestamp, status, user_agent, ip_hash\n• ttl: auto-expiry for stale tokens\n• gsis: by send_id for dashboarding\nAll identities used to send mail are SES-verified; account runs out of SES sandbox; soft-fail paths capture bounces/complaints for list hygiene.`
      },
      {
        heading: 'Operations & Reliability',
        content: `• Email testing: SES mailbox simulator for success/bounce/complaint pre-flight.\n• Delivery: DKIM/SPF/DMARC on the sending domain; SES configuration sets for event publishing.\n• Alerting: CloudWatch alarms on Lambda errors, API 5xx, SES bounce spikes.\n• Rollback: Versioned templates in S3; blue/green by template version.`
      },
      {
        heading: 'Costs',
        content: `• SES: $0.10 per 1,000 outbound emails; attachments billed per-GB. A revised free tier grants up to 3,000 message charges/mo for 12 months after you start using SES (see pricing page for nuances).\n• Lambda: 1M requests + 400k GB-seconds free tier monthly; beyond that, per-request and per-GB-second are very low for short jobs.\n• DynamoDB: Always-free tier includes 25GB storage plus 25 RCU / 25 WCU—ample for daily sign-off logs at modest scale.\nFor typical DSIT volumes, monthly costs are usually in the “pennies to a few units” range unless distribution lists or attachment sizes surge.`,
        image: '/images/dsit/costs.png',
        caption: 'SES + Lambda + DynamoDB remain low-cost for daily, small-payload workloads.'
      },
      {
        heading: 'What I Shipped',
        content: `• An Outlook-perfect, inline-CSS/table email with merge fields.\n• A scheduled Lambda that composes and sends via SES.\n• Tokenised one-click sign-off captured in DynamoDB with dashboards over send_id.\n• CloudWatch alarms and SES event publishing for deliverability and health.`
      },
      {
        heading: 'What I’d Ship Next',
        content: `1) Step Functions orchestrator for retries and human-in-the-loop holds.\n2) Admin UI for resend/override and live sign-off board.\n3) Optional SSO-confirmed sign-off path (Cognito/JWT) for higher-assurance approvals.\n4) Per-service KPI cards with trend sparklines and percentile markers in the email body.`
      },
      {
        heading: 'Reference List (selected)',
        content: `• SES pricing & current free tier (message-charge model).\n• Lambda free tier and pricing.\n• DynamoDB always-free details (25GB + 25 RCU/WCU).\n• SES SDK/API sending examples and sandbox/production guidance.\n• SES mailbox simulator for safe testing.\n• API Gateway JWT/Lambda authorizers for token validation.\n• Bulletproof buttons / Outlook-safe techniques (VML, inline CSS).`
      }
    ]
  },
  {
    slug: 'medocc-dsit-rpa',
    title: 'MedOCC DSIT RPA: Email → Excel Normalisation → SQL Import',
    shortDesc:
      'Windows-scheduled Python robot that ingests MedOCC Excel attachments from Outlook, hardens the workbook for ETL, and (optionally) triggers a SQL Agent job—end-to-end with retries, logging, and idempotency.',
    mediaType: 'image',
    mediaUrl: '/media/medocc_dsit_rpa.svg',
    repoUrl: 'https://github.com/your-username/medocc-dsit-rpa', // optional
    siteUrl: 'https://your-site/medocc-dsit-rpa', // optional
    sections: [
      {
        heading: 'Introduction',
        content: `This RPA flow removes manual DSIT steps around the MedOCC feed. It watches a shared mailbox for daily spreadsheets, saves them to a controlled UNC path, converts all formulas to values, applies format tidying, and can kick off a downstream SQL Server import job. Everything is orchestrated by Windows Task Scheduler before the morning stand-up.`
      },
      {
        heading: 'The Technical Challenge',
        content: `Three pain points shaped this design: (1) Outlook’s COM model & date-filters are strict about filter syntax and time formatting; (2) Excel files arrive with volatile formulas and inconsistent shapes that break ETL; (3) any hand-off to SQL Agent must be reliable, observable, and least-privilege.`
      },
      {
        heading: 'Architecture Overview',
        content: `• **Trigger**: Windows Task Scheduler @ 08:20 runs a small batch wrapper.\n• **Ingestion**: Outlook COM → ` + 
                 `Items.Restrict(ReceivedTime window) + allowlisted Sender.Name → save each attachment via Attachment.SaveAsFile.\n` + 
                 `• **Normalisation**: openpyxl loads workbook twice (one with formulas, one with data-only) to replace formulas with last-calculated values; applies filters, widths, number formats, freeze panes.\n` + 
                 `• **Handoff (optional)**: pyodbc → msdb.dbo.sp_start_job to launch the ETL job.\n` + 
                 `• **Ops**: robust logging, retries, duplicate-date suppression, UNC path checks & write-tests.` ,
        image: '/images/rpa/medocc-arch.png',
        caption: 'Task Scheduler → Outlook COM → Workbook normaliser → SQL Agent (optional).'
      },
      {
        heading: 'Outlook Ingestion & Dedup',
        content: `The robot narrows the search window to “today” with Items.Restrict, iterates target senders only, and saves attachments that match the expected name pattern. Dates parsed from filenames (ddmmyyyy → yyyymmdd) drive idempotency: the same date won’t be processed twice in one run.`
      },
      {
        heading: 'Workbook Hardening',
        content: `To make the file ETL-safe, formulas are replaced with values (data_only technique), top rows are tidied/removed, filters & widths applied, numeric formats set (e.g., 0.00 vs integer columns), and tails beyond the last populated row are deleted.`
      },
      {
        heading: 'SQL Agent Handoff (Optional)',
        content: `When enabled, the script executes **sp_start_job** for the MedOCC import job via pyodbc. This decouples the mailbox latency from the warehouse pipeline while keeping a single control plane.`
      },
      {
        heading: 'Scheduling & Reliability',
        content: `A simple .bat launched by Task Scheduler avoids profile/drive-mapping surprises. The bot validates UNC write-access before saving, uses bounded retries on file saves, and emits structured logs for quick diagnosis.`
      },
      {
        heading: 'What I Shipped',
        content: `• Outlook→UNC attachment harvest with sender allowlist & date filter\n• Workbook normaliser (formulas→values, formats, filters, freeze panes)\n• Optional SQL Agent trigger\n• Comprehensive logging + duplicate-date guard\n• Safe defaults for shared environments`
      },
      {
        heading: 'What I’d Ship Next',
        content: `1) Minimal UI for replays & manual backfills; 2) Service account hardening + run-as profile; 3) Email-back success/failure summaries; 4) Move the Restrict window to a rolling N-days to catch late deliveries.`
      },
      {
        heading: 'Reference List (selected)',
        content: `• Outlook Attachment.SaveAsFile; Outlook Items.Restrict filter formatting\n• Excel Workbook.RefreshAll (context for refresh-based flows)\n• SQL Server Agent: sp_start_job\n• Windows Task Scheduler developer docs\n• openpyxl “data_only” behaviour`
      }
    ]
  },
  {
    slug: 'cancer-ptl-rpa',
    title: 'Cancer 62-Day PTL Weekly RPA: Folder Roll-Forward, Excel Refresh, Outlook Mail-Merge',
    shortDesc:
      'Python + xlwings automation that clones last week’s PTL folder, renames artifacts with the new week ending, refreshes the master workbook, injects a KPI table into an Outlook template, attaches deliverables, and sends.',
    mediaType: 'image',
    mediaUrl: '/media/cancer_ptl_rpa.svg',
    repoUrl: 'https://github.com/your-username/cancer-ptl-rpa',
    siteUrl: 'https://your-site/cancer-ptl-rpa',
    sections: [
      {
        heading: 'Introduction',
        content: `This weekly robot packages the Cancer 62-Day PTL snapshot with near-zero clicks. It creates the new week’s folder (YYYY.MM.DD), rolls forward last week’s files, refreshes the main workbook twice to stabilise connections, renders a clean HTML table from the Summary sheet, merges it into an Outlook template, and sends to the distribution list.`
      },
      {
        heading: 'The Technical Challenge',
        content: `Stakeholders want the numbers in the email body, not only as attachments. Outlook is picky, so the RPA renders an email-safe HTML table and avoids shipping the raw PTL workbook unless required.`
      },
      {
        heading: 'Architecture Overview',
        content: `• Folder roll-forward: compute previous Sunday → create the week folder → copy the main workbook; first CANPTL V3 workbook is renamed to “CANPTL V3 – {YYYY.MM.DD}.xlsx”.
  • Excel refresh: xlwings launches Excel, performs RefreshAll twice with short waits, then saves and closes (visible mode allows SSO prompts).
  • Email assembly: Open .MSG or .OFT, replace the [INSERT TABLE] placeholder with generated HTML, attach deliverables (excluding raw CANPTL V3), then send.`,
        image: '/images/rpa/cancer-ptl-arch.png',
        caption: 'Weekly cadence: roll-forward → refresh → render → mail-merge → send.'
      },
      {
        heading: 'HTML Table Rendering',
        content: `The bot lifts A1:G6 from the Summary sheet into a DataFrame, emits a compact table with inline CSS (Calibri, borders, header banding). Integers are formatted cleanly and section headers span columns for a readable, Outlook-safe grid.`
      },
      {
        heading: 'COM Robustness & UNC Paths',
        content: `Mapped drives can fail under COM. A small helper converts S: paths to full UNC before opening templates, reducing file-not-found errors when Outlook automates outside an interactive logon.`
      },
      {
        heading: 'Operations & Safety',
        content: `Excel is always closed in finally blocks; temp files are skipped; attachments are whitelisted. The flow prints concise telemetry for visibility: folder created, copied and renamed, refresh started and completed, attachments added, email sent.`
      },
      {
        heading: 'What I Shipped',
        content: `• One-click weekly roll-forward with canonical naming
  • Resilient Excel refresh via xlwings (double RefreshAll)
  • HTML KPI grid injected into an Outlook template
  • Attachment policy to avoid shipping raw PTL unless needed`
      },
      {
        heading: 'What I’d Ship Next',
        content: `1) Dry-run flag and preview mode; 2) Distribution via SES or Exchange transport with analytics; 3) Optional Power BI share-link in the email body; 4) Automated SDCS hand-off once sign-off is recorded.`
      },
      {
        heading: 'Reference List (selected)',
        content: `• Excel RefreshAll semantics (Interop)
  • xlwings pattern for calling RefreshAll
  • Outlook CreateItemFromTemplate and OpenSharedItem, Restrict filters
  • Outlook Attachment.SaveAsFile for attachment hygiene
  • Windows Task Scheduler concepts`
      }
    ]
  },
  {
    slug: 'sdec-waiting-screen',
    title: 'SDEC-EC Assessment Unit — Waiting Screen',
    shortDesc:
      'A real-time SDEC flow board built in Power BI with NHS-styled UI, translating EC attendance feeds into clean KPIs, thresholds, and a wallboard-ready experience.',
    mediaType: 'image',
    mediaUrl: '/images/sdec-waiting/sdec-waiting-cover.png',
    repoUrl: 'https://github.com/your-username/sdec-waiting-screen', // optional
    siteUrl: 'https://your-site/sdec-waiting-screen', // optional
    hero: {                            // ⬅️ add this
      type: 'slider',
      beforeSrc: sdecBefore,
      afterSrc:  sdecAfter,
      beforeAlt: 'SSRS Report (excerpt)',
      afterAlt:  'Power BI dashboard (Overview)',
      beforeLabel: 'SSRS',
      afterLabel:  'Dashboard',
      initial: 52
    },
     // ↓↓↓ NEW: this makes ProjectPage render the slider instead of the static image
     slider: {
      before: sdecBefore,
      after:  sdecAfter,
      beforeAlt: 'SSRS Report (excerpt)',
      afterAlt:  'Power BI dashboard (Overview)',
      beforeLabel: 'SSRS',
      afterLabel:  'Dashboard',
      initial: 55,             // starting split %
      aspect: 'aspect-[21/9]', // or 'aspect-video'
    },
    sections: [
      {
        heading: 'Introduction',
        content:
          'This project reimagines the SDEC-EC Assessment Unit waiting screen as a modern, branded Power BI report. It replaces a legacy SSRS board with a clean UI that surfaces live operational signals: patients awaiting treatment, current occupancy, assessment waits, and clinician waits — all styled to match NHS Medway’s visual language and optimised for continuous display on clinical corridor screens.'
      },
      {
        heading: 'The Technical Challenge',
        content:
          'Four constraints defined the design. First, deriving snapshot-safe, real-time metrics using the latest Extract_Date_Time without double-counting attendances. Second, keeping the content clinically relevant and concise for a wallboard context, excluding secondary assessment clutter. Third, aligning definitions across EC_Attendance and M0001_EC_Attendance so measures like “currently in department” and time-to-events match trust-wide reporting. Fourth, delivering a production-feel UI that faithfully mirrors the HTML prototype inside native Power BI.'
      },
      {
        heading: 'Architecture Overview',
        content:
          'Data sources: DB_Medway..EC_Attendance (detailed timestamps per attendance) and DB_Medway_Metrics..M0001_EC_Attendance (derived operational flags and time-to metrics), filtered to Department_Name = "SDEC-EC ASSESSMENT UNIT". The model links these via Attendance_ID with a supporting date dimension for future extensibility. All wallboard values are implemented as measures to stay filter-aware. The flow: source views → Power BI model (relationships, filters) → DAX measures for live KPIs → layout with status bar and KPI cards → scheduled auto-refresh aligned with ETL cadence.'
      },
      {
        heading: 'SQL → BI Mapping & Key Measures',
        content:
          'A dedicated measure [SDEC Last Extract] captures the latest Extract_Date_Time. [SDEC Current Patients] counts rows in M0001_EC_Attendance where M0001av_Currently_In_Department = 1 at that snapshot. Patients awaiting treatment are identified as current attendances without a recorded treatment start using the EC_Attendance relationship. Average time to initial assessment and average wait to be seen by clinician use AVERAGEX over the relevant M0001 time-to fields, excluding blanks, negatives, and implausible extremes. A composite status measure evaluates time-to-clinician and occupancy against agreed thresholds to output both a label (“Flow stable / constrained / high pressure”) and corresponding colours for the status pill.'
      },
      {
        heading: 'Interactive UX',
        content:
          'The primary use case is an unattended wallboard, so the experience is intentionally minimal. A single canvas presents the NHS Medway header, descriptive subtitle, and a clear “Last updated” timestamp. Below sits a flow status bar with a pill showing the current state and a text legend explaining the thresholds. A row of four KPI cards displays patients awaiting treatment, total patients in SDEC, mean time to initial assessment, and mean wait to be seen by a clinician. Measures are fully filter-aware, enabling the same layout to be reused on analytic pages with slicers or drill-through without redesign.'
      },
      {
        heading: 'Design System',
        content:
          'The visuals adopt the NHS palette: Medway blue, dark blue, aqua, green, and red, with subtle greys for typography. The canvas uses a radial gradient inspired by the HTML PoC (circle at top-left, #e8f2fb to #f7f9fa) to create a soft blue glow behind the header and status bar. KPI cards are white with 18–24px corner radius, a 1px #dde5ec border, and a light shadow (rgba(0,0,0,0.06)). Titles are set in muted mid-grey, while KPI values use NHS dark blue with tabular numerals. The status pill uses pastel backgrounds (#e6f4ea / #fff4e5 / #fde8e8) and darker text colours for accessible contrast. Simple icons in the card corners echo the prototype’s watermark style.'
      },
      {
        heading: 'Data Governance',
        content:
          'The waiting screen is built on controlled EC attendance views and derived metrics, avoiding direct exposure of names or free-text identifiers. Logic for "currently in department" and time-based KPIs is centralised in DAX, reducing the risk of conflicting local calculations. In a production rollout, the underlying views would be access-controlled, RLS or workspace segregation would restrict detailed data, and threshold logic for status would be clinically agreed and documented for auditability.'
      },
      {
        heading: 'What I Shipped',
        content:
          'A Power BI SDEC Waiting Screen that mirrors the HTML proof-of-concept: NHS-branded header, radial gradient background, pill-based flow status bar, and four consistent KPI cards for queue, occupancy, and waits. Robust DAX measures map EC_Attendance and M0001_EC_Attendance into snapshot-safe counts and averages. The report is tuned for 1080p+ corridor displays, uses auto-refresh aligned with ETL, and is structured so the same measures can power analytic pages without UI duplication.'
      },
      {
        heading: 'What I’d Ship Next',
        content:
          'Extend the pattern into a multi-unit Flow Board Template parameterised by Department_Name, enabling reuse for ED majors, minors, and UTC. Introduce a configuration table for capacities and time thresholds so clinical teams can adjust status logic without redeploying. Add an “Analysis” mode with slicers and detail tables driven by the same semantic model. Expose key pressure measures to monitoring or alerting systems. Complete an accessibility review for large-screen and desktop use, validating contrast, type scale, and keyboard navigation.'
      },
      {
        heading: 'Reference List (selected)',
        content:
          'Internal views: DB_Medway..EC_Attendance; DB_Medway_Metrics..M0001_EC_Attendance. NHS Brand and design guidance for colour and logo usage. Power BI patterns for snapshot calculations with MAX(Extract_Date_Time), measure-driven conditional formatting, and card design. HTML/CSS prototype using radial gradients and NHS-styled components, which served as the visual blueprint for the Power BI implementation.'
      }
    ]
  },
  
  {
    slug: 'ae-monthly-sitrep-powerbi',
    title: 'A&E Monthly SitRep - Provider vs Peer Performance (Power BI)',
    shortDesc: 'Clean, NHS-styled Power BI report for A&E Attendances & Emergency Admissions with benchmarking against England and a configurable peer group, month selector, and focused pages for Overview, Long Waits, Admissions, and Trends.',
    mediaType: 'image',
    mediaUrl: '/images/ae-sitrep/ae-sitrep-cover.png',
    siteUrl: 'https://your-site/ae-monthly-sitrep',
    repoUrl: 'https://github.com/your-username/ae-monthly-sitrep',
    hero: {                            // ⬅️ add this
      type: 'slider',
      beforeSrc: aeBefore,
      afterSrc:  aeAfter,
      beforeAlt: 'A&E Monthly publication spreadsheet (excerpt)',
      afterAlt:  'Power BI dashboard (Overview)',
      beforeLabel: 'Spreadsheet',
      afterLabel:  'Dashboard',
      initial: 52
    },
    // ↓↓↓ NEW: this makes ProjectPage render the slider instead of the static image
    slider: {
      before: aeBefore,
      after:  aeAfter,
      beforeAlt: 'A&E Monthly publication spreadsheet (excerpt)',
      afterAlt:  'Power BI dashboard (Overview)',
      beforeLabel: 'Spreadsheet',
      afterLabel:  'Dashboard',
      initial: 55,             // starting split %
      aspect: 'aspect-[21/9]', // or 'aspect-video'
    },
    sections: [
    {
    heading: 'Introduction',
    content: 'This project turns the NHS England A&E Monthly publication into an explorable benchmarking tool. It highlights the core urgent-care metrics—% within 4 hours, admissions conversion, 12-hour waits, and DTA > 4h—using readable KPI cards and tidy views (Overview, Long Waits, Admissions, Trends). The report answers “where are we vs peers and England?” at a glance while remaining audit-friendly.'
    },
    {
    heading: 'The Technical Challenge',
    content: 'The release provides national, peer, and provider totals by attendance type (T1/T2/T3) and month. End users needed an apples-to-apples comparison with a Month slicer, the ability to switch Who (Provider/Peers/England), and consistent KPIs across pages. The challenge was to model clear “Who” logic, keep the experience calm, and support drill into the peer set without losing the national context.'
    },
    {
    heading: 'Architecture Overview',
    content: 'Source data from NHS England (A&E Waiting Times & Activity) → semantic model in Power BI → report UX. The model includes ProviderLevelRaw (long format monthly rows) and a Dates table generated from min/max Period Date (Month Name and YearMonthSort for ordering). Measures implement “Who” (Provider, Peers, England) and “Type” (T1/T2/T3) so all visuals respect the same filters.'
    },
    {
    heading: 'Spreadsheet → Report Mapping',
    content: 'KPI ribbon: Total Attendances, % within 4 hours, % Admitted, 12h Waits (count), DTA > 4h (count). Overview: doughnut for Within vs Over 4 Hours plus an audit table with Provider/Peer/England and numerator/denominator. Long Waits: stacked bars and a grid for 4h breaches + 12h waits by group. Admissions: chart and table for Admissions % with attendances and admissions counts. Trends: combo chart—breaches (primary) and 4h % (secondary 0–100%)—with a month table, scaling as new months are added.'
    },
    {
    heading: 'Metric Logic',
    content: 'Over 4h = Attendances − Seen within 4h. 4h % = Seen within 4h ÷ Attendances. Admissions % = Admissions ÷ Attendances. “Peers” sums the selected trusts (Dartford & Gravesham, East Kent, Maidstone & Tunbridge Wells). “England” uses the national totals provided. All measures are month-aware via the Dates relationship and respect Attendance Type (T1/T2/T3).'
    },
    {
    heading: 'Interactive UX',
    content: 'Global slicers: Month (FY25/26), Attendance Type (Type 1/2/3/All), Benchmark Scope (Provider/Peers/England) with peer drill to specific trusts. Each page includes a Help dialog (definitions: Type 1/3, 4-hour standard, 12h waits, DTA > 4h) and a page-scoped Reset button using bookmarks, so resetting does not navigate away.'
    },
    {
    heading: 'Design System',
    content: 'NHS palette and typography, soft card borders, accessible contrast, and consistent legends. KPI micro-badges reinforce semantics (“in scope”, “long waits”, “flow pressure”). The Trends combo locks the secondary axis to 0–100% for 4h %, and distributions are stacked for long-wait visuals.'
    },
    {
    heading: 'Data Governance',
    content: 'Data lineage is explicit: NHS England monthly publication → curated ProviderLevelRaw. The Dates table is generated from the actual data window, preventing invalid months in the slicer. Numerator/denominator columns in tables support reconciliation. The model is ready for scheduled refresh and incremental month ingestion.'
    },
    {
    heading: 'What I Shipped',
    content: 'A four-page Power BI report with shared slicers and page-local Help/Reset; semantic “Who” measures applied consistently; Overview doughnut (Within vs Over 4h) with an audit table; Long Waits stacked chart and table; Admissions conversion % chart and grid; Trends combo chart with a fixed 0–100% secondary axis and a month table; peer drill to individual trusts while retaining England and provider benchmarks.'
    },
    {
    heading: 'What I’d Ship Next',
    content: 'Automated monthly ingestion from NHS England CSVs (Power Query) with incremental refresh; page-level CSV exports honoring slicers; parameterised peer sets for reuse across ICSs; anomaly banners where Type-3 variation may skew waits; an Executive Summary bookmark with month-on-month deltas; full accessibility pass.'
    },
    {
    heading: 'Reference List (selected)',
    content: 'NHS England — A&E Waiting Times & Activity (FY25/26). NHS identity standards (palette/typography). DAX patterns for conditional “Who” measures and month dimensions.'
    }
    ]
    }
       
  // …other projects…
]
