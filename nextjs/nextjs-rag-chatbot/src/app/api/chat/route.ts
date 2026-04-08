import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { searchDocuments } from "@/lib/vector-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 마지막 사용자 메시지로 문서 검색
  const lastUserMessage = messages
    .filter((m: { role: string }) => m.role === "user")
    .pop();

  const query = lastUserMessage?.content || "";
  const searchResults = searchDocuments(query, 3);

  // 검색된 문서를 컨텍스트로 구성
  const context =
    searchResults.length > 0
      ? searchResults
          .map(
            (r, i) =>
              `[출처 ${i + 1}: ${r.document.filename}]\n${r.document.content}`
          )
          .join("\n\n")
      : "업로드된 문서가 없습니다.";

  const systemPrompt = `당신은 RAG 기반 문서 Q&A 어시스턴트입니다.
아래 검색된 문서 컨텍스트를 기반으로 답변하세요.
답변 시 출처를 [출처 N] 형식으로 인용해주세요.
컨텍스트에 없는 내용은 "문서에서 해당 정보를 찾을 수 없습니다"라고 답하세요.

--- 검색된 문서 컨텍스트 ---
${context}
--- 컨텍스트 끝 ---`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
