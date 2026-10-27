import {Icon} from './icon';

const stressArt=[
 {src:'/resources/stress-family-guide.webp',title:'Helping families manage stress',alt:'Colourful illustrated family stress guide with coping ideas, sleep, connection and emotional wellbeing'},
 {src:'/resources/stress-calm-down-steps.webp',title:'Quick calm-down steps',alt:'Colourful illustrated five-step calming plan showing pausing, gentle breathing, short breaks and movement'},
 {src:'/resources/stress-daily-wellness.webp',title:'A calmer day, step by step',alt:'Illustrated daily wellness plan with movement, relaxation, enjoyable activities and professional support'}
];
const autismArt=[
 {src:'/resources/autism-understanding.webp',title:'Understanding autism',alt:'Illustrated autism introduction with examples of communication, sensory and routine differences'},
 {src:'/resources/autism-family-support.webp',title:'How families can help',alt:'Illustrated support tips including visual cues, predictable routines, play and celebrating strengths'},
 {src:'/resources/autism-assessment-support.webp',title:'Assessment and supportive care',alt:'Illustration of developmental assessment and support options including speech and occupational therapies'},
 {src:'/resources/autism-complete-guide.webp',title:'Autism parent guide at a glance',alt:'Long illustrated autism guide combining characteristics, family strategies and professional support'}
];

