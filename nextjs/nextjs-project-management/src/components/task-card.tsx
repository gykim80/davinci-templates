import { cn } from "@/lib/utils";
import { priorityColors, type ITask } from "@/lib/project-data";
import { Calendar, CircleDot, Tag } from "lucide-react";

interface ITaskCardProps {
  task: ITask;
}

export function TaskCard({ task }: ITaskCardProps) {
  return (
    <div className="rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50">
      {/* 제목 + 우선순위 */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium">{task.title}</p>
        <CircleDot
          className={cn("h-4 w-4 shrink-0", priorityColors[task.priority])}
        />
      </div>

      {/* 태그 */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* 하단 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {task.dueDate}
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {task.assignee.charAt(0)}
        </div>
      </div>
    </div>
  );
}
