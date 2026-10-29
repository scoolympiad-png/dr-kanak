import {ages,careAreas,sources,site,type PageData} from './site-config';
import {stageContent,careContent} from './stage-content';

const visit = '/visit/';
const make = (path:string,title:string,summary:string,sections:PageData['sections'],extra:Partial<PageData>={}):PageData => ({path,title,summary,sections,...extra});

export const corePages:PageData[] = [
  {path:'/',title:'Paediatric care for every stage of childhood',summary:'Meet Dr Kanak Ramnani at Mamta Hospital, Raipur. Explore child health, growth, vaccination and practical parent resources.',kind:'home'},
  {path:'/about/',title:'Meet Dr Kanak Ramnani',eyebrow:'Your child’s doctor',summary:'Paediatrics, child development and neurological concerns at Mamta Super Speciality Hospital, Raipur.',kind:'about',image:'/images/dr-kanak-clinic.webp',sections:[
    {heading:'Qualifications and clinical interests',paragraphs:['Mamta Hospital lists Dr Kanak Ramnani as a consultant paediatrician with MBBS and DNB Pediatrics (Gold Medalist), and fellowship training in Pediatric Epilepsy & Neurology. Her published profile also records an Associate Professor role.','Her documented areas of care include newborn follow-up, child development, vaccination, nutrition and neurological concerns. A consultation helps the clinical team assess your child’s needs and decide on further review or referral.']},
    {heading:'Preparing for your time together',paragraphs:['Parents notice the everyday details that matter: a feeding change, a new skill, a disrupted night or a worry from school. Write down your main questions and bring your child’s existing records.','Ask the team about the next step, what to watch for at home and when to return. Confirm current consultation availability and fees with the hospital before travelling.']},
  ],sources:[{title:'Mamta Hospital official doctor profile',url:site.doctorUrl}],related:['/care/','/care-by-age/','/media/','/research/',visit]},
  {path:'/care/',title:'Care for children and families',eyebrow:'Children’s care',summary:'Find the visit that fits your child’s needs. The hospital team can help you choose a starting point.',kind:'careHub'},
  {path:'/care-by-age/',title:'Every stage brings something new',eyebrow:'Growing together',summary:'Start with your child’s age. Find practical guidance, questions for your next visit and connected care resources.',kind:'ageHub'},
  {path:'/vaccination/',title:'A little planning for lasting protection',eyebrow:'Vaccination & immunisation',summary:'Understand your child’s vaccination record, prepare for a visit and ask about missed or upcoming doses.',kind:'vaccination',related:['/vaccination/schedule/','/vaccination/catch-up/','/vaccination/after-care/','/vaccination/faq/','/vaccination/teen-hpv/'],sources:[sources.vaccines,sources.uWin]},
  make('/vaccination/schedule/','Your child’s vaccination journey','A colourful age-wise guide to help you understand the card and prepare for your next visit.',[
    {heading:'Why timing matters',paragraphs:['Vaccines are planned at particular ages because protection is most useful before children are exposed to serious infections. Following the schedule helps avoid unnecessary gaps in protection.','The right plan depends on your child’s previous doses, health and the specific vaccine products used. Your paediatrician can help you make sense of the record.']},
    {heading:'Make the most of your vaccination card',paragraphs:['Bring the original card and records from every clinic your child has visited. Check that dates and vaccine names are clearly entered after each appointment.','Some combination vaccines protect against several infections in one injection. The vaccine names shown in an age guide are not necessarily a count of injections.']},
    {heading:'Every child’s plan is personal',paragraphs:['India’s public immunisation programme and the Indian Academy of Pediatrics provide useful guidance for different care settings. Some vaccine recommendations vary by location, child’s health and earlier records.','If you have missed a visit, there is no need to guess what comes next. Bring the records to the care team, who can help with an appropriate catch-up plan.']},
  ],{sources:[sources.vaccines,sources.vaccineUpdate,sources.uWin],related:['/vaccination/catch-up/','/vaccination/after-care/','/vaccination/faq/',visit]}),
  make('/vaccination/catch-up/','Missed a vaccination visit? Bring the record.','A delayed or uncertain history deserves a careful review, without blame.',[
    {heading:'Start with the evidence you have',paragraphs:['Bring all vaccination cards, discharge papers and records from other clinics. If an entry is unclear, keep the original photo or document. Do not guess a vaccine name from an abbreviation.','Tell the clinician about the child’s health, allergies and any past reaction. If records are missing, the team will decide how best to verify the history and plan the next steps.']},
    {heading:'A plan built around your child',paragraphs:['The clinician considers age, previous doses, intervals and product guidance. A catch-up plan may differ from a routine age table. Do not restart, add or omit doses based on a website calculation.','Before leaving, ask for a written plan and the next visit date. If the child is vaccinated elsewhere, share that record so future reminders match the updated history.']},
  ],{sources:[sources.vaccines,sources.iap],related:['/vaccination/schedule/','/vaccination/faq/',visit]}),
  make('/vaccination/after-care/','After the vaccination visit','Know the advice for your child, the signs that need help and the next planned visit.',[
    {heading:'Before you leave the clinic',paragraphs:['Ask the vaccinating team how long to remain for observation and what to expect for the particular vaccine. Check that the card records the dose and date.','Ask whom to contact if you are worried and when the next visit is due. Follow the clinician’s instructions for your child; medicine and dose advice should come from the treating team.']},
    {heading:'When to seek help',paragraphs:['If your child develops breathing difficulty, facial or throat swelling, collapse, unresponsiveness or another severe reaction, seek emergency help immediately. Do not wait for a chat reply.','Contact the clinical team if symptoms worry you or the child seems increasingly unwell. Tell them what vaccine was given and when. Report concerns even when you are unsure whether they are related.']},
    {heading:'Keep the record together',paragraphs:['Take the updated card home and save a clear copy. If an appointment changes or a dose is deferred, confirm the revised plan with the clinic. A reminder supports the plan but does not replace clinical advice.']},
  ],{sources:[sources.iap,sources.vaccines],related:['/emergency/','/vaccination/faq/',visit]}),
  make('/vaccination/teen-hpv/','Vaccination in the teenage years','Protection and record review continue as children grow older.',[
    {heading:'Review the whole history',paragraphs:['Bring earlier cards to an adolescent visit, including doses given at school or another clinic. Ask the clinician about the vaccines relevant to your child’s age, history and health.','HPV vaccination guidance has changed. The current IAP recommendations include an updated approach for eligible immunocompetent girls. Age, product and individual circumstances must be reviewed by the clinician.']},
    {heading:'Understand the public programme',paragraphs:['The Government of India launched a voluntary, free, single-dose HPV vaccination programme for 14-year-old girls at government health facilities in February 2026. Confirm current eligibility and local access through official programme information.','That public programme is separate from a private hospital consultation. Please ask Mamta about its current services and charges; this website does not claim that the government programme is offered at Mamta.']},
  ],{sources:[sources.vaccineUpdate,sources.hpv],related:['/care-by-age/adolescent/','/care/adolescent-health/','/vaccination/schedule/',visit]}),
  {path:'/vaccination/faq/',title:'Vaccination questions parents ask',eyebrow:'A clearer next step',summary:'Use these questions to prepare for a conversation with the clinical team.',kind:'faq',faqs:[
    {q:'What should I bring to a vaccination visit?',a:'Bring every available vaccination card, previous dose records, discharge papers and the child’s current medicine list. Ask the team to reconcile entries from different clinics.'},
    {q:'What if a dose is overdue?',a:'Arrange a review with the child’s records. The clinician will consider the history and the appropriate interval and product guidance before planning the next dose.'},
    {q:'Can I use a date-of-birth calculator as my child’s plan?',a:'An age table can explain a general schedule. A personalised plan also needs the actual dose history and clinical assessment.'},
    {q:'Does an appointment request confirm the vaccine is available?',a:'Please ask the hospital team to confirm the appointment, vaccine availability and charges. A request is not a confirmed slot.'},
    {q:'How can I ask about vaccination reminders?',a:'Contact Mamta to ask about care-plan enrolment and currently available reminder channels. A clinician-reviewed record and guardian consent are needed before personalised reminders can begin.'},
    {q:'What if the child was vaccinated elsewhere?',a:'Share the other clinic’s record so the clinical team can review and update the history before arranging further reminders or doses.'},
  ],sources:[sources.vaccines,sources.uWin],related:['/vaccination/catch-up/','/vaccination/after-care/',visit]},
  {path:'/parent-resources/',title:'A little clarity for everyday parenting',eyebrow:'The parent library',summary:'Practical, source-based guidance to help you understand your child and prepare useful questions for a visit.',kind:'resourceHub'},
  {path:'/resources/',title:'Trusted child-health resources',eyebrow:'Learn with confidence',summary:'Explore established professional and public-health resources. Indian vaccination decisions should follow the child’s clinician and current local guidance.',kind:'trusted'},
  {path:'/media/',title:'Watch, listen and learn',eyebrow:'Media & parent education',summary:'Explore Dr Kanak’s verified health talk and trusted learning resources for your family.',kind:'videos'},
  {path:'/care-at-mamta/',title:'A hospital team beside your family',eyebrow:'Mamta Super Speciality Hospital',summary:'Find Dr Kanak at Mamta in Mowa, Raipur. Meet the setting for your child’s consultation and connect with the hospital team.',kind:'hospital'},
  make('/research/','Research and academic work','Explore selected co-authored publications and the original journal records.',[
    {heading:'Multisystem inflammatory syndrome in children',paragraphs:['A 2026 observational paper describes the clinical profile and outcomes of children with MIS-C associated with COVID-19 at a private hospital in Raipur. Dr Kanak Ramnani is listed among its authors.','This is an academic report of a particular group of patients. It does not predict an individual child’s outcome or provide a home-care protocol.']},
    {heading:'Hyponatremia in critically ill children',paragraphs:['Dr Kanak Ramnani is a co-author of research on hyponatremia in mechanically ventilated children, published in the International Journal of Contemporary Pediatrics in 2016. The journal record links to the original paper.','The papers below are professional references. The parent library presents general education in a different format and does not claim that its articles have been written or clinically reviewed by Dr Kanak.']},
    {heading:'Teaching and clinical practice',paragraphs:['An official Department of Pediatrics faculty roster lists Dr Kanak Ramnani as an Associate Professor. The roster and hospital profile can be checked through the original sources below.']},
  ],{sources:[{title:'MIS-C study — original journal PDF',url:'https://www.medtextpublications.com/open-access/covid-19-is-it-really-over-to-study-clinical-profile-and-1856.pdf'},{title:'Hyponatremia — journal record',url:'https://www.ijpediatrics.com/index.php/ijcp/article/view/7'},{title:'Official paediatrics faculty roster',url:'https://ptjnmcraipur.in/nmc/faculty/Pedia_Faculty.pdf'}],related:['/about/','/media/','/parent-resources/']}),
  make('/terms/','Using this website','Information to help families learn and prepare for care.',[
    {heading:'General educational information',paragraphs:['The public pages provide general information. They cannot examine a child, establish a diagnosis, prescribe medicines or approve an individual vaccination schedule. Contact the treating clinical team for personal advice.','If a child has a severe or rapidly worsening problem, seek urgent medical care. Do not wait for a website response.']},
    {heading:'Visits and external services',paragraphs:['An appointment enquiry is a request. The hospital confirms availability, fees, vaccine availability and the actual consultation time. External resources and communication services have their own terms and privacy policies.','Personal records and reminder enrolment require the hospital’s authorised care service and verified guardian access. The public website does not create or complete a vaccination record.']},
    {heading:'Content and corrections',paragraphs:['Hospital and doctor photographs belong to their respective owners. Parent guides are original educational summaries with source links. Please contact Mamta if you notice an error or need assistance with a page.']},
  ],{related:['/privacy/','/consent/','/visit/']}),
  {path:'/videos/',title:'Watch, listen and learn',eyebrow:'Parent education',summary:'A health talk from Dr Kanak and useful educational resources to explore at your own pace.',kind:'videos'},
  {path:visit,title:'Plan a visit to Mamta',eyebrow:'Appointments & directions',summary:'Bring your questions. Keep your child’s records ready. Contact the team to confirm Dr Kanak’s availability and consultation details.',kind:'visit'},
  {path:'/emergency/',title:'When care cannot wait',eyebrow:'Urgent help',summary:'For a severe or rapidly worsening problem, seek immediate emergency care. Do not wait for an online response.',kind:'emergency',image:'/images/mamta-emergency.webp',sections:[
    {heading:'Get urgent medical help',paragraphs:['Breathing difficulty, blue or grey lips, unresponsiveness, a first or prolonged seizure, serious injury, or a child who is rapidly becoming more unwell need urgent assessment. This list is not exhaustive.','If you believe your child is seriously ill, use the nearest appropriate emergency service. Mamta publishes a 24-hour emergency contact and ambulance number below.']},
    {heading:'Share useful information',paragraphs:['Tell the emergency team the child’s age, what happened, the symptoms and when they began. Bring medicines and available records if they are immediately at hand, without delaying help.']},
  ],sources:[sources.iap],related:['/parent-resources/fever/','/parent-resources/seizure-first-aid/',visit]},
  make('/privacy/','Your family’s information','Understand what this website does and how to seek help with your information.',[
    {heading:'Public browsing',paragraphs:['You can read the parent resources without providing a child’s name, date of birth or medical history. This release does not use advertising pixels or marketing analytics. Essential hosting security logs may be processed by the hosting provider.','External sites, maps and videos have their own privacy policies. They open only when selected.']},
    {heading:'Contact requests',paragraphs:['When an online callback form is available, it asks for an adult contact name, phone number, enquiry category and consent to a reply. Do not submit a child’s medical history or clinical documents through a general contact request.','Contact details are sent to the configured hospital enquiry service, not stored in the browser. Ask Mamta about access, correction or deletion requests and its record-retention process.']},
    {heading:'Private child records',paragraphs:['Clinical records and reminder preferences belong in the hospital’s authorised care system, with verified guardian access. This public website does not create a clinical record or prescribe a vaccination plan.','For privacy enquiries, contact the hospital through the verified contact page.']},
  ],{related:['/consent/',site.contactUrl]}),
  make('/consent/','Choose how the care team contacts you','A contact request, a clinical care plan and marketing are different choices.',[
    {heading:'Consent for a reply',paragraphs:['If you ask for a callback, you agree that Mamta may contact you about that request. You can instead call the appointment desk without submitting an online form.']},
    {heading:'Personalised care reminders',paragraphs:['Ask the clinic about available reminder services. Before a personalised vaccination plan is activated, the clinical team must review the history and verify the guardian’s access.','Choose the communication channels and language that suit your family. Ask how to change the contact number, pause reminders or withdraw consent. A request to receive care reminders does not enrol you in advertising.']},
    {heading:'A reminder is one part of care',paragraphs:['If a visit is rescheduled, a dose is deferred or a vaccine is given elsewhere, tell the clinical team so the plan can be reviewed. Do not rely on an old message as the current plan.']},
  ],{related:['/privacy/','/vaccination/',visit]}),
  make('/accessibility/','A website that is easier to use','Clear navigation, readable text and help when you need it.',[
    {heading:'Reading and navigation',paragraphs:['Use your browser’s zoom and keyboard navigation. Links and buttons have visible focus indicators. The navigation, search and parent resources are designed for smaller screens as well as desktop.','Animations respect reduced-motion preferences. Images have text descriptions and information is not conveyed by colour alone.']},
    {heading:'English and Hindi help',paragraphs:['The main resource library is currently in English. A Hindi introduction and visit guide are available from the हिन्दी सहायता link. You can ask the hospital team about language support for your visit.','If a page or control is difficult to use, call the appointment desk or use the hospital contact page.']},
  ],{related:['/hi/',visit]}),
  {path:'/search/',title:'Find guidance for your family',summary:'Search the public parent library by topic, age or care need. Please keep private medical details out of a search query.',kind:'search',noindex:true},
  ...['','vaccination-card/','reminders/','records/','preferences/'].map((suffix):PageData=>({path:'/my-child/'+suffix,title:suffix==='vaccination-card/'?'Your child’s vaccination record':suffix==='reminders/'?'Care reminders':suffix==='records/'?'Your child’s records':suffix==='preferences/'?'Contact and reminder preferences':'Your child’s care',summary:'Personalised care starts with a verified family record and a plan reviewed by the clinical team.',kind:'portal',noindex:true})),
  {path:'/hi/',title:'बचपन के हर पड़ाव पर देखभाल',eyebrow:'डॉ कनक रामनानी · बाल रोग विशेषज्ञ',summary:'ममता सुपर स्पेशलिटी हॉस्पिटल, रायपुर में बच्चों की देखभाल और माता-पिता के लिए सरल जानकारी।',kind:'hindi'},
];

