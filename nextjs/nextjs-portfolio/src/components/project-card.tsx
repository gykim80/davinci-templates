import Link from "next/link";
import { ExternalLink, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/lib/portfolio-data";

interface IProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: IProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className={cn(
          "group rounded-xl border overflow-hidden transition-colors",
          "hover:border-primary/50 hover:bg-accent/50"
        )}
      >
        {/* 썸네일 영역 */}
        <div className="flex h-40 items-center justify-center bg-muted">
          <FolderOpen className="h-12 w-12 text-muted-foreground transition-colors group-hover:text-primary" />
        </div>

        {/* 정보 */}
        <div className="p-5">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-semibold group-hover:text-primary">
              {project.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <p className="mb-3 text-sm text-muted-foreground">
            {project.description}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
