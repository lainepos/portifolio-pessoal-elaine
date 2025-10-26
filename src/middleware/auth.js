const authService = require('../services/authService');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Token error' });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });
  try {
    const decoded = authService.verify(token);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
