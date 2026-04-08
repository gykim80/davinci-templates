import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json({ translation: "" });
    }

    const { text: translation } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a professional translator. Translate the given text from ${sourceLanguage} to ${targetLanguage}.
Rules:
- Only output the translation, nothing else.
- Maintain the original tone and style.
- Preserve formatting (line breaks, punctuation).
- If the text is already in the target language, return it as-is.`,
      prompt: text,
    });

    return NextResponse.json({ translation });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "번역 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
