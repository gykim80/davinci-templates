"use client";

import { BarChart3, Link, MousePointerClick, TrendingUp } from "lucide-react";
import type { IShortenedUrl } from "./url-list";
import { Card, CardContent } from "@/components/ui/card";

interface IUrlStatsProps {
  urls: IShortenedUrl[];
}

/** 전체 통계 카드 */
export function UrlStats({ urls }: IUrlStatsProps) {
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
  const totalUrls = urls.length;
  const avgClicks = totalUrls ? Math.round(totalClicks / totalUrls) : 0;
  const topUrl = urls.length
    ? urls.reduce((max, u) => (u.clicks > max.clicks ? u : max), urls[0])
    : null;

  const stats = [
    { icon: Link, label: "총 링크", value: `${totalUrls}개`, color: "text-blue-400" },
    { icon: MousePointerClick, label: "총 클릭", value: `${totalClicks.toLocaleString("ko-KR")}회`, color: "text-green-400" },
    { icon: BarChart3, label: "평균 클릭", value: `${avgClicks}회`, color: "text-purple-400" },
    { icon: TrendingUp, label: "인기 링크", value: topUrl ? `${topUrl.clicks}회` : "—", color: "text-orange-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <Card key={label} className="bg-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="mt-2 text-xl font-bold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
