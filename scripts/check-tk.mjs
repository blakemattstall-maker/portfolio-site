// Deploy gate: the site never ships with a {{TK: ...}} placeholder in it.
// Locally (npm run build) this warns; on Vercel (VERCEL env set) it fails the build.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx|md|mdx|json)$/.test(name)) {
      const lines = readFileSync(path, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (line.includes("{{TK")) hits.push(`${path.replace(ROOT, "src")}:${i + 1}`);
      });
    }
  }
}

walk(ROOT);

if (hits.length) {
  const isDeploy = !!process.env.VERCEL;
  const allowed = process.env.ALLOW_TK === "1";
  console[isDeploy && !allowed ? "error" : "warn"](
    `\n[check-tk] ${hits.length} unresolved {{TK}} placeholder(s):\n  ` + hits.join("\n  ")
  );
  if (isDeploy && !allowed) {
    console.error(
      "\n[check-tk] Refusing to deploy with placeholder metrics." +
        "\n[check-tk] Fill them in — or set ALLOW_TK=1 on the project to ship visible TK chips on purpose.\n"
    );
    process.exit(1);
  } else if (isDeploy) {
    console.warn("[check-tk] ALLOW_TK=1 — shipping WITH visible placeholder chips. Remove the env var once filled.\n");
  } else {
    console.warn("[check-tk] OK locally — production deploys need these resolved (or ALLOW_TK=1).\n");
  }
} else {
  console.log("[check-tk] Clean — no placeholders.");
}
