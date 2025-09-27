import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { log } from "./vite";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const pathUrl = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathUrl.startsWith("/api")) {
      let logLine = `${req.method} ${pathUrl} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // ✅ Serve frontend build
  const distPath = path.join(__dirname, "public");
  app.use(express.static(distPath));

  // ✅ Catch-all for SPA
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  // ✅ Create actual HTTP server
  const server = http.createServer(app);

  const defaultPort = 5000;
  let port = parseInt(process.env.PORT || defaultPort.toString(), 10);
  const isDev = process.env.NODE_ENV !== "production";

  function bindServer(currentPort: number) {
    server.listen(
      currentPort,
      isDev ? "localhost" : undefined,
      () => {
        if (isDev) {
          log(`🚀 Server running at http://localhost:${currentPort}`);
        } else {
          log(`🚀 Server running on port ${currentPort} (Vercel handles host)`);
        }
      }
    );

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        const nextPort = currentPort + 1;
        log(`⚠️ Port ${currentPort} in use. Retrying on ${nextPort}...`);
        server.close(() => bindServer(nextPort));
      } else {
        throw err;
      }
    });
  }

  bindServer(port);
})();
