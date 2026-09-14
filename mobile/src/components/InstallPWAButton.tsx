import React, { useState, useEffect, useRef } from 'react';

const InstallPWAButton: React.FC = () => {
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showManualHint, setShowManualHint] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isHTTPSOrLocalhost, setIsHTTPSOrLocalhost] = useState(true);
  const hideTimer = useRef<any>(null);

  useEffect(() => {
    // 1) Verifica se já está rodando como app instalado
    const standalone =
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
      || (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    // 2) Verifica secure context (HTTPS ou localhost)
    const isLocal =
      location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const secure = window.isSecureContext || isLocal;
    setIsHTTPSOrLocalhost(secure);

    // 3) Captura o evento beforeinstallprompt (Chrome/Samsung/Edge Android)
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    // 4) Quando instalação concluída
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
      setTimeout(() => setInstalled(false), 4000);
    };
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (isStandalone) return null;

  const handleInstall = async () => {
    if (!promptEvent) {
      setShowManualHint((v) => !v);
      return;
    }
    try {
      const choice = await promptEvent.prompt();
      const outcome = (await choice)?.outcome;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
    } catch (e) {
      setShowManualHint(true);
    } finally {
      setPromptEvent(null);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 mb-6 space-y-2">
      <button
        onClick={handleInstall}
        className={[
          'w-full rounded-xl px-5 py-4 font-bold text-lg shadow-lg transition-all duration-300 select-none',
          'border-2 border-yellow-500/60',
          'bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950',
          'text-yellow-200 hover:text-yellow-100',
          'hover:from-purple-800 hover:scale-[1.01] active:scale-[0.99]',
          'flex items-center justify-center gap-2'
        ].join(' ')}
        style={{
          boxShadow: '0 0 24px rgba(168, 85, 247, 0.35), inset 0 0 12px rgba(212, 175, 55, 0.08)'
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>⬇️</span>
        <span className="tracking-wide">INSTALAR APP NA TELA INICIAL</span>
        <span style={{ fontSize: '1.6rem' }}>★</span>
      </button>

      {installed && (
        <div className="rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 text-sm px-4 py-2 text-center font-medium">
          ✅ Instalando / App instalado! Procure o ícone na tela inicial do seu celular.
        </div>
      )}

      {!promptEvent && !installed && (
        <div className="rounded-xl bg-slate-950/90 border border-purple-800/50 p-4 text-sm space-y-2">
          <p className="font-semibold text-purple-200 mb-1">ℹ️ Instruções de instalação manual</p>

          {!isHTTPSOrLocalhost && (
            <div className="rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-200 p-3 mb-2 space-y-1">
              <p className="font-bold text-amber-300">⚠️ Motivo pelo qual o botão automático NÃO apareceu:</p>
              <p>
                Você está acessando por <strong>HTTP em IP LAN</strong> (ex:
                <code className="mx-1 px-1 rounded bg-slate-900 text-amber-100">http://192.168.x.x</code>).
                O Chrome Mobile exige <strong>HTTPS</strong> (ou <code className="mx-1 px-1 rounded bg-slate-900 text-amber-100">localhost</code> no próprio celular) para exibir a instalação automática de PWA.
              </p>
              <p className="pt-1">Use um dos métodos abaixo para habilitar a instalação automática:</p>
              <ol className="list-decimal pl-5 pt-1 space-y-1">
                <li><strong>Cabo USB + ADB</strong>: <code className="rounded bg-slate-900 text-amber-100 px-1">adb reverse tcp:5176 tcp:5176</code> (melhor)</li>
                <li><strong>Túnel HTTPS</strong>: <code className="rounded bg-slate-900 text-amber-100 px-1">cloudflared tunnel --url http://localhost:5176</code> (sem conta)</li>
                <li><strong>Chrome Flag (só para dev)</strong>: acesse <code className="rounded bg-slate-900 text-amber-100 px-1">chrome://flags/#unsafely-treat-insecure-origin-as-secure</code> no celular, adicione sua URL, reinicie o Chrome.</li>
              </ol>
            </div>
          )}
          <button
            type="button"
            className="text-purple-300 hover:text-purple-100 underline underline-offset-4 text-xs"
            onClick={() => setShowManualHint((v) => !v)}
          >
            {showManualHint ? '▸ Esconder passos manuais' : '▸ Ver passos manuais (Chrome Android/Safari iOS)'}
          </button>
        </div>
      )}

      {showManualHint && (
        <div className="rounded-xl bg-slate-950/90 border border-purple-800/50 p-4 text-sm text-purple-100 space-y-3">
          <div>
            <p className="font-bold text-yellow-300 mb-1">📱 Android (Chrome / Samsung Internet / Edge):</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Toque no menu <strong>⋮ (3 pontos)</strong> no canto superior direito.</li>
              <li>Desça e toque em <strong>Adicionar à tela inicial</strong> (ou "Instalar aplicativo").</li>
              <li>Toque em <strong>Adicionar</strong> e confirme no popup.</li>
              <li>Pronto! O ícone <strong>Estrela Azul</strong> aparecerá na tela inicial.</li>
            </ol>
          </div>
          <div>
            <p className="font-bold text-yellow-300 mb-1">🍎 iOS (Safari):</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Toque no ícone de <strong>compartilhar ⬆️</strong> na barra inferior.</li>
              <li>Role até <strong>Adicionar à tela de início</strong>.</li>
              <li>Toque em <strong>Adicionar</strong> no canto superior direito.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallPWAButton;
