import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Without an explicit host, Vite's dev server binds to the "localhost"
    // hostname, which Node resolves IPv6-first (::1) on Node 17+ — a plain
    // `curl http://127.0.0.1:5173` (IPv4) then can't reach it even though the
    // server logs "ready" and the port is genuinely listening. Confirmed via
    // an actual CI run (the e2e job's "Wait for frontend" step timed out for
    // exactly this reason). `true` binds all interfaces (0.0.0.0), matching
    // how the NestJS backend already listens.
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    // e2e/ holds Playwright specs, which use their own `test`/`expect` and
    // must not be collected by Vitest (they'd fail immediately outside a
    // Playwright runner).
    exclude: ["**/node_modules/**", "e2e/**"],
  },
});
