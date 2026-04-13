export const runtime = "nodejs";

// Lightweight realtime MVP via Server-Sent Events (SSE).
// This only broadcasts events for the current server process (memory mode).
// When MongoDB is configured, we will upgrade to a proper pub/sub.

type Client = { id: string; send: (msg: string) => void };

declare global {
  // eslint-disable-next-line no-var
  var __wfSseClients: Map<string, Client> | undefined;
}

function clients() {
  if (!global.__wfSseClients) global.__wfSseClients = new Map();
  return global.__wfSseClients;
}

export function broadcast(event: string, data: any) {
  const payload =
    `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;
  for (const c of clients().values()) c.send(payload);
}

export async function GET() {
  const encoder = new TextEncoder();

  const id = crypto.randomUUID();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (msg: string) => controller.enqueue(encoder.encode(msg));
      clients().set(id, { id, send });
      send(`event: hello\ndata: ${JSON.stringify({ ok: true })}\n\n`);
    },
    cancel() {
      clients().delete(id);
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

