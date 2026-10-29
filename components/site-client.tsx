'use client';

import {useEffect,useRef,useState,type ReactNode} from 'react';
import {ages,careAreas,site} from '@/lib/site-config';
import {Icon} from './icon';

type Config = {chatUrl:string|null;portalUrl:string|null;callbackEnabled:boolean;turnstileSiteKey:string|null};
let configPromise:Promise<Config>|undefined;
function getConfig(){return configPromise ??= fetch('/api/site-config/').then(r=>{if(!r.ok)throw Error();return r.json() as Promise<Config>}).catch(()=>({chatUrl:null,portalUrl:null,callbackEnabled:false,turnstileSiteKey:null}));}
function useConfig(){const[c,set]=useState<Config|null>(null);useEffect(()=>{let active=true;getConfig().then(x=>{if(active)set(x)});return()=>{active=false}},[]);return c;}

function Dialog({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const prior=document.activeElement as HTMLElement|null;const old=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.focus();const handler=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){const items=ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]');if(!items?.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',handler);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',handler);prior?.focus()}},[onClose]);
 return <div className="dialog-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="dialog" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}><div className="dialog-head"><span className="eyebrow">{title}</span><button className="icon-button" aria-label="Close dialog" onClick={onClose}><Icon name="close"/></button></div>{children}</div></div>;
}

