"use client";

import { useState } from "react";
import {
  BarChart3,
  Plus,
  Check,
  Users,
  Clock,
  ChevronRight,
  ArrowLeft,
  Vote,
  Trash2,
  X,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* 설문 타입 */
interface IPoll {
  id: string;
  question: string;
  description: string;
  options: IPollOption[];
  totalVotes: number;
  createdBy: string;
  createdAt: string;
  endsAt: string;
  category: string;
  multiSelect: boolean;
  voted: boolean;
  selectedOptions: string[];
}

/* 투표 옵션 타입 */
interface IPollOption {
  id: string;
  text: string;
  votes: number;
  color: string;
}

const COLORS = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
  "bg-pink-500", "bg-cyan-500", "bg-yellow-500", "bg-red-500",
];

/* 샘플 설문 데이터 */
const INITIAL_POLLS: IPoll[] = [
  {
    id: "1", question: "가장 좋아하는 프론트엔드 프레임워크는?",
    description: "2026년 기준 가장 선호하는 프레임워크를 선택해주세요.",
    options: [
      { id: "o1", text: "React / Next.js", votes: 245, color: COLORS[0] },
      { id: "o2", text: "Vue / Nuxt", votes: 89, color: COLORS[1] },
      { id: "o3", text: "Svelte / SvelteKit", votes: 67, color: COLORS[2] },
      { id: "o4", text: "Angular", votes: 43, color: COLORS[3] },
      { id: "o5", text: "Solid / Qwik 등 기타", votes: 31, color: COLORS[4] },
    ],
    totalVotes: 475, createdBy: "프론트엔드코리아", createdAt: "2일 전",
    endsAt: "3일 후", category: "기술", multiSelect: false, voted: false, selectedOptions: [],
  },
  {
    id: "2", question: "재택근무 vs 출근, 어떤 것을 선호하시나요?",
    description: "근무 형태에 대한 의견을 들려주세요.",
    options: [
      { id: "o6", text: "완전 재택", votes: 312, color: COLORS[0] },
      { id: "o7", text: "하이브리드 (주 2-3일 출근)", votes: 287, color: COLORS[1] },
      { id: "o8", text: "완전 출근", votes: 56, color: COLORS[3] },
    ],
    totalVotes: 655, createdBy: "직장인모임", createdAt: "5일 전",
    endsAt: "1일 후", category: "라이프", multiSelect: false, voted: true, selectedOptions: ["o6"],
  },
  {
    id: "3", question: "이번 주말 뭐 할까요? (복수 선택 가능)",
    description: "함께 할 활동을 골라주세요!",
    options: [
      { id: "o9", text: "영화 관람 🎬", votes: 45, color: COLORS[0] },
      { id: "o10", text: "카페 탐방 ☕", votes: 38, color: COLORS[1] },
      { id: "o11", text: "등산 🏔️", votes: 22, color: COLORS[2] },
      { id: "o12", text: "보드게임 🎲", votes: 31, color: COLORS[3] },
      { id: "o13", text: "집에서 쉬기 🏠", votes: 56, color: COLORS[4] },
    ],
    totalVotes: 192, createdBy: "주말클럽", createdAt: "1일 전",
    endsAt: "2일 후", category: "라이프", multiSelect: true, voted: false, selectedOptions: [],
  },
  {
    id: "4", question: "올해 배우고 싶은 기술은?",
    description: "2026년 학습 목표를 공유해주세요.",
    options: [
      { id: "o14", text: "AI/ML (LLM, 에이전트)", votes: 189, color: COLORS[0] },
      { id: "o15", text: "Rust / Go", votes: 78, color: COLORS[1] },
      { id: "o16", text: "클라우드 / DevOps", votes: 95, color: COLORS[2] },
      { id: "o17", text: "모바일 (Flutter / RN)", votes: 62, color: COLORS[3] },
      { id: "o18", text: "블록체인 / Web3", votes: 34, color: COLORS[4] },
    ],
    totalVotes: 458, createdBy: "개발자커뮤니티", createdAt: "3일 전",
    endsAt: "5일 후", category: "기술", multiSelect: false, voted: false, selectedOptions: [],
  },
];

type PageView = "list" | "detail" | "create";

