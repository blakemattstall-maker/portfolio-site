// Inspect literal content, not comments or the placeholder renderer itself.
// Every production build enforces this, including Cloudflare and local exports.
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = fileURLToPath(new URL("../src", import.meta.url));
const hits = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { walk(path); continue; }
    if (!/\.(ts|tsx)$/.test(path)) continue;
    const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) && /\{\{TK:/.test(node.text)) {
        const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
        hits.push(`${relative(root, path)}:${line + 1}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk(root);
if (hits.length) {
  console.error(`Unfinished content blocks this build:\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("Content check passed: no unfinished placeholders.");
