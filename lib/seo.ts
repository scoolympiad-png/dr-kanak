import {env} from 'cloudflare:workers';
import {httpsUrl} from './integration.mjs';
import {site} from './site-config';
import type {Metadata} from 'next';

export function publicLaunchOrigin(){
 const configured=httpsUrl(env.PUBLIC_SITE_URL);
 if(env.PUBLIC_LAUNCH!=='true'||!configured)return null;
 const canonical=new URL(site.origin);
 const actual=new URL(configured);
 return actual.origin===canonical.origin?canonical.origin:null;
}
export function seo(path='/',privatePage=false):Metadata{
 const launchOrigin=publicLaunchOrigin();
 const configured=httpsUrl(env.PUBLIC_SITE_URL);
 const url=launchOrigin||configured||site.origin;
 const canonical=new URL(path,url).href;
 const indexable=Boolean(launchOrigin)&&!privatePage;
 return {metadataBase:new URL(url),alternates:{canonical},
  robots:{index:indexable,follow:indexable},
  openGraph:{type:'website',locale:path==='/hi/'?'hi_IN':'en_IN',siteName:site.name,url:canonical,images:[{url:new URL('/images/dr-kanak-social-preview.jpg',url).href,width:1200,height:630,alt:'Dr Kanak Ramnani colourful K brand and paediatrician wordmark'}]},
  twitter:{card:'summary_large_image',images:[new URL('/images/dr-kanak-social-preview.jpg',url).href]}
 };
}
