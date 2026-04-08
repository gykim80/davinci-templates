"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products, formatPrice } from "@/lib/products";
import {
  type ICartItem,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  getCartCount,
} from "@/lib/cart";

export default function CartPage() {
  // 데모: 초기 장바구니에 2개 상품
  const [cart, setCart] = useState<ICartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[3], quantity: 2 },
  ]);

  const total = getCartTotal(cart);
  const count = getCartCount(cart);
  const shipping = total >= 50000 ? 0 : 3000;

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">스토어</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/products" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          쇼핑 계속하기
        </Link>

        <h1 className="mb-8 text-2xl font-bold">장바구니 ({count})</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-muted-foreground">
            <ShoppingCart className="mb-4 h-16 w-16" />
            <p className="mb-2 text-lg">장바구니가 비어있습니다</p>
            <p className="mb-6 text-sm">마음에 드는 상품을 담아보세요</p>
            <Link href="/products" className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              쇼핑하러 가기
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* 장바구니 목록 */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 rounded-xl border p-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-3xl">
                    {item.product.image}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.product.category}</p>
                      </div>
                      <button onClick={() => setCart(removeFromCart(cart, item.product.id))} className="text-muted-foreground hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border">
                        <button onClick={() => setCart(updateQuantity(cart, item.product.id, item.quantity - 1))} className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-xs font-medium">{item.quantity}</span>
                        <button onClick={() => setCart(updateQuantity(cart, item.product.id, item.quantity + 1))} className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 주문 요약 */}
            <div className="h-fit rounded-xl border p-6">
              <h2 className="mb-4 text-lg font-semibold">주문 요약</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">상품 금액</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">배송비</span>
                  <span>{shipping === 0 ? "무료" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">₩50,000 이상 주문 시 무료배송</p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-bold">
                    <span>총 결제금액</span>
                    <span>{formatPrice(total + shipping)}</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <CreditCard className="h-4 w-4" />
                결제하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
