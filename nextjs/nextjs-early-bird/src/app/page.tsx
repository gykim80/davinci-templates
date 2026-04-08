"use client";

import { useState } from "react";
import { Sparkles, Check, Mail, ChevronDown, ChevronUp } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

const PLANS = [
  {
    name: "Free", price: "0", period: "영구 무료",
    features: ["프로젝트 3개", "기본 분석", "커뮤니티 지원", "1GB 스토리지"],
    cta: "시작하기", highlight: false,
  },
  {
    name: "Pro", price: "29,000", originalPrice: "49,000", period: "월",
    features: ["프로젝트 무제한", "고급 분석", "우선 지원", "50GB 스토리지", "팀 협업", "API 액세스"],
    cta: "얼리버드 신청", highlight: true,
  },
  {
    name: "Enterprise", price: "99,000", originalPrice: "149,000", period: "월",
    features: ["Pro 전체 기능", "전담 매니저", "SLA 99.9%", "무제한 스토리지", "SSO / SAML", "감사 로그", "온프레미스 옵션"],
    cta: "상담 요청", highlight: false,
  },
];

const FAQ = [
  { q: "얼리버드 가격은 언제까지 유효한가요?", a: "정식 출시 후 6개월까지 얼리버드 가격이 유지됩니다. 이후에도 기존 가입자는 1년간 동일 가격이 보장됩니다." },
  { q: "무료 플랜에서 업그레이드할 수 있나요?", a: "언제든지 업그레이드 가능합니다. 기존 데이터는 모두 보존되며, 즉시 Pro 기능을 사용할 수 있습니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "결제 후 14일 이내 전액 환불이 가능합니다. 별도의 사유 없이도 환불 처리해 드립니다." },
];

export default function EarlyBirdPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Early Bird - 최대 40% 할인</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">얼리버드 특별 가격</h1>
          <p className="text-muted-foreground max-w-md mx-auto">지금 가입하면 정식 출시가 이후에도 할인 가격이 유지됩니다.</p>
        </div>

        {/* 프라이싱 카드 */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`rounded-xl border p-6 space-y-5 ${plan.highlight ? "border-primary bg-card shadow-lg relative" : "border-border bg-card"}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">인기</div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  {plan.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}원</span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">원 / {plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full h-10 ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:bg-accent"}`}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* 이메일 초대 */}
        <div className="rounded-lg border border-border bg-card p-6 text-center space-y-4">
          <h2 className="text-lg font-semibold">초대 링크를 받아보세요</h2>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" type="email" placeholder="이메일 입력" />
            </div>
            <Button className="h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">신청</Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">자주 묻는 질문</h2>
          <div className="mx-auto max-w-2xl space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-lg border border-border">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-accent/50 transition-colors">
                  {item.q}
                  {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
