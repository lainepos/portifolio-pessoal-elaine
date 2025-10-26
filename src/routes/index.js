const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const ministryRoutes = require('./ministries');
const peopleRoutes = require('./people');
const eventsRoutes = require('./events');

router.use('/auth', authRoutes);
router.use('/ministries', ministryRoutes);
router.use('/people', peopleRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
