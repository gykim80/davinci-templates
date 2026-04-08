import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 서브도메인 감지 → 테넌트 라우팅 미들웨어
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();

  // localhost 개발 환경: ?tenant=acme 쿼리 파라미터 지원
  const tenantFromQuery = url.searchParams.get("tenant");

  // 서브도메인에서 테넌트 추출 (acme.example.com → acme)
  const parts = host.split(".");
  const tenantFromSubdomain =
    parts.length >= 2 && parts[0] !== "www" && parts[0] !== "localhost"
      ? parts[0]
      : null;

  const tenant = tenantFromSubdomain ?? tenantFromQuery;

  if (tenant) {
    // 테넌트 정보를 헤더에 주입
    const response = NextResponse.next();
    response.headers.set("x-tenant-slug", tenant);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
