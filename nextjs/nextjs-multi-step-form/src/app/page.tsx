"use client";

import { useState } from "react";
import { User, Settings, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

const STEPS = [
  { icon: User, label: "개인 정보" },
  { icon: Settings, label: "환경 설정" },
  { icon: CheckCircle, label: "확인" },
];

export default function MultiStepFormPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    role: "developer", newsletter: true, theme: "dark",
  });

  const update = (key: string, val: string | boolean) =>
    setForm((p) => ({ ...p, [key]: val }));

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center tracking-tight">다단계 폼</h1>

        {/* 진행 표시기 */}
        <div className="flex items-center justify-between px-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
        {/* 진행 바 */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {/* 카드 */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
          {/* Step 1: 개인 정보 */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">이름</label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="이름을 입력하세요" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">이메일</label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="hello@example.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">전화번호</label>
                <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="010-1234-5678" />
              </div>
            </div>
          )}

          {/* Step 2: 환경 설정 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">역할</label>
                <select value={form.role} onChange={(e) => update("role", e.target.value)} className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                  <option value="developer">개발자</option>
                  <option value="designer">디자이너</option>
                  <option value="pm">프로덕트 매니저</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">테마</label>
                <div className="flex gap-3">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button key={t} onClick={() => update("theme", t)} className={`flex-1 h-10 rounded-md border text-sm transition-colors ${form.theme === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}>
                      {t === "light" ? "라이트" : t === "dark" ? "다크" : "시스템"}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.newsletter} onChange={(e) => update("newsletter", e.target.checked)} className="h-4 w-4 rounded border-border" />
                <span className="text-sm">뉴스레터 수신 동의</span>
              </label>
            </div>
          )}

          {/* Step 3: 확인 */}
          {step === 2 && (
            <div className="space-y-3">
              <h3 className="font-medium">입력 내용 확인</h3>
              <div className="rounded-md bg-muted p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">이름</span><span>{form.name || "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">이메일</span><span>{form.email || "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">전화번호</span><span>{form.phone || "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">역할</span><span>{form.role}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">테마</span><span>{form.theme}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">뉴스레터</span><span>{form.newsletter ? "수신" : "미수신"}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex gap-3">
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} className="flex-1 h-10 border border-border hover:bg-accent">
              <ArrowLeft className="mr-2 h-4 w-4" /> 이전
            </Button>
          )}
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1 h-10 bg-primary text-primary-foreground hover:bg-primary/90">
              다음 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="flex-1 h-10 bg-primary text-primary-foreground hover:bg-primary/90">
              <CheckCircle className="mr-2 h-4 w-4" /> 제출하기
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
