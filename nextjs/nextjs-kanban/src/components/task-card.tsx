"use client";

import { GripVertical, Trash2, Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

/** 작업 우선순위 */
export type TPriority = "low" | "medium" | "high";

/** 칸반 컬럼 상태 */
export type TColumnStatus = "todo" | "in-progress" | "done";

/** 작업 타입 */
export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: TPriority;
  status: TColumnStatus;
  createdAt: Date;
}

/** 우선순위 색상 */
const PRIORITY_COLORS: Record<TPriority, string> = {
  low: "text-blue-400",
  medium: "text-yellow-400",
  high: "text-red-400",
};

const PRIORITY_LABELS: Record<TPriority, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

interface ITaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

/** 드래그 가능한 작업 카드 */
export function TaskCard({ task, onDelete, onDragStart }: ITaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={cn(
        "group cursor-grab rounded-lg border bg-background p-3 shadow-sm",
        "transition-all hover:shadow-md active:cursor-grabbing active:opacity-70"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-tight">{task.title}</p>
            {task.description && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="shrink-0 text-muted-foreground opacity-0 hover:text-red-400 group-hover:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 메타 정보 */}
      <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className={cn("flex items-center gap-1", PRIORITY_COLORS[task.priority])}>
          <Flag className="h-3 w-3" />
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {task.createdAt.toLocaleDateString("ko-KR")}
        </span>
      </div>
    </div>
  );
}
