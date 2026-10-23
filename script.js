const WHATSAPP = '923194249341';
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => { const opened = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(opened)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
const toast = (msg) => { const el = document.getElementById('toast'); el.textContent = msg; el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 2600); };
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.filter').forEach(b => b.classList.remove('active')); btn.classList.add('active'); const cat = btn.dataset.filter; document.querySelectorAll('.menu-card').forEach(card => card.hidden = cat !== 'all' && card.dataset.category !== cat); }));
function makeQr(target, text) { if (!window.QRCode) { toast('QR library needs internet. Please reload and try again.'); return false; } target.innerHTML = ''; new QRCode(target, {text, width:180, height:180, colorDark:'#090705', colorLight:'#ffffff', correctLevel:QRCode.CorrectLevel.H}); return true; }
document.querySelectorAll('.qr-item').forEach(btn => btn.addEventListener('click', () => { const item = btn.dataset.item || 'ChessyDelights Menu'; const card = btn.closest('.menu-card, .deal'); const id = card && card.id ? card.id : (item.startsWith('Party Deal') ? 'deals' : 'menu'); const url = `${location.origin}${location.pathname}#${id}`; const holder = document.createElement('div'); holder.style.cssText = 'position:fixed;z-index:50;inset:0;background:#000d;display:grid;place-items:center;padding:20px'; holder.innerHTML = `<div style="background:#fff;color:#211;padding:22px;border-radius:8px;text-align:center;max-width:290px;width:100%"><h3 style="margin:0 0 8px">${item.replace(/[<>&]/g,'')}</h3><div id="itemQr"></div><p style="font-size:12px">Scan to open this menu section</p><button id="closeQr" style="padding:10px 18px;background:#f5ad28;border:0;border-radius:4px;font-weight:bold">Close</button></div>`; document.body.appendChild(holder); if (!makeQr(holder.querySelector('#itemQr'), url)) holder.remove(); else holder.querySelector('#closeQr').addEventListener('click', () => holder.remove()); }));
const menuQrBtn = document.getElementById('menuQrBtn'); const menuQr = document.getElementById('menuQr'); const downloadQr = document.getElementById('downloadQr');
menuQrBtn.addEventListener('click', () => { if (makeQr(menuQr, `${location.origin}${location.pathname}#menu`)) { menuQr.hidden = false; downloadQr.hidden = false; } });
downloadQr.addEventListener('click', () => { const canvas = menuQr.querySelector('canvas'); const img = menuQr.querySelector('img'); const data = canvas ? canvas.toDataURL('image/png') : img?.src; if (!data) return; const a = document.createElement('a'); a.href = data; a.download = 'ChessyDelights-menu-QR.png'; a.click(); });


