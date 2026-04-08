"use client";

import { cn } from "@/lib/utils";

/** 습관 타입 */
export interface IHabit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  /** 완료한 날짜 Set (ISO date string) */
  completedDates: Set<string>;
  createdAt: string;
}

interface IHabitGridProps {
  habit: IHabit;
  onToggleDate: (habitId: string, date: string) => void;
}

/** 오늘 기준 ISO 날짜 문자열 */
const toISO = (d: Date) => d.toISOString().slice(0, 10);

/** 지난 N일 배열 생성 */
function getLastNDays(n: number): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(toISO(d));
  }
  return days;
}

/** 연속 기록 계산 */
export function calculateStreak(completedDates: Set<string>): number {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (completedDates.has(toISO(d))) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/** 완료율 계산 (최근 30일) */
export function calculateRate(completedDates: Set<string>): number {
  const last30 = getLastNDays(30);
  const completed = last30.filter((d) => completedDates.has(d)).length;
  return Math.round((completed / 30) * 100);
}

/** 활동 강도 레벨 (0-4) */
function getLevel(isCompleted: boolean): number {
  return isCompleted ? 3 : 0;
}

/** 색상 맵 */
const COLOR_MAP: Record<string, string[]> = {
  green: ["bg-zinc-800", "bg-green-900", "bg-green-700", "bg-green-500", "bg-green-400"],
  blue: ["bg-zinc-800", "bg-blue-900", "bg-blue-700", "bg-blue-500", "bg-blue-400"],
  purple: ["bg-zinc-800", "bg-purple-900", "bg-purple-700", "bg-purple-500", "bg-purple-400"],
  orange: ["bg-zinc-800", "bg-orange-900", "bg-orange-700", "bg-orange-500", "bg-orange-400"],
  pink: ["bg-zinc-800", "bg-pink-900", "bg-pink-700", "bg-pink-500", "bg-pink-400"],
};

/** GitHub 스타일 습관 그리드 (최근 16주 = 112일) */
export function HabitGrid({ habit, onToggleDate }: IHabitGridProps) {
  const days = getLastNDays(112);
  const colors = COLOR_MAP[habit.color] ?? COLOR_MAP.green;
  const today = toISO(new Date());

  // 7일씩 주 단위로 묶기
  const weeks: string[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{habit.emoji}</span>
          <h3 className="text-sm font-semibold">{habit.name}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>🔥 {calculateStreak(habit.completedDates)}일 연속</span>
          <span>{calculateRate(habit.completedDates)}% 달성</span>
        </div>
      </div>

      {/* 그리드 */}
      <div className="flex gap-[3px] overflow-x-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((date) => {
              const isCompleted = habit.completedDates.has(date);
              const level = getLevel(isCompleted);
              const isToday = date === today;
              return (
                <button
                  key={date}
                  onClick={() => onToggleDate(habit.id, date)}
                  title={`${date} ${isCompleted ? "✓" : ""}`}
                  className={cn(
                    "h-3.5 w-3.5 rounded-sm transition-colors",
                    colors[level],
                    isToday && "ring-1 ring-foreground/30"
                  )}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
        <span>적게</span>
        {colors.slice(0, 2).map((c, i) => (
          <div key={i} className={cn("h-2.5 w-2.5 rounded-sm", c)} />
        ))}
        {colors.slice(3).map((c, i) => (
          <div key={i} className={cn("h-2.5 w-2.5 rounded-sm", c)} />
        ))}
        <span>많이</span>
      </div>
    </div>
  );
}
