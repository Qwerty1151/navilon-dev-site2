// popup.js — MV3 compliant
// Требуются permissions: downloads, storage, activeTab, scripting

const els = {
  scanBtn: document.getElementById('scanBtn'),
  downloadSelectedBtn: document.getElementById('downloadSelectedBtn'),
  downloadAllBtn: document.getElementById('downloadAllBtn'),
  stopBtn: document.getElementById('stopBtn'),
  autoDetect: document.getElementById('autoDetect'),
  typeVideo: document.getElementById('typeVideo'),
  typeAudio: document.getElementById('typeAudio'),
  typePhoto: document.getElementById('typePhoto'),
  typeDoc: document.getElementById('typeDoc'),
  quality: document.getElementById('quality'),
  subfolder: document.getElementById('subfolder'),
  namePattern: document.getElementById('namePattern'),
  mediaList: document.getElementById('mediaList'),
  status: document.getElementById('status'),
  selectedCount: document.getElementById('selectedCount'),
};

let mediaItems = []; // {id,url,type,filename,size,chat,sender,date,time,ext}
let selectedIds = new Set();
let downloading = new Map(); // downloadId -> itemId

init().catch(console.error);

async function init(){
  await restoreSettings();
  wireEvents();
  updateButtons();
  if(els.autoDetect.checked){
    scan();
  }
}

function wireEvents(){
  els.scanBtn.addEventListener('click', scan);
  els.downloadSelectedBtn.addEventListener('click', ()=> startDownload('selected'));
  els.downloadAllBtn.addEventListener('click', ()=> startDownload('all'));
  els.stopBtn.addEventListener('click', stopAll);

  [els.autoDetect, els.typeVideo, els.typeAudio, els.typePhoto, els.typeDoc, els.quality, els.subfolder, els.namePattern]
    .forEach(el=> el.addEventListener('change', saveSettings));

  if(chrome && chrome.downloads && chrome.downloads.onChanged){
    chrome.downloads.onChanged.addListener(onDownloadChanged);
  }
}

async function getActiveTab(){
  const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
  return tab;
}

function setStatus(text){
  els.status.textContent = text;
}

function updateButtons(){
  const any = mediaItems.length>0;
  const sel = selectedIds.size>0;
  els.downloadAllBtn.disabled = !any;
  els.downloadSelectedBtn.disabled = !sel;
  els.stopBtn.disabled = downloading.size===0;
  els.selectedCount.textContent = String(selectedIds.size);
}

async function scan(){
  setStatus('Сканирование…');
  mediaItems = [];
  selectedIds.clear();
  renderList();

  const filters = typesFilter();
  const tab = await getActiveTab();
  try{
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'collectMedia',
      payload: {filters, quality: els.quality.value}
    });
    mediaItems = Array.isArray(response)?.length ? response : [];
    setStatus(`Найдено медиа: ${mediaItems.length}`);
  }catch(err){
    console.warn('collectMedia failed', err);
    setStatus('Контент-скрипт не активен на этой странице.');
  }
  renderList();
  updateButtons();
}

function typesFilter(){
  const types=[];
  if(els.typeVideo.checked) types.push('video');
  if(els.typeAudio.checked) types.push('audio');
  if(els.typePhoto.checked) types.push('image');
  if(els.typeDoc.checked) types.push('document');
  return types;
}

function renderList(){
  els.mediaList.innerHTML='';
  for(const item of mediaItems){
    const li = document.createElement('li');
    li.className='item';
    li.setAttribute('role','option');
    li.setAttribute('aria-selected', selectedIds.has(item.id) ? 'true' : 'false');

    const check = document.createElement('input');
    check.type='checkbox';
    check.className='item__check';
    check.checked = selectedIds.has(item.id);
    check.addEventListener('change',()=>{
      if(check.checked) selectedIds.add(item.id); else selectedIds.delete(item.id);
      li.setAttribute('aria-selected', check.checked ? 'true':'false');
      updateButtons();
    });

    const meta = document.createElement('div');
    meta.className='item__meta';

    const title = document.createElement('div');
    title.className='item__title';
    title.textContent = item.filename || deriveName(item);

    const sub = document.createElement('div');
    sub.className='item__sub';
    const size = item.size ? humanFileSize(item.size) : '—';
    sub.textContent = `${item.type ?? 'media'} • ${size}`;

    const progress = document.createElement('div');
    progress.className='progress';
    const bar = document.createElement('div');
    bar.className='progress__bar';
    bar.id = `bar_${item.id}`;
    progress.appendChild(bar);

    meta.appendChild(title);
    meta.appendChild(sub);
    meta.appendChild(progress);

    const actions = document.createElement('div');
    actions.className='item__actions';
    const tag = document.createElement('span');
    tag.className='tag';
    tag.textContent = (item.chat || 'чат') + (item.sender?` · ${item.sender}`:'');
    actions.appendChild(tag);

    li.appendChild(check);
    li.appendChild(meta);
    li.appendChild(actions);

    // быстрая отметка по клику по строке
    li.addEventListener('click', (e)=>{
      if(e.target===check) return;
      check.checked = !check.checked;
      check.dispatchEvent(new Event('change'));
    });

    els.mediaList.appendChild(li);
  }
}

