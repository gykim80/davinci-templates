"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Download, ArrowLeft, Star, ShoppingCart, Check, FileText, HardDrive, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { digitalProducts, formatPrice, productTypes } from "@/lib/digital-products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [purchased, setPurchased] = useState(false);

  const product = digitalProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="mb-4 text-lg text-muted-foreground">상품을 찾을 수 없습니다</p>
        <Link href="/" className="text-sm text-primary hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const isPurchased = product.purchased || purchased;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">디지털 상품</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> 뒤로가기
        </button>

        <div className="grid gap-8 md:grid-cols-5">
          {/* 왼쪽: 이미지 + 미리보기 */}
          <div className="md:col-span-3">
            <div className="mb-6 flex aspect-video items-center justify-center rounded-2xl bg-muted text-8xl">
              {product.image}
            </div>
            <div className="rounded-xl border p-6">
              <div className="mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">미리보기</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.preview}</p>
            </div>
          </div>

          {/* 오른쪽: 구매 정보 */}
          <div className="md:col-span-2">
            <span className="mb-2 inline-block rounded bg-accent px-2 py-0.5 text-xs">
              {productTypes.find((t) => t.value === product.type)?.label}
            </span>
            <h1 className="mb-3 text-2xl font-bold">{product.name}</h1>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount}개 리뷰)</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mb-6 space-y-2 rounded-xl border p-4 text-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>포맷: {product.format}</span>
              </div>
              <div className="flex items-center gap-3">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span>파일 크기: {product.fileSize}</span>
              </div>
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span>{product.downloadCount.toLocaleString()}회 다운로드</span>
              </div>
            </div>

            <div className="mb-4 text-3xl font-bold">{formatPrice(product.price)}</div>

            {isPurchased ? (
              <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-medium text-white">
                  <Download className="h-4 w-4" /> 다운로드
                </button>
                <p className="text-center text-xs text-muted-foreground">구매 완료 - 무제한 다운로드 가능</p>
              </div>
            ) : (
              <button onClick={() => setPurchased(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <ShoppingCart className="h-4 w-4" /> 구매하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
