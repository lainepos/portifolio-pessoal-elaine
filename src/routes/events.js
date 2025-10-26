const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/', eventsController.create);
router.get('/', eventsController.list);

module.exports = router;
