# 👷 `cloudflare-worker` URL Shortener

For the Cloudflare Developer
Summer Challenge, I decided to take advantage of the [Cloudflare Worker](https://www.cloudflare.com/workers/) functionality along with the key value storage offered by [Workers KV](https://www.cloudflare.com/products/workers-kv/) to create a URL shortener. The application is then deployed using [Workers Sites](https://www.cloudflare.com/products/workers-sites).

The application is a simple HTTP API that allows you to input a URL and create a short URL that redirects to the original URL.

## Dependencies

+ [@cloudflare/wrangler](https://www.npmjs.com/package/@cloudflare/wrangler)
+ [itty-router](https://github.com/kwhitley/itty-router)
+ [nanoid](https://github.com/ai/nanoid)

## Getting Started

Deployed:
[Live Preview](https://cloudlare-url-shortener.deviouslab.workers.dev/)

Local:

	git clone https://github.com/DeviousLab/cloudflare-url-shortener.git
    cd cloudflare-url-shortener
    npm install
    wrangler dev


    
## Reference

+ [Cloudflare Developer
Summer Challenge](https://challenge.developers.cloudflare.com/)

## License

[MIT](http://opensource.org/licenses/mit-license.php)