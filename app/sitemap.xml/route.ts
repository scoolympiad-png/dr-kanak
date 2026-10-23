import {env} from 'cloudflare:workers';
import {httpsUrl} from '@/lib/integration.mjs';
import {pages} from '@/lib/pages';
export function GET(){const origin=httpsUrl(env.PUBLIC_SITE_URL)||'https://dr-kanak-ramnani.scoolympiad.chatgpt.site';const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>!p.noindex).map(p=>`<url><loc>${escape(new URL(p.path,origin).href)}</loc><lastmod>2026-10-23</lastmod></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}})}
