const express = require('express');
const router = express.Router();
const ministryController = require('../controllers/ministryController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/', ministryController.create);
router.get('/', ministryController.list);

module.exports = router;
