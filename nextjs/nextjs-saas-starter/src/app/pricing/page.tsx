import { Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/stripe";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Link>
        </div>
      </header>

      <main className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
              투명한 요금제
            </h1>
            <p className="text-lg text-muted-foreground">
              숨겨진 비용 없이, 필요한 기능만 선택하세요.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.values(PLANS).map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-2xl border p-8 transition-shadow hover:shadow-lg",
                  plan.name === "Pro" && "border-primary ring-1 ring-primary"
                )}
              >
                {plan.name === "Pro" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                    인기
                  </div>
                )}

                <h2 className="mb-2 text-xl font-bold">{plan.name}</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  {plan.name === "Free" && "개인 프로젝트에 적합합니다"}
                  {plan.name === "Pro" && "성장하는 팀을 위한 플랜"}
                  {plan.name === "Enterprise" && "대규모 조직을 위한 맞춤형"}
                </p>

                <div className="mb-8">
                  <span className="text-4xl font-extrabold">
                    {plan.price === 0 ? "무료" : `₩${plan.price.toLocaleString()}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-muted-foreground"> /월</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full rounded-lg py-3 text-sm font-medium transition-colors",
                    plan.name === "Pro"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border hover:bg-accent"
                  )}
                >
                  {plan.name === "Enterprise" ? "문의하기" : plan.price === 0 ? "무료로 시작" : "구독하기"}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold">자주 묻는 질문</h2>
            <div className="mx-auto max-w-2xl space-y-4">
              {[
                { q: "무료 플랜에서 Pro로 언제든 변경할 수 있나요?", a: "네, 언제든 업그레이드 가능하며 즉시 반영됩니다." },
                { q: "결제는 어떻게 처리되나요?", a: "Stripe를 통해 안전하게 처리됩니다. 카드 정보는 서버에 저장되지 않습니다." },
                { q: "환불 정책은 어떻게 되나요?", a: "구독 후 14일 이내 전액 환불 가능합니다." },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl border p-6">
                  <h3 className="mb-2 font-semibold">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
