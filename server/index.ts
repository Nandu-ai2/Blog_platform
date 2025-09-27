import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { log } from "./vite";

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
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // ✅ Serve frontend build (dist/public after Vite build)
  const distPath = path.join(__dirname, "public");
  app.use(express.static(distPath));

  // ✅ Catch-all route → return index.html for React SPA
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  // Port & host
  const port = parseInt(process.env.PORT || "5000", 10);
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    server.listen(port, "localhost", () => {
      log(`🚀 Server running at http://localhost:${port}`);
    });
  } else {
    // On Vercel → host binding handled automatically
    server.listen(port, () => {
      log(`🚀 Server running on port ${port} (Vercel handles host)`);
    });
  }
})();
