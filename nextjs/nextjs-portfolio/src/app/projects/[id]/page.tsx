import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, getProjectById } from "@/lib/portfolio-data";

// SSG: 정적 경로 생성
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            포트폴리오로 돌아가기
          </Link>
          <h1 className="mb-2 text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>

          {/* 링크 */}
          <div className="mt-4 flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg",
                  "bg-primary px-4 py-2 text-sm text-primary-foreground",
                  "transition-colors hover:bg-primary/90"
                )}
              >
                <ExternalLink className="h-4 w-4" />
                라이브 데모
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border",
                  "px-4 py-2 text-sm",
                  "transition-colors hover:bg-accent"
                )}
              >
                <Github className="h-4 w-4" />
                소스 코드
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* 태그 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 상세 설명 */}
        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-bold">프로젝트 상세</h2>
          <p className="leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>
        </div>
      </main>
    </div>
  );
}
