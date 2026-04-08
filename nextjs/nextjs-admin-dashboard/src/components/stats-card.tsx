import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IStats } from "@/lib/mock-data";

export function StatsCard({ stat }: { stat: IStats }) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <p className="text-sm text-muted-foreground">{stat.label}</p>
      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
      <div className="mt-2 flex items-center gap-1">
        {stat.trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            stat.trend === "up" ? "text-emerald-500" : "text-red-500"
          )}
        >
          {stat.change}
        </span>
        <span className="text-sm text-muted-foreground">지난달 대비</span>
      </div>
    </div>
  );
}
