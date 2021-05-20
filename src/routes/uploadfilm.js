const express = require('express');
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const uploadfilmController = require('../app/controllers/UploadFilmController');
router.get('/uploadfilm',middleware.adminauth, uploadfilmController.index);
module.exports = router;