"use client";

import { useState, useMemo } from "react";
import {
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  User,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  getDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* 예약 가능 시간 슬롯 */
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

/* 서비스 목록 */
const SERVICES = [
  { id: "consult", name: "상담 예약", duration: "30분", price: "무료", icon: User },
  { id: "tour", name: "시설 투어", duration: "60분", price: "₩10,000", icon: MapPin },
  { id: "class", name: "체험 클래스", duration: "90분", price: "₩25,000", icon: CalendarDays },
];

type BookingStep = "service" | "date" | "time" | "confirm";

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  /* 달력 날짜 계산 */
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startPadding = getDay(monthStart);
    return { days, startPadding };
  }, [currentMonth]);

  const service = SERVICES.find((s) => s.id === selectedService);

  /* 예약 확정 처리 */
  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">예약이 확정되었습니다</h2>
        <Card className="mt-4">
          <CardContent className="p-6 text-sm space-y-2">
            <p><span className="text-muted-foreground">서비스:</span> {service?.name}</p>
            <p><span className="text-muted-foreground">날짜:</span> {selectedDate && format(selectedDate, "yyyy년 M월 d일 (EEE)", { locale: ko })}</p>
            <p><span className="text-muted-foreground">시간:</span> {selectedTime}</p>
            <p><span className="text-muted-foreground">소요시간:</span> {service?.duration}</p>
          </CardContent>
        </Card>
        <Button
          onClick={() => { setStep("service"); setConfirmed(false); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); }}
          className="mt-6"
        >
          새 예약하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">예약 플랫폼</h1>
      </header>

      {/* 진행 단계 표시 */}
      <div className="flex items-center justify-center gap-2 border-b px-4 py-3">
        {(["service", "date", "time", "confirm"] as BookingStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
              step === s ? "bg-primary text-primary-foreground" :
              (["service","date","time","confirm"].indexOf(step) > i) ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {i + 1}
            </div>
            {i < 3 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-lg">
          {/* 서비스 선택 단계 */}
          {step === "service" && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">서비스를 선택하세요</h2>
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <Button
                    key={s.id}
                    variant="outline"
                    onClick={() => { setSelectedService(s.id); setStep("date"); }}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl h-auto p-4 text-left transition-colors hover:bg-accent",
                      selectedService === s.id && "border-primary bg-accent"
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.duration} · {s.price}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                );
              })}
            </div>
          )}

          {/* 날짜 선택 단계 */}
          {step === "date" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">날짜를 선택하세요</h2>
              {/* 월 네비게이션 */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">{format(currentMonth, "yyyy년 M월", { locale: ko })}</span>
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
                {["일","월","화","수","목","금","토"].map((d) => (
                  <div key={d} className="py-2">{d}</div>
                ))}
              </div>
              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: calendarDays.startPadding }).map((_, i) => (
                  <div key={`pad-${i}`} />
                ))}
                {calendarDays.days.map((day) => {
                  const past = isBefore(day, startOfDay(new Date()));
                  return (
                    <button
                      key={day.toISOString()}
                      disabled={past}
                      onClick={() => { setSelectedDate(day); setStep("time"); }}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-lg text-sm transition-colors",
                        past && "text-muted-foreground/40 cursor-not-allowed",
                        !past && "hover:bg-accent cursor-pointer",
                        isToday(day) && "font-bold text-primary",
                        selectedDate && isSameDay(day, selectedDate) && "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStep("service")} className="text-muted-foreground hover:text-foreground">
                ← 서비스 선택으로 돌아가기
              </Button>
            </div>
          )}

          {/* 시간 선택 단계 */}
          {step === "time" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">시간을 선택하세요</h2>
              <p className="text-sm text-muted-foreground">
                {selectedDate && format(selectedDate, "yyyy년 M월 d일 (EEEE)", { locale: ko })}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => { setSelectedTime(time); setStep("confirm"); }}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {time}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setStep("date")} className="text-muted-foreground hover:text-foreground">
                ← 날짜 선택으로 돌아가기
              </Button>
            </div>
          )}

          {/* 예약 확인 단계 */}
          {step === "confirm" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">예약 정보를 확인하세요</h2>
              <Card>
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">서비스</span>
                    <span className="font-medium">{service?.name}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">날짜</span>
                    <span className="font-medium">{selectedDate && format(selectedDate, "yyyy.MM.dd (EEE)", { locale: ko })}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">시간</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">소요시간</span>
                    <span className="font-medium">{service?.duration}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">비용</span>
                    <span className="font-semibold">{service?.price}</span>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={handleConfirm} className="w-full">
                예약 확정하기
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setStep("time")} className="w-full text-muted-foreground hover:text-foreground">
                ← 시간 선택으로 돌아가기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
