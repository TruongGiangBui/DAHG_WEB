const express = require('express');
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const manageaccountController = require('../app/controllers/ManageAccountController');
router.get('/manageaccount',middleware.userauth,manageaccountController.index );
module.exports = router;
