# Blog Focus Feed

FocusFeed é uma plataforma moderna de blog construída com a stack MERN, oferecendo uma experiência intuitiva para criação e compartilhamento de conteúdo. Com um editor rico em recursos e um sistema robusto de gerenciamento de conteúdo, o FocusFeed proporciona todas as ferramentas necessárias para autores expressarem suas ideias.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🚀 Funcionalidades

### Gerenciamento de Conteúdo

- Editor de texto rico com suporte para formatação avançada (H1, H2, listas, links, negrito, itálico, sublinhado)
- Sistema de categorização de posts
- Suporte para tags
- Upload de imagens via URL
- Sistema de preview antes da publicação

### Interação e Engajamento

- Sistema de likes/dislikes em posts
- Contador de visualizações
- Perfis personalizáveis de autores
- Newsletter para acompanhamento de atualizações

### Gestão de Usuários

- Sistema completo de autenticação
- Perfis personalizáveis
- Dashboard para gestão de posts
- Métricas de engajamento por post

## Tecnologias Utilizadas

### Frontend

- [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces de usuário.
- [Vite](https://vitejs.dev/) - Ferramenta de build para um desenvolvimento frontend rápido.
- [React Router](https://reactrouter.com/) - Para roteamento e navegação na aplicação.
- [React Hook Form](https://react-hook-form.com/) - Para gerenciamento de formulários.
- [React Select](https://react-select.com/) - Para campos de seleção customizados.
- [React Toastify](https://react-toastify.js.org/) - Para notificações e alertas.
- [@tiptap/react](https://tiptap.dev/) - Um editor de texto rico para a criação de posts.
- [Yup](https://yup.schemas.com/) - Para validação de formulários.
- [Axios](https://axios-http.com/ptbr/docs/intro) - Cliente HTTP para fazer requisições ao backend.
- [SCSS Modules](https://create-react-app.dev/docs/using-css-modules/) - Para estilização com escopo local.

### Backend

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
- [Express.js](https://expressjs.com/) - Framework web para Node.js.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Para limitar requisições repetidas.
- [express-validator](https://express-validator.github.io/) - Para validação dos dados da requisição.
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL para armazenamento dos dados da aplicação.
- [Mongoose](https://mongoosejs.com/) - ODM (Object Data Modeling) para interagir com o MongoDB.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Para criptografia de senhas.
- [jsonwebtoken](https://jwt.io/) - Para autenticação e autorização baseada em tokens.
- [dotenv](https://www.npmjs.com/package/dotenv) - Para gerenciamento de variáveis de ambiente.
- [nodemailer](https://nodemailer.com/about/) - Para envio de e-mails (newsletter, recuperação de senha).
- [winston](https://github.com/winstonjs/winston) - Para logging da aplicação.
- [cors](https://expressjs.com/en/resources/middleware/cors.html) - Middleware para habilitar o CORS.
- [helmet](https://helmetjs.github.io/) - Para segurança através de vários headers HTTP.
- [node-cron](https://www.npmjs.com/package/node-cron) - Para agendamento de tarefas (envio automático de newsletter).
- [html-to-text](https://www.npmjs.com/package/html-to-text) - Para converter HTML em texto simples para e-mails.

### Outras Ferramentas

- [concurrently](https://www.npmjs.com/package/concurrently) - Para executar frontend e backend simultaneamente durante o desenvolvimento.
- [standard-version](https://github.com/conventional-changelog/standard-version) - Para versionamento semântico e geração de CHANGELOG.

## 📦 Instalação

1. Clone o repositório

```bash

git clone https://github.com/Amicuchi/BlogFocusFeed.git

cd BlogFocusFeed

```

2. Instale as dependências

```bash
# Raiz do projeto
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

```

3. Configure as variáveis de ambiente

Backend (.env):

```env

# Configurações do Servidor
PORT=5000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=sua_uri_mongodb

# Configurações de Segurança
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=100

# Configurações de Email
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app
FRONTEND_URL=http://localhost:5173

# Segurança
JWT_SECRET=seu_jwt_secret
JWT_EXPIRES_IN=1d

```

Frontend (.env):

```env

VITE_API_BASE_URL=http://localhost:5000

```

4. Inicie a aplicação

```bash

# Na pasta raiz da aplicação
npm run dev

```

## 🔐 Endpoints da API

```javascript
// Usuários
POST   /api/users/register       // Registro de usuário
POST   /api/users/login          // Login
GET    /api/users/user           // Perfil do usuário
PUT    /api/users/user           // Atualização de perfil
DELETE /api/users/user           // Exclusão de conta

// Posts
GET    /api/posts                // Lista todos os posts
GET    /api/posts/:id            // Detalhes do post
POST   /api/posts                // Cria novo post
PUT    /api/posts/:id            // Atualiza post
DELETE /api/posts/posts/:id      // Remove post
POST   /api/posts/:id/like       // Like em post
POST   /api/posts/:id/dislike    // Dislike em post
```

## 📱 Screenshots

### Home

<img src="./screenshots/01_TelaInicial.png" alt="Página Inicial" width="500">

### Perfil de Usuário

<img src="./screenshots/05_PerfilUsuario.png" alt="Perfil do Usuário" width="500">

### Editor de Posts

<img src="./screenshots/07_NovoPost.png" alt="Editor de Posts" width="500">

### Posts do Usuário

<img src="./screenshots/06_PostsUsuario.png" alt="Posts do Usuário" width="500">

### Posts Aberto

<img src="./screenshots/08_PostAberto.png" alt="Post Aberto" width="500">

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Atualizações e Correções (com as quais você pode contribuir)

Aqui estão algumas sugestões de melhorias nas quais você pode colaborar para melhorar o projeto:

### Funcionalidades

- [ ] **Sistema de Preview Antes da Publicação:** Implementar um sistema de visualização para o usuário antes de publicar um post, permitindo ajustes finais.

- [ ] **Criação de Posts Patrocinados:** Adicionar a funcionalidade para criar posts patrocinados, onde o usuário poderá selecionar essa opção ao criar um post. Após a publicação, um aviso pequeno será exibido (ex.: "Post Patrocinado", similar aos marketplaces como Mercado Livre e Facebook).

- [ ] **Normalização de Tags:** Ao adicionar uma nova tag, o sistema deve normalizá-la, removendo acentos, espaços e aplicando o formato PascalCase, garantindo consistência no banco de dados.

- [ ] **Comentários nos Posts**

- [ ] **Perfis de Autores:** Criar páginas de perfil para cada autor, onde eles podem exibir suas biografias, links para redes sociais e uma lista de seus posts.

- [ ] **SEO:** Otimizar o blog para SEO (Search Engine Optimization) para melhorar a visibilidade nos motores de busca.

### Segurança

- [ ] **Proteção Contra Injeção de SQL:** Embora a aplicação utilize **MongoDB**, é fundamental proteger contra injeções de NoSQL, validando e sanitizando todas as entradas de usuário.

- [ ] **Escalonamento de Ações Sensíveis:** Algumas ações mais delicadas, como a exclusão de um usuário, podem exigir uma confirmação ou justificativa que seja registrada no sistema, aumentando a segurança e controle.

### Testes

- [ ] **Testes Automatizados:** Desenvolver testes unitários e de integração para garantir que os **controllers** e **services** funcionem conforme esperado. Isso facilita a manutenção e ajuda a prevenir regressões no código.

### Documentação

- [ ] **Documentação de Código:** Utilizar comentários e documentação adequada para facilitar a compreensão do código por outros desenvolvedores ou por você mesmo no futuro. Utilizar ferramentas como **[Swagger](https://swagger.io/)** para documentar as rotas pode facilitar a manutenção e a colaboração futura.

### Logging

- [ ] **Logging (Logs e Auditorias):** Implementar um sistema de logging para registrar atividades importantes e erros. Ferramentas como **[Winston](https://github.com/winstonjs/winston)** ou **[Morgan](https://github.com/expressjs/morgan)** podem ser úteis. Ações críticas (ex.: mudança de cargo, exclusão de posts ou usuários) devem ser registradas para garantir rastreabilidade e transparência.

---

### Links e Referências

- **[Swagger](https://swagger.io/)** – Para documentação de APIs.
- **[Winston](https://github.com/winstonjs/winston)** – Para logging de eventos.
- **[Morgan](https://github.com/expressjs/morgan)** – Para logging HTTP.
- **[MongoDB](https://www.mongodb.com/)** – Banco de dados NoSQL utilizado na aplicação.

## 📝 Licença

Este projeto está sob a licença [ISC](https://opensource.org/licenses/ISC).

## Autor

<div align="center">
    <img src="./screenshots/perfil.jpeg" alt="Foto de Anderson Amicuchi Machado" width="150" style="border-radius: 50%;">
  <br>
  <br>
  <p><strong>Anderson Amicuchi Machado</strong></p>
  <p>
    <a href="https://github.com/Amicuchi" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://linkedin.com/in/Amicuchi" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
  </p>
  <p><a href="mailto:AndersonAmicuchi@gmail.com">AndersonAmicuchi@gmail.com</a></p>
  <p>Telefone: +55 (16) 98809-5749</p>
</div>
