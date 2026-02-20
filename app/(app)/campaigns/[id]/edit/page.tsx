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
        <Skeleton className="h-64" />
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
