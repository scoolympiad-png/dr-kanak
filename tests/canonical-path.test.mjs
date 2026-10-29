import test from 'node:test';
import assert from 'node:assert/strict';
import {canonicalRedirectForPublicLink} from '../lib/canonical-path.mjs';

test('malformed asterisk path redirects to the clean communication page',()=>{
 for(const url of [
  'https://drkanak.com/autism/communication-support/**?utm_source=chatgpt.com',
  'https://www.drkanak.com/autism/communication-support/%2A%2A?utm_source=chatgpt.com'
 ])assert.equal(canonicalRedirectForPublicLink(url),'https://drkanak.com/autism/communication-support/');
});
test('legitimate routes and unknown paths remain untouched',()=>{
 for(const path of ['/autism/communication-support/','/vaccination/','/vaccination/reminders/','/autism/unknown/**'])
 assert.equal(canonicalRedirectForPublicLink('https://drkanak.com'+path),null);
});
