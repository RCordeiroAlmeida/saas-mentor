# Saas Mentor

Uma plataforma SaaS moderna para profissionais gerenciarem seus serviços, agendamentos, clientes e planos de assinatura. Desenvolvida com as mais recentes tecnologias web.

## 📋 Visão Geral

**Saas Mentor** é uma solução completa para profissionais independentes (psicólogos, consultores, professores, etc.) que desejam:

- 👤 Gerenciar perfil profissional com informações detalhadas
- 💼 Cadastrar e gerir serviços/produtos oferecidos
- 📅 Controlar agendamentos de clientes
- 💰 Gerenciar planos de assinatura (BASIC e PROFESSIONAL)
- ⏰ Criar lembretes e acompanhamentos
- 🔐 Autenticação segura via OAuth (GitHub)

## ✨ Principais Funcionalidades

### Autenticação e Segurança
- Login seguro via GitHub OAuth
- Gerenciamento de sessões com NextAuth.js
- Proteção de rotas autenticadas

### Gerenciamento de Perfil
- Edição de informações pessoais (nome, endereço, telefone)
- Configuração de fuso horário
- Gestão de status (ativo/inativo)
- Horários disponíveis para agendamentos

### Gerenciamento de Serviços
- Criar, editar e listar serviços
- Definir preço e duração dos serviços
- Controlar disponibilidade (ativo/inativo)

### Sistema de Agendamentos
- Clientes podem agendar serviços
- Gerenciamento de compromissos
- Informações de contato e detalhes do serviço

