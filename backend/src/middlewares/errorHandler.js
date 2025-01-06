import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
  // Log do erro
  logger.error(err.message, {
    method: req.method,
    path: req.path,
    body: req.body,
    stack: err.stack
  });

  // Tratamento de erros específicos
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: Object.values(err.errors).map(error => error.message)
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Token inválido ou expirado'
    });
  }

  // Erro genérico
  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Rota não encontrada'
  });
};