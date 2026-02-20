"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { generateBrief } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";

export default function GenerateBriefButton({
  platform,
  budget,
  onGenerated
}: {
  platform: string;
  budget?: number;
  onGenerated: (brief: string) => void;
}) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateBrief({
        product_name: productName,
        target_audience: targetAudience,
        platform,
        tone,
        budget
      });
      onGenerated(response.brief);
      toast.push("AI brief generated", "success");
      setOpen(false);
    } catch (error) {
      toast.push("Failed to generate brief", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="bg-violet text-black hover:-translate-y-0.5">
          Generate Brief with AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate campaign brief</DialogTitle>
          <DialogDescription>Provide a few details and we’ll draft the brief.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text-dim">
            Product Name
            <input
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-text-dim">
            Target Audience
            <input
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={targetAudience}
              onChange={(event) => setTargetAudience(event.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-text-dim">
            Tone
            <input
              className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            className="bg-surface-3 text-text shadow-none hover:-translate-y-0.5"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !productName || !targetAudience || !tone}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
