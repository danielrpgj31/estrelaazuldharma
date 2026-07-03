#!/bin/bash

# Script para converter SVG para PNG (ícones PWA)
# Requer: cairosvg ou usar serviço online

echo "📱 Gerando ícones PNG para PWA..."

# Opção 1: Usando cairosvg (se instalado)
if command -v cairosvg &> /dev/null; then
    echo "✅ Usando cairosvg..."
    cairosvg public/icon-192.svg -o public/icon-192.png -w 192 -h 192
    cairosvg public/icon-512.svg -o public/icon-512.png -w 512 -h 512
    echo "✅ Ícones gerados com sucesso!"
    exit 0
fi

# Opção 2: Python com PIL/Pillow
if command -v python3 &> /dev/null; then
    echo "✅ Usando Python + Pillow..."
    python3 << 'EOF'
from PIL import Image, ImageDraw, ImageFont
import os

# Criar ícones
for size in [192, 512]:
    # Criar imagem com fundo roxo
    img = Image.new('RGB', (size, size), color='#7c3aed')
    draw = ImageDraw.Draw(img)
    
    # Adicionar estrela (usando caractere Unicode)
    font_size = int(size * 0.8)
    try:
        # Tentar usar fonte do sistema
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback para fonte padrão
        font = ImageFont.load_default()
    
    # Desenhar estrela
    text = "★"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Salvar
    filename = f"public/icon-{size}.png"
    img.save(filename)
    print(f"✅ Gerado: {filename}")

print("\n✨ Ícones criados com sucesso!")
EOF
    exit 0
fi

# Opção 3: Usando Node.js (se sharp estiver instalado)
if npm list sharp &> /dev/null 2>&1; then
    echo "✅ Usando sharp..."
    node << 'EOF'
const sharp = require('sharp');
const fs = require('fs');

const sizes = [192, 512];

sizes.forEach(size => {
  sharp(`public/icon-${size}.svg`)
    .png()
    .toFile(`public/icon-${size}.png`, (err) => {
      if (err) console.error(`Erro ao converter icon-${size}.svg:`, err);
      else console.log(`✅ Gerado: public/icon-${size}.png`);
    });
});
EOF
    exit 0
fi

# Se nenhuma ferramenta estiver disponível
echo "❌ Nenhuma ferramenta encontrada para converter SVG → PNG"
echo ""
echo "Instale uma das seguintes:"
echo "1️⃣  cairosvg: pip install cairosvg"
echo "2️⃣  sharp (npm): npm install --save-dev sharp"
echo ""
echo "Ou use uma ferramenta online:"
echo "🌐 https://cloudconvert.com/svg-to-png"
echo "🌐 https://convertio.co/svg-png/"
echo ""
echo "Depois coloque os PNGs em: public/icon-192.png e public/icon-512.png"
