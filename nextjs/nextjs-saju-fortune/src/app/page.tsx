"use client";

import { useState } from "react";
import { Star, Sparkles, Share2, RotateCcw, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateSaju, OHANG, type ISajuResult } from "@/lib/saju";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

export default function SajuPage() {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [result, setResult] = useState<ISajuResult | null>(null);

  // 사주 계산 실행
  const handleCalculate = () => {
    const r = calculateSaju(year, month, day, hour);
    setResult(r);
  };

  // 결과 초기화
  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <h1 className="text-xl font-bold">사주포춘</h1>
          <span className="text-sm text-muted-foreground">AI 사주팔자 운세</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {!result ? (
          <InputForm
            year={year} month={month} day={day} hour={hour}
            setYear={setYear} setMonth={setMonth} setDay={setDay} setHour={setHour}
            onCalculate={handleCalculate}
          />
        ) : (
          <ResultView result={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

/* === 입력 폼 컴포넌트 === */
function InputForm({
  year, month, day, hour,
  setYear, setMonth, setDay, setHour, onCalculate,
}: {
  year: number; month: number; day: number; hour: number;
  setYear: (v: number) => void; setMonth: (v: number) => void;
  setDay: (v: number) => void; setHour: (v: number) => void;
  onCalculate: () => void;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-8">
      {/* 안내 문구 */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-yellow-500/20">
          <Star className="h-10 w-10 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold">사주팔자 보기</h2>
        <p className="mt-2 text-muted-foreground">
          생년월일시를 입력하면 사주팔자와 오늘의 운세를 확인할 수 있습니다
        </p>
      </div>

      {/* 입력 필드 */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4" />
            <span>생년월일시 (양력)</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">출생년도</label>
              <Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>{y}년</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">월</label>
              <Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}월</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">일</label>
              <Select value={day} onChange={(e) => setDay(Number(e.target.value))}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}일</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">시 (24시간)</label>
              <Select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={h}>{String(h).padStart(2, "0")}시</option>
                ))}
              </Select>
            </div>
          </div>

          <Button
            onClick={onCalculate}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            사주 분석하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* === 결과 뷰 컴포넌트 === */
function ResultView({ result, onReset }: { result: ISajuResult; onReset: () => void }) {
  const pillars = [
    { label: "년주(年柱)", gan: result.yearGan, ji: result.yearJi },
    { label: "월주(月柱)", gan: result.monthGan, ji: result.monthJi },
    { label: "일주(日柱)", gan: result.dayGan, ji: result.dayJi },
    { label: "시주(時柱)", gan: result.hourGan, ji: result.hourJi },
  ];

  return (
    <div className="space-y-6">
      {/* 사주 4주 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">사주팔자 (四柱八字)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {pillars.map((p) => (
              <div key={p.label} className="text-center">
                <div className="mb-2 text-xs text-muted-foreground">{p.label}</div>
                <div className="mx-auto flex h-20 w-16 flex-col items-center justify-center rounded-lg bg-gradient-to-b from-purple-500/20 to-indigo-500/20 font-bold">
                  <span className="text-lg">{p.gan}</span>
                  <span className="text-lg">{p.ji}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {result.animal}띠
          </div>
        </CardContent>
      </Card>

      {/* 오행 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>오행 분석 (五行)</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-3">
          {Object.entries(result.ohangBalance).map(([key, val]) => {
            const info = OHANG[key];
            const maxVal = Math.max(...Object.values(result.ohangBalance));
            const pct = maxVal > 0 ? (val / 8) * 100 : 0;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="w-16 text-sm">
                  {info.emoji} {info.name}
                </span>
                <div className="flex-1">
                  <div className="h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        key === "목" && "bg-green-500",
                        key === "화" && "bg-red-500",
                        key === "토" && "bg-yellow-500",
                        key === "금" && "bg-gray-400",
                        key === "수" && "bg-blue-500",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="w-6 text-right text-sm font-medium">{val}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          주요 오행: <strong className={OHANG[result.dominantOhang].color}>{OHANG[result.dominantOhang].name}</strong>
          {" / "}부족한 오행: <strong className={OHANG[result.weakOhang].color}>{OHANG[result.weakOhang].name}</strong>
        </p>
        </CardContent>
      </Card>

      {/* 오늘의 운세 */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-yellow-500/10">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          <CardTitle>오늘의 운세</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground/90">{result.fortune}</p>
        </CardContent>
      </Card>

      {/* 행운의 숫자 */}
      <Card>
        <CardHeader>
          <CardTitle>행운의 숫자</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex gap-3">
          {result.luckyNumbers.map((n) => (
            <div
              key={n}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-lg font-bold text-white"
            >
              {n}
            </div>
          ))}
        </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" size="lg" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          다시 보기
        </Button>
        <Button className="flex-1" size="lg" onClick={() => {
          if (navigator.share) {
            navigator.share({ title: "사주포춘 결과", text: result.fortune });
          }
        }}>
          <Share2 className="h-4 w-4" />
          공유하기
        </Button>
      </div>
    </div>
  );
}
