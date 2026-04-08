"use client";

import { Sparkles, Zap, Shield, BarChart3, Send } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

const FEATURES = [
  { icon: Zap, title: "초고속 빌드", desc: "기존 대비 10배 빠른 빌드 파이프라인" },
  { icon: Shield, title: "엔터프라이즈 보안", desc: "SOC2 Type II 인증 완료된 보안 체계" },
  { icon: BarChart3, title: "실시간 분석", desc: "프로젝트 성능을 실시간으로 모니터링" },
];

const ROLES = ["개발자", "디자이너", "프로덕트 매니저", "창업자", "학생", "기타"];

export default function BetaAccessPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* 히어로 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>남은 자리: 47 / 200</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            차세대 개발 플랫폼의<br />베타 테스터가 되세요
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            제한된 인원에게만 제공되는 베타 액세스로 새로운 기능을 가장 먼저 경험하세요.
          </p>
        </div>

        {/* 기능 미리보기 카드 */}
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-5 space-y-3 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 베타 신청 폼 */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">베타 액세스 신청</h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">이메일</label>
              <Input type="email" placeholder="hello@example.com" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">역할</label>
              <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="">선택하세요</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">왜 베타 테스터로 선정되어야 할까요?</label>
              <textarea className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px] resize-none" placeholder="사용 계획이나 관심 분야를 자유롭게 적어주세요..." />
            </div>

            <Button className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" /> 신청하기
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            신청 후 3일 이내 결과를 이메일로 안내합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
