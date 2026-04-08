import { stats, orders } from "@/lib/mock-data";
import { StatsCard } from "@/components/stats-card";
import { Sidebar } from "@/components/sidebar";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">대시보드</h1>
            <p className="mt-1 text-muted-foreground">
              서비스 전반적인 현황을 확인하세요.
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* 최근 활동 테이블 */}
          <Card className="mt-8">
            <CardHeader className="flex flex-row items-center gap-2 border-b px-6 py-4">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">최근 주문</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="px-6 py-3 font-medium">주문번호</th>
                    <th className="px-6 py-3 font-medium">고객</th>
                    <th className="px-6 py-3 font-medium">금액</th>
                    <th className="px-6 py-3 font-medium">상태</th>
                    <th className="px-6 py-3 font-medium">날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">
                        ₩{order.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full",
                            order.status === "완료" &&
                              "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
                            order.status === "처리중" &&
                              "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
                            order.status === "취소" &&
                              "border-red-500/20 bg-red-500/10 text-red-500"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
