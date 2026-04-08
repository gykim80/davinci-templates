"use client";

import { useState } from "react";
import {
  Brain,
  Sparkles,
  Zap,
  ArrowRight,
  Coins,
  Code2,
  MessageSquare,
  Image,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

/* ---------- AI 기능 카드 ---------- */
const capabilities = [
  { icon: MessageSquare, title: "텍스트 생성", desc: "자연어 기반 콘텐츠 생성" },
  { icon: Code2, title: "코드 생성", desc: "프롬프트로 코드를 작성" },
  { icon: Image, title: "이미지 분석", desc: "이미지를 설명하고 분석" },
  { icon: Sparkles, title: "요약", desc: "긴 텍스트를 핵심만 요약" },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(850);

  async function handleGenerate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.error) {
        setResult(`오류: ${data.error}`);
      } else {
        setResult(data.result);
        setCredits(data.usage.creditsRemaining);
      }
    } catch {
      setResult("요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AI Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Coins className="h-4 w-4 text-amber-400" />
              <span className="font-medium">{credits}</span>
              <span className="text-muted-foreground">크레딧</span>
            </div>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              대시보드
            </Link>
            <Button asChild size="sm">
              <Link href="/playground">
                플레이그라운드
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* 히어로 + 데모 */}
      <section className="px-4 pb-16 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            AI의 힘을
            <br />
            <span className="text-primary">API 하나로</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground">
            복잡한 AI 인프라 없이 크레딧 기반으로 AI 기능을 사용하세요.
          </p>

          {/* 인라인 데모 */}
          <Card className="mx-auto max-w-2xl text-left">
            <CardContent className="p-6">
            <label className="mb-2 block text-sm font-medium">AI에게 물어보기</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 이메일 마케팅 카피를 작성해주세요..."
              rows={3}
              className="mb-4 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                예상 비용: ~{Math.max(1, Math.ceil(prompt.length / 4000))} 크레딧
              </span>
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                생성
              </Button>
            </div>
            {result && (
              <div className="mt-4 rounded-xl bg-muted p-4">
                <p className="whitespace-pre-wrap text-sm">{result}</p>
              </div>
            )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 기능 카드 */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">지원하는 AI 기능</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <Card key={c.title}>
                <CardContent className="p-6">
                  <c.icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Zap className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-3xl font-bold">지금 시작하세요</h2>
          <p className="mb-8 text-muted-foreground">
            무료 100 크레딧으로 바로 AI API를 테스트해보세요.
          </p>
          <Button asChild size="lg">
            <Link href="/playground">
              플레이그라운드 열기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          &copy; 2026 AI Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
