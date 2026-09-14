#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const MD_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.md');
const HTML_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.html');
const PDF_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.pdf');

console.log('📖 Lendo Markdown:', path.basename(MD_FILE));
const md = fs.readFileSync(MD_FILE, 'utf-8');

console.log('🔧 Convertendo Markdown → HTML (markdown-it)...');
const MarkdownIt = require('markdown-it');
const mdit = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false
});

let htmlBody = mdit.render(md);

const css = `
:root {
  --bg: #020617;
  --bg-2: #0b1120;
  --bg-3: #111827;
  --text: #e9d5ff;
  --text-soft: #c4b5fd;
  --accent: #a78bfa;
  --accent-dark: #6d28d9;
  --gold: #d4af37;
  --border: #3b0764;
  --table-alt: #1e1b4b;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Georgia, 'Times New Roman', serif;
  background: linear-gradient(180deg, #020617 0%, #1e1b4b 50%, #020617 100%);
  background-attachment: fixed;
  color: var(--text);
  font-size: 14.5px;
  line-height: 1.65;
  min-height: 100vh;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.15), transparent 40%),
    radial-gradient(circle at 80% 90%, rgba(212, 175, 55, 0.08), transparent 45%);
  z-index: 0;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 48px;
  background: rgba(2, 6, 23, 0.88);
  border: 1px solid var(--border);
  box-shadow: 0 0 80px rgba(109, 40, 217, 0.35), inset 0 0 40px rgba(0,0,0,0.4);
}
h1, h2, h3, h4 {
  font-family: Georgia, serif;
  font-weight: 700;
  color: #f5d0fe;
  letter-spacing: 0.02em;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
  line-height: 1.25;
  page-break-after: avoid;
  break-after: avoid;
}
h1 {
  font-size: 2.2rem;
  color: #fde68a;
  text-align: center;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 0.45em;
  margin-top: 0;
}
h1 + p.subtitle { text-align: center; color: var(--gold); font-style: italic; margin-top: -0.4em; font-size: 1rem; }
h2 {
  font-size: 1.55rem;
  color: #e9d5ff;
  border-left: 4px solid var(--gold);
  padding-left: 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(167, 139, 250, 0.25);
}
h3 { font-size: 1.18rem; color: #f0abfc; }
h4 { font-size: 1rem; color: #fde68a; }
p, li { color: var(--text-soft); }
a { color: #c4b5fd; text-decoration: underline; text-decoration-color: var(--gold); text-underline-offset: 3px; }
a:hover { color: #fde68a; }
strong { color: #fde68a; }
em { color: #f0abfc; }
code {
  background: #0f172a;
  color: #f0abfc;
  border: 1px solid var(--border);
  padding: 1.5px 6px;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: 'JetBrains Mono', Consolas, monospace;
}
pre {
  background: #020617;
  border: 1px solid var(--border);
  border-left: 4px solid var(--gold);
  padding: 14px 18px;
  overflow-x: auto;
  border-radius: 4px;
  font-size: 0.85rem;
  line-height: 1.55;
  page-break-inside: avoid;
  break-inside: avoid;
}
pre code { background: transparent; border: 0; padding: 0; color: #e9d5ff; }
blockquote {
  border-left: 4px solid var(--accent-dark);
  background: rgba(109, 40, 217, 0.1);
  padding: 8px 18px;
  margin: 18px 0;
  font-style: italic;
  color: #ddd6fe;
  page-break-inside: avoid;
}
hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 34px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0 24px;
  font-size: 0.92rem;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid var(--border);
  page-break-inside: avoid;
}
thead {
  background: linear-gradient(90deg, var(--accent-dark), #4c1d95);
  color: #fde68a;
  text-align: left;
}
th, td {
  padding: 8px 12px;
  border: 1px solid var(--border);
}
tbody tr:nth-child(even) { background: var(--table-alt); }
th { font-family: Georgia, serif; letter-spacing: 0.04em; font-weight: 700; }
ul, ol { padding-left: 1.4em; }
li { margin-bottom: 3px; }
.container > h1::before, .container > h1::after {
  content: " ★ ";
  color: var(--gold);
  font-size: 0.78em;
  margin: 0 10px;
}
.footer-stars {
  text-align: center;
  color: var(--gold);
  margin-top: 50px;
  font-size: 1.2rem;
  letter-spacing: 0.4em;
}
.toc {
  border: 1px solid var(--border);
  background: rgba(30, 27, 75, 0.5);
  padding: 16px 20px;
  border-radius: 6px;
  margin: 26px 0 34px;
}
.toc h3 { margin-top: 0; color: var(--gold); border: 0; padding: 0; }
.toc ol { margin: 0; padding-left: 1.2em; }
.toc a { color: #e9d5ff; text-decoration: none; }
.toc a:hover { color: var(--gold); }

@media print {
  html, body { background: white !important; color: #111 !important; }
  body::before { display: none !important; }
  .container {
    box-shadow: none !important;
    border: 0 !important;
    background: white !important;
    max-width: 100% !important;
    padding: 10px 30px !important;
  }
  h1, h2, h3, h4 { color: #2a0a4a !important; }
  p, li, td { color: #1f2937 !important; }
  thead { background: #3b0764 !important; color: white !important; }
  th { color: white !important; }
  code { background: #f3f4f6 !important; color: #6d28d9 !important; border: 1px solid #e5e7eb !important; }
  pre { background: #f9fafb !important; border-color: #d1d5db !important; border-left-color: #6d28d9 !important; }
  pre code { color: #111827 !important; }
  table { background: white !important; }
  tbody tr:nth-child(even) { background: #f9fafb !important; }
  a { color: #4c1d95 !important; }
}
`;

