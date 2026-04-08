import OpenAI from "openai";
import { addImage, getImages } from "@/lib/image-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { prompt, size = "1024x1024" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트를 입력해주세요." },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
      quality: "standard",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    const saved = addImage({ prompt, url: imageUrl, size });

    return NextResponse.json({
      success: true,
      image: saved,
      gallery: getImages(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "이미지 생성 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ gallery: getImages() });
}
