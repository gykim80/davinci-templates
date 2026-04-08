import { Building2, ArrowRight, Globe, Shield, Users } from "lucide-react";
import { getAllTenants } from "@/lib/tenant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Globe, title: "서브도메인 라우팅", desc: "각 테넌트에 고유 서브도메인이 자동 할당됩니다" },
  { icon: Shield, title: "데이터 격리", desc: "테넌트 간 데이터가 완전히 분리됩니다" },
  { icon: Users, title: "팀 관리", desc: "테넌트별 사용자 역할과 권한을 관리합니다" },
];

export default function HomePage() {
  const tenants = getAllTenants();

  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">멀티테넌트 SaaS</span>
          </div>
          <Button size="sm">
            워크스페이스 만들기
          </Button>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="px-4 pb-20 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            하나의 코드베이스,
            <br />
            <span className="text-primary">무한한 워크스페이스</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            서브도메인 기반 멀티테넌트 아키텍처로 각 고객에게
            <br />
            독립적인 워크스페이스를 제공하세요.
          </p>
        </div>
      </section>

      {/* 기능 */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">핵심 기능</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <CardContent className="p-6">
                  <f.icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 테넌트 목록 데모 */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold">등록된 워크스페이스</h2>
          <p className="mb-12 text-center text-muted-foreground">
            데모 테넌트를 클릭하여 각 워크스페이스를 확인하세요.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {tenants.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="group">
                <Card className="transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white"
                      style={{ backgroundColor: t.primaryColor }}
                    >
                      {t.name[0]}
                    </div>
                    <h3 className="mb-1 font-semibold">{t.name}</h3>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {t.slug}.example.com
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={cn(
                        t.plan === "enterprise" && "bg-amber-500/20 text-amber-400 border-amber-500/20",
                        t.plan === "pro" && "bg-blue-500/20 text-blue-400 border-blue-500/20",
                        t.plan === "free" && "bg-green-500/20 text-green-400 border-green-500/20"
                      )}>
                        {t.plan}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 풋터 */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          &copy; 2026 멀티테넌트 SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