for (const a of ages) corePages.push(make('/care-by-age/'+a.slug+'/',a.name+': growing with care',a.summary,[
  ...stageContent[a.slug],
  {heading:'What matters at this stage',paragraphs:[`This guide focuses on ${a.age.toLowerCase()}. Start with the everyday questions that matter to your family: ${a.topics.map(t=>t.toLowerCase()).join(', ')}.`,`Every child has an individual history. A public age guide helps you prepare questions; it cannot determine whether a particular child is developing normally or which treatment is needed.`]},
  {heading:'Notice the pattern over time',paragraphs:['Keep a note of feeding, sleep, play and concerns that you would like to discuss. Previous measurements and the dates of changes are often more useful than a single number or a comparison with another child.','If a child loses skills they previously had, seems unwell or you have a concern, contact the clinical team. A milestone checklist is a conversation aid rather than a diagnosis.']},
  {heading:'Make the next visit useful',paragraphs:['Bring the vaccination card, previous prescriptions and relevant reports. Write down two or three questions. Ask about follow-up and what should prompt an earlier review.','For older children and adolescents, ask the appointment team to confirm the age range accepted by the clinic and the appropriate consultation.']},
],{eyebrow:a.age,icon:a.icon,sources:[sources.iap,sources.milestones,sources.feeding,sources.sleep],related:[a.care,'/parent-resources/'+a.guide+'/','/vaccination/',visit]}));

