"use client";

import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { PlatformBreakdown } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  youtube: "#f43f5e",
  instagram: "#8b5cf6",
  tiktok: "#00d4ff"
};

export default function PlatformPieChart({
  data,
  isLoading
}: {
  data?: PlatformBreakdown[];
  isLoading?: boolean;
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Platform Breakdown</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data ?? []} dataKey="count" nameKey="platform" outerRadius={90}>
                {(data ?? []).map((entry) => (
                  <Cell key={entry.platform} fill={COLORS[entry.platform]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111620",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px"
                }}
                labelStyle={{ color: "#dde4f0" }}
                itemStyle={{ color: "#dde4f0" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
