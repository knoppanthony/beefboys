self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          './app.js',
          '/img/beef.png',
          '/img/beefboy.jpg',
          '/img/beefboy4.jpg',
          '/img/meatloaf.jpg',
          '/img/otherbeefboy.jpg',
          '/img/ravioli.png',
          '/img/rexxar.jpg' 
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/img/beef.png');
        });
      }
    }));
  });