for (const c of careAreas) corePages.push(make('/care/'+c.slug+'/',c.title,c.summary,[
  ...careContent[c.slug],
  {heading:'A place to start the conversation',paragraphs:[`A ${c.title.toLowerCase()} consultation begins with your child’s history and the concerns you want to discuss. The clinical team can decide whether examination, monitoring, further assessment or referral is appropriate.`,`Bring earlier notes and test results rather than repeating tests just to prepare for a visit. Tell the team about medicines, allergies and care received elsewhere.`]},
  {heading:'Questions worth bringing',paragraphs:['What might explain the concern? What needs checking now? What should we watch for at home? When should we return, and whom should we contact if things change?','Ask the hospital to confirm current availability and fees before travelling. An online request does not confirm a consultation time.']},
  {heading:'Connected care at Mamta',paragraphs:['The personal website helps you prepare and find the next step. The hospital team handles appointment availability and coordination with other services when required. A care plan should come from a consultation with the treating clinician.']},
],{eyebrow:'Children’s care',icon:c.icon,related:['/care-by-age/','/vaccination/',c.slug==='paediatric-neurology'?'/parent-resources/seizure-first-aid/':'/parent-resources/',visit]}));

/* Original parent-facing learning guides, based on user-supplied infographics
   and independently verified ADHD clinical/public health guidance. */
