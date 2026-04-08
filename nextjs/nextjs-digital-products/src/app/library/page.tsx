"use client";

import Link from "next/link";
import { Download, BookOpen, Key, FileText, HardDrive } from "lucide-react";
import { getPurchasedProducts, formatPrice, productTypes } from "@/lib/digital-products";
import { getMockLicenses } from "@/lib/license";

export default function LibraryPage() {
  const purchased = getPurchasedProducts();
  const licenses = getMockLicenses();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">디지털 상품</span>
          </Link>
          <span className="text-sm font-medium">내 라이브러리</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">내 라이브러리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            구매한 상품 {purchased.length}개
          </p>
        </div>

        {purchased.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <BookOpen className="mb-4 h-12 w-12" />
            <p className="mb-2 text-lg">구매한 상품이 없습니다</p>
            <Link href="/" className="text-sm text-primary hover:underline">
              상품 둘러보기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {purchased.map((product) => {
              const license = licenses.find(
                (l) => l.productId === product.id
              );
              return (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-xl border p-6 sm:flex-row"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-4xl">
                    {product.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent px-2 py-0.5 text-xs">
                        {productTypes.find((t) => t.value === product.type)?.label}
                      </span>
                    </div>
                    <h3 className="mt-1 font-semibold">{product.name}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {product.format}
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        {product.fileSize}
                      </span>
                      {license && (
                        <span className="flex items-center gap-1">
                          <Key className="h-3 w-3" />
                          {license.key}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <span className="text-sm font-medium">
                      {formatPrice(product.price)}
                    </span>
                    <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      <Download className="h-4 w-4" />
                      다운로드
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
