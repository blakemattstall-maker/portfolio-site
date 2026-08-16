import { Redis } from "@upstash/redis";
import { EventEmitter } from "node:events";

/**
 * Leaderboard store. Two backends behind one interface:
 *  - Upstash Redis when UPSTASH_REDIS_REST_URL/TOKEN are set (production)
 *  - in-memory otherwise (local dev; resets on server restart)
 * Kept HMR-safe via globalThis singletons.
 */

export type ScoreEntry = { initials: string; score: number; ts: number };

const KEY = "thumbwar:scores";
const MAX_KEPT = 100;

type G = typeof globalThis & {
  __twScores?: ScoreEntry[];
  __twEmitter?: EventEmitter;
};
const g = globalThis as G;

const memory = (g.__twScores ??= []);
export const emitter = (g.__twEmitter ??= new EventEmitter());
emitter.setMaxListeners(100);

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
export const usingRedis = Boolean(url && token);
const redis = usingRedis ? new Redis({ url: url!, token: token! }) : null;

export async function topScores(n = 10): Promise<ScoreEntry[]> {
  if (redis) {
    const raw = await redis.zrange<string[]>(KEY, 0, n - 1, { rev: true, withScores: true });
    const out: ScoreEntry[] = [];
    for (let i = 0; i < raw.length; i += 2) {
      const [initials, ts] = String(raw[i]).split(":");
      out.push({ initials, ts: Number(ts) || 0, score: Number(raw[i + 1]) });
    }
    return out;
  }
  return [...memory].sort((a, b) => b.score - a.score || a.ts - b.ts).slice(0, n);
}

export async function submitScore(entry: ScoreEntry): Promise<void> {
  if (redis) {
    await redis.zadd(KEY, { score: entry.score, member: `${entry.initials}:${entry.ts}` });
    // keep the set bounded: drop everything below the top MAX_KEPT
    await redis.zremrangebyrank(KEY, 0, -(MAX_KEPT + 1));
  } else {
    memory.push(entry);
    memory.sort((a, b) => b.score - a.score || a.ts - b.ts);
    memory.length = Math.min(memory.length, MAX_KEPT);
  }
  emitter.emit("update");
}
