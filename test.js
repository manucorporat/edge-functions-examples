
async function main() {
  // const url = 'https://qwik-city-e2e.netlify.app/app/functions/?qfunc=f4zgEiB8wIc'; // This does not work.
  // const url = 'https://exquisite-bublanina-029058.netlify.app/streaming'; // This works.
  const url = 'https://64a2b84f04804b7f410f87fc--netlify-streaming-repo.netlify.app';
  const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Origin': 'https://qwik-city-e2e.netlify.app',
        'X-QRL': 'f4zgEiB8wIc',
        'Content-Type': 'application/qwik-json',
      },
      body: JSON.stringify({"_entry":"1","_objs":["\u0002_#s_f4zgEiB8wIc",["0"]]}),
  });
  console.log(res.headers);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while(true) {
    const data = await reader.read();
    if (data.done) break;
    console.log(decoder.decode(data.value));
  }

}

main();