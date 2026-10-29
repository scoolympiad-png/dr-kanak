export const site = {
  name: 'Dr Kanak Ramnani',
  title: 'Paediatrician at Mamta Hospital, Raipur',
  origin: 'https://drkanak.com',
  hospital: 'Mamta Super Speciality Hospital',
  hospitalUrl: 'https://mamtasuperspecialityhospital.com/',
  doctorUrl: 'https://mamtasuperspecialityhospital.com/doctors/kanak-ramnani/',
  appointmentUrl: 'https://mamtasuperspecialityhospital.com/book-appointment/',
  contactUrl: 'https://mamtasuperspecialityhospital.com/contact/',
  whatsapp: 'https://wa.me/919111160200?text=Hello%20Mamta%20Hospital%2C%20I%20would%20like%20to%20enquire%20about%20a%20visit%20with%20Dr%20Kanak%20Ramnani.',
  phone: '+919111160200', phoneLabel: '+91 91111 60200',
  emergency: '+917714000455', emergencyLabel: '+91 77140 00455',
  ambulance: '+919285355676',
  address: 'Beside Mowa Police Station, Dubey Colony, Mowa, Raipur, Chhattisgarh 492007',
  maps: 'https://www.google.com/maps/search/?api=1&query=Mamta+Super+Speciality+Hospital+Mowa+Raipur',
  instagram: 'https://www.instagram.com/p/DRogrRQFoUz/',
  updated: '29 October 2026',
} as const;

export const sources = {
  iap: {title:'Indian Academy of Pediatrics parent guidance',url:'https://iapindia.org/guidelines-for-parents/'},
  growth: {title:'IAP growth charts',url:'https://iapindia.org/iap-growth-charts/'},
  milestones: {title:'CDC developmental milestones',url:'https://www.cdc.gov/act-early/milestones/index.html'},
  feeding: {title:'WHO infant and young child feeding',url:'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding'},
  sleep: {title:'AAP guidance on safe infant sleep',url:'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-parents-guide-to-safe-sleep.aspx'},
  vaccines: {title:'IAP ACVIP immunisation guidance',url:'https://acvip.org/professional/'},
  vaccineUpdate: {title:'IAP immunisation schedule 2025 published April 2026',url:'https://link.springer.com/article/10.1007/s13312-026-00311-w'},
  uWin: {title:'Government of India U-WIN',url:'https://uwin.mohfw.gov.in/faq'},
  hpv: {title:'MoHFW HPV vaccination programme',url:'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2233906&lang=2&reg=3'},
};

export type Source = { title:string; url:string };
export type Section = { heading:string; paragraphs:string[]; items?:string[] };
export type PageData = {
  path:string; title:string; summary:string; eyebrow?:string; kind?:string;
  sections?:Section[]; related?:string[]; sources?:Source[];
  faqs?:{q:string;a:string}[]; noindex?:boolean; image?:string; icon?:string;
};

export const ages = [
  {slug:'newborn',name:'Newborn',age:'Birth–28 days',icon:'sprout',colour:'peach',summary:'A gentle start, one day at a time.',topics:['Feeding & settling','Early growth','Newborn check-ups'],care:'/care/newborn/',guide:'newborn-care'},
  {slug:'young-infant',name:'Little baby',age:'29 days–under 6 months',icon:'sun',colour:'blue',summary:'Getting to know your growing baby.',topics:['Responsive feeding','Early interaction','Immunisation visits'],care:'/care/well-child/',guide:'safe-sleep'},
  {slug:'older-infant',name:'Growing baby',age:'6–under 12 months',icon:'apple',colour:'sage',summary:'New foods, new movements, new discoveries.',topics:['Starting family foods','Play & movement','Home safety'],care:'/care/nutrition/',guide:'feeding'},
  {slug:'toddler',name:'Toddler',age:'1–under 3 years',icon:'footprints',colour:'lavender',summary:'Supporting little explorers and big feelings.',topics:['Language & play','Food variety','Everyday routines'],care:'/care/growth-development/',guide:'toddler-nutrition'},
  {slug:'preschool',name:'Preschool',age:'3–under 6 years',icon:'puzzle',colour:'yellow',summary:'Confidence for play, friendships and school.',topics:['School readiness','Hearing & vision','Healthy habits'],care:'/care/growth-development/',guide:'milestones'},
  {slug:'school-age',name:'School years',age:'6–under 10 years',icon:'book',colour:'blue',summary:'Growing well, in and out of the classroom.',topics:['Learning & wellbeing','Activity & nutrition','Growth review'],care:'/care/well-child/',guide:'school-wellbeing'},
  {slug:'adolescent',name:'Teen years',age:'10–18 years',icon:'leaf',colour:'peach',summary:'Listening, understanding and growing together.',topics:['Puberty & wellbeing','Sleep & nutrition','Vaccination review'],care:'/care/adolescent-health/',guide:'screen-and-play'},
];

export const careAreas = [
  {slug:'newborn',title:'Newborn & infant care',summary:'Feeding, early growth and questions about the first weeks.',icon:'sprout',colour:'peach'},
  {slug:'well-child',title:'Well-child visits',summary:'Time for prevention, growth and the questions on your mind.',icon:'heart',colour:'blue'},
  {slug:'nutrition',title:'Feeding & nutrition',summary:'Support for feeding changes and building everyday food habits.',icon:'apple',colour:'sage'},
  {slug:'growth-development',title:'Growth & development',summary:'Understanding patterns in movement, speech, learning and play.',icon:'puzzle',colour:'lavender'},
  {slug:'common-illnesses',title:'Common childhood concerns',summary:'A clinical visit when your child is unwell or you feel concerned.',icon:'stethoscope',colour:'yellow'},
  {slug:'paediatric-neurology',title:'Neurological concerns',summary:'Assessment of seizure and developmental concerns, with follow-up or referral.',icon:'brain',colour:'blue'},
  {slug:'adolescent-health',title:'Older children & teens',summary:'Age-appropriate conversations about growing up and keeping well.',icon:'leaf',colour:'peach'},
];
