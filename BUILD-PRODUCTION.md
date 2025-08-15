# 🚀 Guia de Build para Produção - Listralize

Este guia explica como preparar e fazer o build do projeto para produção, removendo todas as referências ao Lovable e ativando proteções de segurança.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Acesso aos arquivos do projeto

## 🛠️ Comandos para Build de Produção

### Opção 1: Build Automático (Recomendado)
```bash
# Executa todo o processo automaticamente
node scripts/build-production.js
```

### Opção 2: Build Manual
```bash
# 1. Copiar assets
node scripts/copy-assets.js

# 2. Limpar referências do Lovable
node scripts/clean-production.js

# 3. Build normal
npm run build
```

## 🔧 O que o script de produção faz:

### 1. **Copia Assets**
- Copia todos os arquivos de `/public/lovable-uploads/` para `/public/assets/`
- Mantém os nomes originais dos arquivos

### 2. **Remove Referências do Lovable**
- Substitui todas as ocorrências de `/lovable-uploads/` por `/assets/`
- Remove referências ao `lovable-tagger`
- Atualiza URLs e caminhos de assets
- Troca domínios de `lovableproject.com` para `listralize.com`

### 3. **Ativa Proteções de Segurança**
- **Anti-F12**: Desabilita teclas F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
- **Anti-DevTools**: Detecta se ferramentas de desenvolvedor estão abertas
- **Anti-ContextMenu**: Desabilita clique direito
- **Console Protection**: Limpa e desabilita console em produção
- **Source Protection**: Dificulta visualização do código fonte

### 4. **Otimizações de Build**
- Remove source maps
- Minifica código com Terser
- Remove console.log em produção
- Organiza assets em chunks separados
- Otimiza nomes de arquivos com hash

## 📁 Estrutura Final da Dist

```
dist/
├── index.html
├── assets/
│   ├── img/           # Imagens
│   ├── css/           # Estilos minificados
│   └── js/            # JavaScript minificado em chunks
│       ├── vendor-[hash].js    # React, React-DOM
│       ├── router-[hash].js    # React Router
│       ├── ui-[hash].js        # Componentes UI
│       └── [name]-[hash].js    # Outros chunks
└── robots.txt
```

## 🛡️ Proteções Ativadas

### Proteções JavaScript:
- Detecção de DevTools aberto
- Bloqueio de atalhos do teclado (F12, Ctrl+Shift+I, etc.)
- Desabilitação do menu de contexto
- Limpeza periódica do console
- Anti-debugging com breakpoint detection

### Proteções HTML:
- Desabilitação de seleção de texto
- Bloqueio de arrastar elementos
- Content Security Policy rigorosa

## 🌐 Deploy

Após o build, você pode fazer deploy da pasta `dist/` em qualquer servidor web:

### Servidor Estático (Nginx, Apache, etc.):
```bash
# Copie todo o conteúdo da pasta dist para o diretório do servidor
cp -r dist/* /var/www/html/
```

### Netlify/Vercel:
```bash
# Configure o build command como:
node scripts/build-production.js
```

### AWS S3:
```bash
# Upload da pasta dist
aws s3 sync dist/ s3://seu-bucket --delete
```

## ⚠️ Importante

1. **Backup**: Sempre faça backup antes de executar os scripts
2. **Teste Local**: Teste o build localmente antes do deploy
3. **HTTPS**: Use sempre HTTPS em produção para máxima segurança
4. **Domínio**: Certifique-se de configurar seu domínio personalizado

## 🔍 Verificação Pós-Build

### Checklist:
- [ ] Não há referências a "lovable" no código
- [ ] Assets carregam corretamente de `/assets/`
- [ ] F12 está desabilitado
- [ ] Console está limpo/desabilitado
- [ ] Clique direito está desabilitado
- [ ] Performance está otimizada

### Teste de Proteções:
1. Abra o site em produção
2. Tente pressionar F12 - deve ser bloqueado
3. Tente Ctrl+Shift+I - deve ser bloqueado
4. Tente clique direito - deve ser bloqueado
5. Console deve estar limpo

## 📞 Suporte

Se encontrar algum problema:
1. Verifique se todos os scripts estão na pasta `scripts/`
2. Confirme que o Node.js está atualizado
3. Execute `npm install` para instalar dependências
4. Tente o build manual passo a passo

---

**✅ Pronto! Seu site estará completamente desvinculado do Lovable e protegido para produção.**