import {
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Check,
  Star,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/stripe";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

/* ---------- 기능 데이터 ---------- */
const features = [
  { icon: Zap, title: "빠른 시작", desc: "5분 만에 SaaS를 런칭하세요" },
  { icon: Shield, title: "보안 내장", desc: "인증과 권한 관리가 기본 포함" },
  { icon: BarChart3, title: "실시간 분석", desc: "사용량과 매출을 한눈에" },
  { icon: Layers, title: "확장 가능", desc: "트래픽에 맞춰 자동 스케일링" },
];

/* ---------- PLACEHOLDER:page ---------- */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">SaaS Starter</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              요금제
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <Button size="sm">
              시작하기
            </Button>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="px-4 pb-20 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5" />
            지금 바로 시작할 수 있습니다
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            SaaS를 만드는
            <br />
            <span className="text-primary">가장 빠른 방법</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Stripe 구독 결제, 인증, 대시보드가 모두 포함된 풀스택 템플릿.
            <br />
            비즈니스 로직에만 집중하세요.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard">
                무료로 시작 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                요금제 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">핵심 기능</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 가격 표 */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold">심플한 요금제</h2>
          <p className="mb-12 text-center text-muted-foreground">
            필요한 만큼만 사용하세요. 언제든 업그레이드 가능합니다.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {Object.values(PLANS).map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "p-0",
                  plan.name === "Pro" && "border-primary ring-1 ring-primary"
                )}
              >
                <CardContent className="p-8">
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold">
                      {plan.price === 0 ? "무료" : `₩${plan.price.toLocaleString()}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-muted-foreground"> /월</span>
                    )}
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.name === "Pro" ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.price === 0 ? "시작하기" : "구독하기"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">지금 시작하세요</h2>
          <p className="mb-8 text-muted-foreground">
            복잡한 설정 없이 바로 SaaS를 구축할 수 있습니다.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              무료로 시작하기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 풋터 */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          &copy; 2026 SaaS Starter. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
