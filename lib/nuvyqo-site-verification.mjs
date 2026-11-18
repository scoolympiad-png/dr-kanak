/**
 * Patient OS domain-ownership challenge responder.
 * No tenant IDs, API keys, medical data, or widget secrets are accepted here.
 * The Patient OS binding service is responsible for issuing and expiring the token.
 */
const PATH = '/.well-known/nuvyqo-site-verification.txt';

const proofHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

const unavailable = () => new Response('Not found', {
  status: 404,
  headers: { ...proofHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
});

/**
 * Serves the Patient OS-generated, single-use ownership proof only from the
 * explicitly configured canonical HTTPS website. An absent, malformed or
 * unconfigured token fails closed. This route does NOT authorize a chatbot.
 */
export function websiteProofResponse(request, env = {}) {
  if (request.method !== 'GET') return unavailable();

  let current;
  let allowed;
  try {
    current = new URL(request.url);
    allowed = new URL(env.PUBLIC_SITE_URL);
  } catch { return unavailable(); }

  if (current.protocol !== 'https:' || allowed.protocol !== 'https:' ||
      current.pathname !== PATH || current.hostname !== allowed.hostname ||
      current.port || allowed.port || allowed.pathname !== '/' ||
      allowed.search || allowed.hash || allowed.username || allowed.password)
    return unavailable();

  // A fresh random challenge is issued by Patient OS after hospital/facility
  // selection. Never commit a token or invent one within this website.
  const token = env.NUVYQO_SITE_VERIFICATION_TOKEN;
  if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{40,128}$/.test(token))
    return unavailable();

  return new Response(token + '\n', {
    status: 200,
    headers: { ...proofHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
