
const entry_netlifyEdge = async () => {
  let index = 0
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      let timer = setInterval(() => {
        controller.enqueue(encoder.encode(`data: WORKINGGG ${index++}\n\n`));
        if (index > 5) {
          clearInterval(timer);
          controller.close();
        }
      }, 1000);
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
};
export {
  entry_netlifyEdge as default
};
