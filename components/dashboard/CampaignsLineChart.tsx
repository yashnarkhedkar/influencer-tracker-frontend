"use client";

import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { CampaignsOverTime } from "@/lib/types";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CampaignsLineChart({
  data,
  isLoading
}: {
  data?: CampaignsOverTime[];
  isLoading?: boolean;
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Campaigns Over Time</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data ?? []} margin={{ left: 12, right: 12 }}>
              <XAxis
                dataKey="month"
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
              <Line type="monotone" dataKey="count" stroke="#00d4ff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
