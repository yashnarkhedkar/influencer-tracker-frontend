"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import GenerateBriefButton from "@/components/ai/GenerateBriefButton";
import SuggestTitlesButton from "@/components/ai/SuggestTitlesButton";
import { Campaign, CampaignStatus, Platform } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: CampaignStatus[] = ["draft", "active", "paused", "completed"];
const PLATFORM_OPTIONS: Platform[] = ["youtube", "instagram", "tiktok"];

interface CampaignFormProps {
  initialValues?: Partial<Campaign>;
  onSubmit: (values: Partial<Campaign>) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
}

export default function CampaignForm({
  initialValues,
  onSubmit,
  submitLabel,
  loading
}: CampaignFormProps) {
  const [values, setValues] = useState<Partial<Campaign>>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    platform: initialValues?.platform ?? "youtube",
    status: initialValues?.status ?? "draft",
    budget_total: initialValues?.budget_total ?? "",
    budget_spent: initialValues?.budget_spent ?? "",
    start_date: initialValues?.start_date ?? "",
    end_date: initialValues?.end_date ?? ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const updateField = (field: keyof Campaign, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!values.title) nextErrors.title = "Title is required";
    if (!values.platform) nextErrors.platform = "Platform is required";
    if (!values.status) nextErrors.status = "Status is required";
    if (!values.budget_total) nextErrors.budget_total = "Budget total is required";
    if (!values.start_date) nextErrors.start_date = "Start date is required";
    if (!values.end_date) nextErrors.end_date = "End date is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-text-dim">Title</label>
            <div className="mt-2 flex flex-wrap gap-3">
              <input
                className={cn(
                  "w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text placeholder:text-text-dim",
                  errors.title && "border-rose"
                )}
                value={values.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
              <SuggestTitlesButton
                description={values.description ?? ""}
                platform={values.platform ?? "youtube"}
                onResult={(titles, tags) => {
                  setSuggestedTitles(titles);
                  setHashtags(tags);
                }}
              />
            </div>
            {errors.title ? <p className="mt-2 text-xs text-red-500">{errors.title}</p> : null}
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">Platform</label>
            <SelectRoot
              value={values.platform}
              onValueChange={(value) => updateField("platform", value)}
            >
              <SelectTrigger className={cn("mt-2", errors.platform && "border-rose")}>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORM_OPTIONS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            {errors.platform ? <p className="mt-2 text-xs text-red-500">{errors.platform}</p> : null}
          </div>
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-text-dim">Description</label>
            <div className="mt-2 flex flex-col gap-3">
              <textarea
                rows={5}
                className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text placeholder:text-text-dim"
                value={values.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
              <GenerateBriefButton
                platform={values.platform ?? "youtube"}
                budget={values.budget_total ? Number(values.budget_total) : undefined}
                onGenerated={(brief) => updateField("description", brief)}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">Status</label>
            <SelectRoot
              value={values.status}
              onValueChange={(value) => updateField("status", value)}
            >
              <SelectTrigger className={cn("mt-2", errors.status && "border-rose")}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            {errors.status ? <p className="mt-2 text-xs text-red-500">{errors.status}</p> : null}
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">Budget Total</label>
            <input
              type="number"
              className={cn(
                "mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text",
                errors.budget_total && "border-rose"
              )}
              value={values.budget_total}
              onChange={(event) => updateField("budget_total", event.target.value)}
            />
            {errors.budget_total ? (
              <p className="mt-2 text-xs text-red-500">{errors.budget_total}</p>
            ) : null}
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">Budget Spent</label>
            <input
              type="number"
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={values.budget_spent}
              onChange={(event) => updateField("budget_spent", event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">Start Date</label>
            <input
              type="date"
              className={cn(
                "mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text",
                errors.start_date && "border-rose"
              )}
              value={values.start_date}
              onChange={(event) => updateField("start_date", event.target.value)}
            />
            {errors.start_date ? (
              <p className="mt-2 text-xs text-red-500">{errors.start_date}</p>
            ) : null}
          </div>
          <div>
            <label className="text-sm font-medium text-text-dim">End Date</label>
            <input
              type="date"
              className={cn(
                "mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text",
                errors.end_date && "border-rose"
              )}
              value={values.end_date}
              onChange={(event) => updateField("end_date", event.target.value)}
            />
            {errors.end_date ? <p className="mt-2 text-xs text-red-500">{errors.end_date}</p> : null}
          </div>
        </div>
      </Card>

      {suggestedTitles.length > 0 ? (
        <Card className="p-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-text">Title suggestions</p>
              <SelectRoot onValueChange={(value) => updateField("title", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a suggested title" />
                </SelectTrigger>
                <SelectContent>
                  {suggestedTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">Suggested hashtags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-text-dim">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
