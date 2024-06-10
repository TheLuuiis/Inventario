const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_secreto');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token no es válido' });
  }
};

module.exports = authMiddleware;