import type { Context } from "https://edge.netlify.com";

export default async () => {
  const { readable, writable } = new TransformStream<Uint8Array>();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();
  async function run() {
    let index = 0;
    while(true) {
      await delay(1000);
      await writer.write(encoder.encode(`data3: Hello ${index++}\n\n`))
    }
  }
  run();
  return new Response(readable, {
    headers: {
      "Content-Type": "application/qwik-json",
    },
  });
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
