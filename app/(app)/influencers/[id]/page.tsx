"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import YouTubeStatsPanel from "@/components/influencers/YouTubeStatsPanel";
import { useDeleteInfluencer, useInfluencer, useRefreshInfluencerStats } from "@/hooks/useInfluencers";
import { useToast } from "@/components/providers/ToastProvider";
import { useQuery } from "@tanstack/react-query";
import { listCampaignInfluencers } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export default function InfluencerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const influencerId = params?.id as string;

  const influencerQuery = useInfluencer(influencerId);
  const refreshMutation = useRefreshInfluencerStats();
  const deleteMutation = useDeleteInfluencer();

  const assignmentsQuery = useQuery({
    queryKey: ["campaignInfluencers"],
    queryFn: () => listCampaignInfluencers()
  });

  const safeAssignments = Array.isArray(assignmentsQuery.data) ? assignmentsQuery.data : [];
  const assignments = safeAssignments.filter((assignment) => {
    if (typeof assignment.influencer === "string") {
      return assignment.influencer === influencerId;
    }
    return assignment.influencer?.id === influencerId;
  });

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync(influencerId);
      toast.push("Stats refreshed", "success");
    } catch (error) {
      toast.push("Failed to refresh stats", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(influencerId);
      toast.push("Influencer deleted", "success");
      router.push("/influencers");
    } catch (error) {
      toast.push("Failed to delete influencer", "error");
    }
  };

  const influencer = influencerQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={influencer?.name ?? "Influencer"}
        subtitle="Influencer profile, stats, and campaign participation."
        action={
          <div className="flex gap-3">
            <DialogRoot>
              <DialogTrigger asChild>
                <Button className="bg-rose text-black hover:-translate-y-0.5">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete influencer?</DialogTitle>
                  <DialogDescription>This cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button className="bg-surface-3 text-text shadow-none hover:-translate-y-0.5">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button onClick={handleDelete} className="bg-rose text-black hover:-translate-y-0.5">
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </DialogRoot>
          </div>
        }
      />

      {influencerQuery.isLoading ? (
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </Card>
      ) : influencer ? (
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-text-dim">Handle</p>
              <p className="mt-1 text-sm font-semibold text-text">{influencer.handle}</p>
            </div>
            <div>
              <p className="text-sm text-text-dim">Platform</p>
              <p className="mt-1 text-sm font-semibold text-text">{influencer.platform}</p>
            </div>
            <div>
              <p className="text-sm text-text-dim">Subscribers</p>
              <p className="mt-1 text-sm font-semibold text-text">{influencer.subscribers}</p>
            </div>
          </div>
        </Card>
      ) : null}

      {influencer?.platform === "youtube" ? (
        <YouTubeStatsPanel
          influencer={influencer}
          onRefresh={handleRefresh}
          refreshing={refreshMutation.isPending}
        />
      ) : null}

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-text">Campaigns</h3>
        {assignmentsQuery.isLoading ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : assignments.length > 0 ? (
          <div className="mt-4 space-y-3">
            {assignments.map((assignment) => {
              const campaign = typeof assignment.campaign === "string" ? null : assignment.campaign;
              return (
                <div key={assignment.id} className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-text">{campaign?.title ?? "Campaign"}</p>
                      <p className="text-xs text-text-dim">Status: {assignment.status}</p>
                    </div>
                    <div className="text-xs text-text-dim">
                      Fee: {formatCurrency(Number(assignment.agreed_fee))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-dim">No campaigns assigned yet.</p>
        )}
      </Card>
    </div>
  );
}
