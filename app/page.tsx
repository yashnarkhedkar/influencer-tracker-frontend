import Link from "next/link";

const stats = [
  { value: "2.4K", label: "Creators Tracked" },
  { value: "$18.2M", label: "Managed Budget" },
  { value: "94%", label: "Avg. ROI" }
];

const features = [
  {
    title: "Real-time campaign pulse",
    description: "Track every activation with live KPIs, budget pacing, and platform lift.",
    tone: "bg-cyan/10 text-cyan"
  },
  {
    title: "Creator performance DNA",
    description: "Audience fit, growth velocity, and engagement quality in one snapshot.",
    tone: "bg-violet/10 text-violet"
  },
  {
    title: "Budget intelligence",
    description: "Automated pacing alerts to protect margin and reallocate spend.",
    tone: "bg-rose/10 text-rose"
  },
  {
    title: "AI-ready briefs",
    description: "Generate briefing kits and creative guardrails for every launch.",
    tone: "bg-emerald/10 text-emerald"
  },
  {
    title: "Cross-platform lift",
    description: "Measure TikTok, Instagram, and YouTube impact side-by-side.",
    tone: "bg-amber/10 text-amber"
  },
  {
    title: "Stakeholder dashboards",
    description: "Share polished snapshots with leadership or client partners.",
    tone: "bg-cyan/10 text-cyan"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 font-display text-lg font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-xs font-bold text-black shadow-[0_0_20px_rgba(0,212,255,0.35)]">
              FX
            </span>
            Fluxr
          </div>
          <div className="hidden items-center gap-8 text-sm text-text-muted md:flex">
            <a className="transition hover:text-text" href="#features">
              Product
            </a>
            <a className="transition hover:text-text" href="#analytics">
              Analytics
            </a>
            <a className="transition hover:text-text" href="#insights">
              Insights
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="rounded-full border border-border px-4 py-2 text-xs text-text-muted transition hover:border-border-strong hover:text-text"
              href="/dashboard"
            >
              Sign in
            </Link>
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
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pb-16 pt-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-1 text-xs text-text-muted">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
            Influencer intelligence in motion
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Own every creator move with
            <span className="block bg-gradient-to-r from-cyan via-violet to-rose bg-clip-text text-transparent">
              Fluxr Intelligence
            </span>
          </h1>
          <p className="max-w-2xl text-base text-text-muted md:text-lg">
            Build, track, and optimize influencer campaigns with live performance intelligence, budget clarity,
            and AI-powered insights designed for modern growth teams.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(0,212,255,0.35)] transition hover:-translate-y-0.5"
              href="/dashboard"
            >
              Start tracking
            </Link>
            <button className="rounded-full border border-border px-6 py-3 text-sm text-text transition hover:border-border-strong hover:bg-surface-2">
              Watch demo
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-[0.2em] text-text-dim">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-display text-2xl font-semibold text-text">{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </section>

        <section id="analytics" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 rounded-md border border-border bg-surface-3 px-3 py-1 text-xs text-text-dim">
                https://app.fluxr.ai/dashboard
              </div>
            </div>
            <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
              <div className="border-r border-border bg-surface-2 p-4">
                <div className="mb-4 flex items-center gap-2 font-display text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-cyan to-violet text-[10px] font-bold text-black">
                    FX
                  </span>
                  Fluxr Core
                </div>
                <div className="space-y-2 text-xs text-text-muted">
                  <div className="rounded-md bg-cyan/10 px-3 py-2 text-cyan">Dashboard</div>
                  <div className="px-3 py-2">Campaigns</div>
                  <div className="px-3 py-2">Influencers</div>
                  <div className="px-3 py-2">Insights</div>
                </div>
              </div>
              <div className="space-y-6 p-6">
                <div>
                  <p className="font-display text-lg font-semibold">Live performance overview</p>
                  <p className="text-xs text-text-dim">Real-time KPIs across campaigns and platforms.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    { label: "Active campaigns", value: "42", color: "text-cyan" },
                    { label: "Spend pace", value: "78%", color: "text-violet" },
                    { label: "Avg. CTR", value: "3.8%", color: "text-emerald" },
                    { label: "TikTok lift", value: "+22%", color: "text-amber" }
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-border bg-surface-2 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">{card.label}</p>
                      <p className={`mt-2 font-display text-xl font-semibold ${card.color}`}>{card.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-xs text-text-muted">Campaign momentum</p>
                    <div className="mt-4 h-24 rounded-lg bg-gradient-to-r from-cyan/30 via-violet/30 to-rose/30" />
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-xs text-text-muted">Platform split</p>
                    <div className="mt-4 h-24 rounded-lg bg-gradient-to-r from-emerald/30 via-amber/30 to-cyan/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan">Product highlights</div>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold md:text-4xl">
            Designed for modern influencer operations.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-surface-1 p-8 transition hover:bg-surface-2">
                <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.tone}`}>
                  ◈
                </div>
                <p className="font-display text-lg font-semibold">{feature.title}</p>
                <p className="mt-3 text-sm text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="insights" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1 p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-dim">Next move</p>
                <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  Upgrade your creator intelligence today.
                </h3>
                <p className="mt-3 max-w-xl text-sm text-text-muted">
                  Fluxr blends performance, finance, and creator intelligence to keep every activation in sync.
                </p>
              </div>
              <Link
                className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(0,212,255,0.35)] transition hover:-translate-y-0.5"
                href="/dashboard"
              >
                Launch dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-text-dim">
          <span>© 2026 Fluxr Intelligence</span>
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
