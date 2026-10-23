import {readFile,access,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
const root=process.cwd();const moduleCache=new Map();
async function dataModule(file){
 if(moduleCache.has(file))return moduleCache.get(file);
 const source=await readFile(file,'utf8');
 let js=file.endsWith('.json')?'export default '+source:ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 const imports=[...js.matchAll(/from\s+['"](.+?)['"]/g)];
 for(const match of imports){assert.ok(match[1].startsWith('.'),'Content modules must use relative data imports');const target=path.resolve(path.dirname(file),match[1]+(path.extname(match[1])?'':'.ts'));js=js.replace(match[0],`from '${await dataModule(target)}'`)}
 const url='data:text/javascript;base64,'+Buffer.from(js).toString('base64');moduleCache.set(file,url);return url;
}
const {pages,guides}=await import(await dataModule(path.join(root,'lib/pages.ts')));
const known=new Set(pages.map(p=>p.path));assert.equal(known.size,pages.length,'Duplicate route');
assert.equal(guides.length,10);assert.equal(pages.filter(p=>p.path.startsWith('/care-by-age/')&&p.path!='/care-by-age/').length,7);
const titles=new Set();let sourceCount=0;
for(const p of pages){assert.ok(p.title&&p.summary,`Missing title or summary: ${p.path}`);assert.ok(!titles.has(p.title)||p.kind==='videos',`Duplicate title: ${p.title}`);titles.add(p.title);for(const link of p.related||[]){assert.ok(link.startsWith('https://')||known.has(link),`Broken related link ${p.path} -> ${link}`)}for(const s of p.sources||[]){assert.equal(new URL(s.url).protocol,'https:');sourceCount++}if(p.image)await access(path.join(root,'public',p.image))}
const authored=['components/website.tsx','components/site-client.tsx','app/not-found.tsx'];
for(const name of authored){const source=await readFile(path.join(root,name),'utf8');for(const match of source.matchAll(/href="(\/[^"#]*)"/g)){assert.ok(known.has(match[1]),`Broken navigation link ${name}: ${match[1]}`)}}
const assets=JSON.parse(await readFile(path.join(root,'docs/asset-provenance.json'),'utf8'));
const images=(await readdir(path.join(root,'public/images'))).filter(n=>n.endsWith('.webp'));const provenanceImages=assets.assets.filter(a=>a.site_path?.endsWith('.webp')).map(a=>path.basename(a.site_path));assert.deepEqual([...images].sort(),[...provenanceImages].sort(),'Every WebP must have a provenance record');assert.ok(images.includes('dr-kanak-conversation-2026.webp'));assert.ok(images.includes('dr-kanak-hospital-care-2026.webp'));assert.ok(assets.assets.some(a=>a.site_path==='/images/dr-kanak-hospital-care-2026.webp'));
for(const file of images)await access(path.join(root,'public/images',file));
for(const g of guides){assert.ok(g.sections.length>=3);assert.ok(g.faqs.length>=3);assert.ok(g.sources.length>=2);for(const slug of g.related)assert.ok(guides.some(x=>x.slug===slug))}
if(process.argv.includes('--write-inventory'))await writeFile(path.join(root,'docs/page-inventory.json'),JSON.stringify(pages.map(({path,title,kind,noindex})=>({path,title,kind:kind||'article',public:!noindex})),null,2)+'\n');
console.log(`Content check passed: ${pages.length} routes; ${pages.filter(p=>!p.noindex).length} indexable-content routes; 7 childhood stages; ${guides.length} original guides; ${images.length} vetted photographs; ${sourceCount} page source links.`);