### Planos e Assinaturas
- Planos BASIC e PROFESSIONAL
- Integração com Stripe para pagamentos
- Gestão de status de assinatura

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js](https://nextjs.org/)** 16.1.6 - Framework React com Server Side Rendering
- **[React](https://react.dev/)** 19.2.3 - Biblioteca de componentes JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** 5 - Superset tipado de JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** 4 - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** 1.4.3 - Biblioteca de componentes headless
- **[shadcn](https://shadcn.dev/)** - Componentes reutilizáveis construídos com Radix UI
- **[Lucide React](https://lucide.dev/)** 0.563.0 - Ícones SVG
- **[Sonner](https://sonner.emilkowal.ski/)** 2.0.7 - Notificações toast elegantes

### Formulários e Validação
- **[React Hook Form](https://react-hook-form.com/)** 5.2.2 - Gerenciamento eficiente de formulários
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** 5.2.2 - Integração com validação Zod

### Backend & Banco de Dados
- **[Prisma](https://www.prisma.io/)** 7.3.0 - ORM moderno para Node.js
- **[@prisma/adapter-pg](https://www.prisma.io/)** 7.3.0 - Adapter PostgreSQL para Prisma
- **[@prisma/extension-accelerate](https://www.prisma.io/accelerate)** 3.0.1 - Extensão de cache e performance
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto
- **[pg](https://node-postgres.com/)** 8.18.0 - Node.js driver para PostgreSQL

### Autenticação
- **[NextAuth.js](https://next-auth.js.org/)** 5.0.0-beta.30 - Autenticação para Next.js
- **[@auth/prisma-adapter](https://authjs.dev/)** 2.11.1 - Adapter Prisma para NextAuth

### Utilidades
- **[clsx](https://github.com/lukeed/clsx)** 2.1.1 - Utilitário para strings CSS condicionais
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** 3.4.0 - Merge inteligente de classes Tailwind
- **[class-variance-authority](https://cva.style/)** 0.7.1 - TypeScript-first CSS-in-JS
- **[dotenv](https://github.com/motdotla/dotenv)** 17.2.4 - Carregamento de variáveis de ambiente

### Desenvolvimento
- **[ESLint](https://eslint.org/)** 9 - Linter JavaScript
- **[eslint-config-next](https://nextjs.org/docs/basic-features/eslint)** - Configuração ESLint para Next.js

## 📂 Estrutura do Projeto

```
saas-mentor/
├── app/                          # Aplicação Next.js
│   ├── (panel)/                  # Rotas autenticadas (Dashboard)
│   │   ├── _components/          # Componentes compartilhados
│   │   └── dashboard/            # Página principal do dashboard
│   │       ├── profile/          # Gerenciamento de perfil
│   │       ├── services/         # Gerenciamento de serviços
│   │       ├── plans/            # Planos e assinaturas
│   │       └── layout.tsx        # Layout do dashboard
│   ├── (public)/                 # Rotas públicas
│   │   ├── page.tsx              # Homepage
│   │   └── _components/          # Componentes públicos
│   ├── api/                      # Rotas API
│   │   └── auth/                 # Autenticação
│   └── layout.tsx                # Layout raiz
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # Componentes UI (shadcn)
│   └── providers/                # Provedores (Tema, etc)
├── lib/                          # Utilidades e configurações
│   ├── auth.ts                   # Configuração NextAuth
│   ├── prisma.ts                 # Cliente Prisma
│   └── utils.ts                  # Funções auxiliares
├── prisma/                       # Banco de dados
│   ├── schema.prisma             # Esquema do banco
│   └── migrations/               # Histórico de migrações
├── types/                        # Type definitions
├── utils/                        # Funções utilitárias
└── public/                       # Arquivos estáticos
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL instalado e rodando
- Conta GitHub (para OAuth)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/saas-mentor.git
cd saas-mentor
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/saas_mentor"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID="seu-github-id"
GITHUB_SECRET="seu-github-secret"

# Stripe (opcional)
STRIPE_SECRET_KEY="sua-chave-stripe"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="sua-publishable-key"
```

4. **Execute as migrações do banco de dados**
```bash
npm run prisma:migrate
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador!

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Constrói a aplicação para produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint para verificar código
```

## 🗄️ Modelos de Dados

### User
- Informações do usuário
- Campos: id, name, email, phone, address, timeZone, stripe_customer_id
- Relações: services, appointments, reminders, subscription

### Service
- Serviços oferecidos pelo profissional
- Campos: id, name, price, duration, status, userId

### Appointment
- Agendamentos de clientes
- Campos: id, name, email, phone, appointmentDate, time, serviceId, userId

### Subscription
- Planos de assinatura
- Suporta: BASIC e PROFESSIONAL
- Integração com Stripe

### Reminder
- Lembretes e acompanhamentos
- Campos: id, description, userId

## 🔐 Autenticação

O projeto utiliza **NextAuth.js** com OAuth do GitHub:

1. Usuário clica em "Login com GitHub"
2. Redirecionado para GitHub para autenticação
3. Retorna para aplicação com sessão autenticada
4. Acesso às rotas protegidas do dashboard

Rotas públicas:
- `/` - Homepage
- `/api/auth/*` - Endpoints de autenticação

Rotas protegidas:
- `/dashboard` - Dashboard principal
- `/dashboard/profile` - Gerenciamento de perfil
- `/dashboard/services` - Gerenciamento de serviços
- `/dashboard/plans` - Planos e assinaturas

## 📚 Documentação Útil

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

## 🚢 Deploy

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usar a [Plataforma Vercel](https://vercel.com):

1. Push seu código para GitHub
2. Conecte seu repositório no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático realizado!

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais informações.

### Variáveis de Ambiente em Produção

Certifique-se de configurar as seguintes variáveis no seu ambiente de produção:
- `DATABASE_URL` - Conexão PostgreSQL
- `NEXTAUTH_SECRET` - Chave secreta para sessões
- `NEXTAUTH_URL` - URL da aplicação
- `GITHUB_ID` e `GITHUB_SECRET` - Credenciais OAuth

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir uma Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

## 👨‍💼 Autor

Desenvolvido com ❤️

---

**Última atualização**: Março de 2026
