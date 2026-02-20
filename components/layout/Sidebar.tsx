"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, FolderKanban, Users, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart2 },
  { label: "Campaigns", href: "/campaigns", icon: FolderKanban },
  { label: "Influencers", href: "/influencers", icon: Users }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-surface-1 lg:flex">
      <div className="px-6 py-6">
        <div className="flex items-center gap-3 font-display text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-xs font-bold text-black shadow-[0_0_18px_rgba(0,212,255,0.35)]">
            FX
          </span>
          Fluxr
        </div>
      </div>
      <div className="px-6 pb-2 text-[10px] uppercase tracking-[0.2em] text-text-dim">Overview</div>
      <div className="px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                isActive
                  ? "border border-cyan/20 bg-cyan/10 text-cyan"
                  : "text-text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto border-t border-border px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet text-xs font-semibold text-black">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-text">Avery Denton</p>
            <p className="text-xs text-text-dim">Growth Lead</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-3 py-2 text-xs text-text-dim transition hover:border-border-strong hover:text-text"
        >
          <ArrowLeft size={14} />
          Back to landing
        </Link>
      </div>
    </aside>
  );
}
