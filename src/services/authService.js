const jwt = require('jsonwebtoken');
const { db, save } = require('../db/memory');

const SECRET = process.env.JWT_SECRET || 'dev_secret';

exports.login = (username, password) => {
  const user = db.users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, username: user.username, ministries: user.ministries }, SECRET, { expiresIn: '8h' });
  return token;
};

exports.verify = (token) => jwt.verify(token, SECRET);

exports.createUser = (username, password, person) => {
  if (db.users.find(u => u.username === username)) throw new Error('username already exists');
  const id = `user-${Date.now()}`;
  const user = { id, username, password, ministries: [] };
  db.users.push(user);
  // if person object provided, create a people entry and link
  if (person && person.name) {
    const peopleService = require('./peopleService');
    const p = peopleService.create(person);
    // if role is leader, link user to ministries
    if (p.role === 'leader') {
      user.ministries = user.ministries || [];
      if (p.ministries && p.ministries.length) user.ministries.push(...p.ministries);
    }
    user.personId = p.id;
  }
  save();
  return user;
};
