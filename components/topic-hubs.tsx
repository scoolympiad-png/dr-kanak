import {Icon} from './icon';
import {ActivityVisual} from './activity-visual';

const autismReading=[
 {href:'/family-wellbeing/autism/',label:'Start here',title:'Understanding autism',text:'A kind introduction to communication, sensory differences, family support and individual strengths.',tone:'aqua'},
 {href:'/autism/assessment/',label:'Parent guide',title:'What happens during an autism assessment?',text:'Understand screening, specialist evaluation and helpful next steps for your child.',tone:'peach'},
 {href:'/autism/communication-support/',label:'Communication',title:'Every way of communicating matters',text:'Words, gestures, visual routines and AAC: practical ideas to support connection.',tone:'lilac'},
 {href:'/autism/sensory-needs/',label:'Sensory support',title:'Making sense of sensory needs',text:'Gentle ways to support comfort with sounds, textures, light and movement.',tone:'mint'},
 {href:'/autism/early-signs/',label:'Development',title:'Early signs & what to do',text:'Notice patterns, understand developmental screening and prepare for a discussion with your doctor.',tone:'peach'},
 {href:'/care/growth-development/',label:'Clinical guidance',title:'Growth & development visits',text:'Find a starting point for questions about play, communication, milestones and wellbeing.',tone:'lilac'},
 {href:'/family-wellbeing/stress/',label:'Wellbeing',title:'Calmer days for families',text:'Everyday ideas for emotional regulation, routines and connection.',tone:'mint'},
];
const vaccineReading=[
 {href:'/vaccination/schedule/',label:'Age guide',title:'Explore the age-based vaccine guide',text:'Understand the information on the clinic card and prepare your questions.',tone:'aqua'},
 {href:'/vaccination/catch-up/',label:'Missed visits',title:'What if a vaccination was missed?',text:'Bring your records to discuss an individual catch-up plan.',tone:'peach'},
 {href:'/vaccination/understanding-vaccines/',label:'Parent questions',title:'Understand the why and how',text:'Clear answers about records, precautions and childhood vaccines.',tone:'lilac'},
 {href:'/vaccination/after-care/',label:'After the visit',title:'Care after vaccination',text:'Everyday comfort and signs that deserve medical advice.',tone:'mint'}
];
function TopicCard({item}:{item:{href:string,label:string,title:string,text:string,tone:string}}){
 return <a className={'topic-hub-card '+item.tone} href={item.href}><div className="topic-hub-picture"><ActivityVisual path={item.href}/></div><div className="topic-hub-card-content"><span className="topic-hub-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><span className="topic-hub-link">Read the guide <Icon name="arrow"/></span></div></a>;
}
function Breadcrumb({links}:{links:{label:string,href:string}[]}){return <nav className="topic-breadcrumb" aria-label="Breadcrumb">{links.map((x,i)=><span key={x.href}><a href={x.href}>{x.label}</a>{i<links.length-1&&<Icon name="chevron-right"/>}</span>)}</nav>;}
function HubSource({items}:{items:{title:string,url:string}[]}){return <div className="topic-hub-sources"><span className="eyebrow">Further reading</span><h2>Reliable child-development resources</h2><div>{items.map(x=><a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer">{x.title} <Icon name="external"/></a>)}</div></div>;}
export function AutismTopicHub(){
 return <main className="container topic-hub">
  <Breadcrumb links={[{label:'Home',href:'/'},{label:'Parent library',href:'/parent-resources/'},{label:'Autism',href:'/autism/'}]}/>
  <header className="topic-hub-hero autism-hub-theme"><div><span className="topic-hub-eyebrow"><Icon name="heart"/> Understanding development</span><h1>Understanding autism, <em>together.</em></h1><p>Every child brings their own strengths, ways of communicating and support needs. Explore gentle, practical guidance for everyday family life.</p><div className="topic-hub-hero-actions"><a className="button" href="/family-wellbeing/autism/">Begin with autism basics <Icon name="arrow"/></a><a href="/autism/early-signs/" className="topic-hub-alt-link">Developmental questions <Icon name="arrow"/></a></div></div>
   <figure><ActivityVisual path="/autism/" variation={0}/></figure>
  </header>
  <section className="topic-hub-intro"><span className="eyebrow">A supportive place to begin</span><h2>Understanding creates space for confidence.</h2><p>Autism is a diverse neurodevelopmental condition. Families may notice differences in communication, interaction, interests or sensory experiences. Each child's needs and abilities are individual. A checklist or online article cannot diagnose autism.</p></section>
  <section className="topic-hub-section"><div className="topic-hub-section-heading"><div><span className="eyebrow">Your family resource library</span><h2>Choose what matters today.</h2></div><span className="topic-hub-count">{autismReading.length} helpful guides</span></div><div className="topic-hub-cards">{autismReading.map(x=><TopicCard key={x.href} item={x}/>)}</div></section>
  <section className="topic-hub-action-row"><div><Icon name="sprout"/><h3>Notice your child's strengths</h3><p>Support communication, comfort and meaningful participation.</p></div><div><Icon name="calendar"/><h3>Share what you've noticed</h3><p>Bring observations from home and school to a paediatric visit.</p></div><div><Icon name="heart"/><h3>Build a plan together</h3><p>Ask about developmental review and personalised support when appropriate.</p></div></section>
  <div className="topic-hub-visit"><div><span className="eyebrow">Care starts with a conversation</span><h2>Questions about your child's development?</h2><p>Dr Kanak's team can help you plan a visit at Mamta Hospital. Screening and evaluation should always be individual and clinician-led.</p></div><a className="button" href="/visit/">Plan a visit <Icon name="arrow"/></a></div>
  <HubSource items={[{title:'WHO: Autism',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'},{title:'CDC: Autism screening guidance',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'}]}/>
 </main>;
}
export function AutismEarlySigns(){
 const areas=[
 {title:'Communication',icon:'chat',text:'Differences in gestures, back-and-forth interactions or language development may lead families to ask questions.'},
 {title:'Play and connection',icon:'heart',text:'Children may show a different style of shared attention, social play or social interaction.'},
 {title:'Sensory experiences',icon:'sun',text:'Sounds, lights, textures or movement may be especially enjoyable or uncomfortable.'},
 {title:'Routines and interests',icon:'puzzle',text:'Repetitive movements, intense interests or difficulty with unexpected change can be part of the picture.'}
 ];
 return <main className="container topic-hub early-signs-page">
  <Breadcrumb links={[{label:'Home',href:'/'},{label:'Autism hub',href:'/autism/'},{label:'Early signs',href:'/autism/early-signs/'}]}/>
  <header className="topic-hub-hero early-theme"><div><span className="topic-hub-eyebrow"><Icon name="sprout"/> Developmental questions</span><h1>Noticing differences? <em>Start with understanding.</em></h1><p>Children develop at different rates. If something about your child's communication, play, sensory experiences or previously gained skills concerns you, a conversation with a paediatrician can help.</p><div className="topic-hub-hero-actions"><a href="#what-to-notice" className="button">Explore what to notice <Icon name="arrow"/></a><a href="/visit/" className="topic-hub-alt-link">Ask about a visit <Icon name="arrow"/></a></div></div><figure><ActivityVisual path="/autism/early-signs/" variation={1}/></figure></header>
  <section className="topic-hub-section" id="what-to-notice"><span className="eyebrow">Four areas families may notice</span><h2>Look for patterns, not labels.</h2><p className="topic-hub-lead">A few observations do not establish autism. What matters is the child's individual development and whether more assessment or support would be helpful.</p><div className="topic-hub-symptoms">{areas.map((x,i)=><article className={'topic-hub-symptom tone-'+i} key={x.title}><span><Icon name={x.icon}/></span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></section>
  <section className="topic-hub-screening"><div><span className="eyebrow">Screening & assessment</span><h2>When should you ask for screening?</h2><p>In AAP guidance referenced by the CDC, routine developmental screening is recommended at 9, 18 and 30 months, with autism-specific screening at 18 and 24 months. Concerns at any age deserve attention; you do not need to wait for a scheduled screening visit.</p><div className="topic-hub-checks"><span><Icon name="check"/> Bring examples from daily life</span><span><Icon name="check"/> Mention changes or lost skills</span><span><Icon name="check"/> Ask about further evaluation</span></div></div><figure><ActivityVisual path="/autism/early-signs/" variation={2}/></figure></section>
  <section className="topic-hub-section"><span className="eyebrow">A visit that feels useful</span><h2>Three things to prepare</h2><div className="topic-hub-action-row"><div><Icon name="book"/><h3>Write a short note</h3><p>What have you noticed, when did it start, and in which situations?</p></div><div><Icon name="chat"/><h3>Ask other caregivers</h3><p>Family and teachers may have helpful observations from different settings.</p></div><div><Icon name="heart"/><h3>Notice what goes well</h3><p>Include your child's interests, strengths and preferred ways of connecting.</p></div></div></section>
  <p className="topic-hub-safety"><Icon name="shield"/> Online tools and infographics cannot confirm or rule out autism. If your child loses previously acquired skills or you have a significant developmental concern, seek professional assessment.</p>
  <div className="topic-hub-visit"><div><span className="eyebrow">Child development care</span><h2>We can help you prepare for the next step.</h2><p>Learn more about developmental support or contact Mamta Hospital for an appointment enquiry.</p></div><a href="/visit/" className="button">Plan a conversation <Icon name="arrow"/></a></div>
  <HubSource items={[{title:'CDC: Signs and symptoms of autism',url:'https://www.cdc.gov/autism/signs-symptoms/'},{title:'CDC: Clinical screening for autism',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},{title:'WHO: Autism fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'}]}/>
 </main>;
}
export function VaccineHubDirectory(){return <section className="container vaccine-topic-directory" aria-label="Explore the vaccination resource hub"><div className="topic-hub-section-heading"><div><span className="eyebrow">Your vaccination resource hub</span><h2>Choose the next useful step.</h2><p>From first visits to missed doses and after-care, find practical guidance for your family.</p></div><a className="topic-hub-alt-link" href="/vaccination/schedule/">View the age guide <Icon name="arrow"/></a></div><div className="topic-hub-cards">{vaccineReading.map(x=><TopicCard key={x.href} item={x}/>)}</div></section>;}
export function HomepageHubShowcase(){
 const items=[
 {href:'/autism/',title:'Understanding autism',text:'Family support, early questions and strengths.',tone:'aqua',icon:'puzzle'},
 {href:'/vaccination/',title:'Vaccination & prevention',text:'Age guide, records and your next visit.',tone:'peach',icon:'shield'},
 {href:'/learning-and-adhd/',title:'ADHD & learning',text:'Attention, classroom strategies and writing support.',tone:'lilac',icon:'brain'},
 {href:'/family-wellbeing/stress/',title:'Family wellbeing',text:'Calm routines, emotional support and connection.',tone:'mint',icon:'heart'}
 ];
 return <section className="container homepage-hub-showcase" aria-labelledby="homepage-hub-heading"><div className="topic-hub-section-heading"><div><span className="eyebrow">Explore with Dr Kanak</span><h2 id="homepage-hub-heading">A world of care for growing children.</h2><p>Choose a topic that matters to your family, with illustrated guides and meaningful next steps.</p></div><a href="/parent-resources/" className="topic-hub-alt-link">Visit parent library <Icon name="arrow"/></a></div><div className="topic-hub-cards homepage-hub-cards">{items.map(x=><a className={'topic-hub-card '+x.tone} key={x.href} href={x.href}><div className="topic-hub-picture"><ActivityVisual path={x.href}/></div><div className="topic-hub-card-content"><span className="topic-hub-label"><Icon name={x.icon}/> Parent resource hub</span><h3>{x.title}</h3><p>{x.text}</p><span className="topic-hub-link">Explore this hub <Icon name="arrow"/></span></div></a>)}</div></section>;
}