export function SiteNavigation(){
 const[menu,setMenu]=useState(false);const[modal,setModal]=useState<'callback'|'chat'|null>(null);const c=useConfig();
 // Stable close function prevents a dialog's focus management from restarting on a form edit.
 const close=useRef(()=>setModal(null)).current;
 return <>
  
  <header className="site-header"><div className="container header-inner">
   <a className="brand" href="/" aria-label="Dr Kanak Ramnani home"><img className="brand-mark" src="/images/dr-kanak-logo-k.png" alt="" aria-hidden="true" width="54" height="54"/><span><strong>Dr Kanak Ramnani</strong><small>PAEDIATRICIAN · MAMTA HOSPITAL</small></span></a>
   <button className="icon-button mobile-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button>
   <nav className={menu?'main-nav open':'main-nav'} id="main-nav" aria-label="Main navigation">
    <a href="/about/">Meet Dr Kanak</a>
    <details><summary>Growing up <Icon name="down"/></summary><div className="nav-dropdown"><a href="/care-by-age/">Explore every age <Icon name="arrow"/></a>{ages.map(a=><a key={a.slug} href={`/care-by-age/${a.slug}/`}><span>{a.name}</span><small>{a.age}</small></a>)}</div></details>
    <details><summary>Care <Icon name="down"/></summary><div className="nav-dropdown"><a href="/care/">All children’s care <Icon name="arrow"/></a>{careAreas.map(a=><a key={a.slug} href={`/care/${a.slug}/`}>{a.title}</a>)}</div></details>
    <a href="/vaccination/">Vaccination</a>
    <details><summary>For parents <Icon name="down"/></summary><div className="nav-dropdown"><a href="/parent-resources/">Parent library</a><a href="/learning-and-adhd/">ADHD & learning support</a><a href="/autism/">Autism resource hub</a><a href="/autism/early-signs/">Early signs & development</a><a href="/autism/sensory-needs/">Sensory differences & support</a><a href="/autism/communication-support/">Communication & AAC support</a><a href="/family-wellbeing/autism/">Family autism guide</a><a href="/family-wellbeing/stress/">Family stress & wellbeing</a><a href="/learning-and-adhd/bright-minds/">Bright minds & ADHD</a><a href="/learning-and-adhd/writing-at-school/">Help with writing tasks</a><a href="/vaccination/understanding-vaccines/">Vaccination questions</a><a href="/vaccination/reminders/">Vaccination reminder guide</a><a href="/resources/">Trusted resources</a><a href="/videos/">Watch & learn</a><a href="/my-child/">Your child’s care</a><a href="/hi/" lang="hi">हिन्दी सहायता</a></div></details>
    <a className="nav-search" href="/search/" aria-label="Search the website"><Icon name="search"/></a>
    <a className="button small" href="/visit/">Plan a visit <Icon name="arrow"/></a>
   </nav>
  </div></header>
  <div className="contact-dock" aria-label="Contact and appointments"><button onClick={()=>setModal('callback')}><Icon name="phone"/><span>Request callback</span></button><a href={`tel:${site.phone}`}><Icon name="phone"/><span>Call Mamta</span></a><a href={site.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="chat"/><span>WhatsApp</span></a><a href="/visit/"><Icon name="calendar"/><span>Appointment</span></a></div>
  <button className="assistant-launch" onClick={()=>setModal('chat')} aria-label="Open care navigator"><Icon name="chat"/><span>How can we help?</span></button>
  {modal==='callback'&&<Dialog title="Request a callback" onClose={close}><Callback config={c}/></Dialog>}
  {modal==='chat'&&<Dialog title="Nuvyqo Care Navigator" onClose={close}><CareNavigator config={c}/></Dialog>}
 </>;
}

function CareNavigator({config}:{config:Config|null}){
 const[topic,setTopic]=useState('');
 return <><div className="navigator-intro"><span className="icon-disc blue"><Icon name="heart"/></span><h2>A helpful place to start.</h2><p>Find the right page or speak with Mamta’s team.</p></div>
  <div className="notice urgent"><strong>Does your child need urgent help?</strong><p>For breathing difficulty, unresponsiveness, a prolonged seizure or a severe problem, seek emergency care now.</p><a href="/emergency/">Emergency contacts <Icon name="arrow"/></a></div>
  {config?.chatUrl?<div className="notice sage"><h3>Connect to Patient OS</h3><p>Open the hospital’s configured care assistant. Its privacy and sign-in process applies.</p><a className="button" href={config.chatUrl} target="_blank" rel="noopener noreferrer">Open care assistant <Icon name="external"/></a></div>:<><p className="small-copy">Choose a topic for website guidance. For a personal question, contact the clinical team.</p><div className="chip-list">{['Vaccination','My child’s age','Book a visit','Feeding & growth'].map(t=><button key={t} className={topic===t?'chip active':'chip'} onClick={()=>setTopic(t)}>{t}</button>)}</div>{topic&&<div className="navigator-answer" aria-live="polite"><p>{topic==='Vaccination'?'Bring all vaccination cards so the clinical team can review the record and next visit.':topic==='My child’s age'?'Explore guidance from the newborn days through the teenage years.':topic==='Book a visit'?'The hospital team can confirm Dr Kanak’s availability, the consultation fee and a suitable time.':'Find general parent guidance and discuss individual concerns at a consultation.'}</p><a className="text-link" href={topic==='Vaccination'?'/vaccination/':topic==='My child’s age'?'/care-by-age/':topic==='Book a visit'?'/visit/':'/parent-resources/'}>Explore this topic <Icon name="arrow"/></a></div>}</>}
  <p className="small-copy">Please share medical records only through an authorised, verified care service. This navigator cannot assess symptoms or prescribe treatment.</p><a className="text-link" href={`tel:${site.phone}`}>Speak to Mamta <Icon name="phone"/></a>
 </>;
}

type TurnstileAPI={render:(el:HTMLElement,opts:{sitekey:string;action:string;callback:(token:string)=>void;'expired-callback':()=>void;'error-callback':()=>void})=>string;remove:(id:string)=>void;reset:(id:string)=>void};
declare global{interface Window{turnstile?:TurnstileAPI}}
function Captcha({sitekey,onToken}:{sitekey:string;onToken:(token:string)=>void}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{let widget:string|undefined;let stopped=false;const mount=()=>{if(!stopped&&ref.current&&window.turnstile)widget=window.turnstile.render(ref.current,{sitekey,action:'callback',callback:onToken,'expired-callback':()=>onToken(''),'error-callback':()=>onToken('')})};let script=document.querySelector<HTMLScriptElement>('script[data-care-captcha]');if(window.turnstile)mount();else if(script)script.addEventListener('load',mount,{once:true});else{script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.dataset.careCaptcha='true';script.addEventListener('load',mount,{once:true});document.head.appendChild(script)}return()=>{stopped=true;if(widget)window.turnstile?.remove(widget)}},[sitekey,onToken]);
 return <div ref={ref} className="captcha"/>;
}
function Callback({config,defaultIntent='appointment'}:{config:Config|null;defaultIntent?:'appointment'|'vaccination'|'reminder-enrolment'|'general'}){
 const[token,setToken]=useState('');const[status,setStatus]=useState('');const[busy,setBusy]=useState(false);const[done,setDone]=useState(false);const requestId=useRef('');
 if(!config?.callbackEnabled)return <><h2>Speak with Mamta’s team.</h2><p>For vaccination questions or reminders, contact the hospital’s appointment desk.</p><div className="button-row"><a className="button" href={`tel:${site.phone}`}><Icon name="phone"/>Call {site.phoneLabel}</a><a className="button outline" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Mamta <Icon name="external"/></a></div><p className="small-copy">Online callback requests are not available at present. Phone and WhatsApp connect you directly with the hospital.</p></>;
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setStatus('');setBusy(true);const f=new FormData(e.currentTarget);try{if(!requestId.current){const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');requestId.current=h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)}const r=await fetch('/api/enquiry/',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':requestId.current},body:JSON.stringify({name:f.get('name'),phone:f.get('phone'),intent:f.get('intent'),language:f.get('language'),consent:f.get('consent')==='on',website:f.get('website'),captchaToken:token})});if(r.ok){setDone(true);setStatus(defaultIntent==='reminder-enrolment'?'Your callback request was received. Mamta’s team can explain reminder options. No reminder has been activated.':'Your request was received. The hospital team will contact you. A consultation time still needs confirmation.')}else{const x=await r.json() as {message?:string};setStatus(x.message||'Your request could not be sent. Please call Mamta.')}}catch{setStatus('Your request could not be sent. Please call Mamta.')}finally{setBusy(false)}}
 return <><h2>{defaultIntent==='reminder-enrolment'?'Ask about vaccination reminders':'A call at the right time.'}</h2><p>Use an adult’s contact details only. Please do not enter a child’s name, birth date, medical history or vaccination record.</p>{done?<div role="status" className="notice sage">{status}</div>:<form onSubmit={submit} className="callback-form"><label>Your name<input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label><label>Mobile number<input name="phone" type="tel" inputMode="tel" required maxLength={18} autoComplete="tel" placeholder="+91 …"/></label><div className="form-row"><label>How can we help?<select name="intent" defaultValue={defaultIntent}><option value="appointment">Appointment</option><option value="vaccination">Vaccination visit</option><option value="reminder-enrolment">Ask about care reminders</option><option value="general">General enquiry</option></select></label><label>Reply language<select name="language"><option value="en">English</option><option value="hi">हिन्दी</option></select></label></div><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><label className="checkbox"><input type="checkbox" name="consent" required/><span>I am an adult and agree that Mamta may contact me about this request. <a href="/privacy/">Privacy information</a></span></label>{config.turnstileSiteKey&&<Captcha sitekey={config.turnstileSiteKey} onToken={setToken}/>}<p role="status" className="form-status">{status}</p><button className="button" disabled={busy||!token}>{busy?'Sending…':'Request callback'} <Icon name="arrow"/></button><p className="small-copy">For urgent care, call the emergency service. This form is not monitored for emergencies.</p></form>}</>;
}

