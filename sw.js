const CACHE_NAME = 'pwa-clock-v1';

const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/style.css',
    '/js/app.js',
    '/js/register-sw.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res){
                return res;
            }else{
                return fetch(e.request).then((res) => {
                    if(!res || res.status !== 200 || res.type !== 'basic'){
                        return res;
                    }

                    let responsesToCache = res.clone();

                    caches.open(CACHE_NAME).then((c) => {
                        c.put(e.reques, responsesToCache);
                    });

                    return res;
                });
            }
        })
    );
});