"use client";

import { Flame, Target, Calendar, TrendingUp } from "lucide-react";
import type { IHabit } from "./habit-grid";
import { calculateStreak, calculateRate } from "./habit-grid";

interface IHabitStatsProps {
  habits: IHabit[];
}

/** 통계 카드 */
export function HabitStats({ habits }: IHabitStatsProps) {
  // 전체 완료 횟수
  const totalCompletions = habits.reduce(
    (sum, h) => sum + h.completedDates.size,
    0
  );

  // 최장 연속 기록
  const maxStreak = Math.max(...habits.map((h) => calculateStreak(h.completedDates)), 0);

  // 평균 달성률
  const avgRate = habits.length
    ? Math.round(habits.reduce((sum, h) => sum + calculateRate(h.completedDates), 0) / habits.length)
    : 0;

  // 오늘 완료한 습관 수
  const today = new Date().toISOString().slice(0, 10);
  const todayCompleted = habits.filter((h) => h.completedDates.has(today)).length;

  const stats = [
    { icon: Flame, label: "최장 연속", value: `${maxStreak}일`, color: "text-orange-400" },
    { icon: Target, label: "평균 달성률", value: `${avgRate}%`, color: "text-green-400" },
    { icon: Calendar, label: "총 완료", value: `${totalCompletions}회`, color: "text-blue-400" },
    { icon: TrendingUp, label: "오늘 완료", value: `${todayCompleted}/${habits.length}`, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div
          key={label}
          className="rounded-xl border bg-muted/20 p-4"
        >
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