/** Public guardian contact gateway; no child details and no promise of reminder enrolment. */
export function VaccinationReminderStart(){
 const c=useConfig();
 const [open,setOpen]=useState(false);
 const close=useRef(()=>setOpen(false)).current;
 return <section className="vax-reminder-entry" aria-labelledby="vax-reminder-title" id="vaccination-reminders">
  <div className="vax-reminder-topline"><span className="vax-reminder-label"><Icon name="heart"/> Keeping little milestones on track</span><span className="vax-reminder-art" aria-hidden="true">✦</span></div>
  <div className="vax-reminder-main">
   <div className="vax-reminder-copy">
    <h2 id="vax-reminder-title">Need help remembering the next visit?</h2>
    <p>Start with your vaccination card. Mamta’s team can help you understand the next step and discuss future reminder options.</p>
    <div className="vax-reminder-actions">
     {c?.callbackEnabled?<button type="button" className="button" onClick={()=>setOpen(true)}>Request a reminder callback <Icon name="arrow"/></button>:<a className="button" href={`tel:${site.phone}`}>Call Mamta <Icon name="phone"/></a>}
     {c?.portalUrl?<a className="vax-reminder-secondary" href={c.portalUrl} target="_blank" rel="noopener noreferrer">Open secure family care <Icon name="external"/></a>:<a className="vax-reminder-secondary" href="/vaccination/reminders/">How care reminders work <Icon name="arrow"/></a>}
    </div>
    <p className="vax-reminder-helper"><Icon name="shield"/> A callback is not reminder enrolment. Your child's records and personalised plan belong in the secure, verified care service.</p>
   </div>
   <ol className="vax-reminder-steps">
    <li><span><Icon name="book"/></span><div><strong>Bring the card</strong><small>Keep past vaccination dates together.</small></div></li>
    <li><span><Icon name="heart"/></span><div><strong>Confirm the plan</strong><small>The doctor reviews the right next visit.</small></div></li>
    <li><span><Icon name="calendar"/></span><div><strong>Choose reminders</strong><small>When available, verified guardians can consent to updates.</small></div></li>
   </ol>
  </div>
  {open&&<Dialog title="Ask about care reminders" onClose={close}><Callback config={c} defaultIntent="reminder-enrolment"/></Dialog>}
 </section>;
}

