const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/', peopleController.create);
router.get('/', peopleController.list);

module.exports = router;
