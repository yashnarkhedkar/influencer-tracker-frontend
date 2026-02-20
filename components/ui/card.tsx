import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface-1 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        className
      )}
      {...props}
    />
  );
}
