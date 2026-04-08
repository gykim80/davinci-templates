import { projects } from "@/lib/project-data";
import { cn } from "@/lib/utils";
import { FolderKanban, Kanban, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">프로젝트</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/board"
              className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Kanban className="h-4 w-4" />
              칸반 보드
            </Link>
            <Link
              href="/timeline"
              className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Calendar className="h-4 w-4" />
              타임라인
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            진행 중인 프로젝트 {projects.length}개
          </p>
          <Button size="sm">
            새 프로젝트
          </Button>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                {/* 상단 */}
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 h-3 w-3 rounded-full",
                      project.color
                    )}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* 진행률 바 */}
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">진행률</span>
                    <span className="text-sm font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", project.color)}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* 하단 정보 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {project.completedTasks}/{project.taskCount} 태스크 완료
                  </span>
                  <div className="flex items-center gap-1">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    {/* 멤버 아바타 */}
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member) => (
                        <div
                          key={member}
                          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground"
                          title={member}
                        >
                          {member.charAt(0)}
                        </div>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
