"use client";

import { useState } from "react";
import { Heart, RotateCcw, Users, ChevronDown, Star, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MBTI_TYPES, MBTI_PROFILES, type MbtiType } from "@/lib/mbti";
import { getCompatibility, type ICompatResult } from "@/lib/compatibility";

export default function MbtiMatchPage() {
  const [myType, setMyType] = useState<MbtiType | null>(null);
  const [partnerType, setPartnerType] = useState<MbtiType | null>(null);
  const [result, setResult] = useState<ICompatResult | null>(null);
  const [showProfiles, setShowProfiles] = useState(false);

  const handleMatch = () => {
    if (myType && partnerType) {
      setResult(getCompatibility(myType, partnerType));
    }
  };

  const handleReset = () => {
    setMyType(null);
    setPartnerType(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          <h1 className="text-xl font-bold">MBTI 궁합</h1>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfiles(!showProfiles)}
            className="flex items-center gap-1 text-xs"
          >
            <Users className="h-4 w-4" />
            16유형 보기
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {showProfiles ? (
          <ProfilesGrid onClose={() => setShowProfiles(false)} />
        ) : result && myType && partnerType ? (
          <ResultView my={myType} partner={partnerType} result={result} onReset={handleReset} />
        ) : (
          <SelectorView
            myType={myType} partnerType={partnerType}
            setMyType={setMyType} setPartnerType={setPartnerType}
            onMatch={handleMatch}
          />
        )}
      </main>
    </div>
  );
}

/* === MBTI 선택 뷰 === */
function SelectorView({
  myType, partnerType, setMyType, setPartnerType, onMatch,
}: {
  myType: MbtiType | null; partnerType: MbtiType | null;
  setMyType: (t: MbtiType) => void; setPartnerType: (t: MbtiType) => void;
  onMatch: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20">
          <Heart className="h-10 w-10 text-pink-400" />
        </div>
        <h2 className="text-2xl font-bold">MBTI 궁합 테스트</h2>
        <p className="mt-2 text-muted-foreground">나와 상대방의 MBTI를 선택하면 궁합을 분석해드립니다</p>
      </div>

      {/* 내 MBTI */}
      <MbtiSelector label="내 MBTI" selected={myType} onSelect={setMyType} />

      {/* 하트 연결선 */}
      <div className="flex justify-center">
        <Heart className={cn("h-8 w-8 transition-colors", myType && partnerType ? "text-pink-500" : "text-muted")} />
      </div>

      {/* 상대방 MBTI */}
      <MbtiSelector label="상대방 MBTI" selected={partnerType} onSelect={setPartnerType} />

      {/* 분석 버튼 */}
      <Button
        onClick={onMatch}
        disabled={!myType || !partnerType}
        className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        궁합 분석하기
      </Button>
    </div>
  );
}

/* MBTI 타입 선택 그리드 */
function MbtiSelector({ label, selected, onSelect }: {
  label: string; selected: MbtiType | null; onSelect: (t: MbtiType) => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-3 text-sm font-medium">{label}</p>
        <div className="grid grid-cols-4 gap-2">
          {MBTI_TYPES.map((t) => {
            const profile = MBTI_PROFILES[t];
            return (
              <Button
                key={t}
                variant="outline"
                onClick={() => onSelect(t)}
                className={cn(
                  "h-auto flex-col rounded-lg px-2 py-2 text-center text-xs font-medium transition-all",
                  selected === t
                    ? "border-pink-500 bg-pink-500/10 text-pink-400"
                    : "hover:border-muted-foreground/30 hover:bg-muted"
                )}
              >
                <span className="text-base">{profile.emoji}</span>
                <div className="mt-0.5 font-bold">{t}</div>
              </Button>
            );
          })}
        </div>
        {selected && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {MBTI_PROFILES[selected].emoji} {MBTI_PROFILES[selected].title}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* === 결과 뷰 === */
function ResultView({ my, partner, result, onReset }: {
  my: MbtiType; partner: MbtiType; result: ICompatResult; onReset: () => void;
}) {
  const myP = MBTI_PROFILES[my];
  const partnerP = MBTI_PROFILES[partner];
  const hearts = Array.from({ length: 5 }, (_, i) => i < result.score);

  return (
    <div className="space-y-6">
      {/* 매칭 헤더 */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <span className="text-3xl">{myP.emoji}</span>
              <p className="mt-1 text-sm font-bold">{my}</p>
            </div>
            <Heart className="h-8 w-8 text-pink-500" />
            <div className="text-center">
              <span className="text-3xl">{partnerP.emoji}</span>
              <p className="mt-1 text-sm font-bold">{partner}</p>
            </div>
          </div>
          {/* 하트 점수 */}
          <div className="mt-4 flex justify-center gap-1.5">
            {hearts.map((filled, i) => (
              <Star key={i} className={cn("h-6 w-6", filled ? "fill-pink-400 text-pink-400" : "text-muted")} />
            ))}
          </div>
          <p className={cn("mt-2 text-lg font-bold", result.color)}>{result.label}</p>
        </CardContent>
      </Card>

      {/* 분석 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-bold">궁합 분석</h3>
          <p className="leading-relaxed text-muted-foreground">{result.description}</p>
        </CardContent>
      </Card>

      {/* 팁 */}
      <Card className="bg-gradient-to-r from-pink-500/5 to-purple-500/5">
        <CardContent className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-bold">관계 꿀팁</h3>
          </div>
          <ul className="space-y-2">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-pink-400">{">"}</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 각 유형 요약 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TypeSummary profile={myP} label="나" />
        <TypeSummary profile={partnerP} label="상대방" />
      </div>

      <Button
        variant="outline"
        onClick={onReset}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3"
      >
        <RotateCcw className="h-4 w-4" />
        다시 테스트하기
      </Button>
    </div>
  );
}

function TypeSummary({ profile, label }: { profile: typeof MBTI_PROFILES[MbtiType]; label: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-xl">{profile.emoji}</span>
          <div>
            <p className="text-sm font-bold">{profile.type}</p>
            <p className="text-xs text-muted-foreground">{profile.title}</p>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{profile.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {profile.strengths.map((s) => (
            <Badge key={s} variant="secondary" className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">{s}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* === 16유형 전체 보기 === */
function ProfilesGrid({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">MBTI 16유형</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>닫기</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {MBTI_TYPES.map((t) => {
          const p = MBTI_PROFILES[t];
          return (
            <Card key={t}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-white", p.color)}>
                    <span className="text-lg">{p.emoji}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t}</p>
                    <p className="text-xs text-muted-foreground">{p.title}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.strengths.map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
