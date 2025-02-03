# 📝 Blog API

Uma API RESTful para gerenciar postagens de blog, construída com Node.js e Express.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework para criação de APIs
- **Morgan** - Middleware para logs de requisições HTTP
- **FS (File System)** - Para manipulação de arquivos JSON como banco de dados

## 📌 Funcionalidades

- 📜 Criar, listar, buscar, atualizar e deletar posts do blog
- 🔎 Filtrar posts por termos de pesquisa
- ✅ Middleware para validação de requisições

## 📂 Estrutura do Projeto
```
├── src
│   ├── controllers
│   │   └── blogControllers.js
│   ├── routes
│   │   └── blog.routes.js
│   ├── data
│   │   └── blogs.json
├── server.js
├── package.json
└── README.md
```

## 🛠️ Instalação e Uso

1️⃣ Clone o repositório:
```bash
git clone https://github.com/seu-usuario/blog-api.git
cd blog-api
```

2️⃣ Instale as dependências:
```bash
npm install
```

3️⃣ Inicie o servidor:
```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`.

## 📌 Rotas da API

### 🔹 Criar um novo post
`POST /api/v1/blog/posts`
```json
{
  "title": "Meu primeiro post",
  "content": "Este é o conteúdo do post...",
  "category": "Tecnologia",
  "author": "John Doe",
  "tags": ["Node.js", "API"]
}
```

### 🔹 Listar todos os posts
`GET /api/v1/blog/posts`

### 🔹 Buscar um post por ID
`GET /api/v1/blog/posts/:id`

### 🔹 Atualizar um post
`PUT /api/v1/blog/posts/:id`

### 🔹 Deletar um post
`DELETE /api/v1/blog/posts/:id`

## 🎯 Melhorias Futuras
- 🔐 Implementação de autenticação e autorização
- 🗃️ Uso de um banco de dados como MongoDB ou PostgreSQL
- 📈 Paginação para listar posts

## 📜 Licença
Este projeto está sob a licença **MIT**.

