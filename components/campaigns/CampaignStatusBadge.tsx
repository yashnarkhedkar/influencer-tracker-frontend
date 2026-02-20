import Badge from "@/components/ui/badge";
import { CampaignStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<CampaignStatus, string> = {
  draft: "bg-surface-2 text-text-dim",
  active: "bg-emerald/15 text-emerald",
  paused: "bg-amber/15 text-amber",
  completed: "bg-cyan/15 text-cyan"
};

export default function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return <Badge className={cn(STATUS_STYLES[status])}>{status}</Badge>;
}
