import { emitter, topScores, usingRedis } from "@/lib/scores";

export const dynamic = "force-dynamic";

/**
 * Server-Sent Events: pushes the top-10 to every open viewer.
 * Local dev: instant push via the process EventEmitter.
 * Redis mode: also polls the store every 3s so writes from other
 * serverless instances propagate to this stream's viewers.
 */
export async function GET(req: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let lastPayload = "";
      let closed = false;

      const send = async () => {
        if (closed) return;
        try {
          const payload = JSON.stringify(await topScores(10));
          if (payload !== lastPayload) {
            lastPayload = payload;
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          }
        } catch {
          /* store hiccup — next tick retries */
        }
      };

      const onUpdate = () => void send();
      emitter.on("update", onUpdate);

      const poll = usingRedis ? setInterval(onUpdate, 3000) : null;
      const heartbeat = setInterval(() => {
        if (!closed) controller.enqueue(encoder.encode(`: hb\n\n`));
      }, 25000);

      await send();

      req.signal.addEventListener("abort", () => {
        closed = true;
        emitter.off("update", onUpdate);
        if (poll) clearInterval(poll);
        clearInterval(heartbeat);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
