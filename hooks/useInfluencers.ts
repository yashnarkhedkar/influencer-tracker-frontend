"use client";

import {
  createInfluencer,
  deleteInfluencer,
  getInfluencer,
  listInfluencers,
  refreshInfluencerStats,
  updateInfluencer
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useInfluencers() {
  return useQuery({
    queryKey: ["influencers"],
    queryFn: listInfluencers
  });
}

export function useInfluencer(id: string) {
  return useQuery({
    queryKey: ["influencers", id],
    queryFn: () => getInfluencer(id),
    enabled: Boolean(id)
  });
}

export function useCreateInfluencer() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createInfluencer,
    onSuccess: () => client.invalidateQueries({ queryKey: ["influencers"] })
  });
}

export function useUpdateInfluencer(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof updateInfluencer>[1]) => updateInfluencer(id, payload),
    onSuccess: () => client.invalidateQueries({ queryKey: ["influencers"] })
  });
}

export function useDeleteInfluencer() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteInfluencer,
    onSuccess: () => client.invalidateQueries({ queryKey: ["influencers"] })
  });
}

export function useRefreshInfluencerStats() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: refreshInfluencerStats,
    onSuccess: (_data, id) =>
      client.invalidateQueries({ queryKey: ["influencers", id] })
  });
}
