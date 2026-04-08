"use client";

import { useState } from "react";
import { Brain, CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

// 웹 개발 퀴즈 데이터
interface IQuestion {
  question: string;
  options: string[];
  answer: number;
}

const quizData: IQuestion[] = [
  {
    question: "React에서 상태를 관리하기 위해 사용하는 Hook은?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: 1,
  },
  {
    question: "Next.js App Router에서 서버 컴포넌트가 기본인가?",
    options: ["아니오, 클라이언트 컴포넌트가 기본", "예, 서버 컴포넌트가 기본", "설정에 따라 다름", "둘 다 아님"],
    answer: 1,
  },
  {
    question: "TypeScript에서 타입과 인터페이스의 주요 차이점은?",
    options: ["차이 없음", "인터페이스는 extends 가능", "타입은 유니온 지원", "인터페이스는 extends, 타입은 유니온 지원"],
    answer: 3,
  },
  {
    question: "Tailwind CSS에서 반응형 접두사의 올바른 순서는?",
    options: ["lg → md → sm", "sm → md → lg", "xs → sm → md → lg", "mobile → tablet → desktop"],
    answer: 1,
  },
  {
    question: "CSS Flexbox에서 주축 방향을 변경하는 속성은?",
    options: ["align-items", "justify-content", "flex-direction", "flex-wrap"],
    answer: 2,
  },
];

type QuizState = "start" | "playing" | "result";

export default function QuizAppPage() {
  const [state, setState] = useState<QuizState>("start");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const total = quizData.length;
  const question = quizData[current];

  // 옵션 선택 핸들러
  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.answer) setScore((s) => s + 1);
  };

  // 다음 문제 또는 결과 화면
  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setState("result");
    }
  };

  // 퀴즈 재시작
  const handleRestart = () => {
    setState("start");
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
  };

  // 시작 화면
  if (state === "start") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <Brain className="mx-auto h-16 w-16 text-violet-400" />
          <h1 className="text-3xl font-bold text-foreground">Web Dev Quiz</h1>
          <p className="text-muted-foreground">
            {total}개의 웹 개발 문제에 도전해보세요!
          </p>
          <button
            onClick={() => setState("playing")}
            className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  // 결과 화면
  if (state === "result") {
    const percentage = Math.round((score / total) * 100);
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 text-center">
          <div className="text-5xl font-bold text-foreground">{percentage}%</div>
          <p className="text-lg text-muted-foreground">
            {total}문제 중 {score}개 정답
          </p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {percentage >= 80 ? "훌륭합니다!" : percentage >= 60 ? "좋은 점수입니다!" : "다시 도전해보세요!"}
          </p>
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 mx-auto rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </main>
    );
  }

  // 퀴즈 진행 화면
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* 프로그레스 바 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {current + 1} of {total}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">{question.question}</h2>
        </div>

        {/* 선택지 */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let style = "border-border bg-card hover:bg-accent";
            if (answered && i === question.answer) style = "border-green-500 bg-green-500/10";
            else if (answered && i === selected) style = "border-red-500 bg-red-500/10";

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm font-medium text-foreground transition-colors ${style}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && i === question.answer && <CheckCircle className="h-5 w-5 text-green-500" />}
                {answered && i === selected && i !== question.answer && <XCircle className="h-5 w-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* 다음 버튼 */}
        {answered && (
          <button
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {current + 1 < total ? "Next Question" : "See Results"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </main>
  );
}
