const authService = require('../services/authService');

exports.login = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = authService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.register = (req, res) => {
  const { username, password, person } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    const user = authService.createUser(username, password, person);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
