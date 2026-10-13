import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4174",
    channel:
      process.env.PW_CHANNEL ||
      (process.platform === "win32" ? "msedge" : "chromium"),
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "node scripts/serve.mjs --dist",
    env: { PORT: "4174" },
    url: "http://127.0.0.1:4174",
    reuseExistingServer: !process.env.CI,
  },
});
