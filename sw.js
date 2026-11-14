const C="pcd-v1";
const FILES=["./","index.html","app.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))));self.skipWaiting();});
/* apaga só os caches antigos deste app */
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("pcd-")&&k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
/* abre pelo cache e atualiza em segundo plano; a nuvem (Supabase) vai direto para a rede */
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin||!u.href.startsWith(self.registration.scope)) return;
  e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(m=>{
    const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;});
    if(m){e.waitUntil(net.catch(()=>{}));return m;}
    return net.catch(()=>c.match("index.html"));
  })));
});
self.addEventListener("notificationclick",e=>{e.notification.close();
  e.waitUntil(clients.matchAll({type:"window"}).then(ws=>{for(const w of ws){if(w.url.startsWith(self.registration.scope)&&"focus" in w)return w.focus();}return clients.openWindow("./");}));});
