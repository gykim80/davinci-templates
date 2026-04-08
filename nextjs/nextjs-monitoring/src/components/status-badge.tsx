import { cn } from "@/lib/utils";
import { statusConfig, type ServiceStatus } from "@/lib/monitor-data";

interface IStatusBadgeProps {
  status: ServiceStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: IStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        config.color,
        size === "sm" ? "text-xs" : "text-sm"
      )}
    >
      <span
        className={cn(
          "rounded-full",
          config.bg,
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
          status === "정상" && "animate-pulse"
        )}
      />
      {status}
    </span>
  );
}
