import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const text=async path=>readFile(new URL(path,import.meta.url),'utf8');
test('every registered route has its own activity illustration entry and complete link',async()=>{
 const pages=JSON.parse(await text('../docs/page-inventory.json'));
 const visuals=await text('../lib/page-visuals.ts');
 const csv=await text('../docs/DR-KANAK-ALL-PAGES-VISUAL-LINKS.csv');
 const entries=csv.trim().split(/\r?\n/);
 assert.equal(entries.length,pages.length+1,'One canonical link must appear for every page');
 assert.equal(new Set(pages.map(p=>p.path)).size,pages.length,'No duplicate pages');
 for(const p of pages){
   assert.ok(visuals.includes(JSON.stringify(p.path)+':{activity:'),'No unique illustration assignment for '+p.path);
   assert.ok(csv.includes('https://drkanak.com'+p.path+','),'Missing full page URL for '+p.path);
 }
 const keys=[...visuals.matchAll(/^ ("[^"]+"):\{activity:/gm)].map(m=>JSON.parse(m[1]));
 assert.equal(keys.length,pages.length,'No leftover/missing visual assignments');
});
test('major hero sections no longer hardcode a recycled fake-doctor consultation image',async()=>{
 const files=['website.tsx','topic-hubs.tsx','autism-sensory-support.tsx','autism-communication-support.tsx','autism-assessment-guide.tsx','family-wellbeing-guides.tsx','learning-resources.tsx','vaccination-care-programme.tsx'];
 for(const p of files){
 const src=await text('../components/'+p);
 assert.ok(!src.includes('/images/illustrative-play-consultation.webp'),p+' reuses play consultation');
 assert.ok(!src.includes('/images/illustrative-family-consultation.webp'),p+' reuses family consultation');
 assert.ok(!src.includes('/images/illustrative-learning-support.webp'),p+' reuses learning consultation');
 assert.ok(!src.includes('/images/illustrative-vaccination-consultation.webp'),p+' reuses vaccine consultation');
 }
 const home=await text('../components/website.tsx');
 assert.ok(home.includes('HomeActivityGallery'),'Home activity gallery missing');
 assert.ok(home.includes('/images/dr-kanak-official.webp'),'Official doctor image missing');
 assert.ok(home.includes('activity-intro-wrap'),'Generic pages must receive activity visuals');
});
