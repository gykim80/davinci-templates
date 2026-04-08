"use client";

import { useState } from "react";
import {
  Rocket, Zap, Shield, BarChart3, Globe, Layers, Code2, Users, Clock,
  ArrowRight, ChevronDown, Star, Mail, Loader2, Github, Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

/* ---------- 데이터 ---------- */
const features = [
  { icon: Zap, title: "빠른 성능", desc: "최적화된 서버사이드 렌더링으로 초고속 로딩" },
  { icon: Shield, title: "보안 내장", desc: "엔터프라이즈급 보안이 기본 포함" },
  { icon: BarChart3, title: "실시간 분석", desc: "실시간 데이터로 의사결정을 지원" },
  { icon: Globe, title: "글로벌 CDN", desc: "전 세계 어디서나 빠른 접속 가능" },
  { icon: Layers, title: "확장 가능", desc: "마이크로서비스 기반 무한 확장" },
  { icon: Code2, title: "API 우선", desc: "모든 기능을 API로 접근 가능" },
  { icon: Users, title: "팀 협업", desc: "실시간 협업과 역할 기반 권한" },
  { icon: Clock, title: "자동화", desc: "반복 작업을 자동으로 처리" },
  { icon: Rocket, title: "원클릭 배포", desc: "한 번의 클릭으로 프로덕션 배포" },
];

const testimonials = [
  { name: "김서연", role: "CTO, TechStartup", quote: "개발 생산성이 3배 이상 향상되었습니다.", rating: 5 },
  { name: "이준호", role: "풀스택 개발자", quote: "바로 프로덕션 수준의 앱을 구축할 수 있었습니다.", rating: 5 },
  { name: "박하은", role: "PM, FinCorp", quote: "팀 전체의 개발 속도가 눈에 띄게 빨라졌습니다.", rating: 5 },
];

const faqs = [
  { q: "무료로 사용할 수 있나요?", a: "네, 기본 기능은 무료입니다. 프리미엄 기능은 Pro 플랜을 이용해주세요." },
  { q: "기존 프로젝트에 통합 가능한가요?", a: "REST API와 SDK를 통해 어떤 기술 스택에도 쉽게 통합할 수 있습니다." },
  { q: "데이터는 안전한가요?", a: "AES-256 암호화, SOC 2 Type II 인증 인프라에서 관리됩니다." },
  { q: "지원은 어떻게 받나요?", a: "커뮤니티 포럼, 이메일, Pro 플랜 이상 실시간 채팅 지원 제공합니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "구독 후 30일 이내 전액 환불이 가능합니다." },
];

/* ---------- PLACEHOLDER:sections ---------- */
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitState === "loading") return;
    setSubmitState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { setSubmitState("success"); setMessage(data.message); setEmail(""); }
      else { setSubmitState("error"); setMessage(data.error); }
    } catch { setSubmitState("error"); setMessage("오류가 발생했습니다."); }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2"><Rocket className="h-6 w-6 text-primary" /><span className="text-lg font-bold">ProductName</span></div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">기능</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">후기</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
            <Button size="sm">시작하기</Button>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="px-4 pb-20 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-amber-400" />
            현재 1,200명 이상이 대기 중입니다
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            더 빠르게 만들고<br />
            <span className="text-primary">더 멀리 나아가세요</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">
            반복적인 개발 작업에서 벗어나 비즈니스 가치에 집중하세요.<br />
            런칭까지 걸리는 시간을 80% 단축합니다.
          </p>
          <form onSubmit={handleWaitlist} className="mx-auto flex max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" className="w-full rounded-xl py-3 pl-10 pr-4" />
            </div>
            <Button type="submit" disabled={submitState === "loading"} className="inline-flex items-center gap-2 rounded-xl px-6 py-3">
              {submitState === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              웨이트리스트
            </Button>
          </form>
          {message && (
            <p className={cn("mt-3 text-sm", submitState === "success" ? "text-green-400" : "text-red-400")}>{message}</p>
          )}
        </div>
      </section>

      {/* 기능 3x3 그리드 */}
      <section id="features" className="border-t px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">모든 것이 준비되어 있습니다</h2>
          <p className="mb-12 text-center text-muted-foreground">프로덕션에 필요한 모든 기능이 하나의 플랫폼에.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-lg">
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

      {/* 사용 후기 */}
      <section id="testimonials" className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">사용자 후기</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 아코디언 */}
      <section id="faq" className="border-t px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-12 text-center text-3xl font-bold">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <Button variant="ghost" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left h-auto font-normal">
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", openFaq === i && "rotate-180")} />
                </Button>
                {openFaq === i && (
                  <div className="border-t px-6 py-4">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 풋터 */}
      <footer className="border-t px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" /><span className="font-bold">ProductName</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">&copy; 2026 ProductName. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">이용약관</a>
              <a href="#" className="hover:text-foreground">개인정보처리방침</a>
              <a href="#" className="hover:text-foreground">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
