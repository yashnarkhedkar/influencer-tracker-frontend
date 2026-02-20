export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "youtube" | "instagram" | "tiktok";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  status: CampaignStatus;
  budget_total: string;
  budget_spent: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  subscribers: number;
  total_views: number;
  video_count: number;
  channel_thumbnail: string | null;
  api_last_fetched: string | null;
  created_at: string;
}

export interface CampaignInfluencer {
  id: string;
  campaign: Campaign | string;
  influencer: Influencer | string;
  agreed_fee: string;
  deliverables: string;
  status: "pending" | "in-progress" | "delivered";
  created_at: string;
}

export interface DashboardSummary {
  total_campaigns: number;
  active_campaigns: number;
  total_budget: number;
  total_spent: number;
  total_influencers: number;
  avg_campaign_duration_days: number;
}

export interface CampaignsByStatus {
  status: CampaignStatus;
  count: number;
}

export interface BudgetOverview {
  title: string;
  budget_total: number;
  budget_spent: number;
}

export interface CampaignsOverTime {
  month: string;
  count: number;
}

export interface PlatformBreakdown {
  platform: Platform;
  count: number;
}

export interface AiInsights {
  insights: string;
}
