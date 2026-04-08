import { addDocument, getDocumentCount, getFileList } from "@/lib/vector-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    const content = await file.text();
    const chunksAdded = addDocument(file.name, content);

    return NextResponse.json({
      success: true,
      filename: file.name,
      chunksAdded,
      totalChunks: getDocumentCount(),
      files: getFileList(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "파일 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
