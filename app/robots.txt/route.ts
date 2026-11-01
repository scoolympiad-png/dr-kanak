export function GET(request:Request){
 const actual=new URL(request.url);
 const origin=actual.protocol==='https:'&&actual.hostname==='drkanak.com'?'https://drkanak.com':null;
 const body=origin
  ? `User-agent: *\nAllow: /\nDisallow: /my-child\nDisallow: /api/\nDisallow: /search\nSitemap: ${origin}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