// Gera mini-TOC automático a partir dos H2
const headings = [];
{
  const h2Regex = /<h2>([^<]+)<\/h2>/g;
  let m;
  while ((m = h2Regex.exec(htmlBody)) !== null) headings.push(m[1]);
  if (headings.length) {
    const items = headings
      .map((h, i) => `<li><a href="#sec-${i+1}">${h}</a></li>`)
      .join('\n');
    const toc = `<div class="toc"><h3>Sumário</h3><ol>\n${items}\n</ol></div>\n`;
    htmlBody = toc + htmlBody;
    htmlBody = htmlBody.replace(/<h2>([^<]+)<\/h2>/g, (match, content) => {
      const idx = headings.indexOf(content);
      if (idx < 0) return match;
      return `<h2 id="sec-${idx+1}">${content}</h2>`;
    });
  }
}

const htmlFull = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Instituto Estrela Azul de Dharma — Relatório Completo</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${css}</style>
</head>
<body>
<div class="container">
<p class="subtitle">★ Relatório Técnico — Versão 1.0 · 12 de setembro de 2026 ★</p>
${htmlBody}
<div class="footer-stars">★ ★ ★</div>
</div>
</body>
</html>`;

console.log('💾 Salvando HTML estilizado:', path.basename(HTML_FILE));
fs.writeFileSync(HTML_FILE, htmlFull, 'utf-8');

// --- Método 1: Chromium/Chrome nativo via PATH ---
const findSystemChrome = () => {
  const candidates = [
    'chromium',
    'chromium-browser',
    'google-chrome',
    'google-chrome-stable',
    'google-chrome-beta'
  ];
  for (const bin of candidates) {
    try {
      execSync(`which "${bin}"`, { stdio: 'ignore' });
      return bin;
    } catch { /* ignore */ }
  }
  return null;
};

const generatePDFSystemChrome = async (bin) => {
  return new Promise((resolve, reject) => {
    try {
      const fileUrl = 'file://' + HTML_FILE;
      execSync(
        `"${bin}" --headless=new --no-sandbox --disable-gpu --disable-software-rasterizer ` +
        `--print-to-pdf="${PDF_FILE}" --no-pdf-header-footer ` +
        `--virtual-time-budget=5000 --hide-scrollbars "${fileUrl}"`,
        { stdio: ['ignore', 'pipe', 'pipe'], timeout: 90000, cwd: ROOT }
      );
      resolve(fs.existsSync(PDF_FILE));
    } catch (err) {
      reject(err);
    }
  });
};

// --- Método 2: Puppeteer-core + download automático do Chrome for Testing ---
const generatePDFPuppeteer = async () => {
  const puppeteer = require('puppeteer-core');
  const { join } = require('path');

  console.log('📦 Baixando Chrome for Testing (1ª vez: ~160 MB) — vai ser salvo em cache...');
  const { install, BrowserPlatform, Browser } = require('@puppeteer/browsers');
  const cacheDir = join(ROOT, 'node_modules', '.cache', 'puppeteer');
  fs.mkdirSync(cacheDir, { recursive: true });

  const installed = await install({
    browser: Browser.CHROME,
    buildId: '128.0.6613.137', // Estável para Node 20 / puppeteer-core v22
    platform: BrowserPlatform.LINUX_X64,
    cacheDir,
    unpack: true
  });
  console.log('✅ Chrome baixado/instalado em:', installed.path);

  const executablePath = join(installed.path, 'chrome');
  console.log('🖨️  Gerando PDF com Puppeteer + Chrome for Testing...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  try {
    const page = await browser.newPage();
    const fileUrl = 'file://' + HTML_FILE;
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.pdf({
      path: PDF_FILE,
      format: 'A4',
      printBackground: false,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      margin: { top: '1.5cm', right: '1.2cm', bottom: '1.5cm', left: '1.2cm' }
    });
  } finally {
    await browser.close();
  }
  return fs.existsSync(PDF_FILE);
};

(async () => {
  // Tenta o método 1 primeiro (sistema)
  const sysChrome = findSystemChrome();
  let ok = false;
  let errInfo = '';
  if (sysChrome) {
    try {
      console.log('✅ Usando Chromium do sistema:', sysChrome);
      ok = await generatePDFSystemChrome(sysChrome);
    } catch (e) {
      errInfo = String(e.stderr || e.message || e).slice(0, 600);
      console.log('⚠️  Chromium do sistema falhou, caindo para Puppeteer + Chrome for Testing...');
    }
  } else {
    console.log('ℹ️  Nenhum Chromium/Chrome encontrado no PATH. Usando Puppeteer + Chrome for Testing.');
  }

  if (!ok) {
    try {
      ok = await generatePDFPuppeteer();
    } catch (e) {
      errInfo = String(e && (e.stack || e.message) || e).slice(0, 900);
      console.log('❌ Puppeteer também falhou:', errInfo);
    }
  }

  // Resumo final
  console.log('\n' + '═'.repeat(60));
  if (ok && fs.existsSync(PDF_FILE)) {
    const sizeKB = Math.round(fs.statSync(PDF_FILE).size / 1024);
    console.log('🎉 PDF GERADO COM SUCESSO!');
    console.log('   📄 Caminho:', PDF_FILE);
    console.log('   📦 Tamanho:', sizeKB + ' KB');
  } else {
    console.log('⚠️  PDF NÃO foi gerado automaticamente.');
    console.log('✅ Mas HTML ESTÁ PRONTO em:', HTML_FILE);
    console.log('📝 Abra o HTML no navegador → Ctrl+P → Salvar como PDF.');
    if (errInfo) console.log('🔍 Detalhe do erro:\n', errInfo);
  }
  console.log('═'.repeat(60));
})().catch((e) => {
  console.error('ERRO FATAL:', e && (e.stack || e.message) || e);
  process.exit(1);
});
