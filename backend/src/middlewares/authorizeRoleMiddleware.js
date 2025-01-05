import { UserRoles } from "../models/User.js";

const authorizeRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

export default authorizeRole;
