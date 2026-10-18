/**
 * Simple post-build link checker for dist/.
 * Exits 0 if no broken internal links found.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    console.error("dist/ not found — run `pnpm build` first.");
    process.exit(1);
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, files);
    else if (e.name.endsWith(".html")) files.push(p);
  }
  return files;
}

function extractHrefs(html) {
  const hrefs = [];
  const re = /href=["']([^"'#]+)["']/gi;
  let m;
  while ((m = re.exec(html))) hrefs.push(m[1]);
  return hrefs;
}

const htmlFiles = await walk(root);
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const href of extractHrefs(html)) {
    if (/^(https?:|mailto:|tel:)/i.test(href)) continue;
    if (href.startsWith("//")) continue;
    let target = href.split("?")[0];
    if (target.startsWith("/")) target = join(root, target.slice(1));
    else target = join(dirname(file), target);
    const candidates = [
      target,
      target.endsWith("/") ? join(target, "index.html") : `${target}.html`,
      join(target, "index.html"),
    ];
    let ok = false;
    for (const c of candidates) {
      try {
        const s = await stat(c);
        if (s.isFile()) {
          ok = true;
          break;
        }
      } catch {
        /* try next */
      }
    }
    if (!ok) broken.push({ file: file.replace(root, ""), href });
  }
}

if (broken.length) {
  console.error(`Found ${broken.length} broken internal link(s):`);
  for (const b of broken) console.error(`  ${b.file} → ${b.href}`);
  process.exit(1);
}

console.log(`OK — checked ${htmlFiles.length} HTML file(s), no broken internal links.`);
