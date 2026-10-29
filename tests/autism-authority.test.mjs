import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const read=path=>readFile(new URL(path,import.meta.url),'utf8');
test('autism assessment guide is a factual parent resource with a Raipur care pathway',async()=>{
 const s=await read('../components/autism-assessment-guide.tsx');
 for(const phrase of ['Screening and diagnosis are different','Four parts of an assessment journey','Mamta Super Speciality Hospital','Raipur','CDC','Indian Academy of Pediatrics','World Health Organization'])
  assert.ok(s.includes(phrase),phrase);
 for(const unsupported of ['best autism doctor','#1 autism','guaranteed diagnosis','cure for autism','our certified autism diagnostic centre','Patient OS','CRM_ENQUIRY'])
  assert.ok(!s.toLowerCase().includes(unsupported.toLowerCase()),'unsupported / internal claim '+unsupported);
});
test('autism hub and navigation link to the new assessment resource',async()=>{
 const hub=await read('../components/topic-hubs.tsx');
 const nav=await read('../components/site-client.tsx');
 assert.ok(hub.includes("href:'/autism/assessment/'"));
 assert.ok(nav.includes('href="/autism/assessment/"'));
});
