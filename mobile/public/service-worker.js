/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'estrela-azul-v2';
const IS_DEV = location.hostname === 'localhost'
  || location.hostname === '127.0.0.1'
  || location.hostname.startsWith('192.168.')
  || location.hostname.startsWith('172.')
  || location.hostname.startsWith('10.');

// Arquivos estáticos GARANTIDOS de existir em DEV (pasta public/) e em PROD (dist/)
// Nunca coloque aqui arquivos de /src/*.tsx/*.css — só existem como módulos ESM no dev,
// o cache.addAll não consegue baixa-los via fetch direto e falha o install do SW.
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/icons.svg',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/banner_estrela_azul.png'
];

// Install: cachear arquivos estáticos essenciais (um por um, falha parcial não mata install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Instalando — cacheando essenciais...');
        // allSettled = nunca rejeita, mesmo que um arquivo falhe
        return Promise.allSettled(urlsToCache.map((u) =>
          cache.add(u).catch((err) => {
            console.warn('[Service Worker] Cache pulado:', u, String(err).slice(0, 100));
          })
        ));
      })
      .then(() => {
        console.log('[Service Worker] Install completo.');
        return self.skipWaiting();
      })
      .catch((e) => {
        console.error('[Service Worker] Install com erro (continuando):', e);
        return self.skipWaiting();
      })
  );
});

// Activate: limpar caches antigas e reclamar clientes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cn) => cn !== CACHE_NAME)
          .map((old) => {
            console.log('[Service Worker] Deletando cache antiga:', old);
            return caches.delete(old);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Network-first (DEGRADE se rede falhar, usa cache). Em DEV, o Vite serve HMR tudo fresco.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;          // ignore cross-origin (ex: youtube)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (request.url.includes('chrome-extension')) return;

  // HMR do Vite: não queremos cachear esses endpoints nunca
  if (url.pathname.includes('@vite/client') || url.pathname.includes('.tsx?t=')
    || url.pathname.includes('.ts?t=') || url.search.includes('t=')) {
    return;
  }

  const respond = Promise.resolve()
    .then(() => fetch(request))
    .then((response) => {
      if (!response || response.status !== 200 || response.type === 'error') {
        return response;
      }
      try {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(request, clone); } catch (_) { /* ignore */ }
        });
      } catch (_) { /* ignore */ }
      return response;
    })
    .catch(() =>
      caches.match(request).then((cached) => {
        if (cached) return cached;
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
        if (request.destination === 'image') {
          return caches.match('/icon-192.png');
        }
        return Response.error();
      })
    );

  event.respondWith(respond);
});

// Mensagens
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_CACHE_NAME') {
    event.source && event.source.postMessage({ type: 'CACHE_NAME', name: CACHE_NAME, isDev: IS_DEV });
  }
});
