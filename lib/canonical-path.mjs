/**
 * Recover a malformed old shared link without redirecting arbitrary unknown URLs.
 * URL parsing normalises host and pathname, and keeps the redirect server-side.
 */
export function canonicalRedirectForPublicLink(requestUrl) {
 const url=new URL(requestUrl);
 if(!/^\/autism\/communication-support\/(?:\*\*|%2a%2a)$/i.test(url.pathname)) return null;
 url.pathname='/autism/communication-support/';
 url.search='';
 url.hash='';
 url.hostname='drkanak.com';
 return url.href;
}
