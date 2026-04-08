"use client";

import { useState } from "react";
import { Mail, Check, Newspaper, Users } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

const CATEGORIES = ["Tech", "Design", "Business"];
const PAST_ISSUES = [
  { title: "AI 워크플로우의 미래", date: "2026년 3월", reads: "2.4K" },
  { title: "디자인 시스템 구축 가이드", date: "2026년 2월", reads: "1.8K" },
  { title: "스타트업 성장 전략", date: "2026년 1월", reads: "3.1K" },
];

export default function NewsletterSignupPage() {
  const [selected, setSelected] = useState<string[]>(["Tech"]);

  const toggle = (cat: string) =>
    setSelected((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-10">
        {/* 히어로 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Users className="h-4 w-4" />
            <span>12,400+ 구독자</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">매주 받는 인사이트 레터</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            테크, 디자인, 비즈니스 분야의 최신 트렌드와 실전 인사이트를 매주 월요일 아침에 전달합니다.
          </p>
        </div>

        {/* 구독 폼 카드 */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-5">
          {/* 이메일 입력 */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">이메일</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" type="email" placeholder="hello@example.com" />
              </div>
              <Button className="h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                구독하기
              </Button>
            </div>
          </div>

          {/* 카테고리 선택 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">관심 카테고리</label>
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => toggle(cat)} className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${selected.includes(cat) ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}>
                  {selected.includes(cat) && <Check className="h-3 w-3" />}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">스팸 없음. 언제든지 구독 취소 가능.</p>
        </div>

        {/* 지난 이슈 미리보기 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Newspaper className="h-5 w-5" /> 지난 이슈
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PAST_ISSUES.map((issue, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="h-24 rounded-md bg-muted flex items-center justify-center">
                  <Newspaper className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-medium leading-tight">{issue.title}</h3>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{issue.date}</span>
                  <span>{issue.reads} 읽음</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