export function AgeExplorer(){
 const[selected,setSelected]=useState(0);
 const a=ages[selected];
 return <div className="age-explorer">
  <div className="age-explorer-intro">
   <div><span className="age-explorer-kicker"><Icon name="heart"/> A little help at every age</span><p>Choose your child's stage to find relevant questions, helpful reading and care options.</p></div>
   <span className="age-stage-count" aria-hidden="true">7 stages of growing up <Icon name="sprout"/></span>
  </div>
  <div className="age-tabs" role="tablist" aria-label="Explore child health by age">
   {ages.map((x,i)=><button
    id={`age-tab-${i}`} key={x.slug} type="button"
    aria-controls="age-panel" aria-selected={selected===i} role="tab"
    tabIndex={selected===i?0:-1}
    onKeyDown={e=>{
     if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
      e.preventDefault();
      const n=e.key==='Home'?0:e.key==='End'?ages.length-1:(selected+(e.key==='ArrowRight'?1:-1)+ages.length)%ages.length;
      setSelected(n);
      document.getElementById(`age-tab-${n}`)?.focus();
     }
    }}
    onClick={()=>setSelected(i)}>
     <span className="age-tab-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
     <span className="age-tab-illustration"><Icon name={x.icon}/></span>
     <strong>{x.name}</strong><small>{x.age}</small>
    </button>)}
  </div>
  <div className={`age-panel age-panel-premium ${a.colour}`} id="age-panel" role="tabpanel" tabIndex={0} aria-labelledby={`age-tab-${selected}`}>
   <div className="age-panel-primary">
    <span className="age-panel-kicker"><Icon name={a.icon}/> Stage {selected+1} of {ages.length} · {a.age}</span>
    <h3>{a.summary}</h3>
    <p>Every child grows at their own pace. Here are a few topics worth exploring together.</p>
    <div className="age-panel-actions">
     <a className="button" href={`/care-by-age/${a.slug}/`}>Explore {a.name.toLowerCase()} <Icon name="arrow"/></a>
     <a className="age-panel-guide" href={`/parent-resources/${a.guide}/`}><Icon name="book"/> Read a parent guide <Icon name="arrow"/></a>
    </div>
   </div>
   <div className="age-panel-topics">
    <span className="age-topics-heading"><Icon name="heart"/> Helpful topics at this age</span>
    <ul>{a.topics.map(t=><li key={t}><span className="age-topic-check"><Icon name="check"/></span><span>{t}</span></li>)}</ul>
    <a className="age-related-care" href={a.care}>Find related care <Icon name="arrow"/></a>
    <span className="age-topic-decoration" aria-hidden="true"><Icon name={a.icon}/></span>
   </div>
  </div>
  <p className="age-explorer-footnote"><Icon name="shield"/> Age ranges are for browsing general information, not an individual developmental assessment. Ask Dr Kanak's team about personal concerns.</p>
 </div>;
}

