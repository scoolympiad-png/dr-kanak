import {env} from 'cloudflare:workers';
import {httpsUrl} from '@/lib/integration.mjs';
import {site} from '@/lib/site-config';
export function StructuredData(){
 const origin=httpsUrl(env.PUBLIC_SITE_URL)||site.origin;
 const data={'@context':'https://schema.org','@graph':[
  {'@type':'WebSite','@id':origin+'/#website',url:origin,name:site.name,inLanguage:['en-IN','hi-IN'],logo:new URL('/images/dr-kanak-logo-k.png',origin).href},
  {'@type':'Physician','@id':origin+'/#physician',name:site.name,url:origin,image:new URL('/images/dr-kanak-portrait.webp',origin).href,medicalSpecialty:'Pediatric',telephone:site.phone,address:{'@type':'PostalAddress',streetAddress:'Beside Mowa Police Station, Dubey Colony, Mowa',addressLocality:'Raipur',addressRegion:'Chhattisgarh',postalCode:'492007',addressCountry:'IN'},sameAs:[site.doctorUrl]},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}
