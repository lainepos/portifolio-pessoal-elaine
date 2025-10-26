const ministryService = require('../services/ministryService');

exports.create = (req, res) => {
  const { name, leaders, members } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const ministry = ministryService.create({ name, leaders, members });
  res.status(201).json(ministry);
};

exports.list = (req, res) => {
  const list = ministryService.list();
  res.json(list);
};
