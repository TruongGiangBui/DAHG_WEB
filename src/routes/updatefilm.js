const express = require('express');
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const updatefilmController = require('../app/controllers/UpdateFilmController');
router.get('/updatefilm/:slug',middleware.adminauth, updatefilmController.index);
module.exports = router;