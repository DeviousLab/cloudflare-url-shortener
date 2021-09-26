import { Router } from 'itty-router';
import { customAlphabet } from 'nanoid';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const router = Router();
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  6,
);

router.post('/links', async request => {
  let slug = nanoid();
  let requestBody = await request.json();
  if ('url' in requestBody) {
    await SHORTEN.put(slug, requestBody.url, { expirationTtl: 86400 });
    let shortenedURL = `${new URL(request.url).origin}/${slug}`;
    let responseBody = {
      message: 'Link shortened successfully',
      slug,
      shortened: shortenedURL,
    };
    return new Response(JSON.stringify(responseBody), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  } else {
    return new Response("Must provide a valid URL", { status: 400 });
  }
});

async function handleEvent(event) {
  let requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/' || requestUrl.pathname.includes('static')) {
    return await getAssetFromKV(event);
  } else {
    return await router.handle(event.request);
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});