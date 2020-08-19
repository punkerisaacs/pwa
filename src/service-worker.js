/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */


// Precarga la appn
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// config cache routes
workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/index.html")
)

//condig fonts cache
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/.*/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    }),
    'GET')

//La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/(.*)/,new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60
            })
        ]
    }),
    'GET')

 //Las imagenes
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/images\/(.*)/,new workbox.strategies.CacheFirst({
        cacheName: 'imagenes-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60
            })
        ]
    }),
    'GET')


workbox.routing.registerRoute(/^https?.*/,new workbox.strategies.NetworkFirst({
    cacheName: 'pwa-cache',
    plugins: [
       new workbox.expiration.Plugin({
           maxAgeSeconds: 60
       })
   ]
}), 'GET')

