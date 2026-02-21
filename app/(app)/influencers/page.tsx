"use client";

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/button";
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
          <Link href="/influencers/new">
            <Button>Add Influencer</Button>
          </Link>
        }
      />

      {influencersQuery.isLoading || influencersQuery.isFetching ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-36" />
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
