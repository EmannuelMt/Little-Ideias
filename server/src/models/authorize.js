exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Usuário com role ${req.user.role} não está autorizado a acessar esta rota` 
      });
    }
    next();
  };
};