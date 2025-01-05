import { UserRoles } from "../models/User.js";

const authorizeRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  // Validando cargos permitidos para consistência
  const validRoles = Object.values(UserRoles);
  const invalidRoles = allowedRoles.filter((role) => !validRoles.includes(role));

  if (invalidRoles.length > 0) {
    console.error(
      `authorizeRole: Cargos inválidos encontrados em allowedRoles: ${invalidRoles.join(", ")}`
    );
    return res.status(500).json({ message: "Configuração de cargos inválida" });
  }

  console.log("AuthorizeRole - Cargo do usuário:", userRole);

  // Verificando permissão
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: "Acesso negado" });
  }

  next();
};

export default authorizeRole;
