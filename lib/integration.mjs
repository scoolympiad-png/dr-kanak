// Framework-independent boundary: no patient records, vaccine rules or client secrets.
export function httpsUrl(value) {
  if (typeof value !== 'string' || !value) return null;
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null; } catch { return null; }
}
export function publicConfig(env = {}) {
  const callbackEnabled = Boolean(httpsUrl(env.CRM_ENQUIRY_URL) && env.CRM_ENQUIRY_SECRET && env.MAMTA_TENANT_ID && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET);
  return {chatUrl:httpsUrl(env.PATIENT_OS_CHAT_URL),portalUrl:httpsUrl(env.PATIENT_OS_PORTAL_URL),callbackEnabled,turnstileSiteKey:callbackEnabled?env.TURNSTILE_SITE_KEY:null};
}
const reply = (status, message) => Response.json({message},{status,headers:{'Cache-Control':'no-store'}});
async function boundedJSON(request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw Error('type');
  if (Number(request.headers.get('content-length')) > 4096) throw Error('size');
  const reader=request.body?.getReader(); if(!reader)throw Error('json');
  const parts=[];let length=0;
  try { while(true){const {value,done}=await reader.read();if(done)break;length+=value.byteLength;if(length>4096){await reader.cancel();throw Error('size')}parts.push(value)} } finally {reader.releaseLock()}
  const all=new Uint8Array(length);let offset=0;for(const p of parts){all.set(p,offset);offset+=p.byteLength}return JSON.parse(new TextDecoder().decode(all));
}
export async function handleEnquiry(request,env={},fetcher=fetch) {
  if(request.method!=='POST')return reply(405,'Use a contact request from the website.');
  const origin=request.headers.get('origin');
  const current=new URL(request.url);
  const allowed=new Set([current.origin]);const configured=httpsUrl(env.PUBLIC_SITE_URL);if(configured)allowed.add(new URL(configured).origin);
  if(!origin||!allowed.has(origin)||request.headers.get('sec-fetch-site')==='cross-site')return reply(403,'Please send the request from this website.');
  if(!publicConfig(env).callbackEnabled)return reply(503,'Online callback requests are not available. Please call Mamta.');
  let body;
  try{body=await boundedJSON(request)}catch(e){return reply(e.message==='size'?413:400,'Please check the contact form and try again.');}
  if(!body||Array.isArray(body)||typeof body!=='object')return reply(400,'Please check the contact form.');
  // This public endpoint never accepts children's identifiers, dates, records or notes.
  const permitted=new Set(['name','phone','intent','language','consent','website','captchaToken']);
  if(Object.keys(body).some(key=>!permitted.has(key)))return reply(400,'Please use only the adult contact fields. Share child records through secure care.');
  const {name,phone,intent,language,consent,website,captchaToken}=body;
  const id=request.headers.get('idempotency-key')||'';
  if(typeof name!=='string'||name.trim().length<2||name.length>80||/[\r\n<>\x00-\x1f]/.test(name)||typeof phone!=='string'||!/^\+?[0-9 ()-]{8,18}$/.test(phone)||phone.replace(/\D/g,'').length<10||!['appointment','vaccination','reminder-enrolment','general'].includes(intent)||!['en','hi'].includes(language)||consent!==true||(website!==undefined&&website!=='')||typeof captchaToken!=='string'||!captchaToken||captchaToken.length>2048||!/^[a-f0-9-]{36}$/i.test(id))return reply(400,'Please check your adult contact details and consent.');
  try{
    const verification=await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:captchaToken,idempotency_key:id}),signal:AbortSignal.timeout(6000)});
    if(!verification.ok)return reply(503,'Verification is temporarily unavailable. Please call Mamta.');
    const check=await verification.json();
    if(check.success!==true||check.action!=='callback'||check.hostname!==current.hostname)return reply(400,'Please complete the verification again.');
    const upstream=await fetcher(httpsUrl(env.CRM_ENQUIRY_URL),{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${env.CRM_ENQUIRY_SECRET}`,'Idempotency-Key':id},body:JSON.stringify({schemaVersion:1,tenantId:env.MAMTA_TENANT_ID,source:'drkanak-website',adultContact:{name:name.trim(),phone:phone.replace(/[ ()-]/g,''),language},intent,consent:{contactReply:true,recordedAt:new Date().toISOString(),version:'contact-reply-v1'},requestId:id}),signal:AbortSignal.timeout(6000),redirect:'error'});
    if(!upstream.ok)return reply(503,'The request could not be received. Please call Mamta.');
    const result=await upstream.json();
    if(result.accepted!==true||result.requestId!==id)return reply(502,'We could not confirm receipt. Please call Mamta.');
    return Response.json({message:'Your contact request was received. A consultation time still needs confirmation.'},{status:202,headers:{'Cache-Control':'no-store'}});
  }catch{return reply(503,'The request could not be sent. Please call Mamta.');}
}
