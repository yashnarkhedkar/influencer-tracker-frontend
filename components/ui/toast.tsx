"use client";

import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "border-emerald/30 bg-emerald/10 text-emerald",
  error: "border-rose/30 bg-rose/10 text-rose",
  info: "border-cyan/30 bg-cyan/10 text-cyan"
};

export default function ToastViewport({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed right-6 top-6 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "rounded-lg border px-4 py-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
            VARIANT_STYLES[toast.variant]
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
