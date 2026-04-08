"use client";

import { useState } from "react";
import { UserPlus, Mail, Lock, Eye, EyeOff, Github } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

export default function RegistrationPage() {
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">계정 만들기</h1>
          <p className="text-sm text-muted-foreground">아래 정보를 입력하여 가입하세요</p>
        </div>

        {/* 카드 */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
          {/* 이름 필드 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">성</label>
              <Input placeholder="홍" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">이름</label>
              <Input placeholder="길동" />
            </div>
          </div>

          {/* 이메일 */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">이메일</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" type="email" placeholder="hello@example.com" />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 pr-9" type={showPw ? "text" : "password"} placeholder="8자 이상" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">비밀번호 확인</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" type="password" placeholder="비밀번호를 다시 입력하세요" />
            </div>
          </div>

          {/* 이용약관 */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border" />
            <span className="text-sm text-muted-foreground">
              <a href="#" className="text-primary underline">이용약관</a> 및{" "}
              <a href="#" className="text-primary underline">개인정보 처리방침</a>에 동의합니다
            </span>
          </label>

          {/* 가입 버튼 */}
          <Button disabled={!agreed} className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90">
            가입하기
          </Button>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          {/* 소셜 가입 */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-10 border border-border hover:bg-accent">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button className="h-10 border border-border hover:bg-accent">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>

        {/* 로그인 링크 */}
        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">로그인</a>
        </p>
      </div>
    </main>
  );
}
