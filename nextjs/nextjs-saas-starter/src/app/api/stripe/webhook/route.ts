import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "서명이 없습니다" },
      { status: 400 }
    );
  }

  try {
    const event = verifyWebhookSignature(payload, signature);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // 결제 완료 처리: DB에 구독 정보 저장
        console.log("결제 완료:", session.id);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        // 구독 변경 처리
        console.log("구독 변경:", subscription.id);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        // 구독 취소 처리
        console.log("구독 취소:", subscription.id);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        // 결제 실패 처리
        console.log("결제 실패:", invoice.id);
        break;
      }
      default:
        console.log("처리되지 않은 이벤트:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("웹훅 검증 실패:", err);
    return NextResponse.json(
      { error: "웹훅 검증 실패" },
      { status: 400 }
    );
  }
}
