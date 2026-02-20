import axios from "axios";
import {
  AiInsights,
  BudgetOverview,
  Campaign,
  CampaignInfluencer,
  CampaignsByStatus,
  CampaignsOverTime,
  DashboardSummary,
  Influencer,
  PlatformBreakdown
} from "@/lib/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export const apiClient = api;

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

function unwrapList<T>(data: T[] | PaginatedResponse<T>) {
  return Array.isArray(data) ? data : data.results;
}

export async function getDashboardSummary() {
  const { data } = await api.get<DashboardSummary>("/dashboard/summary/");
  return data;
}

export async function getCampaignsByStatus() {
  const { data } = await api.get<CampaignsByStatus[]>("/dashboard/campaigns-by-status/");
  return data;
}

export async function getBudgetOverview() {
  const { data } = await api.get<BudgetOverview[]>("/dashboard/budget-overview/");
  return data;
}

export async function getCampaignsOverTime() {
  const { data } = await api.get<CampaignsOverTime[]>("/dashboard/campaigns-over-time/");
  return data;
}

export async function getPlatformBreakdown() {
  const { data } = await api.get<PlatformBreakdown[]>("/dashboard/platform-breakdown/");
  return data;
}

export async function getAiInsights() {
  const { data } = await api.get<AiInsights>("/dashboard/ai-insights/");
  return data;
}

export async function listCampaigns(params?: { status?: string; platform?: string }) {
  const { data } = await api.get<Campaign[] | PaginatedResponse<Campaign>>("/campaigns/", { params });
  return unwrapList(data);
}

export async function getCampaign(id: string) {
  const { data } = await api.get<Campaign>(`/campaigns/${id}/`);
  return data;
}

export async function createCampaign(payload: Partial<Campaign>) {
  const { data } = await api.post<Campaign>("/campaigns/", payload);
  return data;
}

export async function updateCampaign(id: string, payload: Partial<Campaign>) {
  const { data } = await api.patch<Campaign>(`/campaigns/${id}/`, payload);
  return data;
}

export async function deleteCampaign(id: string) {
  await api.delete(`/campaigns/${id}/`);
}

export async function listInfluencers() {
  const { data } = await api.get<Influencer[] | PaginatedResponse<Influencer>>("/influencers/");
  return unwrapList(data);
}

export async function getInfluencer(id: string) {
  const { data } = await api.get<Influencer>(`/influencers/${id}/`);
  return data;
}

export async function createInfluencer(payload: Partial<Influencer>) {
  const { data } = await api.post<Influencer>("/influencers/", payload);
  return data;
}

export async function updateInfluencer(id: string, payload: Partial<Influencer>) {
  const { data } = await api.patch<Influencer>(`/influencers/${id}/`, payload);
  return data;
}

export async function deleteInfluencer(id: string) {
  await api.delete(`/influencers/${id}/`);
}

export async function listCampaignInfluencers(params?: { campaign?: string }) {
  const { data } = await api.get<CampaignInfluencer[] | PaginatedResponse<CampaignInfluencer>>(
    "/campaign-influencers/",
    { params }
  );
  return unwrapList(data);
}

export async function refreshInfluencerStats(id: string) {
  const { data } = await api.post<Influencer>(`/influencers/${id}/refresh_stats/`);
  return data;
}

export async function generateBrief(payload: {
  product_name: string;
  target_audience: string;
  platform: string;
  tone: string;
  budget?: number;
}) {
  const { data } = await api.post<{ brief: string }>("/ai/generate-brief/", payload);
  return data;
}

export async function suggestTitlesHashtags(payload: {
  description: string;
  platform: string;
}) {
  const { data } = await api.post<{ titles: string[]; hashtags: string[] }>(
    "/ai/suggest-titles-hashtags/",
    payload
  );
  return data;
}
