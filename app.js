document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('.links').classList.toggle('open'));
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>rm?el.classList.add('in'):io.observe(el));
document.querySelectorAll('[data-tabs]').forEach(t=>{const b=t.querySelectorAll('.tabs button'),p=t.querySelectorAll('.pane');b.forEach((x,i)=>x.onclick=()=>{b.forEach(y=>y.classList.remove('on'));p.forEach(y=>y.classList.remove('on'));x.classList.add('on');p[i].classList.add('on')})});
const d=document.getElementById('demo');
if(d){const L=d.querySelectorAll('.line'),N=d.querySelector('.notif'),S=d.querySelectorAll('.otpbox span'),V=d.querySelector('.verified'),C=d.querySelectorAll('.code');
const now=new Date();d.querySelector('.clock').textContent=now.toTimeString().slice(0,5);
let T=[];const at=(ms,f)=>T.push(setTimeout(f,ms));
function run(){T.forEach(clearTimeout);T=[];const code=String(Math.floor(100000+Math.random()*900000));C.forEach(c=>c.textContent=code);
L.forEach(l=>l.classList.remove('on'));N.classList.remove('on');V.classList.remove('on');S.forEach(s=>{s.textContent='';s.classList.remove('f')});
if(rm){L.forEach(l=>l.classList.add('on'));N.classList.add('on');S.forEach((s,i)=>{s.textContent=code[i];s.classList.add('f')});V.classList.add('on');return}
let t=300;L.forEach((l,i)=>{if(i==5)t+=1200;if(i==9)t+=1900;at(t,()=>l.classList.add('on'));t+=180});
at(2400,()=>N.classList.add('on'));S.forEach((s,i)=>at(3300+i*160,()=>{s.textContent=code[i];s.classList.add('f')}));at(5000,()=>V.classList.add('on'));}
d.querySelector('.replay button').onclick=run;
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){run();o.disconnect()}}).observe(d);}

const API='https://api.neuereatec.org/api/v1',su=document.getElementById('su');
if(su){const E=document.getElementById('suerr'),B=document.getElementById('sub');
su.addEventListener('submit',async e=>{e.preventDefault();E.textContent='';B.disabled=true;const f=new FormData(su),co=f.get('company').trim();
try{let r;try{r=await fetch(API+'/signup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:f.get('name').trim(),email:f.get('email').trim(),company:co,use_case:'OTP verification for '+co+' (website sign-up)'})})}catch{throw new Error('We could not reach the API right now. Please try again in a few minutes, or email neuereatec@gmail.com.')}
const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.message||'Sign-up failed ('+r.status+').');
if(j.status!=='approved'){E.textContent='Thanks! Your request '+j.request_id+' is waiting for approval. Save this claim token to collect your key later: '+j.claim_token;B.disabled=false;return}
const k=await (await fetch(API+'/signup/'+j.request_id,{headers:{'x-claim-token':j.claim_token}})).json();if(!k.api_key)throw new Error(k.message||'Could not collect your key. Email neuereatec@gmail.com with request '+j.request_id+'.');
document.getElementById('sukey').textContent=k.api_key;
document.getElementById('suinfo').textContent='Plan: '+(k.plan||'trial')+(k.trial_remaining!=null?' · '+k.trial_remaining+' free texts':'')+' · '+(k.test_mode?'Test mode (nothing delivered until we switch you to live)':'Live');
su.hidden=true;document.getElementById('suout').hidden=false}catch(x){E.textContent=x.message;B.disabled=false}});
document.getElementById('sucopy').onclick=e=>navigator.clipboard.writeText(document.getElementById('sukey').textContent).then(()=>e.target.textContent='Copied ✓');}
