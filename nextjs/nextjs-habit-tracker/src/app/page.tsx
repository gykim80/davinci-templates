"use client";

import { useState, useCallback } from "react";
import { Activity, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HabitGrid, type IHabit } from "@/components/habit-grid";
import { HabitStats } from "@/components/habit-stats";
import { AddHabitDialog } from "@/components/add-habit-dialog";

/** 최근 N일 중 랜덤 완료 날짜 생성 (데모용) */
function randomDates(count: number): Set<string> {
  const dates = new Set<string>();
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - Math.floor(Math.random() * 90));
    dates.add(d.toISOString().slice(0, 10));
  }
  return dates;
}

/** 샘플 습관 데이터 */
const SAMPLE_HABITS: IHabit[] = [
  { id: "1", name: "독서 30분", emoji: "📚", color: "green", completedDates: randomDates(45), createdAt: "2025-01-01" },
  { id: "2", name: "운동하기", emoji: "🏃", color: "blue", completedDates: randomDates(38), createdAt: "2025-01-15" },
  { id: "3", name: "물 2L 마시기", emoji: "💧", color: "purple", completedDates: randomDates(55), createdAt: "2025-02-01" },
  { id: "4", name: "명상 10분", emoji: "🧘", color: "orange", completedDates: randomDates(30), createdAt: "2025-02-15" },
];

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<IHabit[]>(SAMPLE_HABITS);
  const [showAdd, setShowAdd] = useState(false);

  // 날짜 토글 (완료/미완료)
  const toggleDate = useCallback((habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const newDates = new Set(h.completedDates);
        if (newDates.has(date)) {
          newDates.delete(date);
        } else {
          newDates.add(date);
        }
        return { ...h, completedDates: newDates };
      })
    );
  }, []);

  // 습관 추가
  const addHabit = useCallback((name: string, emoji: string, color: string) => {
    const newHabit: IHabit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      color,
      completedDates: new Set<string>(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  // 습관 삭제
  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">습관 추적기</h1>
          </div>
          <Button onClick={() => setShowAdd(true)} size="sm">
            <Plus className="h-4 w-4" /> 습관 추가
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 p-6">
        {/* 통계 */}
        <HabitStats habits={habits} />

        {/* 습관 그리드 목록 */}
        {habits.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <Activity className="mb-4 h-12 w-12" />
            <p className="text-lg">아직 습관이 없습니다</p>
            <p className="text-sm">새 습관을 추가해보세요</p>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="relative">
                <HabitGrid habit={habit} onToggleDate={toggleDate} />
                <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)}
                  className="absolute right-3 top-3 h-7 w-7 text-muted-foreground hover:text-red-400"
                  title="습관 삭제">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 습관 추가 다이얼로그 */}
      {showAdd && <AddHabitDialog onAdd={addHabit} onClose={() => setShowAdd(false)} />}
    </div>
  );
}
