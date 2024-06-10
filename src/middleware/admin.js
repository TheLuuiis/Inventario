const adminMiddleware = (req, res, next) => {
    if (req.user.rol !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
  
  module.exports = adminMiddleware;  