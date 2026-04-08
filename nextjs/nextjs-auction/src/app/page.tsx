"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Gavel,
  Timer,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUp,
  Package,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* 경매 아이템 타입 */
interface IAuctionItem {
  id: string;
  name: string;
  image: string;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  endTime: number;
  category: string;
  seller: string;
  watchers: number;
}

/* 입찰 기록 타입 */
interface IBidRecord {
  id: string;
  bidder: string;
  amount: number;
  time: Date;
}

/* 샘플 경매 데이터 */
const AUCTION_ITEMS: IAuctionItem[] = [
  { id: "1", name: "빈티지 기계식 키보드", image: "⌨️", currentBid: 150000, startingBid: 50000, bidCount: 12, endTime: Date.now() + 3600000 * 2, category: "전자기기", seller: "테크마니아", watchers: 45 },
  { id: "2", name: "한정판 스니커즈", image: "👟", currentBid: 280000, startingBid: 100000, bidCount: 24, endTime: Date.now() + 7200000, category: "패션", seller: "슈즈킹", watchers: 89 },
  { id: "3", name: "앤틱 손목시계", image: "⌚", currentBid: 520000, startingBid: 200000, bidCount: 8, endTime: Date.now() + 1800000, category: "액세서리", seller: "타임콜렉터", watchers: 67 },
  { id: "4", name: "프리미엄 카메라 렌즈", image: "📷", currentBid: 890000, startingBid: 500000, bidCount: 15, endTime: Date.now() + 5400000, category: "전자기기", seller: "포토프로", watchers: 34 },
  { id: "5", name: "아트 프린트 컬렉션", image: "🎨", currentBid: 75000, startingBid: 30000, bidCount: 6, endTime: Date.now() + 900000, category: "예술", seller: "갤러리원", watchers: 21 },
  { id: "6", name: "레어 LP 레코드 세트", image: "💿", currentBid: 340000, startingBid: 120000, bidCount: 19, endTime: Date.now() + 4500000, category: "음악", seller: "뮤직러버", watchers: 52 },
];

const CATEGORIES = ["전체", "전자기기", "패션", "액세서리", "예술", "음악"];

/* 남은 시간 계산 훅 */
function useCountdown(endTime: number) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) { setTimeLeft("종료"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  return timeLeft;
}

/* 카운트다운 배지 컴포넌트 */
function CountdownBadge({ endTime }: { endTime: number }) {
  const timeLeft = useCountdown(endTime);
  const urgent = endTime - Date.now() < 1800000;
  return (
    <Badge
      variant={urgent ? "destructive" : "secondary"}
      className={cn(
        "inline-flex items-center gap-1",
        urgent && "bg-red-500/20 text-red-400"
      )}
    >
      <Timer className="h-3 w-3" />
      {timeLeft}
    </Badge>
  );
}

export default function AuctionPage() {
  const [items, setItems] = useState(AUCTION_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState<IAuctionItem | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState<IBidRecord[]>([
    { id: "b1", bidder: "user_kim", amount: 520000, time: new Date(Date.now() - 300000) },
    { id: "b2", bidder: "user_lee", amount: 480000, time: new Date(Date.now() - 600000) },
    { id: "b3", bidder: "user_park", amount: 450000, time: new Date(Date.now() - 1200000) },
  ]);

  const filteredItems = selectedCategory === "전체"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  /* 입찰 처리 */
  const handleBid = useCallback(() => {
    if (!selectedItem || !bidAmount) return;
    const amount = parseInt(bidAmount, 10);
    if (amount <= selectedItem.currentBid) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, currentBid: amount, bidCount: item.bidCount + 1 }
          : item
      )
    );
    setSelectedItem((prev) =>
      prev ? { ...prev, currentBid: amount, bidCount: prev.bidCount + 1 } : null
    );
    setBidHistory((prev) => [
      { id: `b${Date.now()}`, bidder: "나", amount, time: new Date() },
      ...prev,
    ]);
    setBidAmount("");
  }, [selectedItem, bidAmount]);

  const formatPrice = (n: number) => `₩${n.toLocaleString()}`;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* 헤더 */}
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Gavel className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">실시간 경매</h1>
        <Badge variant="secondary" className="ml-auto flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {items.reduce((sum, i) => sum + i.watchers, 0)}명 참여 중
        </Badge>
      </header>

      {selectedItem ? (
        /* 경매 상세 뷰 */
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="border-b px-4 py-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
              ← 목록으로
            </Button>
          </div>
          <div className="flex-1 px-4 py-6">
            <div className="mx-auto max-w-lg space-y-6">
              {/* 아이템 정보 */}
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted text-4xl">
                  {selectedItem.image}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{selectedItem.category}</p>
                  <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                  <p className="text-sm text-muted-foreground">판매자: {selectedItem.seller}</p>
                </div>
              </div>

              {/* 현재가 + 카운트다운 */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">현재 입찰가</span>
                    <CountdownBadge endTime={selectedItem.endTime} />
                  </div>
                  <p className="text-3xl font-bold">{formatPrice(selectedItem.currentBid)}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> 입찰 {selectedItem.bidCount}회</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 시작가 {formatPrice(selectedItem.startingBid)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 입찰 폼 */}
              <Card>
                <CardContent className="p-4 space-y-3">
                <label className="text-sm font-medium">입찰하기</label>
                <p className="text-xs text-muted-foreground">
                  최소 입찰가: {formatPrice(selectedItem.currentBid + 1000)}
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={(selectedItem.currentBid + 10000).toString()}
                      className="w-full pl-9"
                    />
                  </div>
                  <Button
                    onClick={handleBid}
                    disabled={!bidAmount || parseInt(bidAmount) <= selectedItem.currentBid}
                  >
                    <ArrowUp className="h-4 w-4" />
                    입찰
                  </Button>
                </div>
                {/* 빠른 입찰 버튼 */}
                <div className="flex gap-2">
                  {[10000, 50000, 100000].map((inc) => (
                    <Button
                      key={inc}
                      variant="outline"
                      size="sm"
                      onClick={() => setBidAmount((selectedItem.currentBid + inc).toString())}
                      className="flex-1 text-xs"
                    >
                      +{formatPrice(inc)}
                    </Button>
                  ))}
                </div>
                </CardContent>
              </Card>

              {/* 입찰 기록 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">입찰 기록</h3>
                {bidHistory.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                    <span className="font-medium">{bid.bidder}</span>
                    <span className="font-semibold">{formatPrice(bid.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 경매 목록 뷰 */
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 카테고리 필터 */}
          <div className="flex gap-2 overflow-x-auto border-b px-4 py-3">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* 아이템 그리드 */}
          <main className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer transition-colors hover:bg-accent/50"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-3xl">
                        {item.image}
                      </div>
                      <CountdownBadge endTime={item.endTime} />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="mt-2 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">현재가</p>
                        <p className="text-lg font-bold">{formatPrice(item.currentBid)}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {item.bidCount}회
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
