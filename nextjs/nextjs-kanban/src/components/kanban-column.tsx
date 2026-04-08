"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskCard, type ITask, type TColumnStatus } from "./task-card";

/** 컬럼 설정 */
const COLUMN_CONFIG: Record<TColumnStatus, { label: string; color: string }> = {
  todo: { label: "할 일", color: "border-t-blue-500" },
  "in-progress": { label: "진행 중", color: "border-t-yellow-500" },
  done: { label: "완료", color: "border-t-green-500" },
};

interface IKanbanColumnProps {
  status: TColumnStatus;
  tasks: ITask[];
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TColumnStatus) => void;
  onAdd: (status: TColumnStatus) => void;
}

/** 칸반 컬럼 */
export function KanbanColumn({
  status,
  tasks,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onAdd,
}: IKanbanColumnProps) {
  const config = COLUMN_CONFIG[status];

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
      className={cn(
        "flex w-80 flex-col rounded-lg border border-t-4 bg-muted/30",
        config.color
      )}
    >
      {/* 컬럼 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{config.label}</h3>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-medium">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(status)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          title="작업 추가"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 작업 카드 목록 */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed py-8 text-center text-xs text-muted-foreground">
            작업을 끌어다 놓으세요
          </div>
        )}
      </div>
    </div>
  );
}
