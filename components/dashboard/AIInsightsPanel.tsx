"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";

export default function AIInsightsPanel({
  insights,
  isLoading,
  onRefresh,
  isRefreshing
}: {
  insights?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}) {
  const lines = insights
    ? insights
        .split("\n")
        .map((line) => line.replace(/^•\s*/, ""))
        .filter(Boolean)
    : [];

  return (
    <Card className="p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-text">AI Insights</h3>
          <p className="text-sm text-text-dim">Actionable trends based on live campaign data.</p>
        </div>
        <Button onClick={onRefresh} disabled={isRefreshing} className="bg-violet text-black hover:-translate-y-0.5">
          {isRefreshing ? "Refreshing..." : "Refresh Insights"}
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : (
        <ul className="space-y-2 text-sm text-text-muted">
          {lines.length === 0 ? (
            <li>No insights yet. Refresh to generate AI guidance.</li>
          ) : (
            lines.map((line, index) => <li key={index}>• {line}</li>)
          )}
        </ul>
      )}
    </Card>
  );
}
