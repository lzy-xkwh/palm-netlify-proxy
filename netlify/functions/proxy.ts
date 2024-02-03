/// <reference lib="webworker" />

const TELEGRAPH_URL: string = 'https://discord.com';

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const url: URL = new URL(request.url); // URL constructor exists in TypeScript DOM lib
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');
  const modifiedRequest: Request = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: request.redirect // Use the redirect property from the original request
  });

  const response: Response = await fetch(modifiedRequest);
  const modifiedResponse: Response = new Response(response.body, response);

  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
