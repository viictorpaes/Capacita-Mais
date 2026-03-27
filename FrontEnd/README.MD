<h1 align="center"> <img src="../FrontEnd/Capacita-Front/public/vite.svg"> Capacita-Mais | Front-End UI </h1>
<pre>
|README.md<img src="https://img.shields.io/badge/Markdown-FFFFFF?style=for-the-badge&logo=markdown&logoColor=000000" height="18"/>
|Capacita-Front/
├── node_modules/<img src="https://img.shields.io/badge/Dependencies-CB3837?style=for-the-badge&logo=npm&logoColor=white" height="18"/>
├── public/ <img src="https://img.shields.io/badge/Public-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="18"/>
├── src/
│   ├── assets/ <img src="https://img.shields.io/badge/Assets-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="18"/>
│   ├── components/ <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" height="18"/>
│   ├── hooks/ <img src="https://img.shields.io/badge/Hooks-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="18"/>
│   ├── pages/ <img src="https://img.shields.io/badge/Pages-000000?style=for-the-badge&logo=next.js&logoColor=white" height="18"/>
│   ├── App.css <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="18"/>
│   ├── App.jsx <img src="https://img.shields.io/badge/App-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="18"/>
│   ├── index.css <img src="https://img.shields.io/badge/Styles-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="18"/>
│   └── main.jsx <img src="https://img.shields.io/badge/Main-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="18"/>
├── .gitignore <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=black" height="18"/>
├── eslint.config.js <img src="https://img.shields.io/badge/Lint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" height="18"/>
└── index.html <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=black" height="18"/>
</pre>

<h2 align="center"> 🔑 Versões mínimas para rodar o projeto: </h2>

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 10px; width: 100%;">
  <img src="https://img.shields.io/badge/Node.js-v22.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/TypeScript-v5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/Vite-v7.3+-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="25" />
  <img src="https://img.shields.io/badge/React-v19.2+-61DAFB?style=for-the-badge&logo=react&logoColor=black" height="25" />
  <img src="https://img.shields.io/badge/React_Router-v7.13+-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" height="25" />
</div>

---

<h2 align="center"> 📂 Anatomia Detalhada do Projeto: </h2>

### 📁 Diretórios Principais:

* **`src/`**: Onde reside toda a lógica da interface, componentes, hooks e páginas em React.
* **`public/`**: Contém arquivos estáticos que não passam pelo processamento do Vite, como o `vite.svg` e o `favicon`.
* **`node_modules/`**: Bibliotecas e pacotes instalados necessários para o funcionamento do Front-end.

### ⚙️ Arquivos de Configuração:

* **`index.html`**: O arquivo principal que serve como ponto de montagem (mount) para a aplicação React.
* **`vite.config.ts`**: Configurações do Vite, como plugins de React, definições de porta e aliases de pastas.
* **`eslint.config.js`**: Define as regras de padronização do código para garantir consistência visual e evitar bugs.
* **`package.json`**: Manifesto do projeto com scripts de execução (`dev`, `build`, `preview`) e dependências.
* **`tsconfig.json`**: Arquivo mestre do TypeScript que orquestra as configurações de compilação.
* **`tsconfig.app.json`**: Configurações específicas para o código que roda no navegador.
* **`tsconfig.node.json`**: Configurações específicas para o ambiente de compilação (Node) durante o desenvolvimento.

---

<h2 align="center"> 🛠️ Comandos de Controle: </h2>

| Ação | Comando |
| :--- | :--- |
| **Instalar Dependências** | `npm install` |
| **Rodar em Desenvolvimento** | `npm run dev` |
| **Gerar Build de Produção** | `npm run build` |
| **Visualizar Build Local** | `npm run preview` |
| **Executar Lint** | `npm run lint` |

---

<h2 align="center"> 🌐 Visualização Local: </h2>

Após rodar o comando de desenvolvimento, acesse no seu navegador:
> **URL:** [http://localhost:5173](http://localhost:5173)