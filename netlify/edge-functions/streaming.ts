
async function* generator() {
  let index = 0;
  while(true) {
    await delay(1000);
    yield {version: 2, index: index++};
  }
}
export default async (request: Request) => {
  await delay(50);

  const cloned = request.clone();
  const json = await cloned.json()
  const { readable, writable } = new TransformStream<Uint8Array>();
  const encoder = new TextEncoder();
  const writer = writable.getWriter();
  async function run() {
    const gen = generator();
    for await (const item of gen) {
      await writer.write(encoder.encode(JSON.stringify(item)+'\n'));
    }
  }
  run();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/qwik-json-stream",
    },
  });
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
