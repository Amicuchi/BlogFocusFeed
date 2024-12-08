import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

// Substituir __dirname
const __filename = fileURLToPath(import.meta.url); // Obtem o nome completo do arquivo atual
const __dirname = path.dirname(__filename);        // Obtem o diretório do arquivo atual
  // O import.meta.url é utilizado para acessar o caminho completo do módulo em execução. 
  // Em seguida, transforma-se isso em __dirname e __filename usando o módulo path.

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log')
    })
  ]
});

export default logger;