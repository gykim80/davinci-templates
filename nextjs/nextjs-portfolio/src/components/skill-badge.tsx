import { cn } from "@/lib/utils";

interface ISkillBadgeProps {
  skill: string;
}

export function SkillBadge({ skill }: ISkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-3 py-1.5",
        "text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {skill}
    </span>
  );
}
