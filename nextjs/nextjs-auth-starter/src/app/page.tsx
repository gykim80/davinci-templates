"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import {
  Shield, Lock, KeyRound, Users, ArrowRight, Loader2, CheckCircle2,
  Fingerprint, Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const securityFeatures = [
  { icon: Lock, title: "OAuth 2.0 / OIDC", desc: "Google, GitHub, Kakao 등 소셜 로그인 기본 지원" },
  { icon: Fingerprint, title: "2단계 인증", desc: "TOTP 기반 MFA로 계정 보안 강화" },
  { icon: Users, title: "역할 기반 접근 제어", desc: "Admin, Editor, Viewer 등 세분화된 권한 관리" },
  { icon: KeyRound, title: "JWT + 리프레시 토큰", desc: "안전한 토큰 순환 및 세션 유지" },
];

const checklist = [
  "Next.js 15 App Router 기반",
  "서버 컴포넌트 + 미들웨어 보호",
  "shadcn/ui 로그인/회원가입 폼",
  "TypeScript strict 모드",
];

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">AuthKit</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              로그인
            </Button>
            <Button size="sm" onClick={() => router.push("/register")}>
              시작하기 <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="px-4 pb-16 pt-20 text-center">
        <div className="mx-auto max-w-2xl">
          <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5">
            Next.js 15 + TypeScript
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white">
            인증을 처음부터
            <br />
            <span className="text-primary">올바르게 구축하세요</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground dark:text-muted-foreground">
            OAuth, JWT, RBAC, 2FA가 모두 포함된 프로덕션 레디 인증 스타터.
            <br className="hidden sm:block" />
            복사해서 바로 사용하세요.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => router.push("/register")} className="w-full sm:w-auto">
              무료로 시작하기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub에서 보기
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 기능 그리드 */}
      <section className="border-t px-4 py-16 dark:border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold dark:text-white">
            보안 기능
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            엔터프라이즈 수준의 인증 기능이 기본 내장되어 있습니다.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-md dark:bg-card">
                <CardContent className="p-5">
                  <f.icon className="mb-3 h-7 w-7 text-primary" />
                  <h3 className="mb-1 text-sm font-semibold dark:text-white">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 체크리스트 */}
      <section className="border-t px-4 py-16 dark:border-border">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-6 text-2xl font-bold dark:text-white">포함된 구성</h2>
          <ul className="space-y-3 text-left">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm dark:text-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-8" onClick={() => router.push("/register")}>
            지금 시작하기
          </Button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t px-4 py-8 dark:border-border">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 AuthKit. MIT License.
        </p>
      </footer>
    </div>
  );
}
