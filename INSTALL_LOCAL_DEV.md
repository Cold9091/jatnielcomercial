# Guia de Instalação para Desenvolvimento Local

Este guia contém instruções passo a passo para configurar o ambiente de desenvolvimento deste projeto localmente.

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18.x ou superior)
- [npm](https://www.npmjs.com/) (v8.x ou superior) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Passos para Instalação

### 1. Clone o Repositório

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório do projeto
cd jatniel-comercial-site
```

### 2. Instale as Dependências

```bash
# Usando npm
npm install

# OU usando yarn
yarn install
```

### 3. Configure as Variáveis de Ambiente (Se necessário)

```bash
# Copie o arquivo de exemplo para criar seu arquivo .env
cp .env.example .env

# Edite o arquivo .env com suas configurações
# Para desenvolvimento local, geralmente não é necessário alterar nada
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
# Usando npm
npm run dev

# OU usando yarn
yarn dev
```

Após executar este comando, o servidor estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura de Diretórios

Para ajudar você a se familiarizar com o projeto, aqui está uma breve explicação da estrutura de diretórios:

- `client/` - Código frontend (React)
- `server/` - Código backend (Express)
- `shared/` - Código compartilhado entre frontend e backend
- `attached_assets/` - Imagens e recursos utilizados no projeto

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Exibe a versão de produção localmente
- `npm run lint` - Executa o linter para verificação de código
- `npm run test` - Executa os testes (se configurados)

## Pontos de Entrada do Código

- Frontend: `client/src/main.tsx`
- Backend: `server/index.ts`

## Dicas para Desenvolvimento

### Hot Reload

O projeto está configurado com hot reload, o que significa que suas alterações serão refletidas automaticamente no navegador sem necessidade de recarregar a página manualmente.

### Console do Desenvolvedor

Mantenha o console do navegador aberto durante o desenvolvimento para verificar erros e logs. Ferramentas como React Developer Tools podem ser úteis para depuração de componentes React.

### Validação de Tipos TypeScript

Execute `npx tsc --noEmit` periodicamente para verificar se todos os tipos estão corretos.

## Solução de Problemas

### Erro ao instalar dependências

Se você encontrar problemas ao instalar as dependências, tente:

```bash
# Limpar o cache do npm
npm cache clean --force

# Remover node_modules e reinstalar
rm -rf node_modules
npm install
```

### Porta já em uso

Se a porta 3000 já estiver em uso, você pode alterar a porta no arquivo `server/index.ts` ou encerrar o processo que está usando essa porta.

### Problemas com Vite

Se encontrar problemas com o Vite, tente:

```bash
# Remover o cache do Vite
rm -rf node_modules/.vite

# Reinstalar as dependências
npm install
```

## Próximos Passos

Após configurar o ambiente com sucesso, consulte o arquivo `DEVELOPER_GUIDE.md` para obter informações detalhadas sobre o desenvolvimento e a arquitetura do projeto.

---

Em caso de dúvidas ou problemas, entre em contato através do WhatsApp (+244) 922 534 433 ou via email.