# WA Web Design — Área do Cliente

Dashboard da **WA Web Design** onde os clientes podem acessar sua conta, acompanhar o andamento dos projetos, preencher o briefing, visualizar o plano contratado e gerenciar todos os seus sites.

Agora o projeto está separado em **duas aplicações**:

- **frontend/** → Interface do cliente (React + Vite)
- **api/** → Backend da aplicação

---

# Estrutura do Projeto

```
Saas-Asaas/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── api/
│   ├── controllers/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

# Iniciando o Front-end

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

O painel ficará disponível em:

```
http://localhost:5173
```

---

# Iniciando a API

Entre na pasta da API:

```bash
cd api
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

---

# Funcionalidades

O dashboard do cliente já está totalmente desenvolvido e conta com:

- Login
- Cadastro de clientes
- Dashboard inicial
- Gerenciamento de múltiplos sites
- Acompanhamento do progresso de cada projeto
- Linha do tempo do Método WA
- Checklist de páginas
- Briefing completo
- Cadastro de novos sites
- Atualizações do projeto

---

# Backend

A API é responsável por:

- Autenticação
- Gerenciamento de clientes
- Gerenciamento de sites
- Briefings
- Atualizações
- Upload de arquivos
- Planos
- Integração com banco de dados

---

# Tecnologias

## Front-end

- React
- Vite
- React Router
- Context API

## Back-end

- Node.js
- Express
- Prisma
- SQL

---

# Desenvolvimento

Para executar o projeto completo, mantenha dois terminais abertos:

### Terminal 1

```bash
cd api
npm install
npm run dev
```

### Terminal 2

```bash
cd frontend
npm install
npm run dev
```
