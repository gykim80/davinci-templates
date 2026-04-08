"use client";

import {
  BarChart3,
  CreditCard,
  Users,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ---------- 목업 데이터 ---------- */
const stats = [
  { label: "활성 사용자", value: "2,847", change: "+12.5%", icon: Users },
  { label: "월 매출", value: "₩4,320,000", change: "+8.2%", icon: CreditCard },
  { label: "API 호출", value: "128,493", change: "+23.1%", icon: BarChart3 },
  { label: "전환율", value: "3.2%", change: "+0.4%", icon: TrendingUp },
];

const recentActivity = [
  { user: "김철수", action: "Pro 플랜 구독", time: "3분 전" },
  { user: "이영희", action: "Enterprise 업그레이드", time: "17분 전" },
  { user: "박민준", action: "Free 가입", time: "42분 전" },
  { user: "최서연", action: "Pro 플랜 구독", time: "1시간 전" },
  { user: "정도윤", action: "결제 수단 변경", time: "2시간 전" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">대시보드</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              홈
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              요금제
            </Link>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* 현재 플랜 */}
        <div className="mb-8 rounded-xl border bg-accent/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">현재 플랜</p>
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="text-sm text-muted-foreground">
                다음 결제일: 2026년 4월 15일
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              플랜 변경 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border p-6">
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-medium text-green-500">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 최근 활동 */}
        <div className="rounded-xl border">
          <div className="border-b px-6 py-4">
            <h3 className="font-semibold">최근 활동</h3>
          </div>
          <div className="divide-y">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-medium">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.user}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
