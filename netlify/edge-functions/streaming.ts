import type { Context } from "https://edge.netlify.com";

export default async () => {
  const { readable, writable } = new TransformStream<Uint8Array>();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();
  let index = 0;
  setInterval(() => {
    writer.write(encoder.encode(`data: Hello ${index++}\n\n`))
    index++;
  }, 1000);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
};
