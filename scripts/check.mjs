import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const pages = ["index.html", "impressum.html", "datenschutz.html"];
export function check() {
  let checked = 0;
  for (const file of pages) {
    const source = readFileSync(resolve(root, file), "utf8");
    if (
      !source.includes('<html lang="de">') ||
      !source.includes('name="viewport"')
    )
      throw new Error(`Missing document metadata: ${file}`);
    const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(
      (match) => match[1],
    );
    if (new Set(ids).size !== ids.length)
      throw new Error(`Duplicate IDs: ${file}`);
    for (const [, url] of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(url)) continue;
      if (url.startsWith("#")) {
        if (!ids.includes(url.slice(1)))
          throw new Error(`Missing anchor ${url} in ${file}`);
      } else if (!existsSync(resolve(root, url.split("#")[0])))
        throw new Error(`Missing asset ${url} in ${file}`);
      checked++;
    }
  }
  execFileSync(process.execPath, ["--check", resolve(root, "js/main.js")]);
  console.log(
    `PASS: ${pages.length} documents, ${checked} local references, unique IDs, JavaScript syntax.`,
  );
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  check();
