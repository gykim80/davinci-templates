"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Settings, Save } from "lucide-react";

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("어드민 대시보드");
  const [email, setEmail] = useState("admin@example.com");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ko");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">설정</h1>
            <p className="mt-1 text-muted-foreground">
              시스템 환경을 설정합니다.
            </p>
          </div>

          <div className="max-w-2xl space-y-8">
            {/* 일반 설정 */}
            <div className="rounded-xl border bg-background p-6">
              <div className="mb-6 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">일반 설정</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    사이트 이름
                  </label>
                  <input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    관리자 이메일
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    언어
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">알림 설정</p>
                    <p className="text-sm text-muted-foreground">
                      이메일로 알림을 받습니다.
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        notifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Save className="h-4 w-4" />
                저장
              </button>
              {saved && (
                <span className="text-sm text-emerald-500">
                  설정이 저장되었습니다.
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
