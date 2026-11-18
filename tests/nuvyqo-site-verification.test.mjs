import assert from 'node:assert/strict';
import {test} from 'node:test';
import {websiteProofResponse} from '../lib/nuvyqo-site-verification.mjs';

const url='https://drkanak.com/.well-known/nuvyqo-site-verification.txt';
const token='nqv1_' + 'a'.repeat(56);
const env={PUBLIC_SITE_URL:'https://drkanak.com',NUVYQO_SITE_VERIFICATION_TOKEN:token};

test('absent challenge fails closed', async () => {
  const r=websiteProofResponse(new Request(url),{PUBLIC_SITE_URL:env.PUBLIC_SITE_URL});
  assert.equal(r.status,404);
  assert.equal(r.headers.get('cache-control'),'no-store, max-age=0');
});
test('configured challenge is exact text and non-cacheable', async () => {
  const r=websiteProofResponse(new Request(url),env);
  assert.equal(r.status,200);
  assert.equal(await r.text(),token+'\n');
  assert.match(r.headers.get('content-type'),/^text\/plain/);
  assert.match(r.headers.get('x-robots-tag'),/noindex/);
});
test('wrong host and scheme are denied', () => {
  for(const u of [url.replace('drkanak.com','other-hospital.example'),
                  url.replace('https:','http:'),
                  url.replace('drkanak.com','www.drkanak.com')]) {
    assert.equal(websiteProofResponse(new Request(u),env).status,404);
  }
});
test('invalid/untrusted configuration fails closed', () => {
  for(const v of ['', 'unsafe', 'a'.repeat(300), '<script>'.repeat(8)]) {
    assert.equal(websiteProofResponse(new Request(url),{...env,NUVYQO_SITE_VERIFICATION_TOKEN:v}).status,404);
  }
  assert.equal(websiteProofResponse(new Request(url),{...env,PUBLIC_SITE_URL:'https://other.example'}).status,404);
  assert.equal(websiteProofResponse(new Request(url),{...env,PUBLIC_SITE_URL:'https://drkanak.com/a'}).status,404);
});
test('unrelated path and method denied', () => {
  assert.equal(websiteProofResponse(new Request('https://drkanak.com/other'),env).status,404);
  assert.equal(websiteProofResponse(new Request(url,{method:'POST'}),env).status,404);
});
