# Guia do Desenvolvedor - Jatniel Comercial

Este documento contém informações técnicas detalhadas para desenvolvedores que trabalharão neste projeto.

## Ambiente de Desenvolvimento

### Configuração Recomendada

- **Editor**: VS Code com as seguintes extensões:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

- **Node.js**: v18.x ou superior
- **npm**: v8.x ou superior

### Configurações do VS Code Recomendadas

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## Arquitetura do Projeto

### Frontend (React + TypeScript)

O frontend está construído sobre React com TypeScript, utilizando a seguinte estrutura:

- **Components**: Componentes reutilizáveis organizados por funcionalidade
- **Pages**: Páginas completas da aplicação
- **Hooks**: Custom hooks React para lógica reutilizável
- **Lib**: Utilitários e funções auxiliares

#### Principais Bibliotecas

1. **Shadcn UI**: Fornece componentes de UI reutilizáveis e estilizáveis
2. **TailwindCSS**: Framework CSS utility-first para estilização
3. **React Hook Form**: Gerenciamento de formulários com validação
4. **Zod**: Validação de esquemas e tipagem
5. **TanStack Query**: Para gerenciamento de estado de dados e caching
6. **Wouter**: Roteamento leve para navegação

### Backend (Express + TypeScript)

O backend é uma API simples em Express que:

1. Serve o frontend através do Vite em desenvolvimento
2. Fornece endpoints para operações CRUD
3. Implementa um sistema de armazenamento em memória para desenvolvimento

### Comunicação Frontend-Backend

- As chamadas de API são gerenciadas através de `apiRequest` em `client/src/lib/queryClient.ts`
- As rotas da API são definidas em `server/routes.ts`
- A validação de dados é feita utilizando os esquemas Zod em `shared/schema.ts`

## Fluxo de Dados

1. **Formulários**:
   - Validação com Zod (`shared/schema.ts`)
   - Submissão via React Hook Form
   - Processamento através de TanStack Query para chamadas de API

2. **Exibição de Dados**:
   - Busca via TanStack Query
   - Renderização condicional baseada no estado de loading/error/success

## Componentes Principais

### Layout e Navegação

- **Header**: Navegação principal e toggle de tema
- **Footer**: Links de contato e redes sociais
- **FloatingWhatsApp**: Botão flutuante para contato direto

### Seções da Página Inicial

- **Hero**: Banner principal com call-to-action
- **Services**: Cards de serviços oferecidos
- **AboutUs**: Informações sobre a empresa
- **StatsCounter**: Contador animado de estatísticas
- **WorkProcess**: Timeline do processo de trabalho
- **Courses**: Informações sobre cursos oferecidos
- **DesignServices**: Detalhes dos serviços de design
- **Portfolio**: Galeria de trabalhos
- **Testimonials**: Depoimentos de clientes
- **Faq**: Perguntas frequentes segmentadas por categoria
- **ContactForm**: Formulário de contato com integração WhatsApp

## Estilização e Temas

### Sistema de Cores

As cores primárias são definidas em `client/src/index.css` e referenciadas no restante do projeto:

```css
:root {
  --primary-light: #2563eb; /* Azul principal */
  --primary-dark: #1e40af; /* Azul escuro */
  /* Outras variáveis de cores... */
}
```

### Componentes Shadcn UI

Os componentes Shadcn UI são altamente customizáveis. A customização principal é feita em:

1. `components.json` - Configuração geral do Shadcn
2. `tailwind.config.ts` - Definições de tema para o Tailwind
3. Cada componente individual na pasta `client/src/components/ui/`

## Integrações

### WhatsApp

A integração com WhatsApp é feita através da função `getWhatsAppLink` em `client/src/lib/utils.ts`, que gera uma URL para abrir o WhatsApp com uma mensagem pré-preenchida.

No componente `ContactForm.tsx`, a função `buildWhatsAppMessage` formata os dados do formulário em uma mensagem legível para envio.

## Processo de Desenvolvimento

### 1. Adicionando um Novo Componente

1. Crie o arquivo em `client/src/components/`
2. Importe e utilize-o onde necessário
3. Para componentes de UI reutilizáveis, considere adicioná-los à pasta `client/src/components/ui/`

### 2. Adicionando uma Nova Página

1. Crie o arquivo em `client/src/pages/`
2. Adicione a rota em `client/src/App.tsx`:

```tsx
<Route path="/nova-pagina" component={NovaPagina} />
```

### 3. Adicionando um Novo Endpoint de API

1. Adicione o endpoint em `server/routes.ts`:

```typescript
app.get("/api/novo-endpoint", async (req: Request, res: Response) => {
  // Implementação
});
```

2. Se necessário, adicione novos métodos na interface `IStorage` em `server/storage.ts`
3. Implemente esses métodos na classe `MemStorage`

### 4. Modificando o Esquema de Dados

1. Atualize os esquemas em `shared/schema.ts`
2. Atualize os tipos correspondentes
3. Atualize qualquer validação de formulário que utilize esses esquemas

## Problemas Comuns e Soluções

### 1. Erro ao iniciar o servidor

Verifique se todas as dependências foram instaladas:

```bash
npm install
```

### 2. Erros de TypeScript

Verifique se os tipos estão corretamente definidos e importados:

```bash
npx tsc --noEmit
```

### 3. Componente não renderizando

Verifique o Console do navegador para erros. Problemas comuns incluem:
- Props incorretas ou faltando
- Erros em hooks (regras de hooks violadas)
- Renderização condicional mal implementada

## Otimização de Performance

### Lazy Loading

Para componentes pesados, considere usar lazy loading:

```tsx
const PesadoComponente = React.lazy(() => import('./PesadoComponente'));

// Em seu componente
<React.Suspense fallback={<div>Carregando...</div>}>
  <PesadoComponente />
</React.Suspense>
```

### Memoização

Para componentes que recebem as mesmas props frequentemente:

```tsx
const MeuComponente = React.memo(({ prop1, prop2 }) => {
  // Implementação
});
```

## Plano de Desenvolvimento Futuro

### Fase 1: Melhorias Imediatas

- [ ] Sistema de autenticação para área administrativa
- [ ] Dashboard administrativo para visualizar mensagens de contato
- [ ] Integração com Google Analytics
- [ ] Otimização de SEO adicional

### Fase 2: Funcionalidades Avançadas

- [ ] Blog com sistema de gerenciamento de conteúdo
- [ ] Sistema de agendamento de consultorias
- [ ] Galeria de projetos com filtragem e paginação
- [ ] Integração com sistema de pagamento para cursos online

---

Desenvolvido por Jatniel Comercial - 2025