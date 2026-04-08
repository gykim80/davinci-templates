"use client";

import { useState } from "react";
import { users, type IUser } from "@/lib/mock-data";
import { Sidebar } from "@/components/sidebar";
import { Search, Filter, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("전체");

  const filtered = users.filter((user) => {
    const matchesSearch =
      user.name.includes(search) || user.email.includes(search);
    const matchesRole = roleFilter === "전체" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* 헤더 */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">사용자 관리</h1>
              <p className="mt-1 text-muted-foreground">
                총 {users.length}명의 사용자
              </p>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              사용자 추가
            </button>
          </div>

          {/* 검색 + 필터 */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="이름 또는 이메일로 검색..."
                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {["전체", "관리자", "편집자", "뷰어"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    roleFilter === role
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* 테이블 */}
          <div className="rounded-xl border bg-background">
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">사용자 목록</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="px-6 py-3 font-medium">이름</th>
                    <th className="px-6 py-3 font-medium">이메일</th>
                    <th className="px-6 py-3 font-medium">역할</th>
                    <th className="px-6 py-3 font-medium">상태</th>
                    <th className="px-6 py-3 font-medium">가입일</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                            user.role === "관리자" &&
                              "bg-violet-500/10 text-violet-500",
                            user.role === "편집자" &&
                              "bg-blue-500/10 text-blue-500",
                            user.role === "뷰어" &&
                              "bg-zinc-500/10 text-zinc-400"
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 text-sm",
                            user.status === "활성"
                              ? "text-emerald-500"
                              : "text-muted-foreground"
                          )}
                        >
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              user.status === "활성"
                                ? "bg-emerald-500"
                                : "bg-muted-foreground"
                            )}
                          />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.joinedAt}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-muted-foreground"
                      >
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
