import './style.css';
import version from '../../version.txt?raw';
import {MultiplayerClient} from '@rmc/multiplayer-client';
import {createGarden} from './renderer.js';
import {movement,isMovementKey} from './input.js';
const $=id=>document.getElementById(id);
const session=new MultiplayerClient(import.meta.env.VITE_SERVER_URL||'https://rmc-colyseus-multiplayer-server.vercel.app','garden-chat');
const keys=new Set(),touches=new Map();let renderer,paused=false,lastSent=0,chatIds='',noticeTimer;
$('version').textContent='v'+version.trim().replace(/^version=/,'');
function stop(){keys.clear();touches.clear();document.querySelectorAll('.touch-pad button').forEach(b=>b.classList.remove('active'));session.send('move',{x:0,z:0});}
function blocked(){return paused||document.hidden||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName);}
function normalize(key){return key.length===1?key.toLowerCase():key;}
window.addEventListener('keydown',e=>{const key=normalize(e.key);if(e.ctrlKey||e.metaKey||e.altKey)return;if(key==='Escape'){$('message').blur();$('garden').focus();stop();return;}if(isMovementKey(key)&&!blocked()){e.preventDefault();keys.add(key);}});
window.addEventListener('keyup',e=>keys.delete(normalize(e.key)));
window.addEventListener('blur',stop);document.addEventListener('visibilitychange',stop);$('message').addEventListener('focus',stop);
for(const button of document.querySelectorAll('[data-key]')){
 button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);touches.set(e.pointerId,button.dataset.key);button.classList.add('active');$('message').blur();});
 const release=e=>{touches.delete(e.pointerId);button.classList.remove('active');session.send('move',movement(new Set([...keys,...touches.values()]),blocked()));};
 button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
}
const timer=setInterval(()=>session.send('move',movement(new Set([...keys,...touches.values()]),blocked())),50);
$('pause').onclick=()=>{paused=!paused;stop();$('pause').textContent=paused?'▶ Resume':'Ⅱ Pause';$('pause').setAttribute('aria-pressed',String(paused));$('movement-hint').textContent=paused?'Taking a breather':'WASD / ↑ ↓ ← →';};
$('leave').onclick=()=>{stop();if(session.state.status==='offline'){void session.connect();}else session.disconnect();};
$('retry').onclick=()=>renderer?session.connect():location.reload();
$('invite').onclick=async()=>{try{await navigator.clipboard.writeText(location.origin+import.meta.env.BASE_URL);$('invite').textContent='Link copied ✓';setTimeout(()=>$('invite').textContent='Invite a friend ↗',2200);}catch{$('notice').textContent='Share the address in your browser to invite a friend.';}};
$('message').oninput=()=>$('count').textContent=$('message').value.length+' / 280';
$('chat-form').onsubmit=e=>{e.preventDefault();const value=$('message').value.trim();if(!value||session.state.status!=='connected')return;if(Date.now()-lastSent<800){$('notice').textContent='Give your message a moment before sending another.';return;}lastSent=Date.now();session.send('chat',value);$('message').value='';$('count').textContent='0 / 280';};
function scrollLatest(){$('messages').scrollTop=$('messages').scrollHeight;$('latest').hidden=true;}
$('latest').onclick=scrollLatest;$('messages').onscroll=()=>{const el=$('messages');if(el.scrollHeight-el.clientHeight-el.scrollTop<35)$('latest').hidden=true;};
function renderChat(state,event){const messages=state.chats||[];const next=messages.map(m=>m.id).join(',');if(next===chatIds&&event!=='snapshot')return;chatIds=next;const el=$('messages');const bottom=el.scrollHeight-el.clientHeight-el.scrollTop<45;const oldTop=el.scrollTop;const oldFirst=el.querySelector('.message');const oldFirstId=oldFirst?.dataset.id;const oldHeight=oldFirst?.offsetHeight||0;
 if(!messages.length){el.innerHTML='<div class="chat-welcome"><span>❧</span><h3>Make yourself at home.</h3><p>Say hello, share a thought,<br>or just enjoy the company.</p><small>The latest 100 messages stay<br>until this garden session ends.</small></div>';return;}
 const fragment=document.createDocumentFragment();for(const m of messages){const item=document.createElement('article');item.className='message'+(m.sender===state.sessionId?' own':'');item.dataset.id=String(m.id);const header=document.createElement('div');header.className='message-header';const dot=document.createElement('i');dot.style.background=m.color;const name=document.createElement('strong');name.textContent=m.name;const time=document.createElement('time');time.dateTime=new Date(m.time).toISOString();time.textContent=new Date(m.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});header.append(dot,name,time);const p=document.createElement('p');p.textContent=m.text;item.append(header,p);fragment.append(item);}el.replaceChildren(fragment);
 if(bottom||event==='snapshot')scrollLatest();else{el.scrollTop=Math.max(0,oldTop-(oldFirstId&&!messages.some(m=>String(m.id)===oldFirstId)?oldHeight+19:0));$('latest').hidden=false;}
}
session.subscribe((state,event)=>{
 $('connection').textContent=state.status==='connected'?'Live garden':state.status;$('connection').dataset.state=state.status;$('occupancy').textContent=state.players.length+' / '+state.capacity;
 const me=state.players.find(p=>p.id===state.sessionId);$('identity').textContent=me?'You are '+me.name:'Your sunhat is waiting';$('leave').textContent=state.status==='offline'?'Join garden':'Leave garden';
 $('message').disabled=$('send').disabled=state.status!=='connected';
 if(event!=='garden'){const people=$('people');people.replaceChildren();for(const p of state.players){const chip=document.createElement('span');chip.className='person';const dot=document.createElement('i');dot.style.background=p.color;chip.append(dot,document.createTextNode(p.name+(p.id===state.sessionId?' (you)':'')));people.append(chip);}}
 if(renderer){$('overlay').hidden=state.status==='connected';$('overlay-title').textContent=state.status==='full'?'A full little garden':state.status==='offline'?'See you in the garden.':'Finding your people…';$('overlay-message').textContent=state.error||(state.status==='offline'?'Join again whenever you feel like it.':'Connecting you to the shared garden.');$('retry').hidden=!['full','offline','reconnecting'].includes(state.status);}
 if(state.error){$('notice').textContent=state.error;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').textContent='Chat is shared with everyone here.',4000);}
 if(state.status!=='connected')stop();renderer?.update(state);if(['snapshot','chat','status'].includes(event))renderChat(state,event);
});
try{renderer=await createGarden($('garden'),$('labels'));await session.connect();}catch(error){console.error(error);$('overlay').hidden=false;$('overlay-title').textContent='The garden needs a hand.';$('overlay-message').textContent=error.message;$('retry').hidden=false;}
window.addEventListener('pagehide',()=>{clearInterval(timer);stop();session.disconnect();renderer?.dispose();});
// Read-only diagnostics for browser verification; no server authority is exposed.
window.gardenDiagnostics=()=>({status:session.state.status,roomId:session.state.roomId,sessionId:session.state.sessionId,players:session.state.players.map(p=>({...p})),chats:session.state.chats||[],paused});
