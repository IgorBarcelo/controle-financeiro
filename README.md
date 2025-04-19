# 💰 Controle Financeiro
Aplicação full-stack para gerenciamento de títulos financeiros, permitindo a criação, edição, exclusão e visualização de registros O frontend é desenvolvido em Nuxt 3, enquanto o backend é construído com ASP.NET Core e Entity Framework Core.

## 📸 Demonstração

![Demo](https://github.com/IgorBarcelo/controle-financeiro/blob/main/public/demo.png?raw=true)
---
## 🛠️ Tecnologias Utilizadas

### Frontend

- [Nuxt 3](https://nuxt.com/)
- [Axios](https://axios-http.com/): Cliente HTTP para requisições à API

### Backend

- [ASP.NET Core 6](https://dotnet.microsoft.com/): Framework para construção de APIs
- [Entity Framework Core](https://docs.microsoft.com/ef/core/): ORM para interação com o banco de dados

## ✅ Funcionalidades

- Adicionar novos títulos financeiros
- Editar títulos existentes
- Excluir títulos
- Visualizar lista de títulos com ordenação e formatação de dados

## 📦 Requisitos
- [Node.js](https://nodejs.or/)
- [.NET Core SDK](https://dotnet.microsoft.com/downlod)
- Banco de dados (SQL Server, SQLite, etc.)


## 🚀 Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/IgorBarcelo/controle-financeiro.git
cd controle-financeiro
```

### 2. Configurar o Backend

```bash
dotnet run
```

### 3. Configurar o Frontend

```bash
cd ../front
npm install
npm run serve
```

### 4. ▶️ Outra maneira de ezecutar o projeto

1. Pressione `Ctrl + Shift + P` no VS Code
2. Digite `Run Task`
3. Escolha: **Start Fullstack**

Ou acesse pela barra de menu:
```
Terminal > Run Task > Rodar Projeto Completo
```

Acesse o aplicativo em `http://localhost:3000`.

## 📁 Estrutura do Projeto

```
controle-financeiro/
├── .vscode/
├── APIfinanceiro/         # Backend em ASP.NET Core
│   ├── Controllers/
│   ├── Models/
│   └── ...
├── front/                 # Frontend em Vue.js
│   ├── src/
│   ├── public/
│   └── ...
├── README.md
└── .gitignore
```

---
## Créditos
Desenvolvido por [Igor Barcelo](https://www.linkedin.com/in/igor-barcelo-631010216/)
