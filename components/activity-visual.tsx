import {pageVisual} from '@/lib/page-visuals';
import {activityPhotos} from '@/lib/activity-photo-bank';

/** Bespoke, accessible child-activity illustrations. No depicted patient or real doctor. */
const palettes=[
 ['#e3f5fa','#f5eaf6','#2d6c82','#ee9d7d','#a3caa5'],
 ['#fff0dd','#e9f2ff','#445f96','#ee9b88','#83c0a9'],
 ['#e7f5f0','#f4eaf9','#376b77','#e9ad65','#80a8d8'],
 ['#f8e9f2','#e9f4f8','#654c88','#e9a26d','#7ebcab'],
 ['#eaf1ff','#fff2e6','#486da5','#d47a9a','#abd27f'],
 ['#f1eefe','#e0f6e9','#6b5ca8','#e8a271','#8ccdc8'],
 ['#fff3e8','#f0eaff','#8e6088','#deb663','#80b4d8'],
 ['#e4f9f3','#f8f1e7','#416e72','#dd8994','#8bc2aa'],
 ['#fceef6','#e7f4ff','#855783','#e9ac6a','#7cc6b4'],
 ['#e7f2ff','#fff4e8','#486d8f','#e08d7c','#a5c778'],
 ['#f2eafd','#e6f9fc','#7957a6','#e19d72','#91bea0'],
 ['#fff1df','#eaf8ed','#886b65','#e7a68e','#75b7bb']
] as const;
const motifs=['blocks','reading','sensory','drawing','gardening','movement','puzzle','flashcards','record','bedtime','feeding','ball','schoolwork','wellness','storytime','music','craft','outdoors','handwashing','counting'];
type Props={path:string;className?:string;variation?:number};
function Motif({name,accent,leaf,ink}:{name:string;accent:string;leaf:string;ink:string}){
 const blocks=<><rect x="585" y="365" width="80" height="95" rx="6" fill={accent}/><rect x="675" y="327" width="80" height="133" rx="6" fill={leaf}/><rect x="766" y="383" width="84" height="77" rx="6" fill={ink}/><rect x="658" y="271" width="90" height="52" rx="6" fill="#f5d47d"/><circle cx="816" cy="318" r="31" fill="#e0a7bf"/></>;
 const book=<><path d="M570 351Q640 299 716 346V489Q638 451 570 499Z" fill="white" stroke={ink} strokeWidth="6"/><path d="M716 346Q787 293 869 349V500Q790 455 716 489Z" fill={leaf} stroke={ink} strokeWidth="6"/><path d="M716 346V489" stroke={ink} strokeWidth="5"/><path d="M611 385h72m-73 24h73m75-25h69m-68 24h69" stroke={accent} strokeWidth="7" strokeLinecap="round"/></>;
 const worksheet=<><rect x="605" y="272" width="229" height="218" rx="14" fill="white" stroke={ink} strokeWidth="4"/><path d="M637 319h157M637 356h157M637 393h102" stroke={leaf} strokeWidth="10" strokeLinecap="round"/><circle cx="774" cy="430" r="23" fill={accent}/></>;
 const bubble=[...Array(12)].map((_,i)=><circle key={i} cx={604+(i%4)*70} cy={320+Math.floor(i/4)*54} r={10+(i%3)*4} fill={[leaf,accent,'#f9d47b'][i%3]}/>);
 switch(name){
 case 'reading':case 'storytime':return book;
 case 'sensory':return <><rect x="580" y="385" width="300" height="89" rx="21" fill="white"/><rect x="598" y="398" width="261" height="56" rx="14" fill={accent}/>{bubble}</>;
 case 'drawing':case 'craft':return <><rect x="610" y="285" width="221" height="198" rx="12" fill="#fffefa"/><path d="M635 393q63-121 118-17t55-29" stroke={accent} strokeWidth="24" strokeLinecap="round" fill="none"/><circle cx="730" cy="437" r="20" fill={leaf}/></>;
 case 'gardening':case 'outdoors':return <><rect x="612" y="433" width="103" height="79" fill={accent} rx="10"/><path d="M660 430V295M661 358q-81-14-51-80q73-13 51 80Zm6-19q23-96 107-80q9 81-107 80Z" fill={leaf} stroke={ink} strokeWidth="5"/><circle cx="790" cy="429" r="34" fill="#f5cf78"/></>;
 case 'movement':case 'ball':return <><circle cx="759" cy="411" r="94" fill={accent}/><path d="M685 402q62 10 95 81m-13-164q-15 70 78 107" stroke="white" strokeWidth="10" fill="none"/><path d="M605 477h270" stroke={leaf} strokeWidth="12" strokeLinecap="round"/></>;
 case 'puzzle':return <><rect x="590" y="290" width="273" height="204" rx="19" fill="white"/>{[0,1,2,3].map((i)=><rect key={i} x={611+i*62} y={345+(i%2)*46} width="59" height="55" rx="7" fill={[leaf,accent,ink,'#f4c77a'][i]}/>)}</>;
 case 'flashcards':case 'counting':return <>{[0,1,2].map(i=><g key={i} transform={`translate(${603+i*83} ${305+(i%2)*32}) rotate(${(i-1)*9})`}><rect width="80" height="123" rx="11" fill="white"/><circle cx="40" cy="49" r="25" fill={[accent,leaf,'#f5cc6e'][i]}/><path d="M17 95h46" stroke={ink} strokeWidth="7" strokeLinecap="round"/></g>)}</>;
 case 'record':case 'handwashing':return <>{worksheet}<path d="M775 435l15 14 30-38" fill="none" stroke={leaf} strokeWidth="9" strokeLinecap="round"/></>;
 case 'bedtime':return <><rect x="573" y="397" width="306" height="94" rx="20" fill={accent}/><rect x="612" y="368" width="109" height="53" rx="22" fill="white"/><rect x="590" y="434" width="282" height="54" rx="16" fill={leaf}/><path d="M766 231a60 60 0 1 0 63 85a68 68 0 0 1-63-85" fill="#f7d781"/></>;
 case 'feeding':return <><circle cx="764" cy="418" r="89" fill="white"/><path d="M677 416q79 132 171 0" fill={accent} stroke={ink} strokeWidth="5"/>{[0,1,2,3].map(i=><circle key={i} cx={709+i*34} cy={404+(i%2)*13} r="12" fill={leaf}/>)}</>;
 case 'schoolwork':return <>{worksheet}<path d="M583 500h290" stroke={accent} strokeWidth="18" strokeLinecap="round"/></>;
 case 'wellness':return <><rect x="651" y="287" width="155" height="195" rx="19" fill="white"/><rect x="677" y="266" width="106" height="34" rx="11" fill={accent}/><path d="M728 338v96m-47-47h94" stroke={leaf} strokeWidth="17" strokeLinecap="round"/></>;
 case 'music':return <>{[0,1,2].map(i=><g key={i} transform={`translate(${644+i*77} ${346+(i%2)*60})`}><circle cy="32" r="27" fill={[accent,leaf,'#f4ce79'][i]}/><path d="M22 31v-82l30 12" stroke={ink} strokeWidth="9" strokeLinecap="round" fill="none"/></g>)}</>;
 default:return blocks;
 }
}
export function ActivityVisual({path,className='',variation=0}:Props){
 const p=pageVisual(path),v=p.variation+variation,pal=palettes[(p.palette+variation)%palettes.length], [bg,bg2,ink,accent,leaf]=pal;
 const id=(path==='/'?'home':path.replace(/[^a-z0-9]/gi,'-'))+'-'+variation;
 const cx=240+(v%5)*13,cy=265+(v%3)*7,mirror=v%2===0;
 const hair=['#38334b','#574037','#2d4854'][v%3],skin=['#da9672','#b47655','#edb18a','#c4876d'][v%4],clothing=[leaf,accent,ink][v%3];
 return <svg className={'activity-visual '+className} viewBox="0 0 960 640" role="img" aria-label={p.alt} xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id={'g-'+id} x1="0" y1="0" x2="1" y2="1"><stop stopColor={bg}/><stop offset="1" stopColor={bg2}/></linearGradient></defs>
 <rect width="960" height="640" fill={'url(#g-'+id+')'}/><circle cx={793+(v%6)*8} cy="127" r="142" fill={accent} opacity=".14"/>
 <path d="M0 519Q262 478 465 520T960 505V640H0Z" fill={leaf} opacity=".23"/>
 <rect x="73" y="75" width="258" height="309" rx="124" fill="#fff" opacity=".16"/>
 <g transform={mirror?`translate(${2*cx+82} 0) scale(-1 1)`:''}>
  <ellipse cx={cx} cy="508" rx="138" ry="22" fill="#6b8294" opacity=".15"/>
  <path d={`M${cx-73} 463Q${cx-43} 425 ${cx+32} 424L${cx+78} 510H${cx-97}Z`} fill={ink}/>
  <path d={`M${cx-54} 366Q${cx+8} 322 ${cx+72} 366L${cx+84} 445Q${cx+4} 482 ${cx-77} 447Z`} fill={clothing}/>
  <path d={`M${cx+47} 389Q${cx+115} 385 ${cx+159} 371`} stroke={skin} strokeWidth="25" strokeLinecap="round" fill="none"/>
  <path d={`M${cx-55} 375Q${cx-110} 402 ${cx-126} 462`} stroke={skin} strokeWidth="24" strokeLinecap="round" fill="none"/>
  <circle cx={cx} cy={cy} r="89" fill={skin}/>
  <path d={`M${cx-86} ${cy-14}Q${cx-97} ${cy-112} ${cx+3} ${cy-118}Q${cx+78} ${cy-116} ${cx+94} ${cy-19}Q${cx+44} ${cy-65} ${cx-5} ${cy-67}Q${cx-39} ${cy-68} ${cx-86} ${cy-14}Z`} fill={hair}/>
  <circle cx={cx-26} cy={cy+12} r="5.5" fill={hair}/><circle cx={cx+34} cy={cy+12} r="5.5" fill={hair}/>
  <path d={`M${cx-10} ${cy+43}Q${cx+7} ${cy+53} ${cx+23} ${cy+42}`} stroke="#784e49" strokeWidth="5" fill="none" strokeLinecap="round"/>
 </g>
 <Motif name={p.activity} accent={accent} leaf={leaf} ink={ink}/>
 <g fill="none" stroke={accent} strokeWidth="8" opacity=".55" strokeLinecap="round"><path d="M556 154l-21 18m22 20l18 10"/><path d="M870 237l-17 26m23 15l19 10"/></g>
 </svg>;
}
export function HomeActivityGallery(){
 return <section className="container activity-gallery" aria-labelledby="activity-gallery-heading">
  <div className="activity-gallery-heading"><span className="eyebrow">Growing through everyday moments</span><h2 id="activity-gallery-heading">Little activities. Big discoveries.</h2><p>Reading, playing, moving and creating are all part of the joy of growing up. Find helpful guides for each new stage.</p></div>
  <div className="activity-gallery-grid">{activityPhotos.slice(0,4).map(x=><a key={x.href} href={x.href} className="activity-gallery-card"><img src={x.image} alt={x.alt} width="900" height="640" loading="lazy" referrerPolicy="no-referrer"/><strong>{x.topic}</strong><span>Explore guidance <span aria-hidden="true">→</span></span></a>)}</div>
  <p className="activity-gallery-caption">Activity images are illustrative lifestyle photographs, not photos of patients or hospital services.</p>
 </section>;
}