corePages.push(
 {path:'/learning-and-adhd/',title:'Understanding ADHD, attention and learning',eyebrow:'For parents & teachers',summary:'Helpful strategies for bright minds, focus, classroom routines and writing confidence.',kind:'learningHub',related:['/learning-and-adhd/bright-minds/','/learning-and-adhd/writing-at-school/','/care/paediatric-neurology/','/visit/']},
 {path:'/learning-and-adhd/bright-minds/',title:'Bright minds, different ways to learn',eyebrow:'ADHD & learning support',summary:'Strength-based parenting and classroom activities for children who need help with attention, planning or impulse control.',kind:'adhdBright',sources:[
  {title:'CDC: ADHD in the classroom',url:'https://www.cdc.gov/adhd/treatment/classroom.html'},
  {title:'IAP ADHD clinical consensus',url:'https://pubmed.ncbi.nlm.nih.gov/28368271/'},
  {title:'ADHD and high intellectual ability systematic review',url:'https://pubmed.ncbi.nlm.nih.gov/37929569/'}
 ],related:['/learning-and-adhd/writing-at-school/','/learning-and-adhd/','/care/paediatric-neurology/','/visit/']},
 {path:'/learning-and-adhd/writing-at-school/',title:'Helping children start and finish writing',eyebrow:'Positive classroom support',summary:'A clear five-step writing activity using small goals, visual checklists, constructive praise and gradual independence.',kind:'adhdWriting',sources:[
  {title:'CDC: ADHD classroom support',url:'https://www.cdc.gov/adhd/treatment/classroom.html'},
  {title:'AAP: ADHD clinical practice guideline',url:'https://publications.aap.org/pediatrics/article/144/4/e20192528/81572/Clinical-Practice-Guideline-for-the-Diagnosis'},
  {title:'IAP ADHD clinical consensus',url:'https://pubmed.ncbi.nlm.nih.gov/28368271/'}
 ],related:['/learning-and-adhd/bright-minds/','/learning-and-adhd/','/care/growth-development/','/visit/']},
 {path:'/vaccination/understanding-vaccines/',title:'Vaccination questions made clearer',eyebrow:'A helpful guide for families',summary:'Understand vaccination records, preterm baby discussions, polio, precautions, childhood and adolescent vaccines.',kind:'vaccineLearning',sources:[
  {title:'Indian Ministry of Health immunisation manual (2024)',url:'https://www.mohfw.gov.in/sites/default/files/Routine%20Immunization%20Manual%20For%20Health%20Workers.pdf'},
  {title:'CDC: vaccine precautions and contraindications',url:'https://www.cdc.gov/vaccines/hcp/imz-best-practices/contraindications-precautions.html'},
  {title:'IAP immunisation guidance',url:'https://acvip.org/professional/'}
 ],related:['/vaccination/schedule/','/vaccination/catch-up/','/vaccination/teen-hpv/','/visit/']}
);
for(const target of ['/care/paediatric-neurology/','/care/growth-development/','/parent-resources/','/vaccination/','/vaccination/schedule/','/vaccination/faq/']){
 const page=corePages.find(item=>item.path===target);
 if(!page)continue;
 const additional=target.startsWith('/vaccination/')?'/vaccination/understanding-vaccines/':'/learning-and-adhd/';
 if(!page.related?.includes(additional))page.related=[...(page.related||[]),additional];
}

