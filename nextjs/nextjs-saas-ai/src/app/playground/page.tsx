"use client";

import { useState } from "react";
import {
  Brain,
  Play,
  Loader2,
  Coins,
  Copy,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ---------- 모델 옵션 ---------- */
const models = [
  { id: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", cost: "보통" },
  { id: "claude-haiku-3.5", label: "Claude Haiku 3.5", cost: "저렴" },
];

const presets = [
  { label: "자유 입력", prompt: "" },
  { label: "이메일 작성", prompt: "다음 주제로 전문적인 비즈니스 이메일을 작성해주세요: " },
  { label: "코드 생성", prompt: "다음 요구사항에 맞는 TypeScript 코드를 작성해주세요: " },
  { label: "텍스트 요약", prompt: "다음 텍스트를 3줄로 요약해주세요:\n\n" },
  { label: "번역", prompt: "다음 텍스트를 영어로 번역해주세요:\n\n" },
];

export default function PlaygroundPage() {
  const [model, setModel] = useState(models[0].id);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(850);

  async function handleRun() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
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
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Brain className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">AI 플레이그라운드</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="font-medium">{credits}</span>
          </div>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            대시보드
          </Link>
        </div>
      </header>

      {/* 메인 패널 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 입력 패널 */}
        <div className="flex flex-1 flex-col border-r">
          {/* 컨트롤 바 */}
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="appearance-none rounded-lg border bg-background py-1.5 pl-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.cost})
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="flex gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPrompt(p.prompt)}
                  className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="AI에게 요청할 내용을 입력하세요..."
            className="flex-1 resize-none bg-background p-4 text-sm outline-none"
          />

          <div className="flex items-center justify-between border-t px-4 py-3">
            <span className="text-xs text-muted-foreground">
              예상 비용: ~{Math.max(1, Math.ceil(prompt.length / 4000))} 크레딧
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPrompt("");
                  setResult("");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm hover:bg-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                초기화
              </button>
              <button
                onClick={handleRun}
                disabled={loading || !prompt.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                실행
              </button>
            </div>
          </div>
        </div>

        {/* 결과 패널 */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-medium">결과</span>
            {result && (
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs hover:bg-accent"
              >
                <Copy className="h-3 w-3" />
                복사
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {result ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{result}</p>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Brain className="mx-auto mb-3 h-10 w-10 opacity-50" />
                  <p className="text-sm">왼쪽에서 프롬프트를 입력하고 실행하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