export function SearchView({index}:{index:{path:string;title:string;summary:string;eyebrow?:string}[]}){const[q,setQ]=useState('');const results=index.filter(p=>`${p.title} ${p.summary} ${p.eyebrow}`.toLowerCase().includes(q.trim().toLowerCase()));return <div className="search-view"><label className="search-field"><Icon name="search"/><span className="sr-only">Search topics</span><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Try feeding, growth, newborn or vaccination…" autoComplete="off" maxLength={100}/></label><p className="small-copy" aria-live="polite">{results.length} {results.length===1?'page':'pages'} found. Search stays in this page and is not added to the address.</p><div className="search-results">{results.map(p=><a href={p.path} key={p.path}><span className="eyebrow">{p.eyebrow||'Explore'}</span><h2>{p.title}<Icon name="arrow"/></h2><p>{p.summary}</p></a>)}</div>{!results.length&&<p>Try another word, or <a href="/visit/">contact the hospital team</a>.</p>}</div>}

export function CareAccess(){const c=useConfig();return <div className="portal-card"><span className="icon-disc sage"><Icon name="lock"/></span><h2>Your family’s care, kept personal.</h2><p>Clinical records and vaccination plans need a verified guardian account. Please use the hospital’s authorised service or ask the care team for help.</p>{c?.portalUrl?<a className="button" href={c.portalUrl} target="_blank" rel="noopener noreferrer">Open secure care portal <Icon name="external"/></a>:<><a className="button" href={`tel:${site.phone}`}>Ask Mamta about access <Icon name="phone"/></a><p className="small-copy">Online record access and personalised reminders are not available through this website at present.</p></>}<div className="portal-links"><a href="/my-child/vaccination-card/">Vaccination record</a><a href="/my-child/reminders/">Care reminders</a><a href="/my-child/records/">Health records</a><a href="/my-child/preferences/">Contact preferences</a></div><a className="text-link" href="/consent/">Understand consent and reminders <Icon name="arrow"/></a></div>}

const kanakCarePhotos=[
 {src:'/images/dr-kanak-hospital-care-2026.webp',alt:'Dr Kanak Ramnani at Mamta Hospital',title:'Caring through every milestone',note:'Compassionate care, from the very first days.'},
 {src:'/images/dr-kanak-newborn-consultation-private.webp',alt:'Dr Kanak speaking with a parent while caring for a baby; identifying patient details obscured',title:'A reassuring start',note:'Guidance for newborns and their families.'},
 {src:'/images/dr-kanak-consultation-child-private.webp',alt:'Dr Kanak reviewing a child health concern in her clinic; child identity obscured',title:'Little questions matter',note:'Time to listen, explain and care.'},
 {src:'/images/dr-kanak-conversation-2026.webp',alt:'Dr Kanak talking about child health in an interview',title:'Helping parents feel informed',note:'Clear conversations about growing up.'}
] as const;

export function VaccinationPhotoCarousel(){
 const [active,setActive]=useState(0);
 const [userPaused,setUserPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [focusWithin,setFocusWithin]=useState(false);
 const [pageVisible,setPageVisible]=useState(true);
 const [inView,setInView]=useState(true);
 const [prefersReducedMotion,setPrefersReducedMotion]=useState(false);
 const [announceManual,setAnnounceManual]=useState(false);
 const carouselRef=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionChange=()=>setPrefersReducedMotion(motion.matches);
  onMotionChange();
  motion.addEventListener('change',onMotionChange);
  const onVisibilityChange=()=>setPageVisible(!document.hidden);
  onVisibilityChange();
  document.addEventListener('visibilitychange',onVisibilityChange);
  const observer=new IntersectionObserver(
    ([entry])=>setInView(Boolean(entry?.isIntersecting)),
    {threshold:0.2}
  );
  if(carouselRef.current)observer.observe(carouselRef.current);
  return()=>{
   motion.removeEventListener('change',onMotionChange);
   document.removeEventListener('visibilitychange',onVisibilityChange);
   observer.disconnect();
  };
 },[]);

 const autoplayActive=!userPaused&&!hovered&&!focusWithin&&pageVisible&&inView&&!prefersReducedMotion;
 useEffect(()=>{
  if(!autoplayActive)return;
  const timer=window.setInterval(()=>{
   setAnnounceManual(false);
   setActive(i=>(i+1)%kanakCarePhotos.length);
  },5000);
  return()=>window.clearInterval(timer);
 },[autoplayActive,active]);

 const selectManually=(index:number)=>{
  setAnnounceManual(true);
  setActive((index+kanakCarePhotos.length)%kanakCarePhotos.length);
 };
 const selected=kanakCarePhotos[active];
 return <div ref={carouselRef} className="kanak-care-carousel" aria-label="Moments of care with Dr Kanak" aria-roledescription="carousel"
  onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
  onFocusCapture={()=>setFocusWithin(true)}
  onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocusWithin(false)}}>
  <div className="kanak-care-carousel-view">
   <div className="kanak-care-carousel-photo"><img key={selected.src} src={selected.src} alt={selected.alt} width="1000" height="750" loading="lazy"/></div>
   <div className="kanak-care-carousel-caption" aria-live={announceManual?'polite':'off'} aria-atomic="true">
    <span className="eyebrow">Dr Kanak · Mamta Hospital</span><h3>{selected.title}</h3><p>{selected.note}</p>
   </div>
  </div>
  <div className="kanak-care-carousel-controls">
   <span className="kanak-care-carousel-counter">{String(active+1).padStart(2,'0')} / {String(kanakCarePhotos.length).padStart(2,'0')}</span>
   <div className="kanak-care-carousel-dots" aria-label="Choose a photograph">
    {kanakCarePhotos.map((item,i)=><button type="button" key={item.src} aria-label={`Show photo ${i+1}: ${item.title}`} aria-current={i===active?'true':undefined} className={i===active?'is-current':''} onClick={()=>selectManually(i)}/>)}
   </div>
   <div className="kanak-care-carousel-arrows">
    <button type="button" onClick={()=>selectManually(active-1)} aria-label="Previous photograph"><Icon name="arrow"/></button>
    <button type="button" onClick={()=>selectManually(active+1)} aria-label="Next photograph"><Icon name="arrow"/></button>
   </div>
   <button type="button" className="kanak-care-carousel-playback" aria-label={userPaused?'Resume automatic slideshow':'Pause automatic slideshow'}
    aria-pressed={userPaused} onClick={()=>setUserPaused(x=>!x)}>
    <span aria-hidden="true">{userPaused?'▶':'Ⅱ'}</span>
    <span>{userPaused?'Play':'Pause'}</span>
   </button>
  </div>
 </div>;
}
type VaccineAgeBand={id:string;age:string;subtitle:string;tone:string;icon:string;summary:string;fromCard:readonly string[];indiaNote:string;ask:string};
const vaccineAgeBands:readonly VaccineAgeBand[]=[
 {id:'birth',age:'Birth',subtitle:'The first days',tone:'peach',icon:'sprout',summary:'A fresh beginning, with essential early protection.',fromCard:['BCG','Hepatitis B','Oral polio (OPV 0)'],indiaNote:'India’s public programme also includes BCG, hepatitis B birth dose and OPV 0.',ask:'Were all birth doses recorded in my baby’s card?'},
 {id:'early-weeks',age:'6–14 weeks',subtitle:'Early baby visits',tone:'blue',icon:'sun',summary:'The early weeks include a series of important clinic visits.',fromCard:['DTP','IPV','Hib','PCV','Rotavirus','Hepatitis B'],indiaNote:'The public schedule includes visits at 6, 10 and 14 weeks, with several vaccines given across those visits.',ask:'Which combinations were used, and what is recorded?'},
 {id:'first-year',age:'6–12 months',subtitle:'A busy first year',tone:'mint',icon:'heart',summary:'As your baby grows, keep the vaccination record up to date.',fromCard:['Influenza','TCV','MMR / measles-containing vaccine','Hepatitis A','JE'],indiaNote:'The public schedule includes the first measles–rubella dose at 9–12 months. JE applies in designated areas.',ask:'Which vaccines are appropriate for my child’s history and location?'},
 {id:'toddler',age:'13–24 months',subtitle:'Toddler milestones',tone:'lavender',icon:'footprints',summary:'Bring the early records along for booster and catch-up discussions.',fromCard:['MMR','PCV','Varicella','DTP / IPV / Hib boosters','Hepatitis A'],indiaNote:'The public schedule includes a second MR dose and DPT/polio boosters during 16–24 months; JE depends on location.',ask:'Which follow-up or booster doses should we discuss?'},
 {id:'preschool',age:'2–6 years',subtitle:'Preschool years',tone:'yellow',icon:'puzzle',summary:'Review protection as your child becomes more active and independent.',fromCard:['Varicella','DTP booster','MMR'],indiaNote:'The public programme includes a DPT booster at about 5–6 years.',ask:'Are the preschool and school-entry records complete?'},
 {id:'school-teen',age:'9–14 years',subtitle:'School and early teens',tone:'sky',icon:'book',summary:'Older children also benefit from a vaccination-record review.',fromCard:['Tdap','HPV','Td'],indiaNote:'The public schedule includes Td at 10 years. HPV recommendations and programme eligibility should be discussed individually.',ask:'Which school-age and adolescent vaccines apply now?'},
 {id:'older-teen',age:'15–18 years',subtitle:'Later teenage years',tone:'rose',icon:'shield',summary:'A final review can help carry accurate records into adulthood.',fromCard:['Td','HPV'],indiaNote:'The public programme includes Td at 16 years; other vaccines depend on previous doses and clinical advice.',ask:'What should we review before the next life stage?'}
] as const;

