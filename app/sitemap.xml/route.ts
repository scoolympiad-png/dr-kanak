import {pages} from '@/lib/pages';
export function GET(request:Request){
 const actual=new URL(request.url);
 const origin=actual.protocol==='https:'&&actual.hostname==='drkanak.com'?'https://drkanak.com':null;
 const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const urls=origin?pages.filter(p=>!p.noindex).map(p=>`<url><loc>${escape(new URL(p.path,origin).href)}</loc></url>`).join(''):'';
 const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
 return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=300'}});
}
