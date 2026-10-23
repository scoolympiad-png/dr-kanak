import test from 'node:test';
import assert from 'node:assert/strict';
import {publicConfig,handleEnquiry,httpsUrl} from '../lib/integration.mjs';
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
