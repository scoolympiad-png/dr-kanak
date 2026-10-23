import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getPage} from '@/lib/pages';
import {ContentPage} from '@/components/website';
import {seo} from '@/lib/seo';

type Props={params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const p=getPage('/'+slug.join('/')+'/');return p?{...seo(p.path,p.noindex),title:p.title,description:p.summary}:{};}
export default async function Page({params}:Props){const{slug}=await params;const p=getPage('/'+slug.join('/')+'/');if(!p)notFound();return <ContentPage p={p}/>}
