'use client';
import {useState} from 'react';
import {Icon} from './icon';

/** A private, ephemeral practice aid: no saved child details, analytics payload or clinical scoring. */
export function WritingPractice(){
 const tasks=[
  {title:'Choose one small topic',hint:'Dog, elephant, parrot or another favourite idea.'},
  {title:'Write one opening sentence',hint:'A sentence can begin with what the child already knows.'},
  {title:'Add two more little sentences',hint:'Offer a picture, word bank or movement break if helpful.'},
 ] as const;
 const [done,setDone]=useState<boolean[]>([false,false,false]);
 const count=done.filter(Boolean).length;
 return <section className="adhd-practice" aria-labelledby="adhd-practice-title">
  <div className="adhd-practice-heading">
   <div><span className="eyebrow">Try this together</span><h2 id="adhd-practice-title">My three-sentence writing plan</h2><p>A small practice activity to try at home or in the classroom. Adapt the goal to the child's needs.</p></div>
   <div className="adhd-practice-score" aria-live="polite"><strong>{count} / 3</strong><small>steps tried</small></div>
  </div>
  <div className="adhd-practice-progress" aria-hidden="true"><span style={{width:`${count/3*100}%`}}/></div>
  <div className="adhd-practice-steps">{tasks.map((item,i)=><label className={done[i]?'is-done':''} key={item.title}>
   <input type="checkbox" checked={done[i]} onChange={e=>setDone(state=>state.map((v,j)=>j===i?e.target.checked:v))}/>
   <span className="adhd-practice-check" aria-hidden="true"><Icon name={done[i]?'check':'book'}/></span>
   <span><strong>{item.title}</strong><small>{item.hint}</small></span>
  </label>)}</div>
  <div className="adhd-practice-bottom"><span>{count===3?'Celebrate the effort — small steps count!':'Notice effort and give specific encouragement after each step.'}</span><button type="button" onClick={()=>setDone([false,false,false])}>Start again</button></div>
  <p className="adhd-practice-privacy"><Icon name="shield"/> Your selections stay on this screen and are not saved or sent to Dr Kanak or Mamta Hospital.</p>
 </section>;
}
