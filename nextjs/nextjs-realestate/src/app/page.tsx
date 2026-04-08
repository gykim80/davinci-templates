"use client";

import { useState, useMemo } from "react";
import {
  Building2, Search, MapPin, Ruler, Layers, SlidersHorizontal,
  X, Plus, Home, ChevronRight, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_PROPERTIES, REGIONS, PROPERTY_TYPES, TRADE_TYPES,
  type IProperty,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RealEstatePage() {
  const [regionFilter, setRegionFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [tradeFilter, setTradeFilter] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  /* 필터링된 매물 */
  const filtered = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (regionFilter !== "전체" && p.region !== regionFilter) return false;
      if (typeFilter !== "전체" && p.type !== typeFilter) return false;
      if (tradeFilter !== "전체" && p.tradeType !== tradeFilter) return false;
      if (searchQuery && !p.title.includes(searchQuery) && !p.address.includes(searchQuery)) return false;
      return true;
    });
  }, [regionFilter, typeFilter, tradeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <Building2 className="h-6 w-6 text-blue-500" />
          <h1 className="text-lg font-bold">부동산매물</h1>
          <div className="flex-1" />
          <Button
            onClick={() => setShowRegisterForm(true)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            매물 등록
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* 검색 + 필터 */}
        <SearchFilter
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          regionFilter={regionFilter} setRegionFilter={setRegionFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          tradeFilter={tradeFilter} setTradeFilter={setTradeFilter}
        />

        {/* 결과 카운트 */}
        <p className="mb-4 text-sm text-muted-foreground">
          총 <strong className="text-foreground">{filtered.length}</strong>개 매물
        </p>

        {/* 매물 그리드 */}
        <PropertyGrid properties={filtered} onSelect={setSelectedProperty} />
      </main>

      {/* 매물 상세 모달 */}
      {selectedProperty && (
        <PropertyDetail property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      {/* 매물 등록 모달 */}
      {showRegisterForm && (
        <RegisterForm onClose={() => setShowRegisterForm(false)} />
      )}
    </div>
  );
}

/* === 검색 필터 컴포넌트 === */
function SearchFilter({
  searchQuery, setSearchQuery,
  regionFilter, setRegionFilter,
  typeFilter, setTypeFilter,
  tradeFilter, setTradeFilter,
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  regionFilter: string; setRegionFilter: (v: string) => void;
  typeFilter: string; setTypeFilter: (v: string) => void;
  tradeFilter: string; setTradeFilter: (v: string) => void;
}) {
  return (
    <div className="mb-6 space-y-4">
      {/* 검색바 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="매물명 또는 주소로 검색..."
          className="w-full pl-10"
        />
      </div>
      {/* 필터 칩 */}
      <div className="flex flex-wrap gap-3">
        <FilterSelect label="지역" value={regionFilter} options={[...REGIONS]} onChange={setRegionFilter} />
        <FilterSelect label="유형" value={typeFilter} options={[...PROPERTY_TYPES]} onChange={setTypeFilter} />
        <FilterSelect label="거래" value={tradeFilter} options={[...TRADE_TYPES]} onChange={setTradeFilter} />
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg px-2 py-1.5 text-xs"
      >
        {options.map((o) => (
          <option key={o} value={o}>{label}: {o}</option>
        ))}
      </Select>
    </div>
  );
}

/* === 매물 그리드 === */
function PropertyGrid({ properties, onSelect }: {
  properties: IProperty[]; onSelect: (p: IProperty) => void;
}) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-muted-foreground">
        <Home className="mb-4 h-12 w-12" />
        <p>조건에 맞는 매물이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <Card
          key={p.id}
          onClick={() => onSelect(p)}
          className="group cursor-pointer text-left transition-colors hover:border-blue-500/50"
          role="button"
          tabIndex={0}
        >
          <CardContent className="p-4">
          {/* 지도 플레이스홀더 */}
          <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-muted">
            <MapPin className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold group-hover:text-blue-400">{p.title}</h3>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.address}</p>
            </div>
            <Badge variant="outline" className={cn(
              "shrink-0",
              p.tradeType === "매매" && "bg-red-500/10 text-red-400 border-red-500/20",
              p.tradeType === "전세" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
              p.tradeType === "월세" && "bg-green-500/10 text-green-400 border-green-500/20",
            )}>
              {p.tradeType}
            </Badge>
          </div>
          <p className="mt-2 text-base font-bold text-blue-400">
            {p.price}
            {p.monthlyRent && <span className="text-sm font-normal text-muted-foreground"> / {p.monthlyRent}</span>}
          </p>
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Ruler className="h-3 w-3" />{p.area}평</span>
            <span className="flex items-center gap-1"><Layers className="h-3 w-3" />{p.floor}</span>
            <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{p.type}</span>
          </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* === 매물 상세 모달 (placeholder - will be replaced) === */
function PropertyDetail({ property, onClose }: { property: IProperty; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-lg font-bold">{property.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        {/* 지도 플레이스홀더 */}
        <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-muted">
          <MapPin className="h-10 w-10 text-muted-foreground/40" />
          <span className="ml-2 text-sm text-muted-foreground">지도 영역</span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">주소</span><span>{property.address}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">유형</span><span>{property.type}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">거래</span><span>{property.tradeType}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">가격</span>
            <span className="font-bold text-blue-400">{property.price}{property.monthlyRent ? ` / ${property.monthlyRent}` : ""}</span>
          </div>
          <div className="flex justify-between"><span className="text-muted-foreground">면적</span><span>{property.area}평</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">층수</span><span>{property.floor}</span></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{property.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.features.map((f) => (
            <Badge key={f} variant="secondary" className="bg-blue-500/10 text-blue-400">{f}</Badge>
          ))}
        </div>
        <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
          문의하기
        </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* === 매물 등록 폼 모달 === */
function RegisterForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">매물 등록</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <Field label="매물명" placeholder="예: 강남 래미안 32평" />
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="매물유형" options={["아파트","오피스텔","빌라","원룸","투룸"]} />
            <SelectField label="거래유형" options={["매매","전세","월세"]} />
          </div>
          <Field label="주소" placeholder="서울시 강남구 ..." />
          <div className="grid grid-cols-2 gap-4">
            <Field label="가격" placeholder="예: 5억" />
            <Field label="면적(평)" placeholder="예: 32" />
          </div>
          <Field label="층수" placeholder="예: 10/25층" />
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">상세설명</label>
            <Textarea
              rows={3}
              placeholder="매물의 특징을 입력하세요..."
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            등록하기
          </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  );
}

/* 유틸 필드 */
function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input placeholder={placeholder} />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Select>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </Select>
    </div>
  );
}
