"use client";

import { useState } from "react";
import {
  Brain,
  Coins,
  BarChart3,
  Key,
  Copy,
  Eye,
  EyeOff,
  TrendingUp,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ---------- 목업 데이터 ---------- */
const usageHistory = [
  { date: "3/25", credits: 312 },
  { date: "3/26", credits: 287 },
  { date: "3/27", credits: 445 },
  { date: "3/28", credits: 198 },
  { date: "3/29", credits: 523 },
  { date: "3/30", credits: 267 },
  { date: "3/31", credits: 118 },
];

const maxUsage = Math.max(...usageHistory.map((d) => d.credits));

const recentCalls = [
  { model: "claude-sonnet", tokens: 1240, credits: 2, time: "2분 전" },
  { model: "claude-sonnet", tokens: 3820, credits: 4, time: "15분 전" },
  { model: "claude-haiku", tokens: 890, credits: 1, time: "32분 전" },
  { model: "claude-sonnet", tokens: 5100, credits: 6, time: "1시간 전" },
  { model: "claude-haiku", tokens: 420, credits: 1, time: "2시간 전" },
];

export default function DashboardPage() {
  const [showKey, setShowKey] = useState(false);
  const apiKey = "sk-demo-xxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">사용량 대시보드</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="font-bold">850</span>
            <span className="text-muted-foreground">/ 5,000 크레딧</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* 요약 카드 */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-6">
            <Coins className="mb-3 h-5 w-5 text-amber-400" />
            <p className="text-2xl font-bold">850</p>
            <p className="text-sm text-muted-foreground">잔여 크레딧</p>
          </div>
          <div className="rounded-xl border p-6">
            <TrendingUp className="mb-3 h-5 w-5 text-blue-400" />
            <p className="text-2xl font-bold">2,150</p>
            <p className="text-sm text-muted-foreground">총 사용량</p>
          </div>
          <div className="rounded-xl border p-6">
            <Clock className="mb-3 h-5 w-5 text-green-400" />
            <p className="text-2xl font-bold">487</p>
            <p className="text-sm text-muted-foreground">이번 주 사용</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 사용량 차트 */}
          <div className="rounded-xl border p-6">
            <h3 className="mb-6 font-semibold">최근 7일 사용량</h3>
            <div className="flex items-end gap-2" style={{ height: 160 }}>
              {usageHistory.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{d.credits}</span>
                  <div
                    className="w-full rounded-t bg-primary transition-all"
                    style={{ height: `${(d.credits / maxUsage) * 120}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* API 키 관리 */}
          <div className="rounded-xl border p-6">
            <h3 className="mb-6 font-semibold">API 키</h3>
            <div className="mb-4 flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3">
              <Key className="h-4 w-4 shrink-0 text-muted-foreground" />
              <code className="flex-1 text-sm font-mono">
                {showKey ? apiKey : "sk-demo-••••••••••••••••••••"}
              </code>
              <button
                onClick={() => setShowKey(!showKey)}
                className="rounded p-1 hover:bg-accent"
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="rounded p-1 hover:bg-accent"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-6 text-xs text-muted-foreground">
              API 키는 서버 사이드에서만 사용하세요. 절대 클라이언트에 노출하지 마세요.
            </p>
            <button className="w-full rounded-lg border py-2.5 text-sm font-medium hover:bg-accent">
              새 API 키 발급
            </button>
          </div>
        </div>

        {/* 최근 API 호출 */}
        <div className="mt-8 rounded-xl border">
          <div className="border-b px-6 py-4">
            <h3 className="font-semibold">최근 API 호출</h3>
          </div>
          <div className="divide-y">
            {recentCalls.map((call, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{call.model}</p>
                    <p className="text-xs text-muted-foreground">
                      {call.tokens.toLocaleString()} 토큰
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">-{call.credits} 크레딧</p>
                  <p className="text-xs text-muted-foreground">{call.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
