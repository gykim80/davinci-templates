import { NextResponse } from "next/server";
import { deductCredits, calculateCost, getCredits } from "@/lib/credits";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { prompt, model = "claude-sonnet-4-20250514", userId = "user_demo" } =
      await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다" },
        { status: 400 }
      );
    }

    // 크레딧 확인
    const user = getCredits(userId);
    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    // 예상 비용 산정 (입력 토큰 추정)
    const estimatedInputTokens = Math.ceil(prompt.length / 4);
    const estimatedOutputTokens = 500;
    const cost = calculateCost(estimatedInputTokens, estimatedOutputTokens);

    if (user.credits < cost) {
      return NextResponse.json(
        { error: "크레딧이 부족합니다", remaining: user.credits, required: cost },
        { status: 402 }
      );
    }

    // AI API 호출 목업 (실제로는 Anthropic API 호출)
    const mockResponse = `이것은 "${prompt.slice(0, 50)}..." 에 대한 AI 응답 목업입니다.\n\n실제 구현에서는 ANTHROPIC_API_KEY를 사용하여 Claude API를 호출합니다. 모델: ${model}`;

    // 크레딧 차감
    const { success, remaining } = deductCredits(userId, cost);

    if (!success) {
      return NextResponse.json(
        { error: "크레딧 차감 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result: mockResponse,
      usage: {
        creditsUsed: cost,
        creditsRemaining: remaining,
        model,
        inputTokens: estimatedInputTokens,
        outputTokens: estimatedOutputTokens,
      },
    });
  } catch (err) {
    console.error("AI 생성 오류:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
