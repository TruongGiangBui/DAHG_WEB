const express = require('express');
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const managefilmController = require('../app/controllers/ManageFilmController');
router.get('/managefilm',middleware.adminauth, managefilmController.index);
module.exports = router;