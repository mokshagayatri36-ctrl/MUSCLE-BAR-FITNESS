import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'muscle-bar-fitness-centre-secret-key-2026', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role.toUpperCase() !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
  next();
};

export const requireMember = (req, res, next) => {
  if (!req.user || !req.user.role || (req.user.role.toUpperCase() !== 'MEMBER' && req.user.role.toUpperCase() !== 'ADMIN')) {
    return res.status(403).json({ message: 'Access denied: Member privileges required' });
  }
  next();
};
