"use client";

import { useState, useMemo, useCallback } from "react";
import { FileText } from "lucide-react";
import { NoteSidebar, type INote } from "@/components/note-sidebar";
import { NoteEditor } from "@/components/note-editor";

/** 기본 샘플 노트 */
const SAMPLE_NOTES: INote[] = [
  {
    id: "1",
    title: "프로젝트 아이디어",
    content: "## 새로운 프로젝트\n\n- Next.js 기반 노트 앱\n- 마크다운 지원\n- 태그 기능으로 정리",
    tags: ["프로젝트", "아이디어"],
    updatedAt: new Date("2025-03-28"),
  },
  {
    id: "2",
    title: "회의록 - 3월 스프린트",
    content: "### 참석자\n김철수, 이영희, 박지민\n\n### 논의사항\n1. API 설계 리뷰\n2. 디자인 피드백\n3. 일정 조율",
    tags: ["회의", "스프린트"],
    updatedAt: new Date("2025-03-27"),
  },
  {
    id: "3",
    title: "TypeScript 팁",
    content: "## 유용한 타입스크립트 패턴\n\n```ts\ntype Result<T> = { ok: true; data: T } | { ok: false; error: string };\n```\n\n조건부 타입을 활용하면 타입 안전성을 높일 수 있다.",
    tags: ["개발", "TypeScript"],
    updatedAt: new Date("2025-03-25"),
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<INote[]>(SAMPLE_NOTES);
  const [selectedId, setSelectedId] = useState<string | null>(SAMPLE_NOTES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 검색 + 태그 필터 적용
  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || n.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, selectedTag]);

  // 선택된 노트
  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  // 새 노트 추가
  const addNote = useCallback(() => {
    const newNote: INote = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
  }, []);

  // 노트 업데이트
  const updateNote = useCallback(
    (updates: Partial<INote>) => {
      if (!selectedId) return;
      setNotes((prev) =>
        prev.map((n) =>
          n.id === selectedId ? { ...n, ...updates, updatedAt: new Date() } : n
        )
      );
    },
    [selectedId]
  );

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <NoteSidebar
        notes={filtered}
        selectedId={selectedId}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        onSelect={setSelectedId}
        onSearch={setSearchQuery}
        onAdd={addNote}
        onTagFilter={setSelectedTag}
      />

      {/* 에디터 영역 */}
      <main className="flex flex-1 flex-col">
        {selectedNote ? (
          <NoteEditor note={selectedNote} onChange={updateNote} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <FileText className="mb-4 h-12 w-12" />
            <p className="text-lg">노트를 선택하세요</p>
            <p className="text-sm">또는 새 노트를 만들어보세요</p>
          </div>
        )}
      </main>
    </div>
  );
}
