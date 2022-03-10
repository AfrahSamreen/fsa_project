const express = require('express');
const defaultCtrl = require('../controllers/defaultCtrl');

const router = express.Router();

router.get('/', defaultCtrl.get);
router.get('/health', defaultCtrl.health);

module.exports = router;
