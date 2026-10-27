import {env} from 'cloudflare:workers';
import {httpsUrl} from './integration.mjs';
import {site} from './site-config';
import type {Metadata} from 'next';
export function seo(path='/',privatePage=false):Metadata{
 const url=httpsUrl(env.PUBLIC_SITE_URL)||'https://dr-kanak-ramnani.scoolympiad.chatgpt.site';
 const launch=env.PUBLIC_LAUNCH==='true'&&Boolean(httpsUrl(env.PUBLIC_SITE_URL))&&!privatePage;
 const canonical=new URL(path,url).href;
 return {metadataBase:new URL(url),alternates:{canonical},robots:{index:launch,follow:launch},openGraph:{type:'website',locale:path==='/hi/'?'hi_IN':'en_IN',siteName:site.name,url:canonical,images:[{url:new URL('/images/dr-kanak-social-preview.jpg',url).href,width:1200,height:630,alt:'Dr Kanak Ramnani colourful K brand and paediatrician wordmark'}]},twitter:{card:'summary_large_image',images:[new URL('/images/dr-kanak-social-preview.jpg',url).href]}};
}
