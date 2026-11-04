import styles from './when-to-see-paediatrician.module.css';

const levels=[
 {kind:'emergency',eyebrow:'Emergency',title:'Seek emergency medical care now',intro:'Do not wait for an online booking or callback when a child appears seriously unwell.',items:[
  'Severe or struggling breathing, blue or grey lips or tongue, or new confusion or difficulty waking.',
  'A seizure, sudden collapse, or unresponsiveness.',
  'A rash that does not fade when pressed, especially when a child is ill.',
  'A baby younger than 3 months with a measured temperature of 38°C or higher needs urgent medical assessment.'
 ],footer:'In India, call 112 in an immediate emergency. You can also contact Mamta Hospital’s emergency desk.'},
 {kind:'prompt',eyebrow:'Prompt review',title:'Contact a clinician promptly',intro:'These changes deserve timely advice or examination; a clinician can tell you how urgently your child needs to be seen.',items:[
  'Fewer wet nappies or much less urine than usual, persistent vomiting or difficulty drinking enough fluids.',
  'Fever that persists, returns or is accompanied by ear pain, worsening cough or unusual tiredness.',
  'New or worsening feeding difficulty in an infant, or concerns about jaundice, weight gain or hydration.',
  'A child with a long-term health condition whose usual symptoms or behaviour have changed.'
 ],footer:'Call the care team the same day when symptoms are concerning or getting worse; they may recommend urgent assessment.'},
 {kind:'routine',eyebrow:'Planned visit',title:'Make a routine paediatric appointment',intro:'Some questions matter even when a child is not acutely ill. A planned visit can help you understand growth, development and prevention.',items:[
  'Growth, nutrition, sleep or toilet-training concerns that keep returning.',
  'A developmental milestone, speech, hearing, learning or behavioural concern.',
  'Vaccination-record questions and catch-up planning.',
  'A well-child review, follow-up of previous results or a question about school wellbeing.'
 ],footer:'Bring the child’s records and a short list of questions; the hospital will confirm doctor availability and timing.'}
];
const questions=[
 {q:'My child has a fever. When should I call?',a:'Age and the child’s overall condition matter. A baby younger than 3 months with a measured temperature of 38°C or higher needs urgent medical assessment. Older children with breathing problems, reduced responsiveness, dehydration or worsening symptoms need prompt care too. Seek clinician advice about fever that persists or returns.'},
 {q:'What if my child is playful between episodes of fever?',a:'Playing, drinking and improving between fever episodes can be reassuring, but they do not rule out illness. Watch the pattern and contact a clinician if symptoms worsen, fever persists or you are concerned.'},
 {q:'Do I need to wait for a scheduled developmental milestone review?',a:'No. If you are concerned about communication, movement, hearing, learning or a loss of previously acquired skills, raise it with your child’s paediatrician without waiting for the next routine check.'},
 {q:'What should I bring to a paediatrician appointment?',a:'Bring the vaccination card, recent prescriptions, relevant reports, growth records if available and the names of current medicines. Note when symptoms began, changes in feeding or urine output, and your top questions.'},
 {q:'Can a website tell me if home care is enough?',a:'No. A web page cannot examine your child or safely determine their individual level of urgency. When unsure, especially for babies or rapidly changing symptoms, contact a qualified health professional.'},
 {q:'Can I book an emergency assessment through this page?',a:'Do not use routine online appointment forms for emergencies. Seek the nearest appropriate emergency department or call emergency services. Use the Mamta appointment desk only for non-emergency booking questions.'}
];
const sources=[
 {title:'Urgent Care, ER or Pediatrician? A Parent Guide',by:'American Academy of Pediatrics · HealthyChildren',href:'https://www.healthychildren.org/English/family-life/health-management/Pages/urgent-care-ER-or-pediatrician-a-parent-guide.aspx'},
 {title:'When to get urgent medical help for babies and children under 5',by:'NHS',href:'https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/'},
 {title:'Fever and Your Baby',by:'American Academy of Pediatrics · HealthyChildren',href:'https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/Fever-and-Your-Baby.aspx'},
 {title:'Developmental Milestones',by:'US Centers for Disease Control and Prevention',href:'https://www.cdc.gov/act-early/milestones/index.html'}
];
const linked=[
 {title:'When your child has a fever',text:'Prepare for common fever questions and safe medical follow-up.',href:'/parent-resources/fever/'},
 {title:'Understanding developmental milestones',text:'Notice progress and bring useful examples to your next visit.',href:'/parent-resources/milestones/'},
 {title:'Seizure first aid for caregivers',text:'Important practical safety information for families.',href:'/parent-resources/seizure-first-aid/'},
 {title:'Vaccination and immunisation',text:'Understand the record and plan a vaccination review.',href:'/vaccination/'}
];
export function WhenToSeePaediatrician(){
 return <main className={styles.page}>
  <section className={styles.hero}><div className={`container ${styles.heroGrid}`}><div>
   <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/parent-resources/">Parent resources</a><span>/</span><span aria-current="page">When to see a paediatrician</span></nav>
   <span className={styles.eyebrow}>DR KANAK RAMNANI · CHILD HEALTH GUIDE</span>
   <h1>When should I take my child to a <em>paediatrician?</em></h1>
   <p className={styles.lead}>Whether your child has a new symptom, a concern that keeps returning, or a routine check-up ahead, learn what deserves urgent attention and what to discuss at a planned visit.</p>
   <div className={styles.actions}><a className={styles.primary} href="#care-choices">Understand when to seek care</a><a className={styles.secondary} href="/visit/">Plan a visit</a></div>
   <p className={styles.helper}>This information is general guidance, not a symptom checker or medical diagnosis. When a child seems seriously unwell, seek immediate medical assessment.</p>
  </div><figure className={styles.photo}><img src="/images/dr-kanak-official.webp" width="630" height="740" alt="Dr Kanak Ramnani, paediatrician at Mamta Super Speciality Hospital, Raipur" loading="eager"/><figcaption>Child health guidance with Dr Kanak · Mamta Hospital</figcaption></figure>
  </div></section>
  <section className={styles.quickStrip} aria-label="Three ways to access care"><div className="container"><div><strong>Emergency</strong><span>Serious or rapidly worsening symptoms</span></div><div><strong>Prompt medical advice</strong><span>New, persistent or concerning changes</span></div><div><strong>Routine consultation</strong><span>Growth, prevention and follow-up</span></div></div></section>
  <section id="care-choices" className={styles.triage}><div className="container"><header className={styles.heading}><span className={styles.eyebrow}>A HELPFUL GUIDE FOR PARENTS</span><h2>Know when not to wait.</h2><p>These examples are not a complete list. A child’s age, medical history and overall appearance affect how quickly help is needed. If you feel something is seriously wrong, get medical help.</p></header><div className={styles.levels}>{levels.map(level=><article key={level.kind} className={`${styles.level} ${styles[level.kind]}`}><div className={styles.levelHead}><span>{level.eyebrow}</span><h3>{level.title}</h3><p>{level.intro}</p></div><ul>{level.items.map(x=><li key={x}>{x}</li>)}</ul><div className={styles.levelFoot}>{level.footer}</div></article>)}</div>
   <div className={styles.emergencyCall}><div><strong>Medical emergency?</strong><span>Call <a href="tel:112">112</a> in India or go to the nearest emergency department. Mamta Hospital emergency: <a href="tel:+917714000455">+91 77140 00455</a>.</span></div><a href="tel:+917714000455">Call Mamta emergency</a></div>
  </div></section>
  <section className={styles.prep}><div className={`container ${styles.prepGrid}`}><div><span className={styles.eyebrow}>MAKE THE VISIT USEFUL</span><h2>Five things to tell your child's doctor.</h2><p>A few clear notes can help your paediatrician understand the concern and decide whether any examination, tests or follow-up are needed.</p><a className={styles.textLink} href="/care/">Explore child health services</a></div><div className={styles.prepCard}><ol><li><strong>When it started</strong><span>When symptoms or changes first appeared and whether they are getting better or worse.</span></li><li><strong>What has changed</strong><span>Eating, drinking, wet nappies, urine, activity, sleep and behaviour.</span></li><li><strong>Measurements</strong><span>Temperature readings, earlier growth records or test results, where available.</span></li><li><strong>What your child takes</strong><span>Prescribed medicines, supplements, allergies and previous treatments.</span></li><li><strong>Your main questions</strong><span>What worries you most, and what should prompt another review?</span></li></ol></div></div></section>
  <section className={styles.faqSection}><div className="container"><header className={styles.heading}><span className={styles.eyebrow}>COMMON PARENT QUESTIONS</span><h2>A few questions that deserve clear answers.</h2></header><div className={styles.faq}>{questions.map((f,i)=><details key={f.q}><summary><span>{String(i+1).padStart(2,'0')}</span>{f.q}</summary><p>{f.a}</p></details>)}</div></div></section>
  <section className={styles.related}><div className="container"><span className={styles.eyebrow}>LEARN MORE</span><h2>Resources to help your family prepare.</h2><div className={styles.relatedGrid}>{linked.map(item=><a href={item.href} key={item.href}><h3>{item.title}</h3><p>{item.text}</p></a>)}</div></div></section>
  <section className={styles.visit}><div className={`container ${styles.visitGrid}`}><div><span className={styles.eyebrow}>CHILD CARE AT MAMTA HOSPITAL · RAIPUR</span><h2>Ready to discuss a non-emergency concern?</h2><p>Ask Mamta's appointment team about Dr Kanak Ramnani’s current consultation schedule. A website request is not a confirmed appointment, and emergencies should never wait for a routine response.</p></div><div className={styles.visitActions}><a className={styles.primary} href="/visit/">Appointments and directions</a><a className={styles.secondary} href="tel:+919111160200">Call appointments</a></div></div></section>
  <section className={styles.sourceSection}><div className="container"><span className={styles.eyebrow}>TRUSTED SOURCES</span><h2>Health guidance for parents.</h2><div className={styles.sourceGrid}>{sources.map(x=><a href={x.href} target="_blank" rel="noopener noreferrer" key={x.href}><strong>{x.title}</strong><span>{x.by}</span></a>)}</div><p>Local emergency access and specialist availability may differ. This is educational information and does not replace a clinician’s individual advice.</p></div></section>
 </main>;
}
