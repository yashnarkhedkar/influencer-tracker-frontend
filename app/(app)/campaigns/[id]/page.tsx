"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";
import { useCampaign, useCampaignInfluencers, useDeleteCampaign } from "@/hooks/useCampaigns";
import { useToast } from "@/components/providers/ToastProvider";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const campaignId = params?.id as string;
  const campaignQuery = useCampaign(campaignId);
  const influencersQuery = useCampaignInfluencers(campaignId);
  const deleteMutation = useDeleteCampaign();

  const campaign = campaignQuery.data;

  const handleDelete = async () => {
    if (!campaignId) return;
    try {
      await deleteMutation.mutateAsync(campaignId);
      toast.push("Campaign deleted", "success");
      router.push("/campaigns");
    } catch (error) {
      toast.push("Failed to delete campaign", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={campaign?.title ?? "Campaign"}
        subtitle="Campaign overview and assigned influencers."
        action={
          <div className="flex gap-3">
            <Link href={`/campaigns/${campaignId}/edit`}>
              <Button className="bg-surface-3 text-text shadow-none hover:-translate-y-0.5">Edit</Button>
            </Link>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button className="bg-rose text-black hover:-translate-y-0.5">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete campaign?</DialogTitle>
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

      {campaignQuery.isLoading ? (
        <Skeleton className="h-64" />
      ) : campaign ? (
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-text-dim">Platform</p>
              <p className="mt-1 text-sm font-semibold text-text">{campaign.platform}</p>
            </div>
            <div>
              <p className="text-sm text-text-dim">Status</p>
              <div className="mt-2">
                <CampaignStatusBadge status={campaign.status} />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-dim">Budget</p>
              <p className="mt-1 text-sm font-semibold text-text">
                {formatCurrency(Number(campaign.budget_spent))} spent of {formatCurrency(Number(campaign.budget_total))}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-dim">Dates</p>
              <p className="mt-1 text-sm font-semibold text-text">
                {formatDate(campaign.start_date)} - {formatDate(campaign.end_date)}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-text-dim">Description</p>
              <p className="mt-2 text-sm text-text-muted whitespace-pre-line">{campaign.description || "No description"}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text">Assigned Influencers</h3>
        </div>
        {influencersQuery.isLoading ? (
          <Skeleton className="h-32" />
        ) : influencersQuery.data && influencersQuery.data.length > 0 ? (
          <div className="space-y-3">
            {influencersQuery.data.map((assignment) => {
              const influencer = typeof assignment.influencer === "string" ? null : assignment.influencer;
              return (
                <div key={assignment.id} className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-text">
                        {influencer?.name ?? "Influencer"}
                      </p>
                      <p className="text-xs text-text-dim">
                        {influencer?.handle ?? ""}
                      </p>
                    </div>
                    <div className="text-xs text-text-dim">
                      Fee: {formatCurrency(Number(assignment.agreed_fee))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-text-dim">Status: {assignment.status}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-text-dim">No influencers assigned yet.</p>
        )}
      </Card>
    </div>
  );
}
