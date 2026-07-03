# Guia de Instalação PWA - Samsung S10e

## O que foi configurado?

✅ **Progressive Web App (PWA)** - Instalação como app nativo sem ir à Play Store
✅ **Service Worker** - Funciona offline com cache automático
✅ **Manifest** - Cores, ícones e informações do app
✅ **Meta Tags** - Compatibilidade iOS e Android

---

## 🚀 Como Instalar no Samsung S10e

### Passo 1: Executar a aplicação em desenvolvimento

```bash
cd /home/drjunior_br/dev/src/estrelaazuldharma/mobile
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### Passo 2: Acessar pelo navegador Samsung

1. Abra o **navegador Samsung Internet** (ou Chrome)
2. Digite: `http://localhost:5173` (ou seu IP se for de outro dispositivo)
3. Aguarde a página carregar completamente

### Passo 3: Instalar como App

#### **Opção 1: Chrome / Samsung Internet**
1. Toque nos **3 pontinhos** (menu) no canto superior direito
2. Selecione **"Instalar aplicativo"** ou **"Add to Home Screen"**
3. Confirme o nome (aparecerá como "Estrela Azul")
4. O app será adicionado à sua tela inicial

#### **Opção 2: iOS (se tiver iTunes)**
1. Toque em **Compartilhar** (seta)
2. Selecione **"Adicionar à Tela de Início"**
3. Nomeie como "Estrela Azul"

---

## 📱 Após Instalar

### Funcionalidades:
- ✅ App ícone na tela inicial
- ✅ Funciona offline
- ✅ Interface em tela cheia (sem navegação do navegador)
- ✅ Tema personalizado (roxo)

### Teste de Offline:
1. Instale o app como descrito acima
2. Abra o app do seu celular
3. Ative o modo avião
4. O app continuará funcionando com dados cacheados

---

## 🔧 Para Deploy em Produção

### Passo 1: Build da aplicação

```bash
npm run build
```

Gera uma pasta `dist/` com os arquivos otimizados.

### Passo 2: Deploy (escolha uma opção)

#### **Opção A: Firebase Hosting** (Recomendado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### **Opção B: Netlify**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

#### **Opção C: Seu próprio servidor**
Copie a pasta `dist/` para seu servidor web e configure HTTPS (obrigatório para PWA).

### Passo 3: Acessar no celular
1. Abra o navegador e acesse: `https://seu-dominio.com`
2. Menu → "Instalar aplicativo"
3. Pronto! App instalado

---

## 🔐 IMPORTANTE: HTTPS é Obrigatório

Service Workers **só funcionam com HTTPS** (exceto localhost).

Se estiver testando em rede local:
```bash
# Gerar certificado auto-assinado
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Servir com HTTPS
npx vite --https --cert cert.pem --key key.pem
```

---

## 📊 Verificar Status PWA

### No navegador Chrome/Samsung:
1. Abra as ferramentas de desenvolvedor (F12)
2. Vá até **Application**
3. Selecione **Service Workers**
4. Deve mostrar status: ✅ **Activated and running**

### Verificar Cache:
1. Em **Application** → **Cache Storage**
2. Deve mostrar: `estrela-azul-v1`

---

## 🎯 O que está funcionando:

| Recurso | Status | Detalhes |
|---------|--------|----------|
| Service Worker | ✅ Ativo | Cache em segundo plano |
| Manifest | ✅ Configurado | 4 ícones diferentes |
| Offline | ✅ Funciona | Network-first strategy |
| Meta Tags | ✅ Aplicadas | Compatível iOS e Android |
| Notificação Offline | ✅ Ativa | Mostra alerta quando sem internet |

---

## ❓ Troubleshooting

### App não instala?
- Certifique-se de acessar via HTTPS (em produção)
- Aguarde a página carregar completamente
- Service Worker deve estar "Activated"

### Offline não funciona?
- Abra DevTools → Application → Service Workers
- Marque "Offline" se não funcionar
- Limpe o cache e recarregue

### Performance lenta?
```bash
npm run build  # Otimiza bundle
npm run preview  # Testa build localmente
```

---

## 📞 Suporte

Qualquer dúvida sobre PWA, consulte:
- https://web.dev/progressive-web-apps/
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