function deriveName(item){
  try{
    const url = new URL(item.url);
    const last = url.pathname.split('/').filter(Boolean).pop() || 'file';
    return decodeURIComponent(last);
  }catch{
    return 'file';
  }
}

function humanFileSize(bytes){
  const thresh = 1024;
  if(Math.abs(bytes) < thresh) return bytes + ' B';
  const units = ['KB','MB','GB','TB'];
  let u = -1;
  do { bytes /= thresh; ++u; } while(Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1)+' '+units[u];
}

async function startDownload(mode){
  const list = mode==='all' ? mediaItems : mediaItems.filter(x=>selectedIds.has(x.id));
  if(!list.length) return;

  setStatus('Загрузка…');
  els.stopBtn.disabled = false;

  for(const item of list){
    try{
      const filename = await buildFileName(item);
      const options = { url: item.url, filename, saveAs: false, conflictAction: 'uniquify' };
      const downloadId = await chrome.downloads.download(options);
      downloading.set(downloadId, item.id);
    }catch(err){
      console.warn('download failed', err);
    }
  }
}

async function buildFileName(item){
  const sub = (els.subfolder.value || 'mah-downloads').replace(/\\/g,'/').replace(/^\/+|\/+$/g,'');
  const pat = els.namePattern.value || '{chat}-{sender}-{date}-{filename}';

  const now = new Date();
  const pad = (n)=> String(n).padStart(2,'0');
  const date = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  const base = (item.filename || deriveName(item));
  const ext = (base.split('.').pop() || '').toLowerCase();

  const safe = (s)=> s?.toString().replace(/[<>:\"/\\|?*]/g,'_').slice(0,120) || '';

  let name = pat
    .replaceAll('{chat}', safe(item.chat||'chat'))
    .replaceAll('{sender}', safe(item.sender||''))
    .replaceAll('{date}', date)
    .replaceAll('{time}', time)
    .replaceAll('{type}', safe(item.type||''))
    .replaceAll('{ext}', ext)
    .replaceAll('{filename}', safe(base.replace(/\.[^.]+$/, '')));

  name = name.replace(/__+/g,'_').replace(/^_+|_+$/g,'');
  const folder = sub ? sub + '/' : '';
  const finalPath = folder + name + (ext?'.'+ext:'');
  return finalPath;
}

function stopAll(){
  for(const [downloadId] of downloading){
    try { chrome.downloads.cancel(downloadId); } catch(e) {}
  }
  downloading.clear();
  setStatus('Остановлено');
  els.stopBtn.disabled = true;
}

function onDownloadChanged(delta){
  const itemId = downloading.get(delta.id);
  if(!itemId) return;
  if(delta.state && delta.state.current === 'complete'){
    setBar(itemId, 100);
    downloading.delete(delta.id);
    if(downloading.size===0){
      setStatus('Готово');
      els.stopBtn.disabled = true;
    }
  }
  if(delta.error){
    setBar(itemId, 0);
  }
  if(delta.totalBytes && delta.bytesReceived){
    const progress = Math.min(100, Math.round((delta.bytesReceived / delta.totalBytes)*100));
    setBar(itemId, progress);
  }
}

function setBar(itemId, pct){
  const bar = document.getElementById(`bar_${itemId}`);
  if(bar){ bar.style.width = pct + '%'; }
}

async function saveSettings(){
  const data = {
    autoDetect: els.autoDetect.checked,
    typeVideo: els.typeVideo.checked,
    typeAudio: els.typeAudio.checked,
    typePhoto: els.typePhoto.checked,
    typeDoc: els.typeDoc.checked,
    quality: els.quality.value,
    subfolder: els.subfolder.value,
    namePattern: els.namePattern.value,
  };
  await chrome.storage.sync.set({ popupSettings: data });
}

async function restoreSettings(){
  const { popupSettings } = await chrome.storage.sync.get('popupSettings');
  if(!popupSettings) return;
  try{
    els.autoDetect.checked = !!popupSettings.autoDetect;
    els.typeVideo.checked = !!popupSettings.typeVideo;
    els.typeAudio.checked = !!popupSettings.typeAudio;
    els.typePhoto.checked = !!popupSettings.typePhoto;
    els.typeDoc.checked = !!popupSettings.typeDoc;
    if(popupSettings.quality) els.quality.value = popupSettings.quality;
    if(popupSettings.subfolder) els.subfolder.value = popupSettings.subfolder;
    if(popupSettings.namePattern) els.namePattern.value = popupSettings.namePattern;
  }catch(e){/* noop */}
}

window.addEventListener('keydown', (e)=>{
  if(e.target && ['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return;
  if(e.key==='a' || e.key==='A'){
    mediaItems.forEach(it=> selectedIds.add(it.id));
    renderList(); updateButtons();
  }
  if(e.key==='d' || e.key==='D'){
    startDownload('selected');
  }
  if(e.key==='s' || e.key==='S'){
    scan();
  }
  if(e.key==='Escape'){
    selectedIds.clear(); renderList(); updateButtons();
  }
});
