import Card from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function KPICard({
  title,
  value,
  icon,
  accent
}: {
  title: string;
  value: string | number;
  icon?: ReactNode;
  accent?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim">{title}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-text">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-black shadow-[0_0_20px_rgba(0,0,0,0.4)]",
            accent ?? "bg-cyan"
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