/* Topic hub architecture: stable guide URLs stay live; hub pages link to them. */
corePages.push(
 {path:'/autism/',title:'Autism support for families | Understanding, strengths and development',eyebrow:'Autism & child development',summary:'Explore autism, developmental differences, early signs, family strategies and clinical assessment guidance with Dr Kanak Ramnani in Raipur.',kind:'autismHub',sources:[
  {title:'WHO autism fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'},
  {title:'CDC clinical screening for autism',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'}
 ],related:['/family-wellbeing/autism/','/autism/early-signs/','/care/growth-development/','/visit/']},
 {path:'/autism/early-signs/',title:'Early Signs of Autism in Children | What Parents Can Notice',eyebrow:'Developmental milestones',summary:'Learn about possible signs of autism, communication and sensory differences, screening recommendations and when to ask for developmental assessment.',kind:'autismSigns',sources:[
  {title:'CDC signs and symptoms of autism',url:'https://www.cdc.gov/autism/signs-symptoms/'},
  {title:'CDC autism screening',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},
  {title:'WHO autism fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'}
 ],related:['/autism/','/family-wellbeing/autism/','/care/growth-development/','/visit/']}
);
for(const path of ['/care/growth-development/','/parent-resources/','/learning-and-adhd/','/family-wellbeing/autism/','/care/paediatric-neurology/']){
 const p=corePages.find(x=>x.path===path);
 if(p&&!p.related?.includes('/autism/'))p.related=[...(p.related||[]),'/autism/'];
}
const vaccinationHub=corePages.find(p=>p.path==='/vaccination/');
if(vaccinationHub&&!vaccinationHub.related?.includes('/vaccination/understanding-vaccines/'))vaccinationHub.related=[...(vaccinationHub.related||[]),'/vaccination/understanding-vaccines/'];

/* Parent guide: sensory differences are experiences, not a diagnosis. */
corePages.push({
 path:'/autism/sensory-needs/',
 title:'Sensory Differences in Children | A Gentle Parent Guide',
 eyebrow:'Understanding sensory needs',
 summary:'Understand your child’s responses to sounds, textures, movement, light and everyday environments, with practical parent support and guidance on when to ask for help.',
 kind:'autismSensory',
 sources:[
  {title:'National Autistic Society: sensory processing',url:'https://www.autism.org.uk/advice-and-guidance/about-autism/sensory-processing'},
  {title:'NHS: supporting an autistic child',url:'https://www.nhs.uk/conditions/autism/supporting-a-child/'},
  {title:'CDC: autism signs and symptoms',url:'https://www.cdc.gov/autism/signs-symptoms/'},
  {title:'NHS Autism Central: sensory differences',url:'https://www.autismcentral.nhs.uk/guidance/sensory-differences'}
 ],
 related:['/autism/','/autism/early-signs/','/family-wellbeing/autism/','/care/growth-development/','/visit/']
});
for(const path of ['/autism/','/autism/early-signs/','/family-wellbeing/autism/','/parent-resources/','/care/growth-development/']){
 const page=corePages.find(p=>p.path===path);
 if(page&&!page.related?.includes('/autism/sensory-needs/'))page.related=[...(page.related||[]),'/autism/sensory-needs/'];
}

/* Parent-facing learning pages: user-approved illustrated resources,
   supported by AHA, CDC and WHO references. */
corePages.push(
 {path:'/family-wellbeing/stress/',title:'Helping families manage stress',eyebrow:'Family wellbeing',summary:'Kind, practical ways to respond to stress and build calmer family routines, with downloadable illustrated guides.',kind:'stressGuide',sources:[
  {title:'American Heart Association: stress management',url:'https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management'},
  {title:'American Heart Association: three tips to manage stress',url:'https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management/3-tips-to-manage-stress'},
  {title:'CDC: sleep needs by age',url:'https://www.cdc.gov/sleep/about/'}
 ],related:['/parent-resources/school-wellbeing/','/care/growth-development/','/family-wellbeing/autism/','/visit/']},
 {path:'/family-wellbeing/autism/',title:'Understanding autism and supporting every child',eyebrow:'Understanding development',summary:'Understand autism, explore strengths and sensory needs, learn practical family strategies and know when to seek a developmental assessment.',kind:'autismGuide',sources:[
  {title:'WHO: autism facts and supportive care',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'},
  {title:'CDC: clinical screening for autism',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},
  {title:'CDC: autism screening and diagnosis',url:'https://www.cdc.gov/autism/diagnosis/'}
 ],related:['/care/growth-development/','/learning-and-adhd/','/family-wellbeing/stress/','/visit/']}
);
for(const [path,next] of [
 ['/parent-resources/','/family-wellbeing/stress/'],
 ['/care/growth-development/','/family-wellbeing/autism/'],
 ['/care/paediatric-neurology/','/family-wellbeing/autism/'],
 ['/learning-and-adhd/','/family-wellbeing/autism/']
] as const){
 const page=corePages.find(x=>x.path===path);
 if(page&&!page.related?.includes(next))page.related=[...(page.related||[]),next];
}

/* Parent communication strategies: educational support, not an assessment. */
corePages.push({
 path:'/autism/communication-support/',
 title:'Autism Communication Support for Children | Parent Guide',
 eyebrow:'Communication & connection',
 summary:'Ways children communicate, practical family strategies, visual routines and AAC options, with guidance on seeking individual support.',
 kind:'autismCommunication',
 sources:[
  {title:'CDC autism treatment and intervention',url:'https://www.cdc.gov/autism/treatment/index.html'},
  {title:'ASHA AAC in early intervention',url:'https://www.asha.org/practice/early-intervention-provider-support/augmentative-and-alternative-communication-in-early-intervention/'},
  {title:'ASHA AAC practice portal',url:'https://www.asha.org/practice-portal/professional-issues/augmentative-and-alternative-communication/'},
  {title:'AAP HealthyChildren AAC for children',url:'https://www.healthychildren.org/English/health-issues/conditions/developmental-disabilities/Pages/augmentative-and-alternative-communication-for-children.aspx'}
 ],
 related:['/autism/','/autism/sensory-needs/','/autism/early-signs/','/care/growth-development/','/visit/']
});
for(const path of ['/autism/','/autism/sensory-needs/','/autism/early-signs/','/family-wellbeing/autism/','/parent-resources/','/care/growth-development/']){
 const page=corePages.find(p=>p.path===path);
 if(page&&!page.related?.includes('/autism/communication-support/'))page.related=[...(page.related||[]),'/autism/communication-support/'];
}

/* Parent reminder information only: the private Patient OS owns clinical events. */
corePages.push({
 path:'/vaccination/reminders/',
 title:'Vaccination Reminders and Family Care | Dr Kanak Ramnani',
 eyebrow:'Care reminders & vaccination',
 summary:'Simple tips for keeping track of your child’s vaccination card, next visit and follow-up options with Dr Kanak at Mamta Hospital.',
 kind:'vaccineReminders',
 sources:[sources.vaccines,sources.vaccineUpdate,sources.uWin],
 related:['/vaccination/','/vaccination/schedule/','/vaccination/catch-up/','/my-child/reminders/','/visit/']
});
for(const path of ['/vaccination/','/vaccination/schedule/','/vaccination/catch-up/','/vaccination/faq/','/parent-resources/']){
 const p=corePages.find(x=>x.path===path);
 if(p&&!p.related?.includes('/vaccination/reminders/'))p.related=[...(p.related||[]),'/vaccination/reminders/'];
}

/* Autism assessment education, not a guarantee of on-site diagnosis. */
corePages.push({
 path:'/autism/assessment/',
 title:'Autism Assessment Guide for Parents in Raipur',
 eyebrow:'Child development & autism',
 summary:'Wondering about autism? Learn how screening differs from diagnosis, what happens during developmental evaluation, and what to bring to a paediatric visit in Raipur.',
 kind:'autismAssessment',
 sources:[
  {title:'CDC: Screening for Autism Spectrum Disorder',url:'https://www.cdc.gov/autism/diagnosis/index.html'},
  {title:'CDC: Clinical screening for autism',url:'https://www.cdc.gov/autism/hcp/diagnosis/screening.html'},
  {title:'IAP: Action Plan 2026',url:'https://www.iapindia.org/iap-action-plan-2026/'},
  {title:'WHO: Autism spectrum disorders',url:'https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders'}
 ],
 related:['/autism/','/autism/early-signs/','/autism/communication-support/','/autism/sensory-needs/','/care/growth-development/','/visit/']
});
for(const path of ['/autism/','/autism/early-signs/','/autism/communication-support/','/autism/sensory-needs/','/family-wellbeing/autism/','/care/growth-development/','/care/paediatric-neurology/','/parent-resources/']){
 const p=corePages.find(x=>x.path===path);
 if(p&&!p.related?.includes('/autism/assessment/'))p.related=[...(p.related||[]),'/autism/assessment/'];
}
