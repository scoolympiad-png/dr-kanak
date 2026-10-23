import {env} from 'cloudflare:workers';
import {handleEnquiry} from '@/lib/integration.mjs';
export function POST(request:Request){return handleEnquiry(request,env)}
