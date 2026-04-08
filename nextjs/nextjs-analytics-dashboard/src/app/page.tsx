"use client";

import { useState } from "react";
import { metrics, pageViewData, trafficSourceData } from "@/lib/chart-data";
import { LineChart } from "@/components/line-chart";
import { BarChart } from "@/components/bar-chart";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dateRanges = ["7일", "30일", "90일", "1년"];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("1년");

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">분석 대시보드</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/reports">
                <FileText className="h-4 w-4" />
                리포트
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 날짜 범위 선택 */}
        <div className="mb-8 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">기간:</span>
          {dateRanges.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>

        {/* 메트릭 카드 */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className="text-sm font-medium text-emerald-500">
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 차트 그리드 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 라인 차트 - 페이지뷰 추이 */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">페이지뷰 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart data={pageViewData} height={320} />
            </CardContent>
          </Card>

          {/* 바 차트 - 트래픽 소스 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">트래픽 소스</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={trafficSourceData} height={320} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
