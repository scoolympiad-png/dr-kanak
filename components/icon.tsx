const paths:Record<string,string[]> = {
  arrow:['M4 12h16','m14 6 6 6-6 6'], chevron:['m9 5 7 7-7 7'], down:['m6 9 6 6 6-6'],
  heart:['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z'],
  sprout:['M12 21v-9','M12 12C4 12 3 6 3 3c5 0 9 2 9 9Z','M12 16c0-8 4-11 9-11 0 6-3 11-9 11Z'],
  sun:['M12 3V1m0 22v-2M3 12H1m22 0h-2M4.2 4.2 2.8 2.8m18.4 18.4-1.4-1.4M4.2 19.8l-1.4 1.4M21.2 2.8l-1.4 1.4','M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'],
  apple:['M12 8c-8-6-13 4-8 11 2 4 5 2 8 2s6 2 8-2c5-7 0-17-8-11Z','M12 8c-1-4 1-6 5-6 0 4-2 6-5 6Z'],
  footprints:['M8 7c-4 0-5 9-2 10s6-7 4-9L8 7Z','M18 3c-3-2-7 7-4 9s6-2 6-5l-2-4Z','M5 20v1m10-6 1 1'],
  puzzle:['M9 3H3v6c5-2 5 8 0 6v6h6c-2-5 8-5 6 0h6v-6c-5 2-5-8 0-6V3h-6c2 5-8 5-6 0Z'],
  book:['M12 5v16','M12 5C8 2 4 2 2 3v16c4-1 7-1 10 2 3-3 6-3 10-2V3c-2-1-6-1-10 2Z'],
  leaf:['M20 3c1 11-3 17-10 17a7 7 0 0 1-7-7C3 6 9 2 20 3Z','M5 19 16 8'],
  stethoscope:['M4 3v6a5 5 0 0 0 10 0V3','M2 3h4m6 0h4','M9 14v3a4 4 0 0 0 8 0v-3','M20 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'],
  brain:['M12 4c-4-5-8 0-6 3-5 1-5 8-1 9-1 5 5 7 7 3V4Z','M12 4c4-5 8 0 6 3 5 1 5 8 1 9 1 5-5 7-7 3','M6 7l2 2M5 16l3-2m10-7-2 2m3 7-3-2'],
  shield:['M12 2 3 6v6c0 5 5 8 9 10 4-2 9-5 9-10V6l-9-4Z','m8 12 3 3 5-6'],
  calendar:['M4 5h16v16H4Z','M8 2v6m8-6v6M4 10h16m-12 5h2m4 0h2'],
  phone:['M5 2 2 5c0 8 9 17 17 17l3-3-5-5-3 3c-3-1-6-4-7-7l3-3-5-5Z'],
  chat:['M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-6 3 1-7a9 9 0 1 1 18-4Z','M8 11h.01M12 11h.01M16 11h.01'],
  pin:['M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 0 1 16 0Z','M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'],
  search:['M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z','m15 15 6 6'],
  close:['m6 6 12 12M6 18 18 6'], menu:['M3 6h18M3 12h18M3 18h18'],
  check:['m5 12 4 4L19 6'], lock:['M5 10h14v11H5Z','M8 10V6a4 4 0 0 1 8 0v4'],
  clock:['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z','M12 7v5l3 2'],
  play:['m9 5 10 7-10 7V5Z'], external:['M14 3h7v7','m21 3-11 11','M10 3H3v18h18v-7'],
};
export function Icon({name,className=''}:{name:string;className?:string}) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{(paths[name]||paths.heart).map((d,i)=><path key={i} d={d}/>)}</svg>;
}
