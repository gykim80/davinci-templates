"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products, formatPrice } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="mb-4 text-lg text-muted-foreground">상품을 찾을 수 없습니다</p>
        <Link href="/products" className="text-sm text-primary hover:underline">상품 목록으로 돌아가기</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">스토어</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-4 w-4" />
            장바구니
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          {/* 상품 이미지 */}
          <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-muted text-8xl">
            {product.image}
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-white">-{discount}%</span>
            )}
          </div>
          {/* 상품 정보 */}
          <div className="flex flex-col">
            <span className="mb-2 text-sm text-muted-foreground">{product.category}</span>
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
            {/* 수량 선택 */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">수량</label>
              <div className="inline-flex items-center rounded-xl border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
                <span className="flex h-10 w-12 items-center justify-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            {/* 장바구니 버튼 */}
            <button onClick={handleAddToCart} disabled={!product.inStock} className={cn("flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all", product.inStock ? addedToCart ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90" : "cursor-not-allowed bg-muted text-muted-foreground")}>
              {!product.inStock ? "품절" : addedToCart ? (<><Check className="h-4 w-4" />장바구니에 담겼습니다</>) : (<><ShoppingCart className="h-4 w-4" />장바구니에 담기 · {formatPrice(product.price * quantity)}</>)}
            </button>
            {/* 배송 정보 */}
            <div className="mt-6 space-y-3 rounded-xl border p-4">
              <div className="flex items-center gap-3 text-sm"><Truck className="h-4 w-4 text-muted-foreground" /><span>₩50,000 이상 무료배송 · 2~3일 소요</span></div>
              <div className="flex items-center gap-3 text-sm"><RotateCcw className="h-4 w-4 text-muted-foreground" /><span>7일 이내 무료 반품</span></div>
              <div className="flex items-center gap-3 text-sm"><Shield className="h-4 w-4 text-muted-foreground" /><span>정품 보장</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
