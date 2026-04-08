"use client";

import Link from "next/link";
import { ArrowLeft, Settings, Bell, Smartphone, Info } from "lucide-react";

// 설정 페이지
export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Link href="/" className="rounded-lg p-1.5 transition-colors hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Settings className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">설정</h1>
      </header>

      <main className="mx-auto w-full max-w-lg space-y-6 px-4 py-6">
        {/* 알림 설정 */}
        <section className="rounded-2xl border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">알림 설정</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>푸시 알림</span>
              <div className="h-6 w-11 rounded-full bg-muted relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-muted-foreground transition-transform" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>이메일 알림</span>
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* 기기 정보 */}
        <section className="rounded-2xl border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">기기 정보</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            이 앱은 PWA(Progressive Web App)로 설치하여 네이티브 앱처럼
            사용할 수 있습니다.
          </p>
        </section>

        {/* 앱 정보 */}
        <section className="rounded-2xl border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Info className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">앱 정보</h2>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>버전: 0.1.0</p>
            <p>빌드: Next.js 15 App Router</p>
            <p>런타임: Standalone</p>
          </div>
        </section>
      </main>
    </div>
  );
}
