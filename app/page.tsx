import Link from "next/link";

const tocItems = [
  { id: "overview", label: "What is it?" },
  { id: "features", label: "Key Features" },
  { id: "architecture", label: "Architecture" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & API" },
  { id: "ai", label: "AI Capabilities" },
  { id: "setup", label: "Setup Guide" },
  { id: "tech", label: "Tech Stack" }
];

const heroStats = [
  { value: "2", label: "Services" },
  { value: "9", label: "App Routes" },
  { value: "20+", label: "API Endpoints" },
  { value: "AI", label: "Powered" }
];

const featureCards = [
  {
    title: "Live Dashboard",
    description: "Total campaigns, budget spent, influencer reach, and performance trends in real time.",
    tone: "from-cyan/20 via-cyan/5 to-transparent"
  },
  {
    title: "Campaign Management",
    description: "Create, edit, and organize campaigns with status and platform filters.",
    tone: "from-violet/20 via-violet/5 to-transparent"
  },
  {
    title: "Influencer Profiles",
    description: "Store profiles, link to campaigns, and refresh YouTube stats instantly.",
    tone: "from-emerald/20 via-emerald/5 to-transparent"
  },
  {
    title: "AI Writing Tools",
    description: "Generate briefs and title/hashtag suggestions with structured inputs.",
    tone: "from-amber/20 via-amber/5 to-transparent"
  },
  {
    title: "Analytics Charts",
    description: "Visualize budget allocation, platform mix, and performance trends.",
    tone: "from-rose/20 via-rose/5 to-transparent"
  },
  {
    title: "Campaign–Influencer Links",
    description: "Associate multiple influencers per campaign and track each relationship.",
    tone: "from-cyan/20 via-cyan/5 to-transparent"
  }
];

const appRoutes = [
  { page: "Landing", url: "/", purpose: "Marketing homepage and entry point for new users" },
  { page: "Dashboard", url: "/dashboard", purpose: "KPI cards, charts, and AI-generated insights" },
  { page: "Campaigns List", url: "/campaigns", purpose: "Browse all campaigns with filter options" },
  { page: "New Campaign", url: "/campaigns/new", purpose: "Form to create a campaign" },
  { page: "Campaign Detail", url: "/campaigns/[id]", purpose: "Full view of a single campaign and its influencers" },
  { page: "Edit Campaign", url: "/campaigns/[id]/edit", purpose: "Modify campaign settings and budget" },
  { page: "Influencers List", url: "/influencers", purpose: "Browse all influencers" },
  { page: "New Influencer", url: "/influencers/new", purpose: "Add a new influencer profile" },
  { page: "Influencer Detail", url: "/influencers/[id]", purpose: "Profile, stats, and associated campaigns" }
];

const campaignEndpoints = [
  { method: "GET", path: "/campaigns/", purpose: "List all campaigns (supports filtering by status & platform)" },
  { method: "POST", path: "/campaigns/", purpose: "Create a new campaign" },
  { method: "GET", path: "/campaigns/{id}/", purpose: "Get a single campaign's full details" },
  { method: "PATCH", path: "/campaigns/{id}/", purpose: "Update campaign fields (partial update)" },
  { method: "DELETE", path: "/campaigns/{id}/", purpose: "Remove a campaign" }
];

const influencerEndpoints = [
  { method: "GET", path: "/influencers/", purpose: "List all influencers" },
  { method: "POST", path: "/influencers/", purpose: "Add a new influencer" },
  { method: "GET", path: "/influencers/{id}/", purpose: "View an influencer's profile and stats" },
  { method: "PATCH", path: "/influencers/{id}/", purpose: "Update influencer details" },
  { method: "POST", path: "/influencers/{id}/refresh_stats/", purpose: "Pull latest YouTube channel stats" }
];

const dashboardEndpoints = [
  { path: "/dashboard/summary/", purpose: "Totals: campaigns, influencers, budget" },
  { path: "/dashboard/campaigns-by-status/", purpose: "Count per status (active, paused, completed)" },
  { path: "/dashboard/budget-overview/", purpose: "Spent vs. remaining budget data" },
  { path: "/dashboard/campaigns-over-time/", purpose: "Time-series data for chart" },
  { path: "/dashboard/platform-breakdown/", purpose: "Distribution across YouTube, Instagram, TikTok" },
  { path: "/dashboard/ai-insights/", purpose: "AI-generated summary of current performance" }
];

const frontendStack = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "React Query",
  "Axios",
  "Recharts",
  "Radix UI",
  "Lucide Icons"
];

const backendStack = [
  "Python 3",
  "Django 4.2",
  "Django REST Framework",
  "PostgreSQL / SQLite",
  "Gunicorn (prod)"
];

const apiStack = ["OpenAI API", "YouTube Data API v3"];

