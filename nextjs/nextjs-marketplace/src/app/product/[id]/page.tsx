"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Store, ArrowLeft, Star, ShoppingCart, Check, BadgeCheck, Package, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketProducts, formatPrice, getSellerById } from "@/lib/marketplace-data";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = marketProducts.find((p) => p.id === params.id);
  const seller = product ? getSellerById(product.sellerId) : undefined;

  if (!product || !seller) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="mb-4 text-lg text-muted-foreground">상품을 찾을 수 없습니다</p>
        <Link href="/" className="text-sm text-primary hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">마켓</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> 뒤로가기
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted text-8xl">{product.image}</div>
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-muted-foreground">{product.category}</span>
            <h1 className="mb-3 text-2xl font-bold md:text-3xl">{product.name}</h1>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount}개 리뷰)</span>
            </div>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <button onClick={handleAddToCart} className={cn("flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all", addedToCart ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
              {addedToCart ? (<><Check className="h-4 w-4" />장바구니에 담겼습니다</>) : (<><ShoppingCart className="h-4 w-4" />장바구니에 담기</>)}
            </button>

            {/* 판매자 정보 */}
            <div className="mt-6 rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold">판매자 정보</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">{seller.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{seller.name}</span>
                    {seller.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{seller.rating}</span>
                    <span>{seller.salesCount.toLocaleString()}건 판매</span>
                    <span><Package className="inline h-3 w-3" /> {seller.productCount}개 상품</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs hover:bg-accent">
                  <MessageCircle className="h-3 w-3" /> 문의
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
