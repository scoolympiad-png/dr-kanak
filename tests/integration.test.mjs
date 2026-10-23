import test from 'node:test';
import assert from 'node:assert/strict';
import {publicConfig,handleEnquiry,httpsUrl,legacyWebsiteIngressConfig,mapWebsiteV1Enquiry,validWebsiteV1Receipt} from '../lib/integration.mjs';
const env={PUBLIC_SITE_URL:'https://drkanak.example',CRM_ENQUIRY_URL:'https://crm.example/enquiries',CRM_ENQUIRY_SECRET:'unit-test-secret',MAMTA_TENANT_ID:'mamta-test',TURNSTILE_SITE_KEY:'public-test-key',TURNSTILE_SECRET:'captcha-test-secret',PATIENT_OS_CHAT_URL:'https://care.example/mamta'};
const payload={name:'Test Guardian',phone:'+91 99999 00000',intent:'vaccination',language:'en',consent:true,website:'',captchaToken:'test-token'};
function request(body=payload,origin='https://drkanak.example'){return new Request('https://drkanak.example/api/enquiry/',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin,'Idempotency-Key':'12345678-1234-1234-1234-123456789abc'},body:JSON.stringify(body)})}
const verified=()=>Response.json({success:true,action:'callback',hostname:'drkanak.example'});
test('public configuration never exposes secrets or tenant identity',()=>{const c=publicConfig(env);assert.equal(c.callbackEnabled,true);assert.equal(c.chatUrl,'https://care.example/mamta');for(const x of ['unit-test-secret','captcha-test-secret','mamta-test'])assert.ok(!JSON.stringify(c).includes(x));assert.equal(publicConfig({}).callbackEnabled,false);assert.equal(httpsUrl('javascript:alert(1)'),null);assert.equal(httpsUrl('https://user:pass@care.example'),null)});
test('unconfigured service rejects without claiming a saved request',async()=>{const r=await handleEnquiry(request(),{},()=>{throw Error('must not call')});assert.equal(r.status,503)});
test('cross-site and missing origin never reach the CRM',async()=>{assert.equal((await handleEnquiry(request(payload,'https://other.example'),env)).status,403);const r=request();r.headers.delete('Origin');assert.equal((await handleEnquiry(r,env)).status,403)});
test('consent, input, honeypot and payload size are checked',async()=>{for(const body of [{...payload,consent:false},{...payload,phone:'123'},{...payload,website:'spam'},{...payload,intent:'clinical-history'},{...payload,name:'x'},{...payload,name:'A'.repeat(5000)}]){const r=await handleEnquiry(request(body),env,()=>{throw Error('must not call')});assert.ok([400,413].includes(r.status))}});
test('failed challenge, wrong hostname and wrong action stop the request',async()=>{for(const body of [{success:false},{success:true,hostname:'other.example',action:'callback'},{success:true,hostname:'drkanak.example',action:'login'}]){assert.equal((await handleEnquiry(request(),env,async()=>Response.json(body))).status,400)}});
test('upstream refusal, malformed receipt and timeout cannot appear successful',async()=>{for(const next of [()=>new Response('offline',{status:503}),()=>Response.json({ok:true}),()=>{throw Error('timeout')}]){let calls=0;const r=await handleEnquiry(request(),env,async()=>++calls===1?verified():next());assert.ok([502,503].includes(r.status))}});
test('accepted request has consent, tenant and idempotency; no clinical record created',async()=>{let calls=0;const r=await handleEnquiry(request(),env,async(url,options)=>{calls++;if(calls===1)return verified();assert.equal(url,env.CRM_ENQUIRY_URL);assert.equal(options.headers.Authorization,'Bearer unit-test-secret');assert.equal(options.redirect,'error');const b=JSON.parse(options.body);assert.equal(b.tenantId,'mamta-test');assert.equal(b.adultContact.phone,'+919999900000');assert.equal(b.consent.contactReply,true);assert.equal(b.intent,'vaccination');assert.ok(!('child' in b));assert.equal(b.requestId,options.headers['Idempotency-Key']);return Response.json({accepted:true,requestId:b.requestId})});assert.equal(r.status,202);assert.equal(r.headers.get('Cache-Control'),'no-store');assert.equal(calls,2)});


test('vaccination reminder interest is adult-only and never turns into clinical enrolment',async()=>{
 let calls=0;
 const body={...payload,intent:'reminder-enrolment'};
 const r=await handleEnquiry(request(body),env,async(url,options)=>{
  calls++;
  if(calls===1)return verified();
  const sent=JSON.parse(options.body);
  assert.equal(sent.intent,'reminder-enrolment');
  assert.equal(sent.adultContact.name,'Test Guardian');
  assert.equal(sent.consent.contactReply,true);
  assert.equal(sent.consent.careReminders,undefined);
  assert.ok(!('childId' in sent));
  assert.ok(!('dob' in sent));
  assert.ok(!('vaccine' in sent));
  return Response.json({accepted:true,requestId:sent.requestId});
 });
 assert.equal(r.status,202);
 assert.equal(calls,2);
 const ack=await r.json();
 assert.ok(!/enrol(l)?ed|activated|scheduled|sending/i.test(ack.message));
});
test('public enquiry rejects fields about children before forwarding',async()=>{
 for(const extra of [{childName:'Baby Test'},{dob:'2026-01-01'},{vaccines:['BCG']},{notes:'Medical condition'},{childId:'patient-1'}]){
  const r=await handleEnquiry(request({...payload,intent:'reminder-enrolment',...extra}),env,()=>{throw Error('Must not forward personal child information')});
  assert.equal(r.status,400);
 }
});
test('CRM reply id must match the request id',async()=>{
 let calls=0;
 const r=await handleEnquiry(request({...payload,intent:'reminder-enrolment'}),env,async()=>{
  calls++;
  if(calls===1)return verified();
  return Response.json({accepted:true,requestId:'other-id'});
 });
 assert.equal(r.status,502);
});

