"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import CampaignForm from "@/components/campaigns/CampaignForm";
import Skeleton from "@/components/ui/skeleton";
import { useCampaign, useUpdateCampaign } from "@/hooks/useCampaigns";
import { useToast } from "@/components/providers/ToastProvider";

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const campaignId = params?.id as string;
  const campaignQuery = useCampaign(campaignId);
  const updateMutation = useUpdateCampaign(campaignId);

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      await updateMutation.mutateAsync(values);
      toast.push("Campaign updated", "success");
      router.push(`/campaigns/${campaignId}`);
    } catch (error) {
      toast.push("Failed to update campaign", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Campaign" subtitle="Update campaign details and budget." />
      {campaignQuery.isLoading ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface-1 p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
              <div className="lg:col-span-2 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`date-${index}`} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      ) : (
        <CampaignForm
          initialValues={campaignQuery.data}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          loading={updateMutation.isPending}
        />
      )}
    </div>
  );
}
