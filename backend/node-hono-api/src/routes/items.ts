import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { items, type NewItem } from "../db/schema.js";

// DB 연결 (싱글톤 패턴)
const sqlite = new Database(process.env.DATABASE_URL ?? "./app.db");
const db = drizzle(sqlite);

// 입력 유효성 검사 스키마
const createItemSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive(),
  isAvailable: z.boolean().default(true),
});

const updateItemSchema = createItemSchema.partial();

const itemsRouter = new Hono();

// 아이템 목록 조회
itemsRouter.get("/", (c) => {
  const { skip = "0", limit = "20" } = c.req.query();
  const result = db
    .select()
    .from(items)
    .offset(Number(skip))
    .limit(Number(limit))
    .all();
  return c.json(result);
});

// 아이템 생성
itemsRouter.post("/", zValidator("json", createItemSchema), (c) => {
  const data = c.req.valid("json") as NewItem;
  const [created] = db.insert(items).values(data).returning().all();
  return c.json(created, 201);
});

// 아이템 단건 조회
itemsRouter.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const [item] = db.select().from(items).where(eq(items.id, id)).all();
  if (!item) return c.json({ error: "Item not found" }, 404);
  return c.json(item);
});

// 아이템 수정
itemsRouter.patch("/:id", zValidator("json", updateItemSchema), (c) => {
  const id = Number(c.req.param("id"));
  const data = c.req.valid("json");
  const [updated] = db
    .update(items)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(items.id, id))
    .returning()
    .all();
  if (!updated) return c.json({ error: "Item not found" }, 404);
  return c.json(updated);
});

// 아이템 삭제
itemsRouter.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const deleted = db.delete(items).where(eq(items.id, id)).run();
  if (deleted.changes === 0) return c.json({ error: "Item not found" }, 404);
  return c.body(null, 204);
});

export default itemsRouter;
