import { tasks, taskStatuses, statusColors } from "@/lib/project-data";
import { TaskCard } from "@/components/task-card";
import { cn } from "@/lib/utils";
import { Kanban, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            프로젝트
          </Link>
          <div className="flex items-center gap-2">
            <Kanban className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">칸반 보드</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {taskStatuses.map((status) => {
            const statusTasks = tasks.filter((t) => t.status === status);
            return (
              <div key={status} className="flex min-w-[300px] flex-1 flex-col">
                {/* 칼럼 헤더 */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusColors[status]
                      )}
                    >
                      {status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {statusTasks.length}
                    </span>
                  </div>
                </div>

                {/* 태스크 카드 목록 */}
                <div className="flex flex-1 flex-col gap-3 rounded-xl border border-dashed bg-muted/30 p-3">
                  {statusTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {statusTasks.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      태스크 없음
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
