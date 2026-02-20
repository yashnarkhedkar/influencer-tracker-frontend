"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { suggestTitlesHashtags } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";

export default function SuggestTitlesButton({
  description,
  platform,
  onResult
}: {
  description: string;
  platform: string;
  onResult: (titles: string[], hashtags: string[]) => void;
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!description) {
      toast.push("Add a description to generate suggestions", "info");
      return;
    }
    setLoading(true);
    try {
      const response = await suggestTitlesHashtags({ description, platform });
      onResult(response.titles, response.hashtags);
      toast.push("Suggestions ready", "success");
    } catch (error) {
      toast.push("Failed to get suggestions", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleSuggest}
      disabled={loading}
      className="bg-surface-3 text-text shadow-none hover:-translate-y-0.5"
    >
      {loading ? "Suggesting..." : "Suggest Titles"}
    </Button>
  );
}
