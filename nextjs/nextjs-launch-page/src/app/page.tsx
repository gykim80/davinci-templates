"use client";

import { useState, useEffect } from "react";
import { Rocket, Clock, Mail, Twitter, Github, Linkedin } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

/* 런칭 목표일 (30일 뒤) */
const LAUNCH = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function LaunchPage() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH);

  const units = [
    { label: "일", value: days },
    { label: "시간", value: hours },
    { label: "분", value: minutes },
    { label: "초", value: seconds },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl space-y-10 text-center">
        {/* 로고 및 배지 */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Rocket className="h-4 w-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            무언가 대단한 것이<br />곧 찾아옵니다
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            더 나은 개발 경험을 위해 준비 중입니다. 출시 알림을 받아보세요.
          </p>
        </div>

        {/* 카운트다운 */}
        <div className="flex justify-center gap-3 sm:gap-5">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-border bg-card flex items-center justify-center text-2xl sm:text-3xl font-bold tabular-nums">
                {String(u.value).padStart(2, "0")}
              </div>
              <span className="mt-1.5 text-xs text-muted-foreground">{u.label}</span>
            </div>
          ))}
        </div>

        {/* 제품 티저 이미지 영역 */}
        <div className="mx-auto max-w-md h-48 rounded-xl bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 border border-border flex items-center justify-center">
          <div className="text-center space-y-2">
            <Clock className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">제품 미리보기</p>
          </div>
        </div>

        {/* 이메일 알림 폼 */}
        <div className="mx-auto max-w-sm space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" type="email" placeholder="이메일을 입력하세요" />
            </div>
            <Button className="h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
              알림 받기
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">출시 시 1회 알림만 보내드립니다.</p>
        </div>

        {/* 소셜 링크 */}
        <div className="flex justify-center gap-4">
          {[Twitter, Github, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
