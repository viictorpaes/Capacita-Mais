<h1 align="center"> <img src="https://cdn.simpleicons.org/nestjs/E0234E" width="35"/> Capacita-Mais | Back-End Core
</h1>

<pre>
├── README.md<img src="https://img.shields.io/badge/Markdown-111827?style=for-the-badge&logo=markdown&logoColor=white" height="18"/>
└── capacita-back-end/
    ├── dist/ <img src="https://img.shields.io/badge/Build-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="18"/>
    ├── node_modules/ <img src="https://img.shields.io/badge/Deps-111827?style=for-the-badge&logo=npm&logoColor=CB3837" height="18"/>
    ├── prisma/ <img src="https://img.shields.io/badge/Database-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="18"/>
    ├── src/ <img src="https://img.shields.io/badge/Source-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="18"/>
    ├── test/ <img src="https://img.shields.io/badge/Tests-111827?style=for-the-badge&logo=jest&logoColor=C21325" height="18"/>
    ├── .env <img src="https://img.shields.io/badge/Config-111827?style=for-the-badge&logo=dotenv&logoColor=white" height="18"/>
    ├── .gitignore <img src="https://img.shields.io/badge/Git-111827?style=for-the-badge&logo=git&logoColor=F05032" height="18"/>
    ├── .prettierrc <img src="https://img.shields.io/badge/Format-111827?style=for-the-badge&logo=prettier&logoColor=F7B93E" height="18"/>
    ├── docker-compose.yml <img src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ED" height="18"/>
    ├── eslint.config.mjs <img src="https://img.shields.io/badge/Lint-111827?style=for-the-badge&logo=eslint&logoColor=4B32C3" height="18"/>
    ├── nest-cli.json <img src="https://img.shields.io/badge/CLI-111827?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="18"/>
    ├── openapi.yaml <img src="https://img.shields.io/badge/Swagger/Doc_da_API-111827?style=for-the-badge&logo=swagger&logoColor=85EA2D" height="18"/>
    ├── package-lock.json <img src="https://img.shields.io/badge/Lock-111827?style=for-the-badge&logo=npm&logoColor=CB3837" height="18"/>
    ├── package.json <img src="https://img.shields.io/badge/Manifest-111827?style=for-the-badge&logo=npm&logoColor=CB3837" height="18"/>
    ├── prisma.config.ts <img src="https://img.shields.io/badge/Prisma_Config-111827?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="18"/>
    ├── README.md <img src="https://img.shields.io/badge/Markdown-111827?style=for-the-badge&logo=markdown&logoColor=white" height="18"/>
    ├── tsconfig.build.json <img src="https://img.shields.io/badge/TS_Build-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" height="18"/>
    └── tsconfig.json <img src="https://img.shields.io/badge/TS_Config-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" height="18"/>
</pre>

<h2 align="center"> 🔑 Versões mínimas para rodar o projeto: </h2>

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; width: 100%;">
  <img src="https://img.shields.io/badge/Node.js-v22.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=339933" height="25" />
  <img src="https://img.shields.io/badge/TypeScript-v5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=3178C6" height="25" />
  <img src="https://img.shields.io/badge/NestJS-v11.0+-E0234E?style=for-the-badge&logo=nestjs&logoColor=E0234E" height="25" />
  <img src="https://img.shields.io/badge/Prisma-v7.4+-5A67D8?style=for-the-badge&logo=prisma&logoColor=5A67D8" height="25" />
  <img src="https://img.shields.io/badge/PostgreSQL-v8.19+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/Docker-v24.x+-2496ED?style=for-the-badge&logo=docker&logoColor=2496ED" height="25" />
</div>


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
* **`prisma.config.ts`**: Configurações de execução e extensões para o Prisma ORM.
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
<img src="https://img.shields.io/badge/Swagger/Doc_da_API-111827?style=for-the-badge&logo=swagger&logoColor=85EA2D" height="22"/></h2>

Após rodar o servidor, acesse a documentação interativa:
> **URL:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

<h2 align="center">📂 Modularização SCM (Service, Module & Controller)<br>
<img src="https://img.shields.io/badge/-NestJS-111827?style=flat&logo=nestjs&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Service-111827?style=flat&logo=typescript&logoColor=3178C6" height="18"/>
<img src="https://img.shields.io/badge/-Module-111827?style=flat&logo=typescript&logoColor=E0234E" height="18"/>
<img src="https://img.shields.io/badge/-Controller-111827?style=flat&logo=typescript&logoColor=F7DF1E" height="18"/>
</h2>

### ![Controller](https://img.shields.io/badge/Controller-TypeScript-F7DF1E?style=flat-square&logo=typescript&logoColor=F7DF1E) `.controller.ts`

Camada de **entrada da API**. Recebe as requisições HTTP e define as rotas (`@Get`, `@Post`, `@Put`, `@Delete`). Não contém lógica de negócio — apenas delega ao Service. É aqui que decorators de documentação e metadados de rota são aplicados.

**Arquivos neste projeto:** `app.controller.ts` `auth.controller.ts` `courses.controller.ts` `enrollments.controller.ts` `users.controller.ts`

### ![Service](https://img.shields.io/badge/Service-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=3178C6) `.service.ts`

Camada de **lógica de negócio**. Processa os dados recebidos do Controller, aplica as regras da aplicação (validações, hash de senha com `bcrypt`, geração de JWT) e comunica com o banco via Prisma. Injetado no Controller via `@Injectable()`.

**Arquivos neste projeto:** `app.service.ts` `auth.service.ts` `courses.service.ts` `enrollments.service.ts` `prisma.service.ts` `users.service.ts`

### ![Module](https://img.shields.io/badge/Module-TypeScript-E0234E?style=flat-square&logo=typescript&logoColor=E0234E) `.module.ts`

**Unidade de organização** do NestJS. Agrupa e registra o Controller e o Service de um domínio (`imports`, `providers`, `controllers`, `exports`). Permite que outros módulos reutilizem os providers via <b>`exports`</b>. O `AppModule` é o módulo raiz que importa todos os demais.

**Arquivos neste projeto:** `app.module.ts` `auth.module.ts` `courses.module.ts` `enrollments.module.ts` `prisma.module.ts` `users.module.ts`