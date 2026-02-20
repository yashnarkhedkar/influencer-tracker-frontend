"use client";

import Image from "next/image";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Influencer } from "@/lib/types";
import { formatRelativeTime } from "@/lib/format";

export default function YouTubeStatsPanel({
  influencer,
  onRefresh,
  refreshing
}: {
  influencer: Influencer;
  onRefresh: () => void;
  refreshing?: boolean;
}) {
  const formatter = new Intl.NumberFormat("en-US");

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-text">YouTube Stats</h3>
          <p className="text-xs text-text-dim">
            Last fetched:{" "}
            {influencer.api_last_fetched ? formatRelativeTime(influencer.api_last_fetched) : "Never"}
          </p>
        </div>
        <Button onClick={onRefresh} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh Stats"}
        </Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase text-text-dim">Subscribers</p>
          <p className="mt-2 font-display text-lg font-semibold text-text">
            {formatter.format(influencer.subscribers)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase text-text-dim">Total Views</p>
          <p className="mt-2 font-display text-lg font-semibold text-text">
            {formatter.format(influencer.total_views)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2 p-4">
          <p className="text-xs uppercase text-text-dim">Video Count</p>
          <p className="mt-2 font-display text-lg font-semibold text-text">
            {formatter.format(influencer.video_count)}
          </p>
        </div>
        <div className="flex items-center justify-center rounded-lg border border-border bg-surface-2 p-4">
          {influencer.channel_thumbnail ? (
            <Image
              src={influencer.channel_thumbnail}
              alt={influencer.name}
              width={72}
              height={72}
              className="rounded-full"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-surface-3" />
          )}
        </div>
      </div>
    </Card>
  );
}
