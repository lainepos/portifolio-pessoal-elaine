const eventsService = require('../services/eventsService');

exports.create = (req, res) => {
  const { title, date, ministryId, assignments } = req.body;
  if (!title || !date || !ministryId) return res.status(400).json({ error: 'title, date and ministryId are required' });
  try {
    const event = eventsService.create({ title, date, ministryId, assignments });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = (req, res) => {
  res.json(eventsService.list());
};
