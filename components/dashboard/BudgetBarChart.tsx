"use client";

import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { BudgetOverview } from "@/lib/types";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function BudgetBarChart({
  data,
  isLoading
}: {
  data?: BudgetOverview[];
  isLoading?: boolean;
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Budget Overview</h3>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          <div className="grid h-48 grid-cols-6 items-end gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-full w-full" style={{ height: `${40 + index * 12}px` }} />
            ))}
          </div>
          <div className="flex justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-2 w-10" />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data ?? []} margin={{ left: 12, right: 12 }}>
              <XAxis
                dataKey="title"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tick={{ fill: "#8b95aa" }}
              />
              <YAxis tickLine={false} axisLine={false} fontSize={12} tick={{ fill: "#8b95aa" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111620",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px"
                }}
                labelStyle={{ color: "#dde4f0" }}
                itemStyle={{ color: "#dde4f0" }}
              />
              <Legend wrapperStyle={{ color: "#8b95aa" }} />
              <Bar dataKey="budget_total" fill="#00d4ff" radius={[6, 6, 0, 0]} name="Total" />
              <Bar dataKey="budget_spent" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