function SourceLinks({items}:{items:{name:string,origin:string,url:string}[]}){
 return <section className="wellbeing-sources" aria-labelledby="reference-guidance-title">
  <span className="eyebrow">Trusted reading</span><h2 id="reference-guidance-title">Explore the research and guidance</h2>
  <div className="wellbeing-source-grid">{items.map(item=><a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"><span>{item.origin}</span><strong>{item.name}</strong><Icon name="external"/></a>)}</div>
 </section>;
}
function Poster({data,caption,id}:{data:{src:string,title:string,alt:string},caption?:string,id?:string}){
 return <details className="wellbeing-visual-reference" id={id}><summary><Icon name="book"/><span><strong>{data.title}</strong><small>Open or save the illustrated learning sheet</small></span><Icon name="chevron-down"/></summary><figure className="wellbeing-poster">
  <a href={data.src} target="_blank" rel="noopener noreferrer" aria-label={'View full-size '+data.title}><img src={data.src} alt={data.alt} loading="lazy" width="1200" height="900"/></a>
  <figcaption><div><strong>{data.title}</strong>{caption&&<span>{caption}</span>}</div><a download href={data.src}>Save infographic <Icon name="down"/></a></figcaption>
 </figure></details>;
}
function ParentCTA({text}:{text:string}){return <section className="wellbeing-end"><div><span className="eyebrow">Here for your family</span><h2>Every question deserves a thoughtful conversation.</h2><p>{text}</p></div><a className="button" href="/visit/">Plan a visit <Icon name="arrow"/></a></section>}
function Insight({icon,title,body,tone}:{icon:string,title:string,body:string,tone:string}){return <article className={'wellbeing-insight tone-'+tone}><span className="wellbeing-insight-icon"><Icon name={icon}/></span><h3>{title}</h3><p>{body}</p></article>}

export function FamilyStressGuide(){
 const calm=[
 {n:'01',label:'Pause gently',desc:'Count slowly or name the feeling before reacting.'},
 {n:'02',label:'Breathe comfortably',desc:'Try a few slow, relaxed breaths. Never force breath-holding.'},
 {n:'03',label:'Take a short break',desc:'A quieter space or a moment outdoors may help.'},
 {n:'04',label:'Make one small plan',desc:'Break a problem into its next manageable step.'},
 {n:'05',label:'Reconnect',desc:'Offer a listening ear, a cuddle if welcome, or a trusted person.'}
 ];
 return <main className="container wellbeing-page">
  <div className="wellbeing-hero stress-theme">
   <div><span className="wellbeing-kicker"><Icon name="heart"/> Family wellbeing</span>
    <h1>Calmer days begin with <em>little steps.</em></h1>
    <p>Stress visits every family. Discover everyday ways to help children feel heard, protect family routines and make space for small moments of calm.</p>
    <div className="wellbeing-hero-actions"><a className="button" href="#calm-steps">Try a calm-down plan <Icon name="arrow"/></a><a href="#family-gallery" className="button outline">See the picture guides <Icon name="down"/></a></div>
   </div>
   <div className="wellbeing-hero-visual"><img src="/images/illustrative-family-consultation.webp" alt="Illustrative pediatrician talking with a parent and child" width="1280" height="960" fetchPriority="high"/></div>
  </div>
  <section className="wellbeing-section">
    <span className="eyebrow">Start with understanding</span><h2>Notice stress. Make room for support.</h2>
    <p className="wellbeing-lead">Stress may show up as irritability, tiredness, tension, sleep changes, or trouble concentrating. A child may not always have the words to explain what is happening.</p>
    <div className="wellbeing-insight-grid">
     <Insight tone="pink" icon="heart" title="Listen without rushing" body="Offer a calm moment to share feelings, without immediately trying to fix everything."/>
     <Insight tone="blue" icon="sun" title="Move and play" body="A walk, outdoor play, or enjoyable movement can help everyone reset."/>
     <Insight tone="mint" icon="sprout" title="Protect routines" body="Regular sleep and predictable daily rhythms help children feel secure."/>
     <Insight tone="lavender" icon="chat" title="Stay connected" body="Talk to trusted family, friends, teachers or care professionals when needed."/>
    </div>
  </section>
  <section className="wellbeing-section" id="calm-steps">
    <div className="wellbeing-section-header"><div><span className="eyebrow">For those big-feeling moments</span><h2>Five small steps to try together.</h2><p>Adapt each step for your child’s age, comfort and sensory needs. The goal is connection, not instant perfect behaviour.</p></div></div>
    <div className="wellbeing-split"><div className="wellbeing-steps">{calm.map(s=><div key={s.n}><span>{s.n}</span><div><strong>{s.label}</strong><p>{s.desc}</p></div></div>)}</div><Poster data={stressArt[1]} caption="Illustrated ideas for home and school."/></div>
  </section>
  <section className="wellbeing-section">
    <span className="eyebrow">A family rhythm</span><h2>Build a gentler daily routine.</h2>
    <div className="wellbeing-insight-grid">
     <Insight tone="mint" icon="sun" title="Enjoy some movement" body="Choose play or activity that suits your child and feels enjoyable."/>
     <Insight tone="blue" icon="heart" title="Practise a calming habit" body="Try quiet time, mindful noticing, gentle breathing or a soothing story."/>
     <Insight tone="lavender" icon="chat" title="Make time together" body="A shared meal, conversation or play can strengthen connection."/>
     <Insight tone="yellow" icon="book" title="Keep room for joy" body="Music, art, reading, games or nature can create a helpful daily pause."/>
    </div>
    <div className="wellbeing-split wellbeing-second-visual"><Poster data={stressArt[2]} caption="A flexible visual reminder; minutes shown are examples, not a prescription."/><div className="wellbeing-sleep"><span className="eyebrow">Sleep matters at every age</span><h3>Children need more sleep than adults.</h3><p>The American Heart Association’s 7–9-hour guidance applies to adults. Children’s needs vary by age:</p><ul><li><strong>3–5 years:</strong> 10–13 hours each day (including naps)</li><li><strong>6–12 years:</strong> 9–12 hours</li><li><strong>13–17 years:</strong> 8–10 hours</li></ul><p>Build a regular bedtime routine and discuss persistent sleep difficulties with your child’s doctor.</p></div></div>
  </section>
  <section className="wellbeing-section" id="family-gallery"><span className="eyebrow">Keep it handy</span><h2>Family stress: the big picture</h2><p className="wellbeing-lead">Use this illustrated summary to start a conversation. The 7–9-hour sleep recommendation printed inside this particular graphic is for adults, not children. For your child, follow the age-specific sleep guidance above.</p><Poster data={stressArt[0]} caption="Save or share with family. Illustrations are educational, not personalised medical advice."/></section>
  <div className="wellbeing-note"><Icon name="shield"/><p><strong>When to ask for help:</strong> If stress is persistent, affects school or relationships, disrupts sleep, or feels overwhelming, contact a qualified healthcare professional. Adults should not change prescribed medicines without medical advice. These tools support wellbeing but do not replace treatment.</p></div>
  <ParentCTA text="Speak with Dr Kanak’s team if stress, sleep or emotional wellbeing is troubling your child or family."/>
  <SourceLinks items={[
   {origin:'American Heart Association',name:'Stress management and heart health',url:'https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management'},
   {origin:'American Heart Association',name:'Three tips for managing stress',url:'https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management/3-tips-to-manage-stress'},
   {origin:'CDC',name:'Recommended sleep by age',url:'https://www.cdc.gov/sleep/about/'}
  ]}/>
 </main>;
}
export function AutismFamilyGuide(){
 const support=[
  {icon:'calendar',label:'Routines that make sense',body:'Show what comes next with pictures, simple schedules or predictable transitions.',tone:'blue'},
  {icon:'book',label:'Visual and clear communication',body:'Use short directions, pictures or a preferred communication method. Give time to respond.',tone:'yellow'},
  {icon:'heart',label:'Sensory comfort',body:'Notice sounds, lights, textures and environments your child finds overwhelming or reassuring.',tone:'mint'},
  {icon:'puzzle',label:'Follow their interests',body:'Make learning and shared activities meaningful by starting with things your child enjoys.',tone:'lavender'},
  {icon:'sprout',label:'Make space for play',body:'Connect through play at your child’s pace, without forcing eye contact or social behaviour.',tone:'pink'},
  {icon:'sun',label:'Celebrate strengths',body:'Notice what brings your child joy, pride and confidence while supporting areas of need.',tone:'blue'}
 ];
 return <main className="container wellbeing-page">
  <div className="wellbeing-hero autism-theme"><div>
   <span className="wellbeing-kicker"><Icon name="heart"/> Development & understanding</span>
   <h1>Every child connects with the world <em>in their own way.</em></h1>
   <p>Explore autism with curiosity, respect and practical ideas for family life. Early understanding helps caregivers recognise needs and build on each child’s strengths.</p>
   <div className="wellbeing-hero-actions"><a className="button" href="#autism-support">Explore family support <Icon name="arrow"/></a><a href="#autism-assessment" className="button outline">When to seek assessment <Icon name="down"/></a></div>
  </div><div className="wellbeing-hero-visual"><img src="/images/illustrative-play-consultation.webp" alt="Illustrative pediatrician using play-based activities with parent and child" width="1280" height="960" fetchPriority="high"/></div></div>
  <section className="wellbeing-section"><span className="eyebrow">Every child is unique</span><h2>What is autism?</h2>
   <p className="wellbeing-lead">Autism is a neurodevelopmental condition. Autistic children may communicate, interact, learn, move or experience sensory surroundings differently. They have varied strengths, preferences and support needs, which can change over time.</p>
   <div className="wellbeing-insight-grid">
    <Insight tone="blue" icon="chat" title="Communication" body="A child may communicate differently through speech, gestures, pictures or other ways."/>
    <Insight tone="peach" icon="heart" title="Social connection" body="Children connect and express affection in different ways, including their own preferred styles."/>
    <Insight tone="mint" icon="puzzle" title="Sensory experiences" body="Some sounds, lights, textures or crowds may feel unusually intense or comforting."/>
    <Insight tone="lavender" icon="calendar" title="Patterns and interests" body="Repetition, predictable routines and focused interests can be an important part of daily life."/>
   </div>
   <p className="wellbeing-inline-tip"><Icon name="heart"/> One trait alone does not diagnose autism. If you have concerns, talk with your child's paediatrician.</p>
   <Poster data={autismArt[0]} caption="A visual introduction to different developmental experiences."/>
  </section>
  <section className="wellbeing-section" id="autism-support"><span className="eyebrow">Practical ideas for home</span><h2>Six ways to make everyday life more supportive.</h2>
   <div className="wellbeing-insight-grid">{support.map(x=><Insight key={x.label} {...x} title={x.label}/>)}</div>
   <div className="wellbeing-split wellbeing-poster-row"><div><h3>Small adjustments can make room for confidence.</h3><p>Visual supports, flexible routines, preferred interests, communication tools and sensory accommodations may help. Work with your child's team to choose an approach that respects their autonomy and comfort.</p><a className="wellbeing-text-link" href="/learning-and-adhd/">Explore attention & learning guides <Icon name="arrow"/></a></div><Poster data={autismArt[1]} caption="Everyday family strategies, illustrated."/></div>
  </section>
  <section className="wellbeing-section" id="autism-assessment"><span className="eyebrow">Early conversations matter</span><h2>When should families seek assessment?</h2>
   <p className="wellbeing-lead">Speak with your child's doctor if you notice persistent concerns about communication, social interaction, play, behaviour, sensory experiences, or loss of previously acquired skills. You do not need to wait for a particular age to raise a concern.</p>
   <div className="wellbeing-step-band"><div><strong>Observe</strong><p>Note examples, strengths and changes over time.</p></div><div><strong>Discuss</strong><p>Share what you see at home, nursery or school with a paediatrician.</p></div><div><strong>Explore support</strong><p>Ask whether developmental assessment or referral would be helpful.</p></div></div>
   <div className="wellbeing-split wellbeing-poster-row"><Poster data={autismArt[2]} caption="A look at professional assessment and support options."/><div className="wellbeing-sleep"><span className="eyebrow">Helpful to know</span><h3>Developmental screening is not a diagnosis.</h3><p>American Academy of Pediatrics recommendations cited by CDC include autism screening during well-child visits at 18 and 24 months. Children with concerns can be assessed at other ages too.</p><p>Individual support might involve developmental evaluation, communication support, occupational therapy, family coaching or school accommodations, as clinically appropriate.</p><p>Autism is not caused by parenting style, and support should focus on quality of life and meaningful participation.</p></div></div>
  </section>
  <section className="wellbeing-section"><span className="eyebrow">A visual guide to revisit</span><h2>Understanding, support and strengths—together.</h2><Poster data={autismArt[3]} caption="Full illustrated overview for families. Open or save the image for later."/></section>
  <div className="wellbeing-note"><Icon name="shield"/><p>These illustrations are learning aids, not photographs of an actual patient or a diagnostic checklist. A qualified clinician can help understand your child’s individual development. Support should be collaborative, respectful and tailored to the child.</p></div>
  <ParentCTA text="If you are noticing developmental differences, bring your observations and questions to a child-health consultation."/>
  <SourceLinks items={[
   {origin:'World Health Organization',name:'Autism: key facts and supportive care',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'},
   {origin:'CDC',name:'Clinical screening for autism',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},
   {origin:'CDC',name:'Screening and diagnosis',url:'https://www.cdc.gov/autism/diagnosis/'}
  ]}/>
 </main>;
}
