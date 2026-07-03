const CACHE_NAME = 'estrela-azul-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/App.css',
  '/src/index.css',
  '/favicon.svg',
  '/banner_estrela_azul.png',
  '/manifest.json'
];

// Install: cachear arquivos principais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando arquivos principais');
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn('[Service Worker] Alguns arquivos não puderam ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: limpar caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deletando cache antiga:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first com fallback para cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar requisições de extensões
  if (request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Não cachear respostas mal-sucedidas
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clonar a resposta
        const responseToCache = response.clone();

        // Cachear respostas bem-sucedidas
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Se offline, tentar pegar do cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback para página offline (opcional)
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Mensagens para atualizar cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
