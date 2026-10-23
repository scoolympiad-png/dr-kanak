// Read-only deployment smoke check; never sends a real patient enquiry.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=process.argv[2];if(!base)throw Error('Pass the deployed or local preview origin.');
const origin=new URL(base).origin;const pages=JSON.parse(await readFile(new URL('../docs/page-inventory.json',import.meta.url),'utf8'));
let checked=0;const assets=new Set();const queue=[...pages];
async function worker(){while(queue.length){const page=queue.shift();const r=await fetch(new URL(page.path,origin),{signal:AbortSignal.timeout(20000)});assert.equal(r.status,200,`${page.path} HTTP ${r.status}`);const body=await r.text();assert.equal((body.match(/<h1(?:\s|>)/g)||[]).length,1,`Expected one H1: ${page.path}`);assert.ok(!body.includes('This page couldn’t load'),page.path);assert.ok(!body.includes('Starter Project'),page.path);assert.ok(body.includes('Dr Kanak'),page.path);for(const m of body.matchAll(/<img[^>]+src="(\/[^"]+)"/g))assets.add(m[1]);checked++}}
await Promise.all([worker(),worker(),worker()]);
for(const asset of assets){const r=await fetch(new URL(asset,origin),{signal:AbortSignal.timeout(10000)});assert.equal(r.status,200,asset);assert.ok(r.headers.get('content-type')?.startsWith('image/'),asset)}
const cfgResponse=await fetch(new URL('/api/site-config/',origin));assert.equal(cfgResponse.status,200);const cfg=await cfgResponse.json();for(const bad of ['CRM_ENQUIRY_SECRET','TURNSTILE_SECRET','MAMTA_TENANT_ID'])assert.ok(!(bad in cfg));
if(!cfg.callbackEnabled){const r=await fetch(new URL('/api/enquiry/',origin),{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{}'});assert.equal(r.status,503,'Unavailable form must not accept an enquiry')}
const missing=await fetch(new URL('/this-page-does-not-exist/',origin));assert.equal(missing.status,404,'Unknown route should return 404');
for(const path of ['/robots.txt','/sitemap.xml'])assert.equal((await fetch(new URL(path,origin))).status,200,path);
console.log(`HTTP smoke passed: ${checked} pages; ${assets.size} image paths; config boundary; unavailable enquiry; 404; robots and sitemap.`);
