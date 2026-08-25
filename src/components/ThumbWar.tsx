"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GAME, pairs, type ThumbPair, type ThumbSide } from "@/content/thumbwar";
import type { ScoreEntry } from "@/lib/scores";
import { Burst } from "./ui";

type Phase = "idle" | "play" | "enter" | "done";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ThumbCard({ side, onPick, disabled }: { side: ThumbSide; onPick: () => void; disabled: boolean }) {
  const hi = side.contrast === "hi";
  const wordy = side.title.length > 16;
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      className={`relative aspect-video w-full cursor-pointer overflow-hidden border-2 text-left transition-transform ${
        hi ? "border-ink/25 bg-field" : "border-ink/15 bg-[#9aa39b]"
      } ${disabled ? "" : "hover:-translate-y-0.5 hover:border-ink"}`}
    >
      {hi && <span className="absolute -right-6 top-0 h-full w-1/3 -skew-x-12 bg-sun/90" aria-hidden />}
      {!hi && <span className="absolute -right-6 top-0 h-full w-1/3 -skew-x-12 bg-[#8b948c]" aria-hidden />}
      {side.face && (
        <span className="absolute bottom-1 right-2 text-4xl sm:text-5xl" aria-hidden>
          {side.face}
        </span>
      )}
      {side.clutter?.map((c, i) => (
        <span
          key={i}
          className="absolute text-xl"
          style={{ left: `${8 + i * 17}%`, top: `${12 + (i % 3) * 24}%` }}
          aria-hidden
        >
          {c}
        </span>
      ))}
      <span
        className={`absolute left-2 top-2 pr-10 font-bold ${hi ? "text-paper" : "text-[#4b524c]"} ${
          wordy ? "text-[0.6rem] leading-tight" : "display text-lg leading-none sm:text-xl"
        }`}
      >
        {side.title}
      </span>
    </button>
  );
}

function Board({ scores, highlightTs }: { scores: ScoreEntry[]; highlightTs?: number }) {
  return (
    <ol className="mt-3 space-y-1">
      {scores.length === 0 && <li className="eyebrow opacity-50">No scores yet. Set the first one.</li>}
      {scores.map((s, i) => (
        <li
          key={`${s.initials}${s.ts}`}
          className={`flex items-center gap-3 border-2 px-3 py-1.5 font-mono text-sm ${
            s.ts === highlightTs ? "border-coral bg-coral/15" : "border-ink/10"
          }`}
        >
          <span className="w-6 opacity-50">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-bold tracking-widest">{s.initials}</span>
          <span className="ml-auto tabular-nums">{s.score.toLocaleString()}</span>
        </li>
      ))}
    </ol>
  );
}

