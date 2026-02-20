"use client";

import {
  getAiInsights,
  getBudgetOverview,
  getCampaignsByStatus,
  getCampaignsOverTime,
  getDashboardSummary,
  getPlatformBreakdown
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary
  });
}

export function useCampaignsByStatus() {
  return useQuery({
    queryKey: ["dashboard", "campaignsByStatus"],
    queryFn: getCampaignsByStatus
  });
}

export function useBudgetOverview() {
  return useQuery({
    queryKey: ["dashboard", "budgetOverview"],
    queryFn: getBudgetOverview
  });
}

export function useCampaignsOverTime() {
  return useQuery({
    queryKey: ["dashboard", "campaignsOverTime"],
    queryFn: getCampaignsOverTime
  });
}

export function usePlatformBreakdown() {
  return useQuery({
    queryKey: ["dashboard", "platformBreakdown"],
    queryFn: getPlatformBreakdown
  });
}

export function useAiInsights() {
  return useQuery({
    queryKey: ["dashboard", "aiInsights"],
    queryFn: getAiInsights
  });
}
