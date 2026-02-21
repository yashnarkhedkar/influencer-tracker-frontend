"use client";

import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { CampaignsByStatus } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS: Record<string, string> = {
  draft: "#8b95aa",
  active: "#10b981",
  paused: "#f59e0b",
  completed: "#00d4ff"
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#8b95aa"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[10px] font-medium uppercase tracking-wider"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export default function StatusDonutChart({
  data,
  isLoading
}: {
  data?: CampaignsByStatus[];
  isLoading?: boolean;
}) {
  const chartData = (data ?? []).map(item => ({
    ...item,
    name: item.status.charAt(0) + item.status.slice(1)
  }));

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Campaigns By Status</h3>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Skeleton className="h-44 w-44 rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-20" />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                label={renderCustomizedLabel}
                labelLine={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.status} fill={COLORS[entry.status]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111620",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  fontSize: "12px"
                }}
                labelStyle={{ color: "#dde4f0" }}
                itemStyle={{ color: "#dde4f0" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
