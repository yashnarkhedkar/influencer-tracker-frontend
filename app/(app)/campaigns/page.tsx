"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/button";
import CampaignTable from "@/components/campaigns/CampaignTable";
import Skeleton from "@/components/ui/skeleton";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCampaigns, useDeleteCampaign } from "@/hooks/useCampaigns";
import { useToast } from "@/components/providers/ToastProvider";

export default function CampaignsPage() {
  const toast = useToast();
  const [status, setStatus] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");
  const campaignsQuery = useCampaigns({
    status: status === "all" ? undefined : status,
    platform: platform === "all" ? undefined : platform
  });
  const deleteMutation = useDeleteCampaign();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.push("Campaign deleted", "success");
    } catch (error) {
      toast.push("Failed to delete campaign", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaigns"
        subtitle="Manage active campaigns, budgets, and timelines."
        action={
          <Link href="/campaigns/new">
            <Button>New Campaign</Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SelectRoot value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </SelectRoot>
        <SelectRoot value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All platforms</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>

      {campaignsQuery.isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-14" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <CampaignTable
          campaigns={campaignsQuery.data ?? []}
          onDelete={handleDelete}
          deletingId={deleteMutation.isPending ? (deleteMutation.variables ?? null) : null}
        />
      )}
    </div>
  );
}
