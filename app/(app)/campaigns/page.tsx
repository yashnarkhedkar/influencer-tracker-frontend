"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
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
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className="bg-transparent text-text shadow-none ring-1 ring-border hover:-translate-y-0"
              onClick={() => campaignsQuery.refetch()}
              disabled={campaignsQuery.isFetching}
            >
              {campaignsQuery.isFetching ? "Refreshing..." : "Refresh"}
            </Button>
            <Link href="/campaigns/new">
              <Button>New Campaign</Button>
            </Link>
          </div>
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
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2 text-xs uppercase text-text-dim">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Platform</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Budget Total</th>
                  <th className="px-6 py-3">Budget Spent</th>
                  <th className="px-6 py-3">Dates</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-2 w-24 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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
