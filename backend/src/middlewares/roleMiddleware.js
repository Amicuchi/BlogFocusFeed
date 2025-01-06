const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      try {
        // Verifica se o usuário está autenticado
        if (!req.user) {
          return res.status(403).json({ message: "Acesso negado. Usuário não autenticado." });
        }
  
        // Verifica se o cargo do usuário está na lista de cargos permitidos
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Acesso negado. Permissão insuficiente." });
        }
  
        // Se tudo estiver ok, passa para a próxima middleware ou rota
        next();
      } catch (error) {
        console.error("Erro na verificação de permissões:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
      }
    };
  };
  
  export default checkRole;
  