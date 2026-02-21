"use client";

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import InfluencerCard from "@/components/influencers/InfluencerCard";
import { useInfluencers } from "@/hooks/useInfluencers";

export default function InfluencersPage() {
  const influencersQuery = useInfluencers();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Influencers"
        subtitle="Track key talent and performance across platforms."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className="bg-transparent text-text shadow-none ring-1 ring-border hover:-translate-y-0"
              onClick={() => influencersQuery.refetch()}
              disabled={influencersQuery.isFetching}
            >
              {influencersQuery.isFetching ? "Refreshing..." : "Refresh"}
            </Button>
            <Link href="/influencers/new">
              <Button>Add Influencer</Button>
            </Link>
          </div>
        }
      />

      {influencersQuery.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-28" />
              </div>
            </Card>
          ))}
        </div>
      ) : influencersQuery.data && influencersQuery.data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {influencersQuery.data.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface-1 p-10 text-center text-sm text-text-dim">
          <p className="text-base font-semibold text-text">No influencers yet</p>
          <p className="mt-2">Add your first influencer to start tracking stats.</p>
        </div>
      )}
    </div>
  );
}
