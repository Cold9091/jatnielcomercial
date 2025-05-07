# Jatniel Comercial - Site Institucional

Este é o projeto do site institucional para Jatniel Comercial, uma empresa angolana especializada em desenvolvimento web, design gráfico e cursos de marketing digital.

![Logo Jatniel Comercial](./attached_assets/Imagem_WhatsApp_2025-05-07_às_21.25.17_2ac63904-removebg-preview.png)

## Sobre o Projeto

O site foi desenvolvido com tecnologias modernas, focando em uma experiência de usuário rica e responsiva. Apresenta os serviços oferecidos pela empresa, incluindo:

- Desenvolvimento web (Landing Pages, Sites Profissionais, E-commerce)
- Design gráfico (Criação de Logotipos, Branding, Banners Publicitários)
- Cursos de marketing digital (Google Ads, Facebook Ads, TikTok Ads)

## Tecnologias Utilizadas

- **Frontend**: React.js com TypeScript
- **Estilização**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Roteamento**: Wouter
- **Estado**: React Context API
- **HTTP Client**: TanStack Query
- **Formulários**: React Hook Form com Zod
- **Backend**: Express.js
- **Armazenamento**: In-memory storage (para desenvolvimento)

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v8 ou superior)
- Git

### Passos para Execução Local

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd jatniel-comercial-site
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**

```bash
npm run dev
```

Isso iniciará o servidor Express na porta 3000 que serve tanto o backend API quanto o frontend React.

## Estrutura do Projeto

```
jatniel-comercial-site/
├── attached_assets/         # Imagens e outros recursos anexados
├── client/                  # Código frontend
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilidades e funções auxiliares
│   │   ├── pages/           # Páginas da aplicação
│   │   └── App.tsx          # Componente principal
├── server/                  # Código backend
│   ├── index.ts             # Entrada principal do servidor
│   ├── routes.ts            # Definição de rotas API
│   ├── storage.ts           # Lógica de armazenamento
│   └── vite.ts              # Configuração do Vite para servidor
├── shared/                  # Código compartilhado entre frontend e backend
│   └── schema.ts            # Definições de esquema/tipos
└── ...                      # Arquivos de configuração
```

## Funcionalidades Implementadas

1. **Layout Responsivo**: Otimizado para desktop, tablet e dispositivos móveis
2. **Modo Escuro**: Suporte para tema claro e escuro
3. **Animações**: Transições suaves e microinterações para engajamento do usuário
4. **Formulário de Contato**: Com validação e integração com WhatsApp
5. **SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação
6. **Contador Estatístico**: Exibe estatísticas da empresa de forma animada
7. **FAQ Interativo**: Seção de perguntas frequentes com tabs por categoria
8. **Processo de Trabalho**: Timeline visual do fluxo de trabalho da empresa

## API Endpoints

- `POST /api/contact` - Envia dados de contato (mesmo que redirecione para WhatsApp, também armazena no backend)
- `GET /api/contacts` - Obtém lista de contatos (apenas para fins administrativos)

## Personalização

Os principais arquivos para personalização são:

- `client/src/index.css` - Para ajustar cores e estilos globais
- `tailwind.config.ts` - Para configurar temas e variáveis do Tailwind
- `client/src/components/` - Para alterar os componentes individuais

## Desenvolvimento Contínuo

### Adicionar Novas Páginas

1. Crie um novo arquivo na pasta `client/src/pages/`
2. Registre a rota no arquivo `client/src/App.tsx`

### Modificar Componentes

Os componentes estão organizados por função na pasta `client/src/components/`. Cada componente é auto-contido e pode ser modificado individualmente.

### Estender o Backend

1. Adicione novas rotas em `server/routes.ts`
2. Estenda a interface de armazenamento em `server/storage.ts`
3. Adicione novos esquemas em `shared/schema.ts`

## Integração com WhatsApp

O formulário de contato está configurado para enviar os dados diretamente para o WhatsApp da empresa, utilizando a URL API do WhatsApp. A formatação da mensagem está definida na função `buildWhatsAppMessage` no componente `ContactForm.tsx`.

## Considerações para Produção

Para deploy em produção, considere:

1. Configurar um banco de dados real (PostgreSQL, MongoDB, etc.)
2. Implementar autenticação para área administrativa
3. Adicionar monitoramento e logging
4. Configurar CI/CD para atualizações automatizadas
5. Implementar CDN para recursos estáticos

## Suporte

Para suporte ou dúvidas, entre em contato através do WhatsApp (+244) 922 534 433 ou via email.

---

Desenvolvido com ❤️ para Jatniel Comercial.