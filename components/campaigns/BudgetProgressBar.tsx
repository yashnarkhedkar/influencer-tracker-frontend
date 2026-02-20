import { cn } from "@/lib/utils";

export default function BudgetProgressBar({ total, spent }: { total: number; spent: number }) {
  const percent = total > 0 ? Math.min((spent / total) * 100, 100) : 0;

  return (
    <div className="w-36">
      <div className="h-2 w-full rounded-full bg-surface-3">
        <div
          className={cn("h-2 rounded-full bg-cyan")}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-text-dim">{percent.toFixed(0)}% spent</p>
    </div>
  );
}
