import {env} from 'cloudflare:workers';
import {httpsUrl} from './integration.mjs';
import {site} from './site-config';
import type {Metadata} from 'next';
export function seo(path='/',privatePage=false):Metadata{
 const url=httpsUrl(env.PUBLIC_SITE_URL)||'https://dr-kanak-ramnani.scoolympiad.chatgpt.site';
 const launch=env.PUBLIC_LAUNCH==='true'&&Boolean(httpsUrl(env.PUBLIC_SITE_URL))&&!privatePage;
 const canonical=new URL(path,url).href;
 return {metadataBase:new URL(url),alternates:{canonical},robots:{index:launch,follow:launch},openGraph:{type:'website',locale:path==='/hi/'?'hi_IN':'en_IN',siteName:site.name,url:canonical,images:[{url:new URL('/images/dr-kanak-official.webp',url).href,width:800,height:800,alt:site.name}]},twitter:{card:'summary',images:[new URL('/images/dr-kanak-official.webp',url).href]}};
}
