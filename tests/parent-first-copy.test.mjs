import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('vaccination guide stays parent-facing rather than showing implementation notices',async()=>{
 const copy=await readFile(new URL('../components/vaccination-care-programme.tsx',import.meta.url),'utf8');
 for(const internal of [
  'Reminder service:',
  'private Patient OS',
  'clinician-approved plan',
  'guardian verifies access',
  'only approved, consented care events',
  'when the secure service is enabled',
  'automated alerts are not activated',
  'CRM_', 'MAMTA_TENANT_ID'
 ]){
  assert.ok(!copy.includes(internal),'Visitor page leaks internal status/copy: '+internal);
 }
 assert.match(copy,/A little tip for your next visit/);
 assert.match(copy,/Can Mamta remind me about the next visit/);
 assert.match(copy,/reminder options are currently available/);
 assert.match(copy,/vaccination card/);
 assert.match(copy,/other clinic/);
 assert.match(copy,/\/visit\//);
});

test('public vaccination hub does not promise a reminder launch date',async()=>{
 const copy=await readFile(new URL('../components/website.tsx',import.meta.url),'utf8');
 assert.ok(!copy.includes('personalised online reminders are coming soon'));
});
