#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const MD_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.md');
const HTML_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.html');
const PDF_FILE = path.join(ROOT, 'RELATORIO_COMPLETO_ANALISE_E_CORRECOES.pdf');

console.log('📖 Lendo Markdown:', MD_FILE);
const md = fs.readFileSync(MD_FILE, 'utf-8');

console.log('🔧 Carregando markdown-it...');
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
  font-size: 16px;
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
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 40px;
  background: rgba(2, 6, 23, 0.85);
  border: 1px solid var(--border);
  box-shadow: 0 0 80px rgba(109, 40, 217, 0.35), inset 0 0 40px rgba(0,0,0,0.4);
}
h1, h2, h3, h4 {
  font-family: Georgia, serif;
  font-weight: 700;
  color: #f5d0fe;
  letter-spacing: 0.02em;
  margin-top: 2em;
  margin-bottom: 0.7em;
  line-height: 1.25;
}
h1 {
  font-size: 2.4rem;
  color: #fde68a;
  text-align: center;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 0.5em;
  margin-top: 0;
}
h1 + p.subtitle { text-align: center; color: var(--gold); font-style: italic; margin-top: -0.5em; }
h2 {
  font-size: 1.7rem;
  color: #e9d5ff;
  border-left: 4px solid var(--gold);
  padding-left: 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(167, 139, 250, 0.25);
}
h3 { font-size: 1.25rem; color: #f0abfc; }
h4 { font-size: 1.05rem; color: #fde68a; }
p, li { color: var(--text-soft); }
a { color: #c4b5fd; text-decoration: underline; text-decoration-color: var(--gold); text-underline-offset: 3px; }
a:hover { color: #fde68a; }
strong { color: #fde68a; }
em { color: #f0abfc; }
code {
  background: #0f172a;
  color: #f0abfc;
  border: 1px solid var(--border);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'JetBrains Mono', Consolas, monospace;
}
pre {
  background: #020617;
  border: 1px solid var(--border);
  border-left: 4px solid var(--gold);
  padding: 16px 20px;
  overflow-x: auto;
  border-radius: 4px;
  font-size: 0.88rem;
  line-height: 1.55;
}
pre code { background: transparent; border: 0; padding: 0; color: #e9d5ff; }
blockquote {
  border-left: 4px solid var(--accent-dark);
  background: rgba(109, 40, 217, 0.1);
  padding: 8px 18px;
  margin: 18px 0;
  font-style: italic;
  color: #ddd6fe;
}
hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 40px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0 28px;
  font-size: 0.96rem;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid var(--border);
}
thead {
  background: linear-gradient(90deg, var(--accent-dark), #4c1d95);
  color: #fde68a;
  text-align: left;
}
th, td {
  padding: 10px 14px;
  border: 1px solid var(--border);
}
tbody tr:nth-child(even) { background: var(--table-alt); }
tbody tr:hover { background: rgba(167, 139, 250, 0.08); }
th { font-family: Georgia, serif; letter-spacing: 0.04em; font-weight: 700; }
ul, ol { padding-left: 1.5em; }
li { margin-bottom: 4px; }
.container > h1::before, .container > h1::after {
  content: " ★ ";
  color: var(--gold);
  font-size: 0.8em;
  margin: 0 10px;
}
.footer-stars {
  text-align: center;
  color: var(--gold);
  margin-top: 60px;
  font-size: 1.3rem;
  letter-spacing: 0.4em;
}
.toc {
  border: 1px solid var(--border);
  background: rgba(30, 27, 75, 0.5);
  padding: 18px 22px;
  border-radius: 6px;
  margin: 30px 0 40px;
}
.toc h3 { margin-top: 0; color: var(--gold); border: 0; padding: 0; }
.toc ol { margin: 0; padding-left: 1.2em; }
.toc a { color: #e9d5ff; text-decoration: none; }
.toc a:hover { color: var(--gold); }
@media print {
  body { background: white !important; color: #111 !important; }
  body::before { display: none !important; }
  .container {
    box-shadow: none !important;
    border: 0 !important;
    background: white !important;
    max-width: 100% !important;
    padding: 20px 30px !important;
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

// Gera mini-TOC automatico a partir dos H2
const headings = [];
const h2Regex = /<h2>([^<]+)<\/h2>/g;
let m;
while ((m = h2Regex.exec(htmlBody)) !== null) headings.push(m[1]);
let toc = '';
if (headings.length) {
  const items = headings
    .map((h, i) => `<li><a href="#sec-${i+1}">${h}</a></li>`)
    .join('\n');
  toc = `<div class="toc"><h3>Sumário</h3><ol>\n${items}\n</ol></div>\n`;
  // Adiciona anchors aos H2
  htmlBody = htmlBody.replace(/<h2>([^<]+)<\/h2>/g, (match, content, offset) => {
    const idx = headings.indexOf(content);
    if (idx < 0) return match;
    return `<h2 id="sec-${idx+1}">${content}</h2>`;
  });
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
${toc}
${htmlBody}
<div class="footer-stars">★ ★ ★</div>
</div>
</body>
</html>`;

console.log('💾 Salvando HTML estilizado:', HTML_FILE);
fs.writeFileSync(HTML_FILE, htmlFull, 'utf-8');

// Tenta gerar PDF via Chromium headless
console.log('🖨️  Tentando gerar PDF com Chromium headless...');
const candidates = [
  'chromium',
  'chromium-browser',
  'google-chrome',
  'google-chrome-stable'
];
let chromeBin = null;
for (const bin of candidates) {
  try {
    execSync(`which "${bin}"`, { stdio: 'ignore' });
    chromeBin = bin;
    break;
  } catch { /* ignore */ }
}
if (!chromeBin) {
  console.log('⚠️  Nenhum Chromium/Chrome encontrado. PDF não gerado, mas HTML está OK.');
  console.log('✅ HTML pronto em:', HTML_FILE);
  console.log('📝 Dica: Abra o HTML no navegador e use "Imprimir → Salvar como PDF".');
  process.exit(0);
}
console.log('✅ Usando binário:', chromeBin);
try {
  const pdfUrl = 'file://' + HTML_FILE;
  execSync(
    `"${chromeBin}" --headless --no-sandbox --disable-gpu --print-to-pdf="${PDF_FILE}" --print-to-pdf-no-header --no-pdf-header-footer --virtual-time-budget=3000 --hide-scrollbars "${pdfUrl}"`,
    { stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000, cwd: ROOT }
  );
  if (fs.existsSync(PDF_FILE)) {
    const sizeKB = Math.round(fs.statSync(PDF_FILE).size / 1024);
    console.log('🎉 PDF gerado com sucesso!');
    console.log('   📄', PDF_FILE, `(${sizeKB} KB)`);
  } else {
    throw new Error('Arquivo PDF não foi criado.');
  }
} catch (err) {
  console.log('⚠️  PDF não pôde ser gerado via Chromium headless:');
  console.log('   stderr:', String(err.stderr || err.message || err).slice(0, 500));
  console.log('✅ Mas HTML ESTÁ PRONTO em:', HTML_FILE);
  console.log('📝 Basta abri-lo no navegador (Chrome/Firefox/Edge) → Imprimir → Salvar como PDF.');
}
