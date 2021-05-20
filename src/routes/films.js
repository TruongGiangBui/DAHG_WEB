const express = require('express');
const router = express.Router();

const filmController = require('../app/controllers/FilmController');
router.get('/:slug/watch',filmController.watch);
router.get('/:slug', filmController.detail);
module.exports = router;
