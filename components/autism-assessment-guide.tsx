import {Icon} from './icon';
import {ActivityVisual} from './activity-visual';

const questionsToBring=[
 {icon:'chat',title:'What you have noticed',text:'Share examples of speech, gestures, play, friendships, attention, routines and sensory preferences. Include things your child enjoys and does well.'},
 {icon:'book',title:'Everyday information',text:'Bring the child’s health record, any hearing or vision reports, previous developmental notes and questions from school or family.'},
 {icon:'heart',title:'Your family’s questions',text:'Ask what a screening result means, whether a referral is useful, what support can begin now and when to follow up.'}
];
const assessmentSteps=[
 {n:'01',icon:'chat',title:'Start with your story',description:'A clinician asks about pregnancy or birth history when relevant, developmental milestones, communication, play, routines, sleep, health and your main concerns.'},
 {n:'02',icon:'sprout',title:'Understand the child’s development',description:'The clinician considers growth, hearing, communication, movement and wellbeing. A brief screening questionnaire may help identify areas needing a closer look.'},
 {n:'03',icon:'puzzle',title:'Arrange a fuller evaluation if needed',description:'A trained specialist or team may use developmental history, observation and appropriate assessment tools. There is no single blood test or questionnaire that diagnoses autism.'},
 {n:'04',icon:'heart',title:'Make a useful support plan',description:'The next steps may include family guidance, hearing or language evaluation, educational adjustments and individual referrals. Families should know whom to contact and when to review progress.'}
];
const mythCards=[
 {title:'Screening is not the same as diagnosis',text:'A screening tool helps decide whether a closer look could be useful. It does not, by itself, say that a child is or is not autistic.'},
 {title:'One observation is not the whole picture',text:'Children show different behaviours in different settings. Developmental history and the child’s strengths matter alongside any assessment activity.'},
 {title:'Support does not have to wait',text:'If communication, learning or daily participation is difficult, families can discuss suitable help and referrals while further evaluation is being arranged.'}
];
const faq=[
 {q:'At what age can parents ask about autism?',a:'Whenever you notice something that concerns you. Developmental monitoring happens throughout childhood. In US guidance, the American Academy of Pediatrics recommends autism-specific screening at 18 and 24 months, but a conversation or referral should not wait for a scheduled screening age if concerns arise.'},
 {q:'Will the doctor diagnose autism in one appointment?',a:'Not necessarily. Some children need a more detailed evaluation by suitably trained specialists. The number of visits and assessment steps depend on the child and available local services. Ask the hospital to explain the appropriate pathway.'},
 {q:'Is a speech delay always a sign of autism?',a:'No. Speech and language differences have many possible explanations, including hearing difficulties. A paediatrician can help decide whether hearing checks, speech-language assessment or a broader developmental evaluation is useful.'},
 {q:'Can a child be autistic and have strong language skills?',a:'Yes. Autistic children vary widely in their communication, learning, interests and daily support needs. A child’s strengths and challenges are considered together.'},
 {q:'Do we need to bring school reports or videos?',a:'Simple observations from teachers and examples of everyday activities may help the discussion. Ask the clinic before sharing photos or videos of your child, and use only the hospital’s approved private method.'},
 {q:'What happens if the assessment does not indicate autism?',a:'Your concerns still deserve an explanation and a plan. A clinician may review speech, hearing, learning, sleep or other developmental needs and suggest support or follow-up where appropriate.'},
 {q:'Can we come from elsewhere in Chhattisgarh?',a:'Families can contact Mamta Hospital in Mowa, Raipur to ask about Dr Kanak’s current consultation arrangements and whether the visit fits their child’s needs. Please confirm availability before travelling.'}
];
const reading=[
 {title:'Screening for Autism Spectrum Disorder',org:'US Centers for Disease Control and Prevention',url:'https://www.cdc.gov/autism/diagnosis/index.html'},
 {title:'Clinical screening guidance',org:'CDC — Health professionals',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},
 {title:'Autism recognition and referral pathways',org:'Indian Academy of Pediatrics — Action Plan 2026',url:'https://www.iapindia.org/iap-action-plan-2026/'},
 {title:'Autism facts and support',org:'World Health Organization',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'}
];
export function AutismAssessmentGuide(){
 return <main className="container autism-assessment">
  <nav className="assessment-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><Icon name="chevron"/><a href="/autism/">Autism</a><Icon name="chevron"/><span>Assessment guide</span></nav>
  <header className="assessment-hero">
   <div className="assessment-hero-copy"><span className="assessment-kicker"><Icon name="sprout"/> A guide for parents and caregivers</span><h1>Wondering about autism? <em>Here’s what comes next.</em></h1>
    <p>Perhaps you’ve noticed a difference in how your child communicates, plays or responds to everyday life. An appointment is a chance to share those observations, understand your child’s strengths and work out whether more support would help.</p>
    <div className="assessment-actions"><a href="#assessment-steps" className="button">Explore the assessment journey <Icon name="arrow"/></a><a href="#prepare" className="assessment-soft-link">Prepare for a visit <Icon name="down"/></a></div>
    <div className="assessment-hero-note"><Icon name="heart"/><span>You know your child in ways no checklist can capture. Your observations matter.</span></div>
   </div>
   <figure><ActivityVisual path="/autism/assessment/" variation={0}/><figcaption>Understanding begins with listening.</figcaption></figure>
  </header>
  <section className="assessment-intro"><span className="eyebrow">A conversation, not a label</span><h2>Every child deserves to be understood.</h2>
   <p>Autism is a neurodevelopmental condition. Children may experience differences in social communication, interests, routines and sensory processing, but every child’s combination of strengths and support needs is unique. Some differences are noticed in toddlerhood; others become clearer as school and social demands change.</p>
   <p><strong>No single behaviour, online quiz or milestone checklist can diagnose autism.</strong> If you are concerned, a paediatric visit can help identify sensible next steps.</p>
  </section>
  <section id="assessment-steps" className="assessment-section"><div className="assessment-section-head"><span className="eyebrow">What parents can expect</span><h2>Four parts of an assessment journey.</h2><p>Not every child needs every step. The clinician and, when appropriate, a specialist team will decide what fits your child.</p></div>
   <div className="assessment-step-grid">{assessmentSteps.map((s,i)=><article className={'assessment-step assessment-tone-'+i} key={s.n}><div className="assessment-step-top"><span className="assessment-step-icon"><Icon name={s.icon}/></span><span className="assessment-step-count">{s.n}</span></div><h3>{s.title}</h3><p>{s.description}</p></article>)}</div>
  </section>
  <section className="assessment-section assessment-explainer" id="understanding-results"><div><span className="eyebrow">Understanding the words</span><h2>Screening and diagnosis are different.</h2><p><strong>Screening</strong> helps a clinician decide whether a child would benefit from a fuller developmental evaluation. It can involve questions about communication, play and everyday skills.</p>
    <p><strong>Diagnosis</strong> is a clinical conclusion based on a detailed history and appropriate professional assessment. More than one trained professional may be involved. A screening score on its own cannot confirm autism.</p>
    <a href="/autism/early-signs/" className="assessment-soft-link">Read about developmental signs <Icon name="arrow"/></a>
   </div><aside className="assessment-explainer-art"><Icon name="puzzle"/><h3>Look at the whole child.</h3><p>Strengths, preferences, challenges, home life and school experiences all help shape the conversation.</p><ul><li>Notice and describe, rather than self-diagnosing</li><li>Ask how results will be explained</li><li>Leave with a clear next step</li></ul></aside>
  </section>
  <section id="prepare" className="assessment-section"><div className="assessment-section-head"><span className="eyebrow">Before you visit</span><h2>Three things you can bring.</h2><p>You do not need to complete a long questionnaire at home. A few everyday examples and your questions are a helpful start.</p></div>
   <div className="assessment-bring-grid">{questionsToBring.map((x,i)=><article className={'assessment-bring assessment-bring-'+i} key={x.title}><span><Icon name={x.icon}/></span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div>
  </section>
  <section className="assessment-section assessment-referral"><div className="assessment-referral-copy"><span className="eyebrow">Finding helpful support</span><h2>What might happen after the conversation?</h2><p>Depending on your child’s needs, the next step may be reassurance and follow-up, a hearing assessment, a speech-language evaluation or referral for a more detailed developmental assessment. Families can also discuss practical support at home and school.</p>
   <p>The goal is not to make a child behave like everyone else. It is to support communication, comfort, learning, health and meaningful participation.</p>
   <a className="assessment-soft-link" href="/autism/communication-support/">Explore ways to support communication <Icon name="arrow"/></a>
  </div><figure><ActivityVisual path="/autism/assessment/" variation={1}/><figcaption>Practical support starts with understanding your child.</figcaption></figure></section>
  <section className="assessment-section assessment-myths"><div className="assessment-section-head"><span className="eyebrow">Important to know</span><h2>A few things worth remembering.</h2></div><div className="assessment-myth-grid">{mythCards.map((m,i)=><article className={'assessment-myth assessment-myth-'+i} key={m.title}><Icon name="check"/><h3>{m.title}</h3><p>{m.text}</p></article>)}</div></section>
  <section className="assessment-section assessment-faq" id="questions"><span className="eyebrow">Questions parents ask</span><h2>Let’s make the next steps clearer.</h2><div>{faq.map((f,i)=><details key={f.q}><summary><span>{String(i+1).padStart(2,'0')}</span>{f.q}<Icon name="down"/></summary><p>{f.a}</p></details>)}</div></section>
  <section className="assessment-visit"><div><span className="eyebrow">Child-development questions in Raipur</span><h2>Talk to Dr Kanak’s team at Mamta Hospital.</h2><p>For questions about your child’s development, contact Mamta Super Speciality Hospital in Mowa, Raipur. The team can explain current appointment availability and whether a paediatric review or a referral is the right starting point.</p><div className="assessment-visit-actions"><a className="button" href="/visit/">Plan a visit <Icon name="arrow"/></a><a className="assessment-soft-link" href="/care/growth-development/">Explore growth & development care <Icon name="arrow"/></a></div></div><div className="assessment-visit-place"><Icon name="pin"/><strong>Mamta Super Speciality Hospital</strong><span>Beside Mowa Police Station, Raipur, Chhattisgarh</span><a href="https://www.google.com/maps/search/?api=1&query=Mamta+Super+Speciality+Hospital+Mowa+Raipur" target="_blank" rel="noopener noreferrer">View directions <Icon name="external"/></a></div></section>
  <section className="assessment-related"><span className="eyebrow">Explore at your own pace</span><h2>More ways to understand your child.</h2><div><a href="/autism/early-signs/"><Icon name="sprout"/><strong>Early developmental signs</strong><span>What families may notice</span><Icon name="arrow"/></a><a href="/autism/sensory-needs/"><Icon name="sun"/><strong>Sensory differences</strong><span>Comfort and everyday adjustments</span><Icon name="arrow"/></a><a href="/autism/communication-support/"><Icon name="chat"/><strong>Communication support</strong><span>Words, gestures, pictures and AAC</span><Icon name="arrow"/></a></div></section>
  <section className="assessment-sources"><span className="eyebrow">Further reading</span><h2>Trusted information for families.</h2><div>{reading.map(x=><a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer"><strong>{x.title}</strong><small>{x.org}</small><Icon name="external"/></a>)}</div><p>This guide is for general information. It does not diagnose autism or replace an individual assessment. Ask a qualified professional about concerns or the loss of previously acquired developmental skills.</p></section>
 </main>;
}
