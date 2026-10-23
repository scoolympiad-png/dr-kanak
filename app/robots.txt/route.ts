import {env} from 'cloudflare:workers';
import {httpsUrl} from '@/lib/integration.mjs';
export function GET(){const url=httpsUrl(env.PUBLIC_SITE_URL);const live=env.PUBLIC_LAUNCH==='true'&&url;const body=live?`User-agent: *\nAllow: /\nDisallow: /my-child\nDisallow: /api/\nDisallow: /search\nSitemap: ${new URL('/sitemap.xml',url).href}\n`:'User-agent: *\nDisallow: /\n';return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
