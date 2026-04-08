import { NextRequest, NextResponse } from "next/server";
import { digitalProducts } from "@/lib/digital-products";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 상품 존재 확인
  const product = digitalProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json(
      { error: "상품을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 인증 체크 (데모: Authorization 헤더 확인)
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "인증이 필요합니다. 로그인 후 다시 시도해주세요." },
      { status: 401 }
    );
  }

  // 구매 여부 확인
  if (!product.purchased) {
    return NextResponse.json(
      { error: "이 상품을 구매하지 않았습니다." },
      { status: 403 }
    );
  }

  // 데모: 실제 파일 대신 JSON 응답
  return NextResponse.json({
    success: true,
    productId: product.id,
    productName: product.name,
    downloadUrl: `https://cdn.example.com/downloads/${product.id}`,
    format: product.format,
    fileSize: product.fileSize,
    message: "다운로드 링크가 생성되었습니다. 24시간 유효합니다.",
  });
}
