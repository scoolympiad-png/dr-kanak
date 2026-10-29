'use client';

import {useEffect,useState} from 'react';
import {site} from '@/lib/site-config';
import {Icon} from './icon';

/** Public parent guide. Internal service status and rules remain in private docs. */
export function VaccinationCareProgramme(){
 const [portal,setPortal]=useState<string|null>(null);
 useEffect(()=>{
  let active=true;
  fetch('/api/site-config/',{cache:'no-store'})
   .then(r=>r.ok?(r.json() as Promise<{portalUrl?:string|null}>):null)
   .then(c=>{if(active&&c?.portalUrl&&typeof c.portalUrl==='string')setPortal(c.portalUrl)})
   .catch(()=>{});
  return()=>{active=false};
 },[]);
 const steps=[
  {icon:'book',title:'Keep the vaccination card',copy:'Bring records of vaccines given at Mamta or any other clinic.'},
  {icon:'heart',title:'Review it together',copy:'Ask the doctor which vaccines your child needs and when.'},
  {icon:'calendar',title:'Write down the next visit',copy:'Note the date suggested at your appointment and keep it with the card.'},
  {icon:'chat',title:'Ask about reminders',copy:'Speak to Mamta’s team about ways to remember future visits.'}
 ];
 const library=[
  {href:'/vaccination/schedule/',icon:'calendar',title:'Vaccination by age',note:'See the milestones you can discuss with your doctor.'},
  {href:'/vaccination/catch-up/',icon:'book',title:'Missed a vaccination?',note:'Find out how to prepare for a catch-up discussion.'},
  {href:'/vaccination/after-care/',icon:'heart',title:'After your child’s vaccine',note:'Everyday comfort tips and when to seek advice.'}
 ];
 return <main className="container vcare">
  <nav className="vcare-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><Icon name="chevron"/><a href="/vaccination/">Vaccination</a><Icon name="chevron"/><span>Care reminders</span></nav>
  <header className="vcare-hero">
   <div><span className="vcare-eyebrow"><Icon name="heart"/> Here for every growing milestone</span><h1>A little planning for <em>every vaccination milestone.</em></h1>
    <p className="vcare-lead">From your baby’s first vaccines to the school years, a clear record and a plan for the next visit can make things easier. Find practical guidance for your family with Dr Kanak’s team.</p>
    <div className="vcare-actions">
     {portal?<a className="button" href={portal} target="_blank" rel="noopener noreferrer">View my family’s care <Icon name="external"/></a>:<a className="button" href={`tel:${site.phone}`}>Talk to Mamta’s team <Icon name="phone"/></a>}
     <a className="vcare-text-cta" href="/my-child/reminders/">Ask about reminder options <Icon name="arrow"/></a>
    </div>
    <p className="vcare-status"><strong>A little tip for your next visit:</strong> Keep your child’s vaccination card handy, along with any records from other clinics. Dr Kanak’s team can help you review what comes next and discuss ways to remember future visits.</p>
   </div>
   <figure><img src="/images/illustrative-vaccination-consultation.webp" width="1280" height="960" loading="eager" alt="Illustrative vaccination consultation with a parent, child and paediatrician"/><figcaption>Your child's care plan is individual.</figcaption></figure>
  </header>
  <section className="vcare-section" aria-labelledby="vcare-steps"><span className="eyebrow">Four easy steps</span><h2 id="vcare-steps">Make the next visit easier to remember.</h2><p>Small habits can help you keep track of your child’s vaccinations. Start with the card you already have and ask the doctor about the right next step.</p><div className="vcare-steps">{steps.map((s,i)=><article className="vcare-step" key={s.title}><span><Icon name={s.icon}/></span><small>Step {String(i+1).padStart(2,'0')}</small><h3>{s.title}</h3><p>{s.copy}</p></article>)}</div></section>
  <section className="vcare-section vcare-panel"><div><span className="eyebrow">For your next appointment</span><h2>Keep the important little details together.</h2><p>A few notes can make your next conversation with the doctor simpler. You can bring these along with the vaccination card.</p><ul className="vcare-list"><li><Icon name="check"/> Your child’s vaccination card and any previous records.</li><li><Icon name="check"/> The date of your next recommended visit.</li><li><Icon name="check"/> Details of vaccines received at other clinics.</li><li><Icon name="check"/> Questions you want to ask Dr Kanak.</li></ul></div><aside className="vcare-panel-art"><img src="/images/dr-kanak-logo-k.png" width="160" height="160" alt="" aria-hidden="true"/><h3>Every little milestone matters.</h3><p>One card, a few helpful notes and a caring conversation can make the next visit feel easier.</p></aside></section>
  <section className="vcare-section"><span className="eyebrow">Explore & learn</span><h2>Helpful answers for growing families.</h2><div className="vcare-help-grid">{library.map(x=><a href={x.href} key={x.href}><Icon name={x.icon}/><strong>{x.title}</strong><span>{x.note}</span><span className="vcare-text-cta">Read the guide <Icon name="arrow"/></span></a>)}</div></section>
  <section className="vcare-section vcare-questions"><span className="eyebrow">Parents often ask</span><h2>Questions about your child’s next vaccine.</h2><div>
   <details><summary>Can Mamta remind me about the next visit? <Icon name="down"/></summary><p>Please contact Mamta’s team to ask which reminder options are currently available. Requesting a callback means the team can answer your question; it does not itself sign you up for reminders.</p></details>
   <details><summary>How do I know when the next vaccine is due? <Icon name="down"/></summary><p>Bring your child’s vaccination card to the doctor. The next date depends on their age, vaccines already received and individual health needs. Ask the team to note the plan on the card.</p></details>
   <details><summary>What if we missed a vaccine? <Icon name="down"/></summary><p>Bring all the vaccination records you have. Dr Kanak’s team can help you review what is needed and discuss an appropriate catch-up plan.</p></details>
   <details><summary>What if my child was vaccinated at another clinic? <Icon name="down"/></summary><p>Keep the record from that visit and bring it along. It helps the doctor see which vaccines your child has already received.</p></details>
   <details><summary>Should I send my child’s medical records in a callback request? <Icon name="down"/></summary><p>No need. Your name and phone number are enough for a callback enquiry. Bring your child’s records to the visit or use a method recommended by the hospital for sharing medical information.</p></details>
  </div></section>
  <section className="vcare-callout"><div><span className="eyebrow">We’re here to help</span><h2>Bring the card. Bring your questions.</h2><p>Whether it’s your baby’s first visit or a missed vaccination, Mamta’s team can help you prepare. Please confirm your appointment with the hospital before travelling.</p></div><a className="button" href="/visit/">Plan a visit <Icon name="arrow"/></a></section>
  <p className="vcare-disclaimer">This guide provides general vaccination information. Your child’s doctor will advise the appropriate vaccines and timing based on their health and vaccination history.</p>
 </main>;
}
