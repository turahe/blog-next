/**
 * Starts the E2E mock API (port 18080), then `next dev` with API URL pointing at it.
 * Used by Playwright `webServer` so SSR can fetch posts without a real backend.
 */
import http from "node:http";
import { spawn } from "node:child_process";

const E2E_PORT = Number(process.env.E2E_MOCK_API_PORT ?? 18080);
const API_BASE = `http://127.0.0.1:${E2E_PORT}/api/v1`;

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  try {
    const u = new URL(req.url ?? "/", `http://127.0.0.1:${E2E_PORT}`);
    if (req.method === "GET" && u.pathname === "/api/v1/posts") {
      sendJson(res, 200, { code: 200, message: "ok", data: [] });
      return;
    }
    res.writeHead(404);
    res.end();
  } catch {
    res.writeHead(500);
    res.end();
  }
});

function shutdown(dev) {
  try {
    dev.kill("SIGTERM");
  } catch {
    /* ignore */
  }
  server.close();
}

server.listen(E2E_PORT, "127.0.0.1", () => {
  const dev = spawn("npm run dev", {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NEXT_PUBLIC_API_BASE_URL: API_BASE,
    },
  });

  dev.on("exit", (code) => {
    server.close();
    process.exit(code ?? 0);
  });

  process.on("SIGTERM", () => shutdown(dev));
  process.on("SIGINT", () => shutdown(dev));
});
