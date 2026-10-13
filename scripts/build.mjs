import {
  cpSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve, relative, dirname } from "node:path";
import { root, pages, check } from "./check.mjs";
check();
// Each build has an explicit publication manifest. No private project data or QA output.
const files = [
  ...pages,
  "CNAME",
  "css/style.css",
  "js/main.js",
  "assets/favicon.svg",
  "assets/projects/codegarten/dashboard.webp",
  "assets/projects/codegarten/editor.webp",
  "assets/projects/last-letter-club/lobby.webp",
];
const output = resolve(root, "dist");
mkdirSync(output, { recursive: true });
function existingFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? existingFiles(resolve(dir, entry.name))
      : [relative(output, resolve(dir, entry.name)).replaceAll("\\", "/")],
  );
}
const extra = existingFiles(output).filter(
  (file) => !files.includes(file) && file !== "publication-manifest.json",
);
if (extra.length)
  throw new Error(
    `Unexpected existing build files: ${extra.join(", ")}. Use an empty dist folder.`,
  );
for (const file of files) {
  mkdirSync(dirname(resolve(output, file)), { recursive: true });
  cpSync(resolve(root, file), resolve(output, file));
}
writeFileSync(
  resolve(output, "publication-manifest.json"),
  JSON.stringify({ files }, null, 2) + "\n",
);
const bytes = files.reduce(
  (sum, file) => sum + statSync(resolve(output, file)).size,
  0,
);
console.log(
  `PASS: dist contains ${files.length} publication files (${Math.round(bytes / 1024)} KiB).`,
);
