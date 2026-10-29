import {Icon} from './icon';
import {ActivityVisual} from './activity-visual';
import {WritingPractice} from './adhd-practice';

const graphics={
 bright:'/resources/adhd-high-ability-parent-guide.webp',
 writing:'/resources/adhd-positive-writing-classroom.webp'
} as const;

function ArtCard({src,alt,label}:{src:string;alt:string;label:string}){
 return <details className="adhd-visual-reference"><summary><Icon name="book"/><span>Open optional illustrated worksheet: {label}</span><Icon name="down"/></summary><div className="adhd-art-card"><a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${label} infographic`}><img src={src} alt={alt} loading="lazy" width="1024" height="1285"/></a><div className="adhd-art-actions"><span><Icon name="book"/> {label}</span><div><a href={src} target="_blank" rel="noopener noreferrer">View full size <Icon name="external"/></a><a href={src} download>Save image <Icon name="down"/></a></div></div></div></details>;
}
const evidence=[
 {title:'School & classroom strategies',source:'CDC',url:'https://www.cdc.gov/adhd/treatment/classroom.html'},
 {title:'Childhood ADHD clinical guideline',source:'American Academy of Pediatrics',url:'https://publications.aap.org/pediatrics/article/144/4/e20192528/81572/Clinical-Practice-Guideline-for-the-Diagnosis'},
 {title:'Indian paediatric ADHD consensus',source:'Indian Academy of Pediatrics',url:'https://pubmed.ncbi.nlm.nih.gov/28368271/'}
];
function EvidenceList({extra=[]}:{extra?:{title:string;source:string;url:string}[]}){
 return <section className="adhd-evidence"><span className="eyebrow">Further reading</span><h2>Guidance behind these ideas</h2><div className="adhd-evidence-links">{[...evidence,...extra].map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"><strong>{s.title}</strong><small>{s.source}</small><Icon name="external"/></a>)}</div><p>These are independent clinical and public-health resources. Classroom activities are supportive techniques, not an ADHD diagnosis or a substitute for individualized care.</p></section>;
}
function FamilyCTA({label='Talk about learning and attention'}:{label?:string}){return <div className="adhd-family-cta"><div><span className="eyebrow">A conversation can help</span><h2>Every child deserves to feel understood.</h2><p>Bring your child's school observations and your concerns to Dr Kanak's team at Mamta Hospital.</p></div><a className="button" href="/visit/">{label} <Icon name="arrow"/></a></div>;}

export function LearningHub(){
 return <div className="container adhd-landing">
  <div className="adhd-feature-hero">
   <div><span className="adhd-pill"><Icon name="heart"/> Attention, learning & childhood</span><h1>Different ways of learning.<br/><em>More ways to grow.</em></h1><p>Practical, encouraging ideas for families and teachers navigating attention, organisation, big feelings and classroom tasks.</p><div className="adhd-feature-actions"><a className="button" href="/learning-and-adhd/bright-minds/">Understand ADHD strengths <Icon name="arrow"/></a><a className="button outline" href="/learning-and-adhd/writing-at-school/">Try a writing plan <Icon name="book"/></a></div></div>
   <div className="adhd-hero-art"><ActivityVisual path="/learning-and-adhd/" variation={0}/></div>
  </div>
  <div className="adhd-route-grid">
   <a href="/learning-and-adhd/bright-minds/" className="adhd-route-card tone-sky"><span className="adhd-card-kicker"><Icon name="brain"/> Understanding attention</span><div className="adhd-card-photo"><ActivityVisual path="/learning-and-adhd/bright-minds/" variation={1}/></div><h3>Bright minds & ADHD</h3><p>Strengths, challenges, classroom routines, and ways to support self-regulation.</p><span>Explore the guide <Icon name="arrow"/></span></a>
   <a href="/learning-and-adhd/writing-at-school/" className="adhd-route-card tone-peach"><span className="adhd-card-kicker"><Icon name="book"/> Classroom toolkit</span><div className="adhd-card-photo"><ActivityVisual path="/learning-and-adhd/writing-at-school/" variation={2}/></div><h3>Writing one step at a time</h3><p>Five clear steps for starting writing, giving feedback and building confidence.</p><span>Explore the toolkit <Icon name="arrow"/></span></a>
  </div>
  <div className="adhd-focus-row"><div><Icon name="puzzle"/><strong>Understand what is hard</strong><span>Look beyond a single classroom moment</span></div><div><Icon name="heart"/><strong>Build a warm connection</strong><span>Encourage effort, not perfection</span></div><div><Icon name="calendar"/><strong>Agree on a small plan</strong><span>Parents, educators and clinicians working together</span></div></div>
  <FamilyCTA/>
  <EvidenceList/>
 </div>;
}

const brightActivities=[
 {n:'01',name:'Break one task into steps',tone:'sky',detail:'Use a 3-step checklist. Let the child tick off one achievable action at a time.'},
 {n:'02',name:'Make ideas visible',tone:'mint',detail:'Try mind maps, coloured notes and one key point per box instead of long instructions.'},
 {n:'03',name:'Practise starting and switching',tone:'peach',detail:'Use short planning games and a predictable countdown before changing activities.'},
 {n:'04',name:'Build connection and turns',tone:'lilac',detail:'Try cooperative games, gentle redirection and specific praise for turn-taking.'},
 {n:'05',name:'Make room to move',tone:'yellow',detail:'Offer a brief movement break when it helps the child return to learning.'}
];
export function BrightMinds(){
 return <div className="container adhd-detail">
  <div className="adhd-detail-top"><div><span className="adhd-pill"><Icon name="brain"/> Parent & teacher guide</span><h1>Bright minds can need support with attention.</h1><p>Children with strong reasoning skills can also experience ADHD. Let us recognise their strengths while giving them the structure and understanding they need.</p><div className="adhd-feature-actions"><a className="button" href="#the-poster">Explore the infographic <Icon name="down"/></a><a className="button outline" href="/learning-and-adhd/writing-at-school/">Writing support <Icon name="arrow"/></a></div></div><ActivityVisual path="/learning-and-adhd/bright-minds/" variation={3}/></div>
  <div className="adhd-clear-message"><Icon name="heart"/><p><strong>ADHD is not an IQ score.</strong> Children with ADHD have a wide range of intellectual abilities. Strengths or strong grades should never be used to dismiss difficulties at home, with friendships or at school.</p></div>
  <section className="adhd-resource-section"><span className="eyebrow">Try these learning activities</span><h2>Five gentle, practical starting points</h2><div className="adhd-strategy-grid">{brightActivities.map(a=><div className={`adhd-strategy tone-${a.tone}`} key={a.n}><span>{a.n}</span><h3>{a.name}</h3><p>{a.detail}</p></div>)}</div></section>
  <section className="adhd-resource-section"><span className="eyebrow">Working together</span><h2>Support works best when it fits the child</h2><div className="adhd-comparison-grid"><div><h3>For families</h3><p>Notice patterns in sleep, activity, frustration and learning. Praise a specific effort, choose one goal and share what works with school.</p></div><div><h3>For teachers</h3><p>Give clear, short instructions; offer an organisational tool and a movement break when needed; use constructive feedback with the child.</p></div><div><h3>For the care team</h3><p>Discuss the child's functioning across settings, coexisting concerns and whether assessment or an individual management plan may help.</p></div></div></section>
  <section id="the-poster" className="adhd-resource-section adhd-poster-section"><div className="adhd-section-bar"><div><span className="eyebrow">Your visual reference</span><h2>Supporting a child with ADHD</h2><p>Open the full graphic to read the activities and illustrative 40-minute classroom routine.</p></div><a className="button outline" href={graphics.bright} download>Save infographic <Icon name="down"/></a></div><ArtCard src={graphics.bright} alt="Detailed colourful infographic showing five attention support activities, five impulse-control activities, illustrative classroom routine and daily monitoring approach" label="ADHD support infographic"/></section>
  <div className="adhd-clear-message light"><Icon name="shield"/><p>The graphic's three-colour brain model is a teaching metaphor, not a literal map of separate brain systems. The classroom timings and scoring card are examples to adapt with the child and their educational team, not fixed medical targets.</p></div>
  <FamilyCTA/>
  <EvidenceList extra={[{title:'ADHD and high intellectual ability: research review',source:'Peer-reviewed research',url:'https://pubmed.ncbi.nlm.nih.gov/37929569/'}]}/>
 </div>;
}

const writingSteps=[
 {n:'1',title:'Make the first goal tiny',text:'Choose an achievable target such as three sentences instead of an entire paragraph.',icon:'sprout',tone:'sky'},
 {n:'2',title:'Show the steps clearly',text:'Use a written or picture-based checklist and point to one step at a time.',icon:'book',tone:'mint'},
 {n:'3',title:'Notice the effort immediately',text:'Give specific praise: “You started your first sentence and kept going.”',icon:'heart',tone:'lilac'},
 {n:'4',title:'Agree on a meaningful reward',text:'Use a simple, fair reward the child enjoys; do not remove already-earned rewards.',icon:'sun',tone:'peach'},
 {n:'5',title:'Reduce the writing load when needed',text:'Allow dictation, typing or a drawing first, gradually increasing independent writing.',icon:'puzzle',tone:'yellow'}
];
export function WritingSupport(){
 return <div className="container adhd-detail">
  <div className="adhd-writing-hero"><div><span className="adhd-pill"><Icon name="book"/> A classroom-friendly toolkit</span><h1>Help writing begin with one small win.</h1><p>Use clear steps, immediate encouragement and flexible ways of getting ideas onto the page.</p><div className="adhd-feature-actions"><a className="button" href="#practice-writing">Try the mini writing plan <Icon name="arrow"/></a><a className="button outline" href={graphics.writing} download>Save illustrated guide <Icon name="down"/></a></div></div><ActivityVisual path="/learning-and-adhd/writing-at-school/" variation={4}/></div>
  <section className="adhd-resource-section"><span className="eyebrow">A supportive five-step approach</span><h2>Small goals. Specific praise. Gradual progress.</h2><div className="adhd-writing-steps">{writingSteps.map(step=><div className={`adhd-writing-step tone-${step.tone}`} key={step.n}><span className="adhd-step-n">{step.n}</span><Icon name={step.icon}/><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
  <div id="practice-writing"><WritingPractice/></div>
  <section className="adhd-resource-section adhd-poster-section"><div className="adhd-section-bar"><div><span className="eyebrow">For home and school</span><h2>Keep the visual guide handy</h2><p>The poster includes an example three-sentence plan, encouraging feedback and alternative ways to complete work.</p></div><a className="button outline" href={graphics.writing} download>Save infographic <Icon name="down"/></a></div><ArtCard src={graphics.writing} alt="Detailed five-column visual positive reinforcement writing guide with a short goal, visible checklist, feedback, reward and writing accommodations" label="Writing support infographic"/></section>
  <div className="adhd-clear-message light"><Icon name="heart"/><p>These strategies can support learning, whether or not a child has a formal ADHD diagnosis. Praise should be respectful and individualized. An educator or clinician can adjust tasks and accommodations to the child's needs.</p></div>
  <FamilyCTA label="Plan a conversation"/>
  <EvidenceList/>
 </div>;
}

const vaccineQuestions=[
 {tag:'Recordkeeping',icon:'book',title:'What should we write on the vaccination card?',body:'Keep the date, vaccine name and brand, and ask the vaccinating team to record the batch or lot number and follow-up date. Record doses given at other clinics as well.',source:'Vaccination recordkeeping reference excerpt; India immunisation guidance.'},
 {tag:'Birth & prematurity',icon:'sprout',title:'Does a premature baby need a different discussion?',body:'Prematurity and low birth weight can change considerations for some vaccines, especially hepatitis B around birth and maternal hepatitis B status. The newborn team should review the individual situation and choose the schedule.',source:'Preterm infant and hepatitis B clinical reference excerpts.'},
 {tag:'Before the visit',icon:'shield',title:'What if there was a serious reaction to a previous dose?',body:'Tell the team about severe allergies, a serious earlier reaction, certain immune conditions, treatments and any current illness. The clinician checks true contraindications and precautions for that specific vaccine.',source:'General precautions and contraindications reference excerpt.'},
 {tag:'Polio',icon:'heart',title:'Why are polio drops and injections mentioned separately?',body:'Oral and injectable polio vaccines have different roles in immunisation programmes. A child’s records and the current Indian schedule determine the next appropriate discussion. Public campaigns may be separate from routine visits.',source:'Polio and supplementary immunisation reference excerpts.'},
 {tag:'Childhood vaccines',icon:'sun',title:'What about chickenpox, hepatitis A and pneumococcal vaccines?',body:'Some vaccines have additional considerations for children with particular health conditions or previous doses. The clinician can explain how these recommendations relate to the routine or individual schedule.',source:'Varicella, hepatitis A and high-risk pneumococcal reference excerpts.'},
 {tag:'Teens & families',icon:'puzzle',title:'Do vaccine conversations continue into teenage years or pregnancy?',body:'Yes. HPV guidance evolves, and vaccination during pregnancy can also protect families. Seek advice from the relevant clinician about current Indian recommendations and eligibility rather than relying on an older printed schedule.',source:'HPV and maternal Tdap clinical reference excerpts.'},
];
export function VaccinationLearning(){
 return <div className="container adhd-detail vax-learning-page">
  <div className="vax-learning-intro"><div><span className="adhd-pill"><Icon name="shield"/> Vaccination questions made clearer</span><h1>Good questions help you prepare for the next visit.</h1><p>From the baby’s first doses to school-age boosters and family questions, explore topics that often come up when reading a vaccination card.</p><div className="adhd-feature-actions"><a className="button" href="/vaccination/schedule/">Explore the age guide <Icon name="arrow"/></a><a className="button outline" href="/downloads/dr-kanak-family-vaccination-companion.pdf" download>Save family vaccine card <Icon name="down"/></a></div></div><div className="vax-learning-art"><Icon name="shield"/><span>Ask • Understand • Protect</span><span className="vax-learning-star">✦</span></div></div>
  <div className="adhd-resource-section"><span className="eyebrow">Questions families ask</span><h2>Find the topic that matters today.</h2><div className="vax-learning-topics">{vaccineQuestions.map((q,i)=><details key={q.title} className={`vax-learn-faq tone-${['sky','mint','peach','lilac','yellow','sky'][i]}`}><summary><span className="vax-learn-icon"><Icon name={q.icon}/></span><span><small>{q.tag}</small><strong>{q.title}</strong></span><span className="vax-learn-plus" aria-hidden="true">+</span></summary><div className="vax-learn-answer"><p>{q.body}</p></div></details>)}</div></div>
  <div className="adhd-clear-message light"><Icon name="shield"/><p>Your vaccination record should remain private. Bring the original card to the hospital rather than submitting identifiable clinical pages through a public form.</p></div>
  <section className="adhd-resource-section"><span className="eyebrow">Get ready for your visit</span><h2>Bring these three things</h2><div className="adhd-comparison-grid"><div><h3>Vaccination card</h3><p>Include entries from other clinics, school and public immunisation services.</p></div><div><h3>Important health details</h3><p>Tell the clinical team about previous reactions, medicines and relevant health conditions.</p></div><div><h3>Your next questions</h3><p>Confirm what was given, what was deferred and when to return.</p></div></div></section>
  <div className="vax-evidence-byline"><Icon name="book"/><span>These parent questions are informed by paediatric immunisation literature and current public-health guidance. Your child's vaccination records, individual health needs and current Indian recommendations guide clinical decisions.</span></div>
  <FamilyCTA label="Plan a vaccination review"/>
  <EvidenceList extra={[
   {title:'Routine Immunization Manual for Health Workers (2024)',source:'Ministry of Health & Family Welfare, India',url:'https://www.mohfw.gov.in/sites/default/files/Routine%20Immunization%20Manual%20For%20Health%20Workers.pdf'},
   {title:'Vaccination contraindications and precautions',source:'CDC',url:'https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html'},
   {title:'IAP immunisation guidance',source:'Indian Academy of Pediatrics',url:'https://acvip.org/professional/'}
  ]}/>
 </div>;
}
