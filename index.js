import { Router } from 'itty-router';
import { customAlphabet } from 'nanoid';

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

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})