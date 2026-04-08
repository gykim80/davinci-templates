import Link from "next/link";
import { BookOpen, Zap, Settings, Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quickLinks = [
  {
    title: "빠른 시작",
    description: "5분 안에 첫 번째 프로젝트를 만들어보세요",
    href: "/docs/getting-started/quick-start",
    icon: Zap,
  },
  {
    title: "설치 가이드",
    description: "프로젝트 설치 및 초기 설정 방법",
    href: "/docs/getting-started/installation",
    icon: Settings,
  },
  {
    title: "API 레퍼런스",
    description: "API 엔드포인트와 사용법 안내",
    href: "/docs/api/overview",
    icon: Code,
  },
];

export default function DocsHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">문서 사이트</span>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">프로젝트 문서</h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            모던 웹 애플리케이션을 빠르게 구축하기 위한 모든 것을 안내합니다.
            시작하기 가이드부터 고급 설정까지 단계별로 알아보세요.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-xl">
            <Link href="/docs/getting-started/introduction">
              시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 빠른 링크 */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">빠른 링크</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group">
              <Card className="transition-colors hover:border-primary/50 hover:bg-accent/50">
                <CardContent className="p-6">
                  <link.icon className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-semibold group-hover:text-primary">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
