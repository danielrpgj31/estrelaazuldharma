# Instituto Estrela Azul de Dharma

Plataforma de aprendizado espiritual com versões **Desktop (React Web)** e **Mobile (React PWA - Progressive Web App)** instalável como app nativo no celular.

## Estrutura do Projeto

```
estrelaazuldharma/
├── desktop/                # Versão Desktop (React 19 + Vite + Tailwind)
│   ├── src/
│   │   ├── pages/          # Home, Login, Register, Dashboard, Níveis 1/2/3
│   │   ├── contexts/       # AuthContext (autenticação global)
│   │   ├── database/       # Dexie (IndexedDB) + criptografia AES-GCM
│   │   └── types/          # Tipos TypeScript (User, Content, etc.)
│   └── package.json
│
└── mobile/                 # Versão Mobile (React PWA - Progressive Web App)
    ├── src/
    │   ├── pages/          # Mesmas páginas do desktop, responsivas mobile-first
    │   ├── contexts/       # AuthContext (mesmo do desktop)
    │   ├── database/       # Dexie (IndexedDB) + criptografia
    │   ├── components/     # PWANotification (aviso offline)
    │   └── utils/          # Helpers PWA (Service Worker, cache, online)
    ├── public/
    │   ├── manifest.json   # Web App Manifest (tela inicial, ícones, tema)
    │   ├── service-worker.js # Modo offline-first + cache
    │   └── icon-192.png, icon-512.png
    └── package.json
```

## Como rodar

### Versão Desktop

```bash
cd desktop
npm install
npm run dev
```

Acesse: http://localhost:5173

### Versão Mobile (PWA)

```bash
cd mobile
npm install
npm run dev
```

Acesse em **desktop** ou **celular (mesma rede Wi-Fi)**: http://localhost:5176

**Para instalar como app nativo no celular:**
1. Abra a URL no Chrome (Android) ou Safari (iOS)
2. Chrome: Menu (3 pontos) → **Adicionar à tela inicial**
3. Safari: Botão de compartilhar → **Adicionar à tela de início**
4. O app aparecerá na tela inicial com ícone próprio e modo tela cheia (sem barra do navegador)

## Credenciais de Teste (padrão)

- Usuário: `admin`
- Senha: `admin123`
- Você também pode **criar contas** livres na página de registro.

## Tecnologias

| Camada | Desktop | Mobile (PWA) |
|---|---|---|
| Linguagem | React 19 + TypeScript 6 | React 19 + TypeScript 6 |
| Build/Dev | Vite 8 | Vite 8 |
| Roteamento | React Router DOM 7 | React Router DOM 7 |
| Estilos | Tailwind CSS 3 | Tailwind CSS 3 |
| Banco Local | Dexie 4 (IndexedDB criptografado) | Dexie 4 (IndexedDB criptografado) |
| Criptografia | Web Crypto (PBKDF2 + AES-GCM 256) | Web Crypto (PBKDF2 + AES-GCM 256) |
| Instalação | Navegador | PWA (Service Worker + Manifest) |
| Offline | Não por padrão | Sim (cache + fallback offline) |

## Funcionalidades Principais

### 🔐 Autenticação e Usuários
- **Registro** de novos usuários com senha derivada (PBKDF2 250k iterações, salt aleatório)
- **Login** com validação hashada e sessão persistida
- **Sessão criptografada** no IndexedDB
- Usuário admin padrão criado automaticamente no primeiro acesso

### 💾 Armazenamento 100% Local (sem API)
Tudo é salvo no navegador via IndexedDB (Dexie) — **não há backend**:
- Usuários criptografados em AES-GCM-256
- Sessão atual criptografada
- Conteúdos sagrados (vídeos, textos, imagens)
- Progresso por nível (acesso sequencial: N1 → N2 → N3)

### 📚 Níveis de Acesso (hierárquico)
Os níveis seguem pré-requisitos sequenciais. Nenhum nível avançado é acessado sem concluir o anterior.

| Nível | Tela | Pré-requisito | Descrição |
|---|---|---|---|
| Nível 0 | Home | — | Página institucional, pública |
| Nível 1 | Introdução Nível 1 | Estar logado | Noções da Personalidade e da Consciência |
| Nível 2 | Introdução Nível 2 | Ter entrado no Nível 1 | Realidade Absoluta e realidades alternativas |
| Nível 3 | O Conhecimento do Mal | Ter entrado no Nível 2 | Noções do Bem e do Mal / Abismo interior |

### 🎨 Visual Esotérico / Gótico-Oculto
- Paleta profunda: Slate-900 + Roxo místico (purple-950/800/500) + Dourado
- Tipografia `serif` em títulos para clima antigo/cerimonial
- Símbolo da ★ (Estrela Azul) em todos os headers
- Gradientes, sombras místicas, banners do instituto (Ramatis, Zyon, Cypharus, Jesus)
- Imagens por nível: *A Poção da Cura*, *O Conhecimento do Mal*

## Objetivos do Instituto

Projeto com objetivo de construir uma consciência coletiva forte, sustentada pelo conhecimento, autoconhecimento e prática do bem sincronizada.

O login funciona como "hieróglifo" de acesso aos níveis mais profundos do curso. Cada nível libera automaticamente o próximo, para garantir uma jornada de aprofundamento estruturada.
