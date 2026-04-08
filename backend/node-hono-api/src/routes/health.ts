import { Hono } from "hono";

const health = new Hono();

// 헬스 체크 엔드포인트
health.get("/", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default health;
