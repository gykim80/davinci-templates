"use client";

import { useState } from "react";
import { Settings, User, Bell, Palette, AlertTriangle } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const TABS = [
  { id: "profile", icon: User, label: "프로필" },
  { id: "notifications", icon: Bell, label: "알림" },
  { id: "appearance", icon: Palette, label: "외관" },
  { id: "danger", icon: AlertTriangle, label: "위험 영역" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");
  const [theme, setTheme] = useState("dark");
  const [notifs, setNotifs] = useState({ email: true, push: false, marketing: false });

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* 헤더 */}
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 flex-1 justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="h-4 w-4 hidden sm:block" />
              {t.label}
            </button>
          ))}
        </div>

        {/* 콘텐츠 카드 */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-6">
          {/* 프로필 탭 */}
          {tab === "profile" && (
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">A</div>
                <div>
                  <Button className="h-8 px-3 border border-border hover:bg-accent text-sm">사진 변경</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG 최대 2MB</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">이름</label>
                  <Input defaultValue="홍길동" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">이메일</label>
                  <Input type="email" defaultValue="hong@example.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">자기소개</label>
                <textarea className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px] resize-none" placeholder="간단한 자기소개를 작성하세요" />
              </div>
              <Button className="h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90">저장</Button>
            </>
          )}

          {/* 알림 탭 */}
          {tab === "notifications" && (
            <div className="space-y-4">
              {([["email", "이메일 알림", "중요한 업데이트를 이메일로 받습니다"] as const, ["push", "푸시 알림", "브라우저 푸시 알림을 받습니다"] as const, ["marketing", "마케팅 알림", "프로모션 및 이벤트 소식을 받습니다"] as const]).map(([key, title, desc]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Toggle on={notifs[key]} onToggle={() => setNotifs((p) => ({ ...p, [key]: !p[key] }))} />
                </div>
              ))}
            </div>
          )}

          {/* 외관 탭 */}
          {tab === "appearance" && (
            <div className="space-y-4">
              <p className="text-sm font-medium">테마 선택</p>
              <div className="grid grid-cols-3 gap-3">
                {([["light", "라이트"], ["dark", "다크"], ["system", "시스템"]] as const).map(([val, label]) => (
                  <button key={val} onClick={() => setTheme(val)} className={`h-20 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-colors ${theme === val ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"}`}>
                    <Palette className="h-5 w-5" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 위험 영역 탭 */}
          {tab === "danger" && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="font-medium text-destructive">계정 삭제</h3>
              </div>
              <p className="text-sm text-muted-foreground">계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
              <Button className="h-9 px-4 bg-destructive text-destructive-foreground hover:bg-destructive/90">계정 삭제</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