// Real interactive 3D viewer. No fake rotation is used: a genuine GLB/GLTF asset is required.
const foodModel = document.getElementById('foodModel');
const viewerEmpty = document.getElementById('viewerEmpty');
const modelUpload = document.getElementById('modelUpload');
const foodType = document.getElementById('foodType');
const resetView = document.getElementById('resetView');
let uploadedModelUrl = null;
// Optional hosted assets: add files to assets/ and uncomment/update the paths below.
const hostedFoodModels = {
  // burger: 'assets/burger.glb',
  // pizza: 'assets/pizza.glb',
  // pasta: 'assets/pasta.glb',
  // sandwich: 'assets/sandwich.glb',
  // roll: 'assets/roll.glb',
  // fries: 'assets/fries.glb',
  // wings: 'assets/wings.glb'
};
function loadFoodModel(src, label) {
  if (!src) { foodModel.removeAttribute('src'); foodModel.style.display = 'none'; viewerEmpty.hidden = false; viewerEmpty.querySelector('h3').textContent = `${label} 360° viewer`; return; }
  foodModel.setAttribute('src', src); foodModel.alt = `Interactive 3D ${label} model`; foodModel.style.display = 'block'; viewerEmpty.hidden = true;
}
foodType.addEventListener('change', () => {
  const kind = foodType.value;
  if (uploadedModelUrl) { loadFoodModel(uploadedModelUrl, kind); return; }
  loadFoodModel(hostedFoodModels[kind] || '', kind);
  if (!hostedFoodModels[kind]) toast(`Add a real ${kind} .glb/.gltf model to view it in 3D.`);
});
modelUpload.addEventListener('change', () => {
  const file = modelUpload.files && modelUpload.files[0];
  if (!file) return;
  if (!/\.(glb|gltf)$/i.test(file.name)) { toast('Please choose a .glb or .gltf 3D model file.'); modelUpload.value = ''; return; }
  if (uploadedModelUrl) URL.revokeObjectURL(uploadedModelUrl);
  uploadedModelUrl = URL.createObjectURL(file);
  loadFoodModel(uploadedModelUrl, foodType.value);
  toast('3D model loaded. Drag to rotate it.');
});
resetView.addEventListener('click', () => {
  if (!foodModel.hasAttribute('src')) { toast('Upload a 3D food model first.'); return; }
  foodModel.cameraOrbit = '0deg 75deg 105%'; foodModel.fieldOfView = 'auto'; foodModel.jumpCameraToGoal();
});


// Products created in the local admin panel (same browser only in this static build).
(function renderAdminProducts(){
  let products=[]; try { products=JSON.parse(localStorage.getItem('cd_admin_products_v1')||'[]'); } catch(e) {}
  const grid=document.querySelector('.menu-grid'); if(!grid || !products.length) return;
  const map={'Burgers':'burger','Pizza':'pizza','Pasta':'pasta','Sandwiches':'sandwich','Rolls & Platters':'roll','Fries & Appetizers':'appetizer','Wings':'wings','Drinks':'drink','Party Deals':'all','Other':'all'};
  products.forEach(p=>{
    const card=document.createElement('article'); card.className='menu-card admin-added-card'; card.dataset.category=map[p.category]||'all'; card.dataset.productId=p.id;
    const head=document.createElement('div'); head.className='card-head';
    const icon=document.createElement('span'); icon.textContent='🍽️'; head.append(icon);
    const title=document.createElement('h3'); title.textContent=p.name; head.append(title); card.append(head);
    if(p.image){const img=document.createElement('img');img.src=p.image;img.alt=p.name;img.loading='lazy';img.style.cssText='width:100%;max-height:210px;object-fit:cover;border-radius:5px;margin:4px 0 10px';card.append(img)}
    const desc=document.createElement('p'); desc.textContent=p.description||''; desc.style.cssText='font-size:12px;color:#c7bca7';card.append(desc);
    const price=document.createElement('p'); price.style.cssText='color:#ffcf70;font-weight:800'; price.textContent='Rs. '+Number(p.price).toLocaleString('en-PK')+(p.oldPrice?'  (Old Rs. '+Number(p.oldPrice).toLocaleString('en-PK')+')':'');card.append(price);
    const viewer=document.createElement('details');viewer.style.cssText='margin-top:8px;border:1px solid #65451b;border-radius:5px;padding:8px';const summary=document.createElement('summary');summary.textContent='View food in 360°';summary.style.cssText='cursor:pointer;color:#ffcf70;font-size:12px;font-weight:800';viewer.append(summary);const mv=document.createElement('model-viewer');mv.src=p.model;mv.alt='360 degree '+p.name;mv.setAttribute('camera-controls','');mv.setAttribute('touch-action','pan-y');mv.setAttribute('shadow-intensity','1');mv.style.cssText='width:100%;height:260px;background:#100c07';viewer.append(mv);card.append(viewer);
    const order=document.createElement('a');order.className='order-link';order.target='_blank';order.rel='noopener';order.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('Hi ChessyDelights, I want to order '+p.name+' for Rs. '+p.price);order.textContent='Order on WhatsApp ↗';card.append(order);grid.append(card);
  });
})();