export default function VotingPollPage() {
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [view, setView] = useState<PageView>("list");
  const [selectedPoll, setSelectedPoll] = useState<IPoll | null>(null);
  const [tempSelections, setTempSelections] = useState<string[]>([]);

  /* 새 설문 폼 상태 */
  const [newQuestion, setNewQuestion] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);
  const [newMulti, setNewMulti] = useState(false);

  /* 투표 처리 */
  const handleVote = () => {
    if (!selectedPoll || tempSelections.length === 0) return;
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== selectedPoll.id) return p;
        const updated = {
          ...p,
          voted: true,
          selectedOptions: tempSelections,
          totalVotes: p.totalVotes + 1,
          options: p.options.map((o) =>
            tempSelections.includes(o.id) ? { ...o, votes: o.votes + 1 } : o
          ),
        };
        return updated;
      })
    );
    setSelectedPoll((prev) => {
      if (!prev) return null;
      return {
        ...prev, voted: true, selectedOptions: tempSelections,
        totalVotes: prev.totalVotes + 1,
        options: prev.options.map((o) =>
          tempSelections.includes(o.id) ? { ...o, votes: o.votes + 1 } : o
        ),
      };
    });
    setTempSelections([]);
  };

  /* 옵션 선택 토글 */
  const toggleOption = (optionId: string) => {
    if (selectedPoll?.multiSelect) {
      setTempSelections((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
      );
    } else {
      setTempSelections([optionId]);
    }
  };

  /* 새 설문 생성 */
  const handleCreatePoll = () => {
    const validOptions = newOptions.filter((o) => o.trim());
    if (!newQuestion.trim() || validOptions.length < 2) return;
    const poll: IPoll = {
      id: `p${Date.now()}`, question: newQuestion, description: newDescription,
      options: validOptions.map((text, i) => ({
        id: `no${Date.now()}_${i}`, text, votes: 0, color: COLORS[i % COLORS.length],
      })),
      totalVotes: 0, createdBy: "나", createdAt: "방금 전", endsAt: "7일 후",
      category: "일반", multiSelect: newMulti, voted: false, selectedOptions: [],
    };
    setPolls([poll, ...polls]);
    setView("list");
    setNewQuestion(""); setNewDescription(""); setNewOptions(["", ""]); setNewMulti(false);
  };

  /* 결과 바 (퍼센트 계산) */
  const getPercentage = (votes: number, total: number) =>
    total === 0 ? 0 : Math.round((votes / total) * 100);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        {view !== "list" && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setView("list"); setSelectedPoll(null); }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <BarChart3 className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">
          {view === "create" ? "새 설문 만들기" : view === "detail" ? "투표" : "투표/설문"}
        </h1>
        {view === "list" && (
          <Button
            size="sm"
            onClick={() => setView("create")}
            className="ml-auto"
          >
            <Plus className="h-3.5 w-3.5" /> 만들기
          </Button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-lg">
          {/* 설문 목록 */}
          {view === "list" && (
            <div className="space-y-3">
              {polls.map((poll) => (
                <Card
                  key={poll.id}
                  className="cursor-pointer transition-colors hover:bg-accent/50"
                  onClick={() => { setSelectedPoll(poll); setView("detail"); setTempSelections([]); }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="secondary" className="rounded-full text-[10px]">{poll.category}</Badge>
                        <h3 className="mt-1.5 font-medium">{poll.question}</h3>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{poll.totalVotes}표</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{poll.endsAt}</span>
                      {poll.voted && (
                        <span className="flex items-center gap-0.5 text-green-500"><Check className="h-3 w-3" />투표완료</span>
                      )}
                      {poll.multiSelect && (
                        <span className="text-primary">복수선택</span>
                      )}
                    </div>
                    {/* 미니 결과 바 */}
                    {poll.voted && (
                      <div className="mt-3 flex gap-0.5 h-1.5 rounded-full overflow-hidden">
                        {poll.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={cn("h-full", opt.color)}
                            style={{ width: `${getPercentage(opt.votes, poll.totalVotes)}%` }}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* 설문 상세 + 투표 */}
          {view === "detail" && selectedPoll && (
            <div className="space-y-5">
              <div>
                <Badge variant="secondary" className="rounded-full">{selectedPoll.category}</Badge>
                <h2 className="mt-2 text-xl font-bold">{selectedPoll.question}</h2>
                {selectedPoll.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{selectedPoll.description}</p>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{selectedPoll.totalVotes}명 참여</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{selectedPoll.endsAt} 마감</span>
              </div>

              {selectedPoll.multiSelect && !selectedPoll.voted && (
                <p className="text-xs text-primary">* 복수 선택이 가능합니다</p>
              )}

              {/* 투표 옵션들 */}
              <div className="space-y-2">
                {selectedPoll.options.map((option) => {
                  const pct = getPercentage(option.votes, selectedPoll.totalVotes);
                  const isSelected = tempSelections.includes(option.id) || selectedPoll.selectedOptions.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      onClick={() => !selectedPoll.voted && toggleOption(option.id)}
                      disabled={selectedPoll.voted}
                      className={cn(
                        "relative flex w-full items-center rounded-xl border p-3.5 text-left transition-colors overflow-hidden",
                        !selectedPoll.voted && isSelected && "border-primary",
                        !selectedPoll.voted && !isSelected && "hover:bg-accent/50",
                      )}
                    >
                      {/* 결과 바 (투표 후) */}
                      {selectedPoll.voted && (
                        <div
                          className={cn("absolute inset-y-0 left-0 opacity-15", option.color)}
                          style={{ width: `${pct}%` }}
                        />
                      )}
                      <div className="relative flex w-full items-center justify-between">
                        <div className="flex items-center gap-3">
                          {!selectedPoll.voted ? (
                            <div className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border-2",
                              isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                            )}>
                              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          ) : (
                            <div className={cn("h-3 w-3 rounded-full", option.color)} />
                          )}
                          <span className="text-sm font-medium">{option.text}</span>
                        </div>
                        {selectedPoll.voted && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{pct}%</span>
                            <span className="text-xs text-muted-foreground">({option.votes}표)</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 투표 버튼 */}
              {!selectedPoll.voted && (
                <Button
                  onClick={handleVote}
                  disabled={tempSelections.length === 0}
                  className="w-full"
                  size="lg"
                >
                  투표하기
                </Button>
              )}

              {/* 투표 후 통계 */}
              {selectedPoll.voted && (
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="flex items-center gap-1.5 text-sm font-medium">
                      <PieChart className="h-4 w-4 text-primary" /> 투표 결과
                    </h3>
                    <div className="space-y-2">
                      {[...selectedPoll.options]
                        .sort((a, b) => b.votes - a.votes)
                        .map((opt, i) => (
                          <div key={opt.id} className="flex items-center gap-2 text-sm">
                            {i === 0 && <TrendingUp className="h-3.5 w-3.5 text-primary" />}
                            {i !== 0 && <span className="w-3.5" />}
                            <div className={cn("h-2.5 w-2.5 rounded-full", opt.color)} />
                            <span className="flex-1">{opt.text}</span>
                            <span className="font-medium">{getPercentage(opt.votes, selectedPoll.totalVotes)}%</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* 새 설문 만들기 */}
          {view === "create" && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">질문</label>
                <Input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="투표 질문을 입력하세요"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">설명 (선택)</label>
                <Textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="추가 설명을 입력하세요"
                  rows={2}
                  className="mt-1 resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium">선택지</label>
                <div className="mt-1 space-y-2">
                  {newOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", COLORS[i % COLORS.length])} />
                      <Input
                        value={opt}
                        onChange={(e) => {
                          const next = [...newOptions];
                          next[i] = e.target.value;
                          setNewOptions(next);
                        }}
                        placeholder={`선택지 ${i + 1}`}
                        className="flex-1"
                      />
                      {newOptions.length > 2 && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setNewOptions(newOptions.filter((_, j) => j !== i))}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {newOptions.length < 8 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewOptions([...newOptions, ""])}
                      className="text-primary hover:text-primary/80"
                    >
                      <Plus className="h-3.5 w-3.5" /> 선택지 추가
                    </Button>
                  )}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={newMulti}
                  onChange={(e) => setNewMulti(e.target.checked)}
                  className="rounded"
                />
                복수 선택 허용
              </label>
              <Button
                onClick={handleCreatePoll}
                disabled={!newQuestion.trim() || newOptions.filter((o) => o.trim()).length < 2}
                className="w-full"
                size="lg"
              >
                설문 만들기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
