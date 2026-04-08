"use client";

import { Bold, Italic, List, Heading, Tag, X, Plus } from "lucide-react";
import { useState } from "react";
import type { INote } from "./note-sidebar";

interface INoteEditorProps {
  note: INote;
  onChange: (updates: Partial<INote>) => void;
}

/** 마크다운 노트 에디터 */
export function NoteEditor({ note, onChange }: INoteEditorProps) {
  const [tagInput, setTagInput] = useState("");

  // 마크다운 서식 삽입
  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#note-content");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = note.content.slice(start, end);
    const newContent =
      note.content.slice(0, start) +
      prefix +
      (selected || "텍스트") +
      suffix +
      note.content.slice(end);
    onChange({ content: newContent });
  };

  // 태그 추가
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !note.tags.includes(tag)) {
      onChange({ tags: [...note.tags, tag] });
    }
    setTagInput("");
  };

  // 태그 삭제
  const removeTag = (tag: string) => {
    onChange({ tags: note.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* 제목 입력 */}
      <input
        value={note.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="노트 제목..."
        className="border-b bg-transparent px-6 py-4 text-xl font-bold outline-none placeholder:text-muted-foreground"
      />

      {/* 툴바 */}
      <div className="flex items-center gap-1 border-b px-4 py-2">
        {[
          { icon: Heading, action: () => insertMarkdown("## "), label: "제목" },
          { icon: Bold, action: () => insertMarkdown("**", "**"), label: "굵게" },
          { icon: Italic, action: () => insertMarkdown("*", "*"), label: "기울임" },
          { icon: List, action: () => insertMarkdown("- "), label: "목록" },
        ].map(({ icon: Icon, action, label }) => (
          <button
            key={label}
            onClick={action}
            title={label}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* 에디터 본문 */}
      <textarea
        id="note-content"
        value={note.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="마크다운으로 작성하세요..."
        className="flex-1 resize-none bg-transparent px-6 py-4 font-mono text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
      />

      {/* 태그 영역 */}
      <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3">
        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </span>
        ))}
        <div className="flex items-center gap-1">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="태그 추가..."
            className="w-20 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
          {tagInput && (
            <button onClick={addTag}>
              <Plus className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
