"use client";

import { CreditCard, Truck, ShieldCheck, Lock } from "lucide-react";

/* shadcn/ui 인라인 컴포넌트 */
function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props} />;
}

/* 주문 요약 데이터 */
const ORDER_ITEMS = [
  { name: "프리미엄 플랜 (연간)", price: 99000 },
  { name: "추가 스토리지 50GB", price: 12000 },
];
const SUBTOTAL = ORDER_ITEMS.reduce((s, i) => s + i.price, 0);
const TAX = Math.round(SUBTOTAL * 0.1);
const TOTAL = SUBTOTAL + TAX;
const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">결제하기</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* 좌측: 폼 영역 */}
          <div className="space-y-6">
            {/* 배송 정보 */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">배송 정보</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">받는 분</label>
                  <Input placeholder="이름" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">전화번호</label>
                  <Input type="tel" placeholder="010-1234-5678" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">주소</label>
                <Input placeholder="도로명 주소" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">상세주소</label>
                  <Input placeholder="동/호수" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">도시</label>
                  <Input placeholder="서울" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">우편번호</label>
                  <Input placeholder="12345" />
                </div>
              </div>
            </div>

            {/* 카드 정보 */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">카드 정보</h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">카드 번호</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">만료일</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">CVC</label>
                  <Input placeholder="123" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">카드 소유자</label>
                  <Input placeholder="홍길동" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>결제 정보는 256-bit SSL로 암호화됩니다</span>
              </div>
            </div>
          </div>

          {/* 우측: 주문 요약 */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
              <h2 className="font-semibold">주문 요약</h2>
              <div className="space-y-3">
                {ORDER_ITEMS.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span>{fmt(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">소계</span>
                  <span>{fmt(SUBTOTAL)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">부가세 (10%)</span>
                  <span>{fmt(TAX)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>합계</span>
                <span>{fmt(TOTAL)}</span>
              </div>
              <Button className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                <ShieldCheck className="mr-2 h-4 w-4" /> 결제하기
              </Button>
              <p className="text-center text-xs text-muted-foreground">30일 환불 보장</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
