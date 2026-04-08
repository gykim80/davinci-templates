"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  TrainFront, Search, RefreshCw, Clock, ChevronRight,
  ArrowUpDown, MapPin, Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LINES, getAllStations, getLinesForStation, generateMockArrivals,
  type ILine, type IArrival,
} from "@/lib/subway";

export default function SubwayPage() {
  const [selectedLine, setSelectedLine] = useState<ILine | null>(null);
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [arrivals, setArrivals] = useState<IArrival[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const allStations = useMemo(() => getAllStations(), []);

  /* 검색 결과 필터링 */
  const filteredStations = useMemo(() => {
    if (!searchQuery) return selectedLine ? selectedLine.stations : [];
    return allStations.filter((s) => s.includes(searchQuery));
  }, [searchQuery, selectedLine, allStations]);

  /* 역 선택 시 도착 정보 조회 */
  const selectStation = useCallback((station: string) => {
    setSelectedStation(station);
    setSearchQuery("");
    setArrivals(generateMockArrivals(station));
    setLastRefresh(new Date());
  }, []);

  /* 새로고침 */
  const refresh = useCallback(() => {
    if (selectedStation) {
      setArrivals(generateMockArrivals(selectedStation));
      setLastRefresh(new Date());
    }
  }, [selectedStation]);

  /* 30초마다 자동 갱신 */
  useEffect(() => {
    if (!selectedStation) return;
    const id = setInterval(refresh, 30000);
    return () => clearInterval(id);
  }, [selectedStation, refresh]);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <TrainFront className="h-6 w-6 text-green-500" />
          <h1 className="text-lg font-bold">지하철 실시간</h1>
          {selectedStation && (
            <>
              <div className="flex-1" />
              <Button variant="outline" size="sm" onClick={refresh}>
                <RefreshCw className="h-3.5 w-3.5" />새로고침
              </Button>
            </>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* 검색바 */}
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />

        {/* 검색 결과 드롭다운 */}
        {searchQuery && (
          <StationSearchResults stations={filteredStations} onSelect={selectStation} />
        )}

        {/* 노선 선택 (검색 안 할 때) */}
        {!searchQuery && !selectedStation && (
          <LineSelector lines={LINES} selectedLine={selectedLine}
            onSelectLine={setSelectedLine} onSelectStation={selectStation} />
        )}

        {/* 도착 정보 */}
        {selectedStation && !searchQuery && (
          <ArrivalBoard
            station={selectedStation} arrivals={arrivals}
            lastRefresh={lastRefresh}
            onBack={() => { setSelectedStation(""); setArrivals([]); }}
          />
        )}
      </main>
    </div>
  );
}

/* === 검색바 === */
function SearchBar({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="역 이름을 검색하세요..."
        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm"
      />
    </div>
  );
}

/* === 검색 결과 === */
function StationSearchResults({ stations, onSelect }: {
  stations: string[]; onSelect: (s: string) => void;
}) {
  if (stations.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        <MapPin className="mx-auto mb-2 h-8 w-8" />
        <p className="text-sm">검색 결과가 없습니다</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-1 p-2">
        {stations.slice(0, 20).map((s) => {
          const lines = getLinesForStation(s);
          return (
            <Button
              key={s}
              variant="ghost"
              onClick={() => onSelect(s)}
              className="flex w-full items-center gap-3 justify-start px-3 py-2.5 h-auto text-sm"
            >
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 font-medium text-left">{s}</span>
              <div className="flex gap-1">
                {lines.map((l) => (
                  <Badge key={l.id} className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold text-white", l.bgColor)}>
                    {l.id}
                  </Badge>
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          );
        })}
        {stations.length > 20 && (
          <p className="px-3 py-2 text-center text-xs text-muted-foreground">
            외 {stations.length - 20}개 역...
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* === 노선 선택기 === */
function LineSelector({ lines, selectedLine, onSelectLine, onSelectStation }: {
  lines: ILine[]; selectedLine: ILine | null;
  onSelectLine: (l: ILine | null) => void; onSelectStation: (s: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* 노선 버튼 */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {lines.map((l) => (
          <Button
            key={l.id}
            variant={selectedLine?.id === l.id ? "default" : "outline"}
            onClick={() => onSelectLine(selectedLine?.id === l.id ? null : l)}
            className={cn(
              "rounded-xl py-3 text-sm font-bold",
              selectedLine?.id === l.id && cn(l.bgColor, "text-white border-transparent")
            )}
          >
            {l.name}
          </Button>
        ))}
      </div>

      {/* 선택된 노선의 역 목록 */}
      {selectedLine && (
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Badge className={cn("rounded px-2 py-0.5 text-xs font-bold text-white", selectedLine.bgColor)}>
                {selectedLine.name}
              </Badge>
              <span className="text-sm text-muted-foreground">{selectedLine.stations.length}개 역</span>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
              {selectedLine.stations.map((s) => (
                <Button
                  key={s}
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectStation(s)}
                  className="justify-start px-2 py-2 text-xs h-auto"
                >
                  {s}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 빠른 선택 인기역 */}
      {!selectedLine && (
        <Card>
          <CardContent className="p-4">
            <p className="mb-3 text-sm font-medium">자주 검색하는 역</p>
            <div className="flex flex-wrap gap-2">
              {["강남", "홍대입구", "잠실", "여의도", "신촌", "건대입구", "서울역", "명동", "종로3가", "합정"].map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectStation(s)}
                  className="rounded-full px-3 py-1.5 text-xs h-auto"
                >
                  {s}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* === 도착 정보 보드 === */
function ArrivalBoard({ station, arrivals, lastRefresh, onBack }: {
  station: string; arrivals: IArrival[]; lastRefresh: Date | null;
  onBack: () => void;
}) {
  const lines = getLinesForStation(station);
  const statusLabel: Record<IArrival["status"], { text: string; cls: string }> = {
    approaching: { text: "접근 중", cls: "text-yellow-400" },
    arriving: { text: "도착", cls: "text-green-400" },
    departed: { text: "출발", cls: "text-blue-400" },
    running: { text: "운행 중", cls: "text-muted-foreground" },
  };

  // 노선별로 그룹핑
  const grouped = new Map<string, IArrival[]>();
  arrivals.forEach((a) => {
    const arr = grouped.get(a.line) || [];
    arr.push(a);
    grouped.set(a.line, arr);
  });

  return (
    <div className="space-y-4">
      {/* 역 헤더 */}
      <Card>
        <CardContent className="p-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2 text-xs text-muted-foreground hover:text-foreground h-auto px-1 py-0">
          &larr; 역 선택으로 돌아가기
        </Button>
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-green-500" />
          <div>
            <h2 className="text-xl font-bold">{station}역</h2>
            <div className="mt-1 flex gap-1.5">
              {lines.map((l) => (
                <Badge key={l.id} className={cn("rounded px-2 py-0.5 text-xs font-bold text-white", l.bgColor)}>
                  {l.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        {lastRefresh && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {lastRefresh.toLocaleTimeString("ko-KR")} 기준 (30초마다 자동 갱신)
          </p>
        )}
        </CardContent>
      </Card>

      {/* 노선별 도착 정보 */}
      {Array.from(grouped.entries()).map(([lineName, lineArrivals]) => {
        const line = LINES.find((l) => l.name === lineName);
        const upDir = lineArrivals.filter((a) => a.direction === "상행");
        const downDir = lineArrivals.filter((a) => a.direction === "하행");

        return (
          <Card key={lineName} className="overflow-hidden">
            <div className={cn("px-4 py-2 text-sm font-bold text-white", line?.bgColor || "bg-gray-600")}>
              {lineName}
            </div>

            {/* 상행 */}
            {upDir.length > 0 && (
              <div className="border-b">
                <div className="flex items-center gap-1.5 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />상행
                </div>
                {upDir.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 border-t px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.destination}</p>
                      <p className="text-xs text-muted-foreground">열차번호 {a.trainNo}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", a.arrivalTime === "곧 도착" ? "text-green-400" : "text-foreground")}>
                        {a.arrivalTime}
                      </p>
                      <p className={cn("text-xs", statusLabel[a.status].cls)}>
                        {statusLabel[a.status].text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 하행 */}
            {downDir.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowUpDown className="h-3 w-3" />하행
                </div>
                {downDir.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 border-t px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.destination}</p>
                      <p className="text-xs text-muted-foreground">열차번호 {a.trainNo}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", a.arrivalTime === "곧 도착" ? "text-green-400" : "text-foreground")}>
                        {a.arrivalTime}
                      </p>
                      <p className={cn("text-xs", statusLabel[a.status].cls)}>
                        {statusLabel[a.status].text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}

      {arrivals.length === 0 && (
        <Card className="p-12 text-center text-muted-foreground">
          <Timer className="mx-auto mb-3 h-10 w-10" />
          <p>현재 도착 예정 열차가 없습니다</p>
          <p className="mt-1 text-xs">운행 시간이 아니거나 데이터를 불러올 수 없습니다</p>
        </Card>
      )}
    </div>
  );
}
