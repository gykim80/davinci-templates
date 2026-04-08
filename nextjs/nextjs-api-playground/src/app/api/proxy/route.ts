import { NextRequest, NextResponse } from "next/server";

// CORS 프록시 API — 클라이언트 요청을 서버에서 전달
export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL이 필요합니다." },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const response = await fetch(url, {
      method: method || "GET",
      headers: headers || {},
      body: method !== "GET" && method !== "HEAD" ? body : undefined,
    });

    const elapsed = Date.now() - startTime;
    const responseText = await response.text();

    // 응답 헤더를 일반 객체로 변환
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      responseHeaders[key] = val;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseText,
      elapsed,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
