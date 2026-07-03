// Detectar quando há uma nova versão do Service Worker
export const registerServiceWorkerUpdates = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] Aplicação foi atualizada. Recarregue para usar a nova versão.');
      // Opcional: mostrar notificação ao usuário
      if (window.confirm('Nova versão disponível! Deseja atualizar?')) {
        window.location.reload();
      }
    });
  }
};

// Função para limpar cache manualmente
export const clearAppCache = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
      console.log('[PWA] Cache limpo com sucesso');
    } catch (error) {
      console.error('[PWA] Erro ao limpar cache:', error);
    }
  }
};

// Função para verificar conectividade
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listener para mudanças de conectividade
export const setupOnlineListener = (callback: (isOnline: boolean) => void) => {
  window.addEventListener('online', () => {
    console.log('[PWA] Aplicação online');
    callback(true);
  });
  
  window.addEventListener('offline', () => {
    console.log('[PWA] Aplicação offline');
    callback(false);
  });
};
