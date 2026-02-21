"use client";

import PageHeader from "@/components/layout/PageHeader";
import KPICard from "@/components/dashboard/KPICard";
import StatusDonutChart from "@/components/dashboard/StatusDonutChart";
import BudgetBarChart from "@/components/dashboard/BudgetBarChart";
import CampaignsLineChart from "@/components/dashboard/CampaignsLineChart";
import PlatformPieChart from "@/components/dashboard/PlatformPieChart";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import Skeleton from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import {
  useAiInsights,
  useBudgetOverview,
  useCampaignsByStatus,
  useCampaignsOverTime,
  useDashboardSummary,
  usePlatformBreakdown
} from "@/hooks/useDashboard";
import { BarChart3, PieChart, Wallet, Users } from "lucide-react";

export default function DashboardPage() {
  const summary = useDashboardSummary();
  const byStatus = useCampaignsByStatus();
  const budget = useBudgetOverview();
  const overTime = useCampaignsOverTime();
  const platform = usePlatformBreakdown();
  const ai = useAiInsights();
  const summaryLoading = summary.isLoading || summary.isFetching;
  const byStatusLoading = byStatus.isLoading || byStatus.isFetching;
  const budgetLoading = budget.isLoading || budget.isFetching;
  const overTimeLoading = overTime.isLoading || overTime.isFetching;
  const platformLoading = platform.isLoading || platform.isFetching;
  const aiLoading = ai.isLoading || ai.isFetching;
  const aiRefreshing = ai.isFetching && !ai.isLoading;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Live campaign performance, budgets, and platform insights."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryLoading ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-28" />)
        ) : (
          <>
            <KPICard
              title="Total Campaigns"
              value={summary.data?.total_campaigns ?? 0}
              icon={<BarChart3 size={18} />}
              accent="bg-cyan"
            />
            <KPICard
              title="Active Campaigns"
              value={summary.data?.active_campaigns ?? 0}
              icon={<PieChart size={18} />}
              accent="bg-emerald"
            />
            <KPICard
              title="Total Budget"
              value={formatCurrency(summary.data?.total_budget ?? 0)}
              icon={<Wallet size={18} />}
              accent="bg-violet"
            />
            <KPICard
              title="Total Influencers"
              value={summary.data?.total_influencers ?? 0}
              icon={<Users size={18} />}
              accent="bg-amber"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusDonutChart data={byStatus.data} isLoading={byStatusLoading} />
        <BudgetBarChart data={budget.data} isLoading={budgetLoading} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CampaignsLineChart data={overTime.data} isLoading={overTimeLoading} />
        <PlatformPieChart data={platform.data} isLoading={platformLoading} />
      </div>

      <AIInsightsPanel
        insights={ai.data?.insights}
        isLoading={aiLoading}
        onRefresh={() => ai.refetch()}
        isRefreshing={aiRefreshing}
      />
    </div>
  );
}
