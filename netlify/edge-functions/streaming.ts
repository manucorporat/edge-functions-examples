
export default async (request: Request) => {
  await delay(50);

  const cloned = request.clone();
  const json = await cloned.json()
  const { readable, writable } = new TransformStream<Uint8Array>();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();
  async function run() {
    let index = 0;
    while(true) {
      await delay(1000);
      await writer.write(encoder.encode(JSON.stringify({version: 1, index: index++, json})));
    }
  }
  run();
  await delay(200);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/qwik-json-stream",
    },
  });
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
