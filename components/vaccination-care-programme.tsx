'use client';

import {useEffect,useState} from 'react';
import {site} from '@/lib/site-config';
import {Icon} from './icon';

/** Parent information; never computes vaccine dates or enrols a child. */
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
  {icon:'book',title:'Keep the record',copy:'Bring every vaccination card, including doses from other clinics.'},
  {icon:'shield',title:'Review the plan',copy:'An authorised clinician checks the real record and confirms the next step.'},
  {icon:'lock',title:'Verify and choose',copy:'The guardian verifies access and separately consents to care reminders.'},
  {icon:'calendar',title:'Receive an alert',copy:'Only approved, consented care events can trigger a message.'}
 ];
 const library=[
  {href:'/vaccination/schedule/',icon:'calendar',title:'Explore the age guide',note:'Useful questions by age, not personalised due dates.'},
  {href:'/vaccination/catch-up/',icon:'book',title:'Missed a vaccination visit?',note:'What to do with late or uncertain records.'},
  {href:'/vaccination/after-care/',icon:'heart',title:'After-vaccination care',note:'Comfort and signs that need medical attention.'}
 ];
 return <main className="container vcare">
  <nav className="vcare-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><Icon name="chevron"/><a href="/vaccination/">Vaccination</a><Icon name="chevron"/><span>Care reminders</span></nav>
  <header className="vcare-hero">
   <div><span className="vcare-eyebrow"><Icon name="heart"/> Dr Kanak · Mamta Hospital</span><h1>Little milestones. <em>Thoughtful reminders.</em></h1>
    <p className="vcare-lead">From your child's first vaccination card to the next follow-up, stay organised with reliable information and the hospital's care team.</p>
    <div className="vcare-actions">
     {portal?<a className="button" href={portal} target="_blank" rel="noopener noreferrer">Open secure family portal <Icon name="external"/></a>:<a className="button" href={`tel:${site.phone}`}>Ask Mamta about access <Icon name="phone"/></a>}
     <a className="vcare-text-cta" href="/my-child/reminders/">Ask about vaccination reminders <Icon name="arrow"/></a>
    </div>
    <p className="vcare-status"><strong>Reminder service:</strong> This public site does not enrol a child or send alerts. A verified guardian, separate channel consent and a clinician-approved plan are required in Mamta's private Patient OS.</p>
   </div>
   <figure><img src="/images/illustrative-vaccination-consultation.webp" width="1280" height="960" loading="eager" alt="Illustrative vaccination consultation with a parent, child and paediatrician"/><figcaption>Your child's care plan is individual.</figcaption></figure>
  </header>
  <section className="vcare-section" aria-labelledby="vcare-steps"><span className="eyebrow">The secure care journey</span><h2 id="vcare-steps">From card to care reminder.</h2><p>The website's age guide cannot decide your child's vaccine timing. A clinician reviews the actual vaccination record first.</p><div className="vcare-steps">{steps.map((s,i)=><article className="vcare-step" key={s.title}><span><Icon name={s.icon}/></span><small>Step {String(i+1).padStart(2,'0')}</small><h3>{s.title}</h3><p>{s.copy}</p></article>)}</div></section>
  <section className="vcare-section vcare-panel"><div><span className="eyebrow">Privacy & confidence</span><h2>Private records stay in secure care.</h2><p>Child names, vaccination dates, medical histories and guardian identities belong in Mamta's authorised care service—not in an open contact form or general-purpose chat.</p><ul className="vcare-list"><li><Icon name="check"/> Guardians see only children they are authorised to access.</li><li><Icon name="check"/> Only the clinical team approves or changes the plan.</li><li><Icon name="check"/> Reminder consent is separate from requesting a callback.</li><li><Icon name="check"/> A delivered message is not proof of vaccination.</li></ul></div><aside className="vcare-panel-art"><img src="/images/dr-kanak-logo-k.png" width="160" height="160" alt="" aria-hidden="true"/><h3>Care that remembers what matters.</h3><p>Helpful guidance now; personalised alerts only after the secure service is enabled.</p></aside></section>
  <section className="vcare-section"><span className="eyebrow">Free parent education</span><h2>Explore helpful vaccination topics.</h2><div className="vcare-help-grid">{library.map(x=><a href={x.href} key={x.href}><Icon name={x.icon}/><strong>{x.title}</strong><span>{x.note}</span><span className="vcare-text-cta">Read the guide <Icon name="arrow"/></span></a>)}</div></section>
  <section className="vcare-section vcare-questions"><span className="eyebrow">Parents ask</span><h2>Before your first reminder.</h2><div>
   <details><summary>Does a callback sign my child up for reminders? <Icon name="down"/></summary><p>No. A callback only permits a response to your enquiry. A verified guardian must separately consent through the private care service.</p></details>
   <details><summary>Can the website calculate the next vaccine date? <Icon name="down"/></summary><p>No. The clinician confirms a personal plan after checking vaccine history, products, age and any medical considerations.</p></details>
   <details><summary>Will reminders arrive by WhatsApp or SMS? <Icon name="down"/></summary><p>Only when Mamta enables the service, approved templates and the guardian's chosen channel. This website does not promise automatic delivery.</p></details>
   <details><summary>What if a dose is given elsewhere? <Icon name="down"/></summary><p>Share the record through the authorised hospital process. The clinician reviews the new evidence and outdated reminders must be cancelled.</p></details>
   <details><summary>Can I stop future alerts? <Icon name="down"/></summary><p>Yes. The authorised private service must allow consent withdrawal and stop future consent-dependent reminders.</p></details>
  </div></section>
  <section className="vcare-callout"><div><span className="eyebrow">Your next step</span><h2>Bring the card. Bring your questions.</h2><p>Ask Mamta Hospital to review your child's vaccination history and confirm suitable care. This webpage does not confirm appointments.</p></div><a className="button" href="/visit/">Plan a visit <Icon name="arrow"/></a></section>
  <p className="vcare-disclaimer">This information is educational, not a diagnosis, personalised schedule, confirmed appointment or activated alert. Seek timely medical care for urgent symptoms rather than waiting for a notification.</p>
 </main>;
}
