import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import logger from './src/config/logger.js';
import { errorHandler, notFoundHandler } from './src/middlewares/errorMiddleware.js';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';

dotenv.config();

const app = express();

// Segurança
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX || 100
});
app.use(limiter);

// Middlewares padrão
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('Conexão com MongoDB estabelecida'))
  .catch(err => logger.error('Erro na conexão com MongoDB', err));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contactadmin', contactRoutes);

// Handlers de erro
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
const PORT = parseInt(process.env.PORT || '5000');
const server = app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Rejeição não tratada em:', promise, 'razão:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  logger.error('Exceção não capturada:', error);
  server.close(() => process.exit(1));
});