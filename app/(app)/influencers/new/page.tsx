"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateInfluencer, useRefreshInfluencerStats } from "@/hooks/useInfluencers";
import { useToast } from "@/components/providers/ToastProvider";
import type { Platform } from "@/lib/types";

export default function NewInfluencerPage() {
  const router = useRouter();
  const toast = useToast();
  const createMutation = useCreateInfluencer();
  const refreshMutation = useRefreshInfluencerStats();

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required";
    if (!handle) nextErrors.handle = "Handle is required";
    if (!platform) nextErrors.platform = "Platform is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      const influencer = await createMutation.mutateAsync({ name, handle, platform });
      if (platform === "youtube") {
        await refreshMutation.mutateAsync(influencer.id);
      }
      toast.push("Influencer created", "success");
      router.push(`/influencers/${influencer.id}`);
    } catch (error) {
      toast.push("Failed to create influencer", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Add Influencer" subtitle="Add a creator and sync platform stats." />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-text-dim">
            Name
            <input
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {errors.name ? <p className="mt-2 text-xs text-red-500">{errors.name}</p> : null}
          </label>
          <label className="block text-sm font-medium text-text-dim">
            Handle / Channel ID
            <input
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={handle}
              onChange={(event) => setHandle(event.target.value)}
            />
            {errors.handle ? <p className="mt-2 text-xs text-red-500">{errors.handle}</p> : null}
          </label>
          <div>
            <label className="text-sm font-medium text-text-dim">Platform</label>
            <SelectRoot value={platform} onValueChange={(value) => setPlatform(value as Platform)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </SelectRoot>
            {errors.platform ? <p className="mt-2 text-xs text-red-500">{errors.platform}</p> : null}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Saving..." : "Save Influencer"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
