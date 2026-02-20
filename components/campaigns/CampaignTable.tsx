"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Campaign } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import BudgetProgressBar from "@/components/campaigns/BudgetProgressBar";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import {
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const PLATFORM_COLORS: Record<string, string> = {
  youtube: "bg-rose/15 text-rose",
  instagram: "bg-violet/15 text-violet",
  tiktok: "bg-cyan/15 text-cyan"
};

export default function CampaignTable({
  campaigns,
  onDelete,
  deletingId
}: {
  campaigns: Campaign[] | null | undefined;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}) {
  const safeCampaigns = Array.isArray(campaigns) ? campaigns : [];

  return (
    <Card className="overflow-hidden">
      {safeCampaigns.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center text-sm text-text-dim">
          <p className="text-base font-semibold text-text">No campaigns yet</p>
          <p>Create a campaign to start tracking performance.</p>
        </div>
      ) : (
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
              {safeCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-surface-2">
                  <td className="px-6 py-4 font-medium text-text">{campaign.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        PLATFORM_COLORS[campaign.platform]
                      }`}
                    >
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <CampaignStatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4">{formatCurrency(Number(campaign.budget_total))}</td>
                  <td className="px-6 py-4">
                    <BudgetProgressBar
                      total={Number(campaign.budget_total)}
                      spent={Number(campaign.budget_spent)}
                    />
                  </td>
                  <td className="px-6 py-4 text-xs text-text-dim">
                    <div>{formatDate(campaign.start_date)}</div>
                    <div>{formatDate(campaign.end_date)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/campaigns/${campaign.id}`} className="text-text-dim hover:text-text">
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/campaigns/${campaign.id}/edit`}
                        className="text-text-dim hover:text-text"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DialogRoot>
                        <DialogTrigger asChild>
                          <button className="text-rose hover:text-rose/80">
                            <Trash2 size={16} />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete campaign?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. The campaign and its assignments will be removed.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-6 flex justify-end gap-3">
                            <DialogClose asChild>
                              <Button className="bg-surface-3 text-text shadow-none hover:-translate-y-0.5">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              onClick={() => onDelete(campaign.id)}
                              disabled={deletingId === campaign.id}
                              className="bg-rose text-black hover:-translate-y-0.5"
                            >
                              {deletingId === campaign.id ? "Deleting..." : "Delete"}
                            </Button>
                          </div>
                        </DialogContent>
                      </DialogRoot>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
