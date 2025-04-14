import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import logger from "./src/config/logger.js";
import {
  errorHandler,
  notFoundHandler
} from "./src/middlewares/errorHandler.js";

// Sobre as rotas
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import passwordRoutes from "./src/routes/passwordRoutes.js";
import newsletterRoutes from "./src/routes/newsletterRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

// Newsletter
import initializeNewsletterAutomation from "./src/services/newsletterAutomation.js";

dotenv.config();

// Validação de variáveis de ambiente
const requiredEnvVars = ["MONGODB_URI", "CORS_ORIGIN", "RATE_LIMIT_MAX"];
requiredEnvVars.forEach((env) => {
  if (!process.env[env]) {
    console.error(`Variável de ambiente ${env} não está configurada.`);
    process.exit(1);
  }
});

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  message: 'Você ultrapassou o limite de requisições. Tente novamente mais tarde.',
});
app.use(limiter);

// Middlewares padrão
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Conexão com MongoDB estabelecida"))
  .catch(err => logger.error("Erro na conexão com MongoDB", err));

// Rotas
app.use("/api/users", userRoutes);            // Rotas para usuários
app.use("/api/posts", postRoutes);            // Rotas para posts
app.use("/api/categories", categoryRoutes);   // Rotas para categorias
app.use("/api/contact", contactRoutes);       // Rotas para contato
app.use("/api/auth", passwordRoutes);         // Rotas para reset e recuperação de senha
app.use("/api/newsletter", newsletterRoutes); // Rotas para inscrição e cancelamento de inscrição na newsletter
app.use("/api/admin", adminRoutes);           // Rotas para administradores

// Newsletter
initializeNewsletterAutomation();

// Handlers de erro
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
const PORT = parseInt(process.env.PORT || "5000");
const server = app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Rejeição não tratada em:", promise, "razão:", reason);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  logger.error("Exceção não capturada:", error);
  server.close(() => process.exit(1));
});