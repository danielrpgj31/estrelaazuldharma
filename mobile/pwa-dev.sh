#!/bin/bash

# Script para servir a aplicação mobile com HTTPS para PWA testing

echo "🔐 Gerando certificado SSL auto-assinado..."

# Verificar se os certificados já existem
if [ ! -f "cert.pem" ] || [ ! -f "key.pem" ]; then
    openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365 \
        -subj "/C=BR/ST=SP/L=Sao Paulo/O=EstrelaAzul/CN=localhost"
    echo "✅ Certificados criados: cert.pem e key.pem"
else
    echo "✅ Certificados já existem"
fi

echo ""
echo "🚀 Iniciando servidor com HTTPS..."
echo ""
echo "📱 Acesse em seu navegador:"
echo "   - Desktop: https://localhost:5173"
echo "   - Celular: https://<seu-ip>:5173"
echo ""
echo "ℹ️  Seu IP local:"
hostname -I | awk '{print "   - " $1}'
echo ""
echo "⚠️  Aviso: Certificado auto-assinado, aceite a aviso de segurança no navegador"
echo ""

npm run dev --https --host 0.0.0.0 --cert cert.pem --key key.pem
