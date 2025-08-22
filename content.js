\
// content.js — generic collector for media on current page (web-МАХ и не только)
(function(){
  const KNOWN_DOC_EXT = ['pdf','doc','docx','xls','xlsx','ppt','pptx','zip','rar','7z','txt','csv','json'];
  const KNOWN_AUDIO_EXT = ['mp3','wav','ogg','m4a','flac','aac'];
  const KNOWN_VIDEO_EXT = ['mp4','webm','mkv','mov','avi','m4v'];
  const KNOWN_IMAGE_EXT = ['jpg','jpeg','png','gif','webp','heic','bmp'];
  const EXT_ALL = new Set([...KNOWN_DOC_EXT, ...KNOWN_AUDIO_EXT, ...KNOWN_VIDEO_EXT, ...KNOWN_IMAGE_EXT]);

  const typeFromExt = (ext)=>{
    ext = (ext || '').toLowerCase();
    if(KNOWN_AUDIO_EXT.includes(ext)) return 'audio';
    if(KNOWN_VIDEO_EXT.includes(ext)) return 'video';
    if(KNOWN_IMAGE_EXT.includes(ext)) return 'image';
    if(KNOWN_DOC_EXT.includes(ext)) return 'document';
    return 'media';
  };

  const extFromUrl = (url)=>{
    try{
      const u = new URL(url, location.href);
      const last = u.pathname.split('/').filter(Boolean).pop() || '';
      const m = last.match(/\.([a-zA-Z0-9]{2,6})(?:$|\?)/);
      return m ? m[1].toLowerCase() : '';
    }catch{ return ''; }
  };

  const fileNameFromUrl = (url)=>{
    try{
      const u = new URL(url, location.href);
      const last = u.pathname.split('/').filter(Boolean).pop() || 'file';
      return decodeURIComponent(last);
    }catch{ return 'file'; }
  };

  const uniqueByUrl = new Map();

  function pushItem(url, base){
    if(!url) return;
    if(/^blob:/.test(url)) return; // MVP: пропускаем blob/MSE (не скачивается напрямую)
    const ext = base?.ext || extFromUrl(url);
    const type = base?.type || typeFromExt(ext);
    const filename = base?.filename || fileNameFromUrl(url);
    if(!url || uniqueByUrl.has(url)) return;
    const id = (Math.random().toString(36).slice(2,8) + Math.random().toString(36).slice(2,8));
    uniqueByUrl.set(url, {
      id, url, type, filename,
      chat: document.title || 'chat',
      sender: base?.sender || '',
      ext
    });
  }

  function collect(filters){
    uniqueByUrl.clear();

    // videos
    document.querySelectorAll('video').forEach(v => {
      const srcs = new Set();
      if(v.currentSrc) srcs.add(v.currentSrc);
      if(v.src) srcs.add(v.src);
      v.querySelectorAll('source[src]').forEach(s => srcs.add(s.src));
      srcs.forEach(u => pushItem(u, {type:'video'}));
    });

    // audio
    document.querySelectorAll('audio').forEach(a => {
      const srcs = new Set();
      if(a.currentSrc) srcs.add(a.currentSrc);
      if(a.src) srcs.add(a.src);
      a.querySelectorAll('source[src]').forEach(s => srcs.add(s.src));
      srcs.forEach(u => pushItem(u, {type:'audio'}));
    });

    // images
    document.querySelectorAll('img[src]').forEach(img => {
      pushItem(img.src, {type:'image'});
      const srcset = img.getAttribute('srcset');
      if(srcset){
        const parts = srcset.split(',').map(s => s.trim().split(' ')[0]).filter(Boolean);
        parts.forEach(u => pushItem(u, {type:'image'}));
      }
    });

    // anchors to known file extensions
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      const ext = extFromUrl(href);
      if(EXT_ALL.has(ext)){
        pushItem(href, {type: typeFromExt(ext)});
      }
    });

    // filter by requested types
    const items = Array.from(uniqueByUrl.values());
    const filtered = items.filter(it => !filters.length || filters.includes(it.type));
    return filtered;
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(!msg || msg.type !== 'collectMedia') return;
    try{
      const filters = (msg.payload && Array.isArray(msg.payload.filters)) ? msg.payload.filters : [];
      const items = collect(filters);
      sendResponse(items);
    }catch(e){
      console.warn('collectMedia error', e);
      sendResponse([]);
    }
    // indicate async = false
    return true;
  });
})();
