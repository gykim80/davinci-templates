import { tasks, projects, priorityColors } from "@/lib/project-data";
import { cn } from "@/lib/utils";
import { Calendar, ArrowLeft, CircleDot } from "lucide-react";
import Link from "next/link";

// 타임라인 날짜 범위: 3월 15일 ~ 4월 30일
const START_DATE = new Date("2026-03-15");
const END_DATE = new Date("2026-04-30");
const TOTAL_DAYS = Math.ceil(
  (END_DATE.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
);

function getDateOffset(dateStr: string): number {
  const date = new Date(dateStr);
  const diff = Math.ceil(
    (date.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, Math.min(diff, TOTAL_DAYS));
}

function getDuration(startStr: string, endStr: string): number {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
}

// 주 단위 레이블 생성
function getWeekLabels() {
  const labels = [];
  const current = new Date(START_DATE);
  while (current <= END_DATE) {
    const month = current.getMonth() + 1;
    const day = current.getDate();
    labels.push({
      label: `${month}/${day}`,
      offset: getDateOffset(current.toISOString().split("T")[0]),
    });
    current.setDate(current.getDate() + 7);
  }
  return labels;
}

export default function TimelinePage() {
  const weekLabels = getWeekLabels();

  // 프로젝트별로 태스크 그룹화
  const groupedTasks = projects.map((project) => ({
    project,
    tasks: tasks.filter((t) => t.projectId === project.id),
  }));

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
            <Calendar className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">타임라인</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="overflow-x-auto rounded-xl border bg-background">
          {/* 주 단위 헤더 */}
          <div className="flex border-b">
            <div className="w-56 shrink-0 border-r px-4 py-3">
              <span className="text-sm font-medium text-muted-foreground">
                태스크
              </span>
            </div>
            <div className="relative flex-1">
              <div
                className="grid h-full"
                style={{
                  gridTemplateColumns: `repeat(${TOTAL_DAYS}, minmax(0, 1fr))`,
                }}
              >
                {weekLabels.map((week) => (
                  <div
                    key={week.label}
                    className="border-r px-2 py-3 text-xs text-muted-foreground"
                    style={{
                      gridColumn: `${week.offset + 1} / span 7`,
                    }}
                  >
                    {week.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 프로젝트 그룹 */}
          {groupedTasks.map(({ project, tasks: projectTasks }) => (
            <div key={project.id}>
              {/* 프로젝트 헤더 */}
              <div className="flex border-b bg-muted/30">
                <div className="flex w-56 shrink-0 items-center gap-2 border-r px-4 py-2">
                  <div
                    className={cn("h-2.5 w-2.5 rounded-full", project.color)}
                  />
                  <span className="text-sm font-semibold">{project.name}</span>
                </div>
                <div className="flex-1" />
              </div>

              {/* 태스크 행 */}
              {projectTasks.map((task) => {
                const offset = getDateOffset(task.startDate);
                const duration = getDuration(task.startDate, task.dueDate);

                return (
                  <div key={task.id} className="flex border-b last:border-0">
                    {/* 태스크 이름 */}
                    <div className="flex w-56 shrink-0 items-center gap-2 border-r px-4 py-3">
                      <CircleDot
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          priorityColors[task.priority]
                        )}
                      />
                      <span className="truncate text-sm">{task.title}</span>
                    </div>

                    {/* 간트 바 */}
                    <div className="relative flex-1 py-2">
                      <div
                        className="grid h-full"
                        style={{
                          gridTemplateColumns: `repeat(${TOTAL_DAYS}, minmax(0, 1fr))`,
                        }}
                      >
                        <div
                          className={cn(
                            "flex items-center rounded-md px-2 text-xs font-medium text-white",
                            project.color
                          )}
                          style={{
                            gridColumn: `${offset + 1} / span ${duration}`,
                            opacity: task.status === "Done" ? 0.5 : 0.85,
                          }}
                        >
                          <span className="truncate">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