const mamtaTenant='11111111-2222-4333-8444-555555555555';
const legacyWebhook='https://crm.nuvyqo.com/api/crm/integrations/website/'+mamtaTenant+'/'+'a'.repeat(48);
const legacyEnv={...env,CRM_INTEGRATION_MODE:'legacy-website-v1',MAMTA_TENANT_ID:mamtaTenant,CRM_WEBSITE_INGRESS_URL:legacyWebhook,CRM_ENQUIRY_SECRET:undefined,CRM_ENQUIRY_URL:undefined};
test('CRM website v1 adapter remains opt-in and tenant/host bound',()=>{
 assert.equal(legacyWebsiteIngressConfig(env),null);
 assert.equal(legacyWebsiteIngressConfig(legacyEnv)?.tenantId,mamtaTenant);
 assert.equal(publicConfig(legacyEnv).callbackEnabled,true);
 assert.ok(!JSON.stringify(publicConfig(legacyEnv)).includes('a'.repeat(48)));
 for(const overrides of [
  {MAMTA_TENANT_ID:'55555555-2222-4333-8444-555555555555'},
  {CRM_WEBSITE_INGRESS_URL:legacyWebhook+'?key=leak'},
  {CRM_WEBSITE_INGRESS_URL:legacyWebhook.replace('crm.nuvyqo.com','untrusted.example')},
  {CRM_WEBSITE_INGRESS_URL:legacyWebhook.replace('https://','http://')},
  {CRM_WEBSITE_INGRESS_URL:legacyWebhook.slice(0,-1)},
  {CRM_WEBSITE_INGRESS_URL:legacyWebhook.replace('crm.nuvyqo.com','crm.nuvyqo.com.evil.example')}
 ])assert.equal(publicConfig({...legacyEnv,...overrides}).callbackEnabled,false);
});
test('website v1 adapter maps only adult contact and verifies durable tenant receipt',async()=>{
 let calls=0;
 const intent='reminder-enrolment',body={...payload,intent};
 const r=await handleEnquiry(request(body),legacyEnv,async(url,options)=>{
  calls++;
  if(calls===1)return verified();
  assert.equal(url,legacyWebhook);
  assert.equal(options.redirect,'error');
  assert.ok(!JSON.stringify(options).includes('childName'));
  assert.ok(!('Authorization' in options.headers));
  const mapped=JSON.parse(options.body);
  assert.equal(mapped.event_type,'website_lead');
  assert.equal(mapped.form_type,'callback_request');
  assert.equal(mapped.event_id,'12345678-1234-1234-1234-123456789abc');
  assert.equal(mapped.metadata.service_requested,'Vaccination reminder callback enquiry');
  assert.equal(mapped.metadata.contact_reply_consent,true);
  assert.equal(mapped.metadata.consent_version,'contact-reply-v1');
  assert.equal(Number.isNaN(Date.parse(mapped.metadata.consent_recorded_at)),false);
  assert.deepEqual(Object.keys(mapped.patient_data).sort(),['name','phone']);
  assert.equal(mapped.patient_data.name,'Test Guardian');
  assert.equal(mapped.patient_data.phone,'+919999900000');
  assert.ok(!JSON.stringify(mapped).includes('careReminders'));
  return Response.json({status:'created',eventType:'callback_request',externalId:mapped.event_id,inquiryNumber:'INQ-001',personNumber:'P-001',historical:false,duplicate:false});
 });
 assert.equal(r.status,202);assert.equal(calls,2);
});
test('website v1 adapter never treats a mismatched receipt as a success',async()=>{
 for(const result of [
  {status:'created',eventType:'callback_request',externalId:'other',inquiryNumber:'INQ-1',historical:false},
  {status:'created',eventType:'callback_request',externalId:'12345678-1234-1234-1234-123456789abc',historical:false},
  {status:'historical-imported',eventType:'callback_request',externalId:'12345678-1234-1234-1234-123456789abc',inquiryNumber:'INQ-1',historical:true},
  {status:'created',eventType:'chat',externalId:'12345678-1234-1234-1234-123456789abc',inquiryNumber:'INQ-1',historical:false}
 ]){
  let n=0;
  const response=await handleEnquiry(request({...payload,intent:'reminder-enrolment'}),legacyEnv,async()=>{
   n++;
   return n===1?verified():Response.json(result);
  });
  assert.equal(response.status,502);
 }
 assert.equal(validWebsiteV1Receipt({status:'already-imported',eventType:'callback_request',externalId:'12345678-1234-1234-1234-123456789abc',inquiryNumber:'INQ-1',historical:false},'12345678-1234-1234-1234-123456789abc'),true);
});
