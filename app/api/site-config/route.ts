import {env} from 'cloudflare:workers';
import {publicConfig} from '@/lib/integration.mjs';
export function GET(){return Response.json(publicConfig(env),{headers:{'Cache-Control':'no-store'}})}
