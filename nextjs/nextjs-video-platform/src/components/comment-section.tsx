"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, Send } from "lucide-react";
import { mockComments } from "@/data/videos";

/** 댓글 섹션 */
export function CommentSection() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: `c${Date.now()}`,
        author: "나",
        avatar: "https://picsum.photos/seed/me/32/32",
        text: newComment,
        date: "방금 전",
        likes: 0,
      },
      ...comments,
    ]);
    setNewComment("");
  };

  return (
    <div className="mt-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <MessageSquare className="h-4 w-4" />
        댓글 {comments.length}개
      </h3>

      {/* 댓글 입력 */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
        <div className="flex flex-1 gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 border-b bg-transparent pb-1 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="rounded-full p-2 text-primary transition-colors hover:bg-muted disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={comment.avatar}
              alt={comment.author}
              className="h-8 w-8 shrink-0 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {comment.date}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-foreground/90">
                {comment.text}
              </p>
              <button className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-3 w-3" />
                {comment.likes > 0 && comment.likes}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
