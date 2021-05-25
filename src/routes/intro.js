const express = require('express');
const router = express.Router();
const introController = require('../app/controllers/IntroController');

router.get('/', introController.index);
module.exports = router;
