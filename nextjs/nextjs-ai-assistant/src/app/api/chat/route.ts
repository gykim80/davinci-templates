import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: `당신은 다양한 도구를 사용할 수 있는 AI 어시스턴트입니다.
한국어로 답변하며, 도구를 사용한 경우 결과를 자연스럽게 설명합니다.`,
    messages,
    tools: {
      weather: tool({
        description: "특정 도시의 현재 날씨를 조회합니다",
        parameters: z.object({
          city: z.string().describe("날씨를 조회할 도시 이름"),
        }),
        execute: async ({ city }) => {
          // 목업 날씨 데이터
          const weatherData: Record<
            string,
            { temp: number; condition: string; humidity: number }
          > = {
            서울: { temp: 18, condition: "맑음", humidity: 45 },
            부산: { temp: 21, condition: "구름 조금", humidity: 60 },
            제주: { temp: 22, condition: "흐림", humidity: 70 },
            도쿄: { temp: 20, condition: "맑음", humidity: 50 },
            뉴욕: { temp: 15, condition: "비", humidity: 80 },
            런던: { temp: 12, condition: "흐림", humidity: 75 },
          };
          const data = weatherData[city] || {
            temp: Math.floor(Math.random() * 30),
            condition: "맑음",
            humidity: Math.floor(Math.random() * 100),
          };
          return {
            city,
            temperature: data.temp,
            condition: data.condition,
            humidity: data.humidity,
            unit: "°C",
          };
        },
      }),

      calculator: tool({
        description: "수학 계산을 수행합니다",
        parameters: z.object({
          expression: z.string().describe("계산할 수식 (예: 2 + 3 * 4)"),
        }),
        execute: async ({ expression }) => {
          try {
            // 안전한 수식 평가 (기본 연산만 허용)
            const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, "");
            const result = Function(`"use strict"; return (${sanitized})`)();
            return {
              expression,
              result: Number(result),
              success: true,
            };
          } catch {
            return {
              expression,
              result: null,
              success: false,
              error: "계산할 수 없는 수식입니다",
            };
          }
        },
      }),

      web_search: tool({
        description: "웹에서 정보를 검색합니다",
        parameters: z.object({
          query: z.string().describe("검색할 키워드"),
        }),
        execute: async ({ query }) => {
          // 목업 검색 결과
          return {
            query,
            results: [
              {
                title: `${query} - 위키백과`,
                snippet: `${query}에 대한 위키백과 문서입니다. 자세한 내용은 본문을 참고하세요.`,
                url: `https://ko.wikipedia.org/wiki/${encodeURIComponent(query)}`,
              },
              {
                title: `${query} 관련 최신 뉴스`,
                snippet: `${query}에 대한 최신 뉴스와 업데이트를 확인하세요.`,
                url: `https://news.example.com/${encodeURIComponent(query)}`,
              },
              {
                title: `${query} 상세 가이드`,
                snippet: `${query}에 대해 알아야 할 모든 것을 정리한 가이드입니다.`,
                url: `https://guide.example.com/${encodeURIComponent(query)}`,
              },
            ],
          };
        },
      }),
    },
    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
