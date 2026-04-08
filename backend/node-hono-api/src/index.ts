import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { corsMiddleware } from "./middleware/cors.js";
import healthRoute from "./routes/health.js";
import itemsRoute from "./routes/items.js";

const app = new Hono();

const PORT = Number(process.env.PORT ?? 3000);
const APP_NAME = process.env.APP_NAME ?? "Hono API";

// 전역 미들웨어
app.use("*", logger());
app.use("*", corsMiddleware);

// 라우트 등록
app.get("/", (c) => c.json({ message: `Welcome to ${APP_NAME}`, version: "0.1.0" }));
app.route("/health", healthRoute);
app.route("/items", itemsRoute);

// 404 핸들러
app.notFound((c) => c.json({ error: "Not Found" }, 404));

// 에러 핸들러
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

// 서버 시작
serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});

export default app;
