import React, { useEffect, useState } from 'react';
import { setupOnlineListener } from '../utils/pwa';

export const PWANotification: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setupOnlineListener(setIsOnline);
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-sm bg-amber-900/80 border border-amber-700 text-amber-100 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-sm font-medium">Você está offline. A app continuará funcionando com dados em cache.</span>
    </div>
  );
};

export default PWANotification;
