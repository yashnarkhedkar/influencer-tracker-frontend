"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import CampaignForm from "@/components/campaigns/CampaignForm";
import { useCreateCampaign } from "@/hooks/useCampaigns";
import { useToast } from "@/components/providers/ToastProvider";

export default function NewCampaignPage() {
  const router = useRouter();
  const toast = useToast();
  const createMutation = useCreateCampaign();

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      await createMutation.mutateAsync(values);
      toast.push("Campaign created", "success");
      router.push("/campaigns");
    } catch (error) {
      toast.push("Failed to create campaign", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="New Campaign" subtitle="Create a new influencer campaign." />
      <CampaignForm onSubmit={handleSubmit} submitLabel="Create Campaign" loading={createMutation.isPending} />
    </div>
  );
}