const methodTone = {
  GET: "text-cyan bg-cyan/10 border-cyan/30",
  POST: "text-amber bg-amber/10 border-amber/30",
  PATCH: "text-violet bg-violet/10 border-violet/30",
  DELETE: "text-rose bg-rose/10 border-rose/30"
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 font-display text-lg font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-xs font-bold text-black shadow-[0_0_20px_rgba(0,212,255,0.35)]">
              IT
            </span>
            Influencer Tracker
          </div>
          <div className="hidden items-center gap-8 text-sm text-text-muted md:flex">
            {tocItems.slice(0, 4).map((item) => (
              <a key={item.id} className="transition hover:text-text" href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="rounded-full bg-cyan px-4 py-2 text-xs font-semibold text-black shadow-[0_0_24px_rgba(0,212,255,0.35)] transition hover:-translate-y-0.5"
              href="/dashboard"
            >
              Launch workspace
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-20">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.14),transparent_70%)]" />
          <div className="pointer-events-none absolute left-16 top-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)]" />
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Influencer Tracker
              <span className="block bg-gradient-to-r from-cyan via-violet to-emerald bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="max-w-2xl text-base text-text-muted md:text-lg">
              A technical overview of the application, the architecture behind it, and the exact UI sections used
              to manage influencer campaigns end to end.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(0,212,255,0.35)] transition hover:-translate-y-0.5"
                href="/dashboard"
              >
                Enter dashboard
              </Link>
              <a
                className="rounded-full border border-border px-6 py-3 text-sm text-text transition hover:border-border-strong hover:bg-surface-2"
                href="#overview"
              >
                See the system
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-[0.2em] text-text-dim">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="font-display text-2xl font-semibold text-text">{stat.value}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">Contents</p>
          <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">What’s in this document</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {tocItems.map((item, index) => (
              <a
                key={item.id}
                className="rounded-2xl border border-border bg-surface-1 p-4 transition hover:-translate-y-0.5 hover:border-cyan/40"
                href={`#${item.id}`}
              >
                <span className="font-display text-2xl text-cyan/70">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold text-text">{item.label}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="overview" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">01 — Overview</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">What is Influencer Tracker?</h2>
          <p className="mt-4 max-w-3xl text-sm text-text-muted md:text-base">
            Influencer Tracker is a web application for marketing teams to manage influencer campaigns in one place.
            It replaces manual tracking with live dashboards, structured campaign data, and AI-generated creative
            briefs.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-6">
              <p className="text-sm font-semibold text-text">Who is it for?</p>
              <p className="mt-2 text-sm text-text-muted">
                Marketing managers, brand teams, and campaign coordinators working across YouTube, Instagram, and
                TikTok.
              </p>
            </div>
            <div className="rounded-2xl border border-violet/30 bg-violet/10 p-6">
              <p className="text-sm font-semibold text-text">What problem does it solve?</p>
              <p className="mt-2 text-sm text-text-muted">
                Centralizes campaign performance, budget pacing, and creator relationships with AI-powered content
                generation.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/10 p-6 text-sm text-text">
            In practice: teams open the app, see campaign health, drill into influencer profiles, monitor budgets,
            and generate briefs without switching tools.
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">02 — Features</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">What can it do?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-surface-1 p-6">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${feature.tone}`} />
                <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="architecture" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">03 — Architecture</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">How it’s structured</h2>
          <p className="mt-4 max-w-3xl text-sm text-text-muted md:text-base">
            The platform is split into a Next.js frontend and a Django REST API backend. The frontend fetches data
            from the API, which stores data in SQLite or PostgreSQL and connects to third-party services.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface-1 p-6">
            <span className="text-xs uppercase tracking-[0.3em] text-text-dim">User’s Browser</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan">
                Next.js Frontend
              </div>
            </div>
            <span className="text-text-dim">↕</span>
            <span className="text-xs uppercase tracking-[0.3em] text-text-dim">REST API (HTTP)</span>
            <span className="text-text-dim">↕</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-xl border border-violet/30 bg-violet/10 px-4 py-3 text-sm text-violet">
                Django Backend
              </div>
            </div>
            <span className="text-text-dim">↕</span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">
                PostgreSQL / SQLite
              </div>
              <div className="rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber">
                OpenAI API
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted">
                YouTube Data API
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-text-dim">Example flow</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-text-muted">
              <span className="rounded-full border border-border px-3 py-1">User clicks “View Campaigns”</span>
              <span className="text-text-dim">→</span>
              <span className="rounded-full border border-border px-3 py-1">Frontend calls `GET /campaigns/`</span>
              <span className="text-text-dim">→</span>
              <span className="rounded-full border border-border px-3 py-1">Backend queries DB</span>
              <span className="text-text-dim">→</span>
              <span className="rounded-full border border-border px-3 py-1">Returns JSON list</span>
              <span className="text-text-dim">→</span>
              <span className="rounded-full border border-border px-3 py-1">UI renders table</span>
            </div>
          </div>
        </section>

        <section id="frontend" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">04 — Frontend</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">The User Interface</h2>
          <p className="mt-4 max-w-3xl text-sm text-text-muted md:text-base">
            Built with Next.js 14 and React, the frontend uses React Query for data fetching and caching. The dashboard
            is the landing experience after login.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface-1">
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-semibold">Performance Overview</p>
                <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs text-emerald">
                  Live
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {[
                  { label: "Campaigns", value: "24", accent: "text-cyan" },
                  { label: "Influencers", value: "87", accent: "text-violet" },
                  { label: "Budget Used", value: "$48k", accent: "text-amber" },
                  { label: "Active", value: "9", accent: "text-emerald" }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">{item.label}</p>
                    <p className={`mt-2 font-display text-xl font-semibold ${item.accent}`}>{item.value}</p>
                    <p className="mt-1 text-xs text-text-muted">Live metrics</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-4">
                <p className="text-xs text-text-muted">Campaigns created over time</p>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[40, 65, 50, 80, 70, 90, 75].map((height) => (
                    <div
                      key={height}
                      className="flex-1 rounded-md bg-gradient-to-t from-cyan/70 to-cyan/20"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h3 className="mt-10 font-display text-2xl font-semibold">Application Pages</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.2em] text-text-dim">
                <tr>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">URL</th>
                  <th className="px-4 py-3">What it does</th>
                </tr>
              </thead>
              <tbody>
                {appRoutes.map((route) => (
                  <tr key={route.url} className="border-t border-border bg-surface-1">
                    <td className="px-4 py-3 font-semibold text-text">{route.page}</td>
                    <td className="px-4 py-3 text-cyan">{route.url}</td>
                    <td className="px-4 py-3 text-text-muted">{route.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-6 text-sm text-text-muted">
            UI components use Radix UI for accessibility, Recharts for data visualizations, and Lucide Icons for
            iconography. Styling is handled with Tailwind CSS.
          </div>
        </section>

        <section id="backend" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">05 — Backend & API</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">The Server & Data Layer</h2>
          <p className="mt-4 max-w-3xl text-sm text-text-muted md:text-base">
            The backend is a Django REST Framework API under <span className="text-text">/api/v1/</span>. It stores
            campaign data, handles integrations, and powers AI endpoints.
          </p>

          <h3 className="mt-8 font-display text-2xl font-semibold">Campaign Endpoints</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.2em] text-text-dim">
                <tr>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">What it does</th>
                </tr>
              </thead>
              <tbody>
                {campaignEndpoints.map((endpoint) => (
                  <tr key={endpoint.path} className="border-t border-border bg-surface-1">
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cyan">{endpoint.path}</td>
                    <td className="px-4 py-3 text-text-muted">{endpoint.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 font-display text-2xl font-semibold">Influencer Endpoints</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.2em] text-text-dim">
                <tr>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">What it does</th>
                </tr>
              </thead>
              <tbody>
                {influencerEndpoints.map((endpoint) => (
                  <tr key={endpoint.path} className="border-t border-border bg-surface-1">
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cyan">{endpoint.path}</td>
                    <td className="px-4 py-3 text-text-muted">{endpoint.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 font-display text-2xl font-semibold">Dashboard Analytics</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-[11px] uppercase tracking-[0.2em] text-text-dim">
                <tr>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Returns</th>
                </tr>
              </thead>
              <tbody>
                {dashboardEndpoints.map((endpoint) => (
                  <tr key={endpoint.path} className="border-t border-border bg-surface-1">
                    <td className="px-4 py-3 text-cyan">{endpoint.path}</td>
                    <td className="px-4 py-3 text-text-muted">{endpoint.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="ai" className="mx-auto max-w-6xl px-6 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">06 — AI Capabilities</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Built-in AI Tools</h2>
          <p className="mt-4 max-w-3xl text-sm text-text-muted md:text-base">
            Two AI-powered writing tools help teams move faster without prompt engineering.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-amber/30 bg-amber/10 p-6">
              <p className="text-xl">✍️</p>
              <h3 className="mt-3 font-display text-lg font-semibold">Campaign Brief Generator</h3>
              <p className="mt-3 text-sm text-text-muted">
                Provide product name, audience, platform, tone, and budget to generate a structured brief.
              </p>
              <p className="mt-4 text-xs text-text-dim">Endpoint: POST /ai/generate-brief/</p>
            </div>
            <div className="rounded-2xl border border-amber/30 bg-amber/10 p-6">
              <p className="text-xl">🏷️</p>
              <h3 className="mt-3 font-display text-lg font-semibold">Title & Hashtag Suggester</h3>
              <p className="mt-3 text-sm text-text-muted">
                Describe content and platform to get optimized title and hashtag options.
              </p>
              <p className="mt-4 text-xs text-text-dim">Endpoint: POST /ai/suggest-titles-hashtags/</p>
            </div>
          </div>
        </section>

        <section id="tech" className="mx-auto max-w-6xl px-6 pb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan">07 — Tech Stack</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Technologies used</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-1 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-text-dim">Frontend</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {frontendStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface-1 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-text-dim">Backend</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {backendStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs text-violet"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface-1 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-text-dim">Third-Party APIs</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {apiStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs text-amber"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-6 text-sm text-text-muted">
            Requirements: Node.js 18.17+ for the frontend, Python 3 for the backend. OpenAI and YouTube API keys are
            required for AI and stats refresh features.
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-text-dim">
          <span>© 2026 Influencer Tracker</span>
          <div className="flex gap-6">
            <span>Security</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
