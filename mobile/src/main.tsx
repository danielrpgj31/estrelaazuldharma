import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/service-worker.js'
    navigator.serviceWorker
      .register(swUrl, { scope: '/' })
      .then((registration) => {
        console.log('[PWA] Service Worker registrado com sucesso. Scope:', registration.scope)
      })
      .catch((error) => {
        console.error('[PWA] Erro ao registrar Service Worker:', error)
      })
  })
}