export function ThumbWar() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [deck, setDeck] = useState<ThumbPair[]>([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [flip, setFlip] = useState(false); // randomizes left/right per pair
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME.runSeconds);
  const [flash, setFlash] = useState<{ ok: boolean; why: string } | null>(null);
  const [initials, setInitials] = useState("");
  const [myTs, setMyTs] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const pickAt = useRef(0);

  /* Live board: SSE with a one-shot fetch fallback. */
  useEffect(() => {
    fetch("/api/scores")
      .then((r) => r.json())
      .then((d) => setScores(d.scores ?? []))
      .catch(() => {});
    const es = new EventSource("/api/scores/stream");
    es.onmessage = (e) => {
      try {
        setScores(JSON.parse(e.data));
      } catch {}
    };
    return () => es.close();
  }, []);

  /* Run clock */
  useEffect(() => {
    if (phase !== "play") return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 0.1) {
          clearInterval(t);
          setPhase("enter");
          return 0;
        }
        return +(s - 0.1).toFixed(1);
      });
    }, 100);
    return () => clearInterval(t);
  }, [phase]);

  const start = useCallback(() => {
    setDeck(shuffle(pairs));
    setPairIndex(0);
    setFlip(Math.random() > 0.5);
    setScore(0);
    setStreak(0);
    setTimeLeft(GAME.runSeconds);
    setFlash(null);
    setMyTs(undefined);
    setError(null);
    setPhase("play");
    pickAt.current = performance.now();
  }, []);

  const pair = deck[pairIndex % deck.length];

  const pick = useCallback(
    (which: "a" | "b") => {
      if (!pair || flash) return;
      const ok = which === pair.correct;
      const elapsed = (performance.now() - pickAt.current) / 1000;
      const speedBonus = Math.max(0, Math.round(100 * (1 - Math.min(elapsed, 3) / 3)));
      const nextStreak = ok ? streak + 1 : 0;
      const mult = nextStreak >= 6 ? 3 : nextStreak >= 3 ? 2 : 1;
      setScore((s) => Math.max(0, s + (ok ? (100 + speedBonus) * mult : -100)));
      setStreak(nextStreak);
      setFlash({ ok, why: pair.why });
      setTimeout(() => {
        setFlash(null);
        setPairIndex((i) => i + 1);
        setFlip(Math.random() > 0.5);
        pickAt.current = performance.now();
      }, 950);
    },
    [pair, flash, streak]
  );

  const submit = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initials, score }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something broke.");
      return;
    }
    const mine = (data.scores as ScoreEntry[]).find((s) => s.initials === initials.toUpperCase());
    setMyTs(mine?.ts);
    setScores(data.scores);
    setPhase("done");
  }, [initials, score]);

  const left = useMemo(() => (pair ? (flip ? pair.b : pair.a) : null), [pair, flip]);
  const right = useMemo(() => (pair ? (flip ? pair.a : pair.b) : null), [pair, flip]);

  return (
    <div className="text-ink">
      <span className="eyebrow bg-peach px-2 py-1">ARCADE</span>
      <h2 className="display mt-4 text-3xl font-bold sm:text-4xl">{GAME.title}</h2>

      {phase === "idle" && (
        <>
          <p className="mt-3 max-w-md leading-relaxed opacity-85">{GAME.tagline}</p>
          <p className="eyebrow mt-2 opacity-50">
            Right answers score by speed · streaks multiply · wrong picks cost 100
          </p>
          <Burst className="mt-5">
            <button
              type="button"
              onClick={start}
              className="cursor-pointer rounded-full bg-coral px-7 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Start →
            </button>
          </Burst>
          <h3 className="eyebrow mt-8 opacity-60">{GAME.board}</h3>
          <Board scores={scores} />
        </>
      )}

      {phase === "play" && (
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full bg-coral transition-[width] duration-100"
                style={{ width: `${(timeLeft / GAME.runSeconds) * 100}%` }}
              />
            </div>
            <span className="font-mono text-sm tabular-nums">{timeLeft.toFixed(1)}s</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-lg font-bold tabular-nums">{score.toLocaleString()}</span>
            <span className="eyebrow opacity-60">
              streak {streak}
              {streak >= 6 ? " · ×3" : streak >= 3 ? " · ×2" : ""}
            </span>
          </div>
          {left && right && (
            <div className="relative mt-4 grid grid-cols-2 gap-3">
              <ThumbCard side={left} disabled={!!flash} onPick={() => pick(flip ? "b" : "a")} />
              <ThumbCard side={right} disabled={!!flash} onPick={() => pick(flip ? "a" : "b")} />
              {flash && (
                <div
                  className={`absolute inset-x-0 -bottom-2 translate-y-full border-2 p-2.5 text-center text-sm font-medium ${
                    flash.ok ? "border-field bg-field/10" : "border-coral bg-coral/15"
                  }`}
                >
                  {flash.ok ? "✓ " : "✗ "}
                  {flash.why}
                </div>
              )}
            </div>
          )}
          <div className="h-12" />
        </div>
      )}

      {phase === "enter" && (
        <div className="mt-4">
          <p className="display text-xl font-semibold">
            Time. Final score: <span className="font-mono">{score.toLocaleString()}</span>
          </p>
          <p className="eyebrow mt-4 opacity-60">Enter your initials for the board</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3))}
              placeholder="AAA"
              autoFocus
              className="w-28 border-2 border-ink/30 bg-transparent px-3 py-2 text-center font-mono text-2xl font-bold tracking-[0.4em] outline-none focus:border-coral"
            />
            <button
              type="button"
              onClick={submit}
              disabled={initials.length !== 3}
              className="cursor-pointer rounded-full bg-coral px-6 py-2.5 font-semibold text-ink transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
            >
              Post it →
            </button>
            <button type="button" onClick={start} className="eyebrow cursor-pointer underline underline-offset-4 opacity-60 hover:opacity-100">
              skip, replay
            </button>
          </div>
          {error && <p className="mt-3 text-sm font-medium text-coral">{error}</p>}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-4">
          <p className="display text-xl font-semibold">On the board.</p>
          <Board scores={scores} highlightTs={myTs} />
          <button
            type="button"
            onClick={start}
            className="mt-5 cursor-pointer rounded-full bg-coral px-6 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Run it back →
          </button>
        </div>
      )}
    </div>
  );
}
