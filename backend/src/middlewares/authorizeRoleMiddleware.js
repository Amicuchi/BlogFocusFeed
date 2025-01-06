import { UserRoles } from "../models/User.js";

const authorizeRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user;

  // Log dos cargos válidos
  const validRoles = Object.values(UserRoles);
  
  // Log de verificação de cargos inválidos
  const invalidRoles = allowedRoles.filter((role) => !validRoles.includes(role));

  if (invalidRoles.length > 0) {
    console.error(`authorizeRole: Cargos inválidos encontrados em allowedRoles: ${invalidRoles.join(", ")}`);
    return res.status(500).json({ message: "Configuração de cargos inválida" });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

export default authorizeRole;