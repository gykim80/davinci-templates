import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

// 스트리밍 응답을 위해 런타임을 edge 또는 nodejs로 설정
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: "당신은 친절하고 도움이 되는 AI 어시스턴트입니다. 한국어로 답변합니다.",
    messages,
  });

  return result.toDataStreamResponse();
}
