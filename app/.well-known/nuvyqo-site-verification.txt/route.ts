import {env} from 'cloudflare:workers';
import {websiteProofResponse} from '@/lib/nuvyqo-site-verification.mjs';

// Public ownership challenge only. Configured by the Worker runtime; never
// supplied by the browser and never stored in GitHub. An unset token is 404.
export function GET(request: Request) {
  return websiteProofResponse(request, env);
}
