const express = require('express');
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const historyController = require('../app/controllers/HistoryController');
router.get('/history',middleware.userauth, historyController.index);
module.exports = router;