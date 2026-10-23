import { HomePage } from '@/components/website';
import {seo} from '@/lib/seo';
export function generateMetadata(){return seo('/')}
export default function Page(){return <HomePage/>}