export function VaccinationScheduleNavigator(){
 const[selected,setSelected]=useState(0);
 const stage=vaccineAgeBands[selected];
 return <section className="vax-schedule-explorer" id="age-guide" aria-label="Explore your child's vaccination age guide">
  <div className="vax-schedule-explorer-heading">
   <span className="eyebrow">Find your child’s stage</span>
   <h2>Every age has a little story.</h2>
   <p>Select an age to explore common vaccination topics. Your child's doctor will confirm the right vaccine products and timing.</p>
  </div>
  <div className="vax-stage-tabs" role="tablist" aria-label="Vaccination age groups">
   {vaccineAgeBands.map((band,i)=><button type="button" id={`vax-age-${i}`} role="tab" aria-selected={i===selected} aria-controls="vax-stage-panel" tabIndex={i===selected?0:-1} className={`vax-stage-tab tone-${band.tone} ${i===selected?'selected':''}`} key={band.id}
    onClick={()=>setSelected(i)}
    onKeyDown={e=>{
     if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
      e.preventDefault();
      const next=e.key==='Home'?0:e.key==='End'?vaccineAgeBands.length-1:(selected+(e.key==='ArrowRight'?1:-1)+vaccineAgeBands.length)%vaccineAgeBands.length;
      setSelected(next);
      document.getElementById(`vax-age-${next}`)?.focus();
     }
    }}>
    <span className="vax-tab-icon"><Icon name={band.icon}/></span>
    <strong>{band.age}</strong><small>{band.subtitle}</small>
   </button>)}
  </div>
  <div className={`vax-stage-detail tone-${stage.tone}`} id="vax-stage-panel" role="tabpanel" aria-labelledby={`vax-age-${selected}`} tabIndex={0}>
   <div className="vax-stage-narrative">
    <span className="vax-stage-counter">Stage {selected+1} of {vaccineAgeBands.length}</span>
    <h3>{stage.age}: {stage.subtitle.toLowerCase()}</h3>
    <p>{stage.summary}</p>
    <div className="vax-timing-note"><Icon name="shield"/><span>{stage.indiaNote}</span></div>
    <div className="vax-stage-cta"><a className="button" href="/visit/">Ask Dr Kanak <Icon name="arrow"/></a><a href="/vaccination/catch-up/" className="vax-stage-catchup">Missed a visit? <Icon name="arrow"/></a></div>
   </div>
   <div className="vax-stage-details-card">
    <span className="vax-card-tag"><Icon name="book"/> From Mamta’s vaccination card</span>
    <h4>Vaccines to discuss</h4>
    <div className="vax-vaccine-chips">{stage.fromCard.map(item=><span key={item}>{item}</span>)}</div>
    <div className="vax-ask"><Icon name="chat"/><p><strong>Ask at your visit</strong>{stage.ask}</p></div>
    <p className="vax-card-tip">These names come from the hospital’s printed card. They may represent components of combination vaccines and are not a list of injections due for every child.</p>
   </div>
  </div>
  <div className="vax-explorer-foot"><Icon name="heart"/><span>Bring your vaccination card to every visit. Your paediatrician can match past doses with the appropriate next steps.</span></div>
 </section>;
}
