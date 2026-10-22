import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { root } from "./check.mjs";
const base = resolve(root, process.argv.includes("--dist") ? "dist" : ".");
const argument = (flag) => {
  const index = process.argv.indexOf(flag);
  return index < 0 ? undefined : process.argv[index + 1];
};
const port = Number(argument("--port") || process.env.PORT || 4173);
const host = argument("--host") || "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".json": "application/json",
};
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = resolve(base, "." + (path === "/" ? "/index.html" : path));
    if (
      !file.startsWith(base + sep) ||
      path.split("/").some((part) => part.startsWith("."))
    ) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    const data = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, host, () =>
  console.log(`Local: http://${host}:${port}`),
);
