"use client";

import { useState, useCallback } from "react";
import { LayoutGrid } from "lucide-react";
import { KanbanColumn } from "@/components/kanban-column";
import { AddTaskDialog } from "@/components/add-task-dialog";
import type { ITask, TColumnStatus, TPriority } from "@/components/task-card";

/** 컬럼 순서 */
const COLUMNS: TColumnStatus[] = ["todo", "in-progress", "done"];

/** 샘플 작업 데이터 */
const SAMPLE_TASKS: ITask[] = [
  { id: "1", title: "디자인 시안 검토", description: "모바일 반응형 확인 필요", priority: "high", status: "todo", createdAt: new Date("2025-03-28") },
  { id: "2", title: "API 엔드포인트 구현", description: "사용자 인증 관련 REST API", priority: "high", status: "in-progress", createdAt: new Date("2025-03-27") },
  { id: "3", title: "단위 테스트 작성", description: "유틸리티 함수 커버리지 확보", priority: "medium", status: "todo", createdAt: new Date("2025-03-26") },
  { id: "4", title: "README 업데이트", description: "", priority: "low", status: "done", createdAt: new Date("2025-03-25") },
  { id: "5", title: "배포 파이프라인 설정", description: "CI/CD GitHub Actions", priority: "medium", status: "in-progress", createdAt: new Date("2025-03-24") },
  { id: "6", title: "코드 리뷰 반영", description: "PR #42 피드백 수정", priority: "low", status: "todo", createdAt: new Date("2025-03-23") },
];

export default function KanbanPage() {
  const [tasks, setTasks] = useState<ITask[]>(SAMPLE_TASKS);
  const [addingTo, setAddingTo] = useState<TColumnStatus | null>(null);

  // 드래그 시작
  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  // 드래그 오버 (드롭 허용)
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  // 드롭 → 상태 변경
  const handleDrop = useCallback((e: React.DragEvent, newStatus: TColumnStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }, []);

  // 작업 삭제
  const handleDelete = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 작업 추가
  const handleAddTask = useCallback(
    (title: string, description: string, priority: TPriority) => {
      if (!addingTo) return;
      const newTask: ITask = {
        id: crypto.randomUUID(),
        title,
        description,
        priority,
        status: addingTo,
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [addingTo]
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-6 py-4">
        <LayoutGrid className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">칸반 보드</h1>
        <span className="ml-2 text-sm text-muted-foreground">
          {tasks.length}개 작업
        </span>
      </header>

      {/* 칸반 보드 */}
      <main className="flex flex-1 gap-4 overflow-x-auto p-6">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onDelete={handleDelete}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAdd={setAddingTo}
          />
        ))}
      </main>

      {/* 작업 추가 다이얼로그 */}
      {addingTo && (
        <AddTaskDialog
          status={addingTo}
          onAdd={handleAddTask}
          onClose={() => setAddingTo(null)}
        />
      )}
    </div>
  );
}
