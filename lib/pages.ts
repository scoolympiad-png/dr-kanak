import guideData from './parent-guides.json';
import { corePages } from './core-pages';
import { type PageData } from './site-config';

export const guides = guideData;
export const guidePages: PageData[] = guides.map(g => ({
  path: `/parent-resources/${g.slug}/`, title:g.title, summary:g.summary,
  eyebrow:g.age, kind:'guide', sections:g.sections, faqs:g.faqs,
  related:g.related.map(slug => `/parent-resources/${slug}/`), sources:g.sources,
}));
export const pages: PageData[] = [...corePages,...guidePages];
export const getPage = (path:string) => pages.find(p => p.path === path);
export const searchIndex = pages.filter(p => !p.noindex && p.path !== '/').map(({path,title,summary,eyebrow}) => ({path,title,summary,eyebrow}));
export const sectionId = (text:string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
