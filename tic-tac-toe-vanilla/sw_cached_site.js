const cacheVersion = 'v1';
const cacheName = `${registration.scope}!${cacheVersion}`;

//Call install event
self.addEventListener('install', (e)=>{
    console.log('Service Worker- install!');
});//event install

//Call activate event
self.addEventListener('activate', (e)=>{
    console.log('Service Worker- activate!');
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache.startsWith(`${registration.scope}!`) && cache !== cacheName){
                        console.log('SW cleanup');
                        return caches.delete(cache);
                    }//if
                })//map
            )//ret
        })//keys
    );//waitUntil
});//event activate


//Call fetch event
self.addEventListener('fetch', (e)=>{
    console.log('SW: fetch!');
    e.respondWith(
        fetch(e.request).then(res => {
            //make clone
            const resClone = res.clone();
            //open a chace
            caches
                .open(cacheName)
                .then(cache => {
                    //add response to cache
                    cache.put(e.request, resClone);
                });//caches
            return res;
        })//then
        .catch(
            err => caches.match(e.request).then(res => res)
        )//catch
    );//respndWith
});//event fetch
