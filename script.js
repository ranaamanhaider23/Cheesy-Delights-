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
