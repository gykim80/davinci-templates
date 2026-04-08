"use client";

import { useState } from "react";
import {
  Package,
  Check,
  Star,
  Gift,
  ShoppingCart,
  ChevronRight,
  Sparkles,
  Heart,
  Crown,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* 구독 플랜 타입 */
interface ISubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  icon: typeof Package;
  features: string[];
  popular?: boolean;
  items: IBoxItem[];
}

/* 박스 상품 타입 */
interface IBoxItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  value: number;
}

/* 구독 플랜 데이터 */
const PLANS: ISubscriptionPlan[] = [
  {
    id: "basic",
    name: "베이직 박스",
    price: 19900,
    period: "월",
    icon: Package,
    features: ["매월 3~4개 상품", "무료 배송", "언제든 해지 가능"],
    items: [
      { id: "b1", name: "유기농 핸드크림", emoji: "🧴", description: "프리미엄 시어버터 핸드크림", value: 8900 },
      { id: "b2", name: "아로마 캔들", emoji: "🕯️", description: "라벤더 향 소이 캔들", value: 12000 },
      { id: "b3", name: "허브 티백 세트", emoji: "🍵", description: "캐모마일 & 페퍼민트 10개입", value: 6500 },
    ],
  },
  {
    id: "premium",
    name: "프리미엄 박스",
    price: 39900,
    period: "월",
    icon: Star,
    popular: true,
    features: ["매월 5~7개 상품", "무료 배송", "한정판 굿즈 포함", "멤버 전용 할인"],
    items: [
      { id: "p1", name: "프리미엄 에센스", emoji: "✨", description: "히알루론산 세럼 30ml", value: 28000 },
      { id: "p2", name: "유기농 초콜릿", emoji: "🍫", description: "벨기에산 다크 초콜릿 세트", value: 15000 },
      { id: "p3", name: "아로마 디퓨저", emoji: "🌸", description: "로즈마리 리드 디퓨저", value: 22000 },
      { id: "p4", name: "프리미엄 마스크팩", emoji: "🎭", description: "콜라겐 시트 마스크 5매", value: 18000 },
      { id: "p5", name: "한정판 스티커", emoji: "⭐", description: "시즌 한정 데코 스티커 세트", value: 5000 },
    ],
  },
  {
    id: "luxury",
    name: "럭셔리 박스",
    price: 79900,
    period: "월",
    icon: Crown,
    features: ["매월 8~10개 상품", "무료 특급 배송", "한정판 + VIP 상품", "1:1 큐레이션", "우선 배송"],
    items: [
      { id: "l1", name: "럭셔리 퍼퓸", emoji: "🥂", description: "프렌치 니치 향수 50ml", value: 65000 },
      { id: "l2", name: "실크 스카프", emoji: "🧣", description: "이탈리안 실크 스카프", value: 45000 },
      { id: "l3", name: "프리미엄 다이어리", emoji: "📔", description: "이탈리안 레더 다이어리", value: 35000 },
      { id: "l4", name: "오가닉 바디워시", emoji: "🛁", description: "프리미엄 바디 케어 세트", value: 28000 },
    ],
  },
];

type PageView = "plans" | "detail" | "checkout" | "complete";

export default function SubscriptionBoxPage() {
  const [view, setView] = useState<PageView>("plans");
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const formatPrice = (n: number) => `₩${n.toLocaleString()}`;

  const handleSelectPlan = (plan: ISubscriptionPlan) => {
    setSelectedPlan(plan);
    setView("detail");
  };

  const handleCheckout = () => setView("checkout");

  const handleComplete = () => {
    if (!name || !email) return;
    setView("complete");
  };

  /* 구독 완료 화면 */
  if (view === "complete") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">구독이 시작되었습니다!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          첫 번째 박스가 곧 배송됩니다
        </p>
        <Card className="mt-6">
          <CardContent className="p-5 text-sm space-y-2">
            <p><span className="text-muted-foreground">플랜:</span> {selectedPlan?.name}</p>
            <p><span className="text-muted-foreground">금액:</span> {selectedPlan && formatPrice(selectedPlan.price)}/월</p>
            <p><span className="text-muted-foreground">이름:</span> {name}</p>
            <p><span className="text-muted-foreground">이메일:</span> {email}</p>
          </CardContent>
        </Card>
        <Button
          onClick={() => { setView("plans"); setSelectedPlan(null); setName(""); setEmail(""); }}
          className="mt-6"
        >
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        {view !== "plans" && (
          <Button variant="ghost" size="icon" onClick={() => setView(view === "checkout" ? "detail" : "plans")} className="mr-1 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <Gift className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">구독 박스</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {/* 플랜 목록 */}
          {view === "plans" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">나만의 큐레이션 박스</h2>
                <p className="mt-1 text-sm text-muted-foreground">매달 엄선된 상품을 만나보세요</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {PLANS.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <Card
                      key={plan.id}
                      className={cn(
                        "relative flex flex-col",
                        plan.popular && "border-primary ring-1 ring-primary"
                      )}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full">
                          인기
                        </Badge>
                      )}
                      <CardContent className="flex flex-col p-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="font-semibold">{plan.name}</h3>
                        </div>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                          <span className="text-sm text-muted-foreground">/{plan.period}</span>
                        </div>
                        <ul className="mt-4 space-y-2 flex-1">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => handleSelectPlan(plan)}
                          variant={plan.popular ? "default" : "outline"}
                          className="mt-5 w-full"
                        >
                          선택하기
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* 플랜 상세 - 박스 미리보기 */}
          {view === "detail" && selectedPlan && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">{selectedPlan.name} 미리보기</h2>
                <p className="text-sm text-muted-foreground">이번 달 박스에 포함된 상품들이에요</p>
              </div>

              <div className="space-y-3">
                {selectedPlan.items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{formatPrice(item.value)}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">총 상품 가치</span>
                    <span className="text-lg font-bold line-through text-muted-foreground">
                      {formatPrice(selectedPlan.items.reduce((s, i) => s + i.value, 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-primary" /> 구독가
                    </span>
                    <span className="text-xl font-bold">{formatPrice(selectedPlan.price)}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4" />
                구독 시작하기
              </Button>
            </div>
          )}

          {/* 체크아웃 */}
          {view === "checkout" && selectedPlan && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">구독 정보 입력</h2>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{selectedPlan.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(selectedPlan.price)}/월</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">이름</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">이메일</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleComplete}
                disabled={!name || !email}
                className="w-full"
                size="lg"
              >
                구독 확정하기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
