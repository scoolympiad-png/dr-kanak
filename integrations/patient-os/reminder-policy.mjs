/**
 * Reference policy for the PRIVATE Patient OS/CRM integration, not a scheduler.
 * Consumes clinician-approved due events. It never calculates vaccine eligibility.
 * Deploy behind authenticated services and persistent transactional storage.
 */
export function reminderDecision({event,guardian,consent,policy,now=new Date(),deliveredKeys=[]}) {
  const hold=reason=>({action:'hold',reason});
  if(!event?.tenantId||!event.id||!event.childId||!event.planVersion||!policy?.approvedBy||!policy.version)return hold('incomplete-reviewed-plan');
  if(event.tenantId!==guardian?.tenantId||event.tenantId!==consent?.tenantId||event.tenantId!==policy.tenantId)return hold('tenant-mismatch');
  if(guardian?.verified!==true||guardian.childId!==event.childId||guardian.status!=='active'||consent.guardianId!==guardian.id||consent.childId!==event.childId)return hold('guardian-unverified');
  if(consent.careReminders!==true||consent.withdrawnAt||!consent.recordedAt||!['en','hi'].includes(consent.language)||!['sms','whatsapp','email'].includes(consent.channel))return hold('consent-missing-or-withdrawn');
  if(event.reviewStatus!=='approved'||!event.reviewedBy||!event.reviewedAt)return hold('clinical-review-required');
  if(event.currentPlanVersion!==event.planVersion)return hold('plan-superseded');
  if(!['planned','appointment-confirmed'].includes(event.status))return hold('event-not-actionable');
  if(!Array.isArray(policy.channels)||!policy.channels.includes(consent.channel)||!policy.templateIds?.[consent.channel]?.[consent.language])return hold('approved-channel-template-missing');
  if(!Array.isArray(event.reminders)||!event.reminders.length)return hold('no-reviewed-reminder-times');
  const instant=new Date(now);if(!Number.isFinite(instant.getTime()))return hold('invalid-time');
  if(typeof policy.timezone!=='string'||!policy.timezone)return hold('invalid-timezone');
  let hour;try{hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:policy.timezone,hour:'numeric',hourCycle:'h23'}).format(instant))}catch{return hold('invalid-timezone')}
  if(!Number.isInteger(policy.sendWindowStart)||!Number.isInteger(policy.sendWindowEnd)||policy.sendWindowStart<0||policy.sendWindowEnd>24||policy.sendWindowStart>=policy.sendWindowEnd)return hold('invalid-send-window');
  if(hour<policy.sendWindowStart||hour>=policy.sendWindowEnd)return hold('quiet-hours');
  // Use the reviewed timestamp + expiry, not a guessed interval or public age table.
  const current=event.reminders.filter(r=>r.id&&Number.isFinite(Date.parse(r.sendAt))&&Number.isFinite(Date.parse(r.expiresAt))&&Date.parse(r.sendAt)<=instant.getTime()&&Date.parse(r.expiresAt)>instant.getTime()).sort((a,b)=>Date.parse(b.sendAt)-Date.parse(a.sendAt))[0];
  if(!current)return hold('no-current-reminder');
  const key=[event.tenantId,event.id,event.planVersion,current.id,consent.channel].join(':');
  if(deliveredKeys.includes(key))return hold('already-delivered');
  return {action:'enqueue',idempotencyKey:key,templateId:policy.templateIds[consent.channel][consent.language],language:consent.language,channel:consent.channel,eventId:event.id,planVersion:event.planVersion,policyVersion:policy.version};
}

// Provider delivery states cannot change the clinical dose record.
export const clinicalTransitions={
 planned:['appointment-confirmed','deferred','administered','cancelled','superseded'],
 'appointment-confirmed':['planned','deferred','administered','cancelled','superseded'],
 deferred:['planned','cancelled','superseded'],
 administered:[],cancelled:[],superseded:[],
};
export function transitionClinicalEvent(event,next,actor){
 if(actor?.role!=='clinician'||actor.tenantId!==event.tenantId||!actor.id)throw Error('Clinician authorisation required');
 if(!clinicalTransitions[event.status]?.includes(next))throw Error('Invalid clinical transition');
 return {...event,status:next,updatedBy:actor.id};
}
export async function verifyProviderSignature({rawBody,timestamp,signature,secret,now=Date.now()}){
 if(!secret||typeof timestamp!=='string'||!/^\d{10}$/.test(timestamp)||Math.abs(now-Number(timestamp)*1000)>300_000||!/^sha256=[a-f0-9]{64}$/.test(signature||''))return false;
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
 const hex=signature.slice(7);const bytes=Uint8Array.from(hex.match(/../g),b=>parseInt(b,16));
 return crypto.subtle.verify('HMAC',key,bytes,new TextEncoder().encode(`${timestamp}.${rawBody}`));
}
