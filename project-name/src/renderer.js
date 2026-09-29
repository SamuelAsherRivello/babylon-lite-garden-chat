import {createEngine,createSceneContext,createArcRotateCamera,enableOrthographicCamera,createHemisphericLight,createDirectionalLight,createPbrMaterial,createSphere,createCylinder,createTransformNode,setParent,addToScene,removeFromScene,loadGltf,registerScene,startEngine,resizeEngine,disposeEngine,onBeforeRender} from '@babylonjs/lite';
export async function createGarden(canvas,labels){
 if(!navigator.gpu)throw Error('This garden needs WebGPU. Please open it in a recent Chrome or Edge browser with hardware acceleration enabled.');
 canvas.dataset.stage='gpu';let engine;try{engine=await createEngine(canvas,{antialias:true});}catch{throw Error('WebGPU could not start. Enable hardware acceleration in Chrome or Edge, then try again.');}
 const scene=createSceneContext(engine);scene.clearColor={r:.65,g:.73,b:.47,a:1};
 const beta=.35,halfHeight=17;scene.camera=createArcRotateCamera(-Math.PI/2,beta,45,{x:0,y:0,z:0});
 const bounds=enableOrthographicCamera(scene.camera,{halfHeight});
 addToScene(scene,createHemisphericLight([0,1,0],.65));addToScene(scene,createDirectionalLight([-.6,-1,.35],.8));
 canvas.dataset.stage="assets";const farm=await loadGltf(engine,import.meta.env.BASE_URL+'assets/garden.glb');
 for(const root of farm.entities){if(root.rotation)root.rotation.y=Math.PI;}
 addToScene(scene,farm);
 const avatars=new Map();let state={players:[],sessionId:null},viewHeight=halfHeight;
 const material=color=>{const rgb=color.match(/\w\w/g).map(v=>parseInt(v,16)/255);return createPbrMaterial({baseColorFactor:[...rgb,1],metallicFactor:0,roughnessFactor:.9});};
 const skin=material('#edc298'),hat=material('#e7c574'),shoe=material('#584a3a'),eye=material('#344536');
 function avatar(p){
  const root=createTransformNode(p.id),parts=[];const shirt=material(p.color);
  function part(shape,opts,mat,x,y,z){const mesh=shape(engine,opts);mesh.material=mat;setParent(mesh,root);Object.assign(mesh.position,{x,y,z});parts.push(mesh);return mesh;}
  for(const x of [-.2,.2])part(createSphere,{diameterX:.29,diameterY:.27,diameterZ:.42,segments:8},shoe,x,.14,-.05);
  part(createCylinder,{height:.63,diameterTop:.47,diameterBottom:.65,tessellation:10},shirt,0,.59,0);
  part(createSphere,{diameter:.65,segments:12},skin,0,1.12,0);
  part(createCylinder,{height:.09,diameter:1.04,tessellation:16},hat,0,1.41,0);
  part(createCylinder,{height:.28,diameterTop:.47,diameterBottom:.62,tessellation:12},hat,0,1.58,0);
  part(createCylinder,{height:.09,diameter:.64,tessellation:12},shirt,0,1.49,0);
  for(const x of [-.4,.4])part(createSphere,{diameterX:.22,diameterY:.47,diameterZ:.22,segments:8},skin,x,.67,0);
  for(const x of [-.12,.12])part(createSphere,{diameter:.065,segments:6},eye,x,1.15,-.305);
  const shadow=part(createCylinder,{height:.008,diameter:1.1,tessellation:20},material('#718f4d'),0,.025,0);
  const label=document.createElement('span');label.className='player-label';labels.append(label);
  root.position.x=p.x;root.position.z=-p.z;addToScene(scene,root);return{root,parts,label,shadow};
 }
 const resize=()=>{resizeEngine(engine);const aspect=canvas.clientWidth/canvas.clientHeight;viewHeight=aspect>1?13:Math.max(16,9/aspect);bounds.top=viewHeight;bounds.bottom=-viewHeight;bounds.left=-viewHeight*aspect;bounds.right=viewHeight*aspect;};
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 onBeforeRender(scene,dt=>{
  const ids=new Set(state.players.map(p=>p.id));for(const[id,a]of avatars)if(!ids.has(id)){removeFromScene(scene,a.root);a.label.remove();avatars.delete(id);}
  const t=1-Math.exp(-Math.min(dt,100)/65),w=canvas.clientWidth,h=canvas.clientHeight;
  for(const p of state.players){let a=avatars.get(p.id);if(!a){a=avatar(p);avatars.set(p.id,a);}const dx=p.x-a.root.position.x,dz=-p.z-a.root.position.z;const walking=Math.hypot(dx,dz)>.025;a.root.position.x+=dx*t;a.root.position.z+=dz*t;a.root.position.y=walking?Math.abs(Math.sin(performance.now()*.012))*.065:0;
   a.label.textContent=p.name+(p.id===state.sessionId?' · you':'');a.label.classList.toggle('me',p.id===state.sessionId);a.label.style.left=(w/2+a.root.position.x*h/(viewHeight*2))+'px';a.label.style.top=(h/2-(1.9*Math.sin(beta)+a.root.position.z*Math.cos(beta))*h/(viewHeight*2))+'px';
  }
 });
 canvas.dataset.stage="register";await registerScene(scene);canvas.dataset.stage="start";await startEngine(engine);canvas.dataset.ready='true';
 return{update(next){state=next;},dispose(){observer.disconnect();disposeEngine(engine);labels.replaceChildren();}};
}


