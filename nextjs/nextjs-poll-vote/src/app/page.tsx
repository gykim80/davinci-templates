"use client";

import { useState } from "react";
import { BarChart3, Vote, CheckCircle2, RotateCcw } from "lucide-react";

// 투표 질문과 옵션
const POLL = {
  question: "Which frontend framework do you prefer?",
  options: [
    { id: "react", label: "React", color: "bg-cyan-500" },
    { id: "vue", label: "Vue", color: "bg-emerald-500" },
    { id: "svelte", label: "Svelte", color: "bg-orange-500" },
    { id: "angular", label: "Angular", color: "bg-red-500" },
  ],
};

// 초기 투표 수 (시뮬레이션)
const INITIAL_VOTES: Record<string, number> = {
  react: 42, vue: 28, svelte: 18, angular: 12,
};

export default function PollVotePage() {
  const [votes, setVotes] = useState(INITIAL_VOTES);
  const [selected, setSelected] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleSubmit = () => {
    if (!selected) return;
    setVotes((prev) => ({ ...prev, [selected]: prev[selected] + 1 }));
    setHasVoted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setHasVoted(false);
    setVotes(INITIAL_VOTES);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Vote className="w-6 h-6 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">Poll Vote</h1>
          </div>
          <p className="text-muted-foreground text-sm">실시간 투표 + 애니메이션 결과 바</p>
        </div>

        {/* 질문 */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">{POLL.question}</h2>
          </div>

          {/* 옵션 목록 */}
          <div className="space-y-3">
            {POLL.options.map((opt) => {
              const count = votes[opt.id];
              const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

              return (
                <div key={opt.id} className="relative">
                  {/* 투표 전: 선택 라디오 */}
                  {!hasVoted ? (
                    <button
                      onClick={() => setSelected(opt.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                        selected === opt.id
                          ? "border-primary bg-primary/10 ring-2 ring-ring"
                          : "border-border hover:border-primary/50 hover:bg-accent/50"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selected === opt.id ? "border-primary" : "border-muted-foreground"
                      }`}>
                        {selected === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-sm">{opt.label}</span>
                    </button>
                  ) : (
                    /* 투표 후: 결과 바 */
                    <div className="p-4 rounded-lg border border-border overflow-hidden relative">
                      {/* 프로그레스 바 배경 */}
                      <div
                        className={`absolute inset-0 ${opt.color} opacity-20`}
                        style={{
                          width: `${pct}%`,
                          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {selected === opt.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          <span className="font-medium text-sm">{opt.label}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">{count} votes</span>
                          <span className="font-bold min-w-[3ch] text-right">{pct}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              Total: {totalVotes} votes
            </span>
            {!hasVoted ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                Submit Vote
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
