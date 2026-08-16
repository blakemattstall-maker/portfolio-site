import { NextResponse } from "next/server";
import { submitScore, topScores } from "@/lib/scores";

export const dynamic = "force-dynamic";

// Not a bank: score arrives client-computed and unauthenticated. Good enough
// for a portfolio toy; the blocklist and rate limit just keep the board clean.
const BLOCKED = new Set(["ASS", "FUK", "FCK", "FUC", "SEX", "KKK", "NIG", "FAG", "CUM", "TIT", "DIK", "COK"]);

type G = typeof globalThis & { __twLastPost?: Map<string, number> };
const lastPost = ((globalThis as G).__twLastPost ??= new Map<string, number>());

export async function GET() {
  return NextResponse.json({ scores: await topScores(10) });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  if (now - (lastPost.get(ip) ?? 0) < 3000) {
    return NextResponse.json({ error: "Too fast — one score every few seconds." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
  const { initials, score } = (body ?? {}) as { initials?: string; score?: number };

  const cleaned = String(initials ?? "").toUpperCase().replace(/[^A-Z]/g, "");
  if (cleaned.length !== 3) {
    return NextResponse.json({ error: "Initials must be 3 letters." }, { status: 400 });
  }
  if (BLOCKED.has(cleaned)) {
    return NextResponse.json({ error: "Pick different initials." }, { status: 400 });
  }
  if (!Number.isInteger(score) || score! < 0 || score! > 100_000) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  lastPost.set(ip, now);
  await submitScore({ initials: cleaned, score: score!, ts: now });
  return NextResponse.json({ ok: true, scores: await topScores(10) });
}
