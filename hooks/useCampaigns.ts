"use client";

import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  listCampaigns,
  listCampaignInfluencers,
  updateCampaign
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCampaigns(filters?: { status?: string; platform?: string }) {
  return useQuery({
    queryKey: ["campaigns", filters],
    queryFn: () => listCampaigns(filters)
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: () => getCampaign(id),
    enabled: Boolean(id)
  });
}

export function useCampaignInfluencers(id: string) {
  return useQuery({
    queryKey: ["campaigns", id, "influencers"],
    queryFn: () => listCampaignInfluencers({ campaign: id }),
    enabled: Boolean(id)
  });
}

export function useCreateCampaign() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => client.invalidateQueries({ queryKey: ["campaigns"] })
  });
}

export function useUpdateCampaign(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof updateCampaign>[1]) => updateCampaign(id, payload),
    onSuccess: () => client.invalidateQueries({ queryKey: ["campaigns"] })
  });
}

export function useDeleteCampaign() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => client.invalidateQueries({ queryKey: ["campaigns"] })
  });
}
