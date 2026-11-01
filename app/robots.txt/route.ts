import {publicLaunchOrigin} from '@/lib/seo';
export function GET(){
 const origin=publicLaunchOrigin();
 const body=origin
  ? `User-agent: *\nAllow: /\nDisallow: /my-child\nDisallow: /api/\nDisallow: /search\nSitemap: ${origin}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
