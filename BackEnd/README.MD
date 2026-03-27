<h1 align="center"> <img src="https://cdn.simpleicons.org/nestjs/E0234E" width="35"/> Capacita-Mais | Back-End Core
</h1>

<pre>
|README.md<img src="https://img.shields.io/badge/Markdown-FFFFFF?style=for-the-badge&logo=markdown&logoColor=000000" height="18"/>
|capacita-back-end/
├── dist/ <img src="https://img.shields.io/badge/Build-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" height="18"/>
├── node_modules/ <img src="https://img.shields.io/badge/Deps-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="18"/>
├── prisma/ <img src="https://img.shields.io/badge/Database-2D3748?style=for-the-badge&logo=prisma&logoColor=white" height="18"/>
├── src/ <img src="https://img.shields.io/badge/Source-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" height="18"/>
├── test/ <img src="https://img.shields.io/badge/Tests-E0234E?style=for-the-badge&logo=jest&logoColor=white" height="18"/>
├── .env <img src="https://img.shields.io/badge/Config-000000?style=for-the-badge&logo=dotenv&logoColor=white" height="18"/>
├── .gitignore <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=black" height="18"/>
├── .prettierrc <img src="https://img.shields.io/badge/Format-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" height="18"/>
├── docker-compose.yml <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=black" height="18"/>
├── eslint.config.mjs <img src="https://img.shields.io/badge/Lint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" height="18"/>
├── nest-cli.json <img src="https://img.shields.io/badge/CLI-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" height="18"/>
├── openapi.yaml <img src="https://img.shields.io/badge/Swagger/Doc_da_API-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" height="18"/>
├── package-lock.json <img src="https://img.shields.io/badge/Lock-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="18"/>
├── package.json <img src="https://img.shields.io/badge/Manifest-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="18"/>
├── prisma.config.mjs <img src="https://img.shields.io/badge/Prisma_Config-2D3748?style=for-the-badge&logo=prisma&logoColor=white" height="18"/>
├── README.md <img src="https://img.shields.io/badge/Markdown-FFFFFF?style=for-the-badge&logo=markdown&logoColor=000000" height="18"/>
├── tsconfig.build.json <img src="https://img.shields.io/badge/TS_Build-3178C6?style=for-the-badge&logo=typescript&logoColor=black" height="18"/>
└── tsconfig.json <img src="https://img.shields.io/badge/TS_Config-3178C6?style=for-the-badge&logo=typescript&logoColor=black" height="18"/>
</pre>


<h2 align="center"> 🔑 Versões mínimas para rodar o projeto: </h2>

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; width: 100%;">
  <img src="https://img.shields.io/badge/Node.js-v22.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/TypeScript-v5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=black" height="25" />
  <img src="https://img.shields.io/badge/NestJS-v11.0+-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/Prisma-v7.4+-2D3748?style=for-the-badge&logo=prisma&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/PostgreSQL-v8.19+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/Docker-v24.x+-2496ED?style=for-the-badge&logo=docker&logoColor=white" height="25" />
</div>

---

<h2 align="center"> 📂 Anatomia Detalhada do Projeto: </h2>

### 📁 Diretórios Principais:

* **`dist/`**: Pasta de distribuição. Contém o código convertido de TypeScript para JavaScript (`npm run build`). É o que roda em produção.
* **`node_modules/`**: Onde ficam todas as bibliotecas instaladas. Nunca deve ser editada manualmente.
* **`prisma/`**: Camada de banco de dados. Contém o `schema.prisma` (modelagem) e as `migrations` (histórico de alterações no banco).
* **`src/`**: Onde o desenvolvimento acontece. Contém Controllers (rotas), Services (lógica) e Modules (configuração).
* **`test/`**: Focado em testes **E2E (End-to-End)**, que testam a aplicação de ponta a ponta (da requisição ao banco).

### ⚙️ Arquivos de Configuração:

* **`.env`**: Suas "chaves do reino". Guarda senhas de banco e segredos JWT. **Não versione este arquivo.**
* **`.gitignore`**: Lista o que o Git deve ignorar (como a `node_modules` e o `.env`).
* **`.prettierrc`**: Regras de "estética" do código (espaços, aspas, ponto e vírgula).
* **`docker-compose.yaml`**: Orquestra seus containers. Ele sobe o banco PostgreSQL e o Adminer automaticamente.
* **`eslint.config.mjs`**: O "vigia" do código. Impede erros comuns de lógica e mantém o padrão de escrita.
* **`nest-cli.json`**: Configurações específicas do framework NestJS para build e geração de arquivos.
* **`openapi.yaml`**: Documentação técnica seguindo o padrão OpenAPI/Swagger para integração com outros serviços.
* **`package.json`**: O mapa do projeto. Lista todas as dependências e comandos (`scripts`) disponíveis.
* **`package-lock.json`**: O registro exato de cada versão de sub-dependência instalada. Garante que o projeto rode igual em qualquer PC.
* **`prisma.config.mjs`**: Configurações de execução e extensões para o Prisma ORM.
* **`tsconfig.json`**: Configuração principal do TypeScript. Define como o código deve ser compilado e quais recursos da linguagem usar.
* **`tsconfig.build.json`**: Uma variação do anterior, usada apenas no build final para ignorar arquivos de teste e documentação.

---

<h2 align="center"> 🛠️ Comandos de Controle: </h2>

| Ação | Comando |
| :--- | :--- |
| **Instalar Dependências** | `npm install` |
| **Subir Banco (Docker)** | `docker compose up -d` |
| **Sincronizar Banco** | `npx prisma migrate dev` |
| **Rodar em Dev** | `npm run start:dev` |
| **Executar Testes** | `npm run test` |
| **Gerar Build** | `npm run build` |
| **Interface do Banco** | `npx prisma studio` |


<h2 align="center"> Documentação Local: <br> 
<img src="https://img.shields.io/badge/Swagger/Doc_da_API-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" height="22"/></h2>

Após rodar o servidor, acesse a documentação interativa:
> **URL:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)