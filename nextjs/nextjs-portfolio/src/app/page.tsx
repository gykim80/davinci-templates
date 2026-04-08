import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, skills, projects } from "@/lib/portfolio-data";
import { ProjectCard } from "@/components/project-card";
import { SkillBadge } from "@/components/skill-badge";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 히어로 섹션 */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center border-b px-4 py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
          {profile.name.charAt(0)}
        </div>
        <h1 className="mb-2 text-4xl font-bold">{profile.name}</h1>
        <p className="mb-4 text-lg text-primary">{profile.title}</p>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          {profile.bio}
        </p>

        {/* 소셜 링크 */}
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-accent"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-accent"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-accent"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:bg-accent"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <ArrowDown className="mt-12 h-5 w-5 animate-bounce text-muted-foreground" />
      </section>

      {/* 프로젝트 갤러리 */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">프로젝트</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 스킬 */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">기술 스택</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold">연락처</h2>
          <p className="mb-6 text-muted-foreground">
            프로젝트 협업이나 채용 관련 문의를 환영합니다.
          </p>
          <Button asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4" />
              이메일 보내기
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
