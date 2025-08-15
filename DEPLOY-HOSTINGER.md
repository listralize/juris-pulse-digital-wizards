# 🚀 Deploy na Hostinger - Guia Completo

## 📋 Pré-requisitos

1. Conta na Hostinger ativa
2. Domínio configurado
3. Node.js instalado localmente

## 🔨 Preparação do Build

### Opção 1: Build Completo (Recomendado)
```bash
# Executar build de produção completo
node scripts/build-production.js
```

### Opção 2: Build Manual
```bash
# 1. Copiar assets
# 2. Limpar referências
node scripts/clean-production.js

# 3. Build do projeto
npm run build

# 4. Preparar para deploy
node scripts/production-deploy.js
```

## 📤 Upload para Hostinger

### Passo 1: Acessar o Painel
1. Faça login na Hostinger
2. Vá em **"Gerenciador de Arquivos"**
3. Navegue até a pasta **"public_html"**

### Passo 2: Limpar Pasta (Opcional)
- Se já houver arquivos, faça backup antes
- Delete os arquivos antigos da pasta public_html

### Passo 3: Upload dos Arquivos
1. Selecione **TODOS** os arquivos da pasta `dist/`
2. Faça upload para a pasta `public_html`
3. **IMPORTANTE**: Certifique-se que o arquivo `.htaccess` foi carregado

### Passo 4: Verificação
1. Acesse seu domínio no navegador
2. Teste a navegação entre páginas
3. Verifique se não há erros 404

## 🔧 Solução de Problemas

### Tela Preta/Site não carrega
- Verifique se todos os arquivos foram carregados
- Confirme que o arquivo `.htaccess` está presente
- Verifique se não há erros no console do navegador

### Erro 404 nas rotas
- Confirme que o arquivo `.htaccess` está na raiz do public_html
- Verifique se o RewriteEngine está habilitado na Hostinger

### Arquivos não encontrados
- Confirme que a estrutura de pastas está correta:
  ```
  public_html/
  ├── index.html
  ├── .htaccess
  ├── assets/
  │   ├── js/
  │   ├── css/
  │   └── img/
  └── ...outros arquivos
  ```

## 📱 Teste Final

Depois do upload, teste:

1. **Página inicial**: `https://seudominio.com`
2. **Navegação**: Clique em diferentes seções
3. **Rotas diretas**: Acesse URLs como `https://seudominio.com/areas/familia`
4. **Formulários**: Teste o envio de contato
5. **Mobile**: Verifique em dispositivos móveis

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs de erro da Hostinger
2. Use as ferramentas de desenvolvedor do navegador
3. Confirme que todos os arquivos foram carregados corretamente

## ✅ Checklist de Deploy

- [ ] Build executado sem erros
- [ ] Pasta `dist/` criada com sucesso
- [ ] Arquivo `.htaccess` presente
- [ ] Assets organizados na pasta correta
- [ ] Upload completo para `public_html`
- [ ] Site acessível no domínio
- [ ] Navegação funcionando
- [ ] Formulários operacionais
- [ ] Teste em mobile realizado

## 🔄 Atualizações Futuras

Para atualizações:

1. Repita o processo de build
2. Substitua os arquivos na Hostinger
3. Limpe o cache do navegador
4. Teste novamente todas as funcionalidades

---

**Dica**: Mantenha sempre um backup dos arquivos antes de fazer atualizações!