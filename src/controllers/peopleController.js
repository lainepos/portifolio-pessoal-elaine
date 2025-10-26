const peopleService = require('../services/peopleService');

exports.create = (req, res) => {
  const { name, phone, ministries, role } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const person = peopleService.create({ name, phone, ministries, role });
  res.status(201).json(person);
};

exports.list = (req, res) => {
  res.json(peopleService.list());
};
