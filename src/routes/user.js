const express = require('express');
const fs=require('fs')
const multer=require('multer')
const router = express.Router();
const middleware=require("../middleware/AuthMiddleware")
const userController = require('../app/controllers/UserController');
const validateform = require("../middleware/ValidateFormMiddleware");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/public/appdata/filmposters/');
    },
  
    filename: function (req, file, cb) {
        if (fs.existsSync("src/public/appdata/filmposters/newposter.jpg"))
            fs.unlinkSync("src/public/appdata/filmposters/newposter.jpg",function (err) { console.log(err) })
        
        cb(null,"newposter.jpg");
    }
});
  
var upload = multer({ storage: storage })

router.post('/create',validateform.validatesignupform, userController.create_user);
router.post('/loginpost', userController.login_post);
router.get('/logout',middleware.userauth,userController.logout);
router.delete('/deleteuser',middleware.adminauth,userController.deleteuser);
router.get('/info',middleware.userauth,userController.userinfo)
router.get('/notification', middleware.userauth, userController.notification);
router.put('/addhistory', middleware.userauth, userController.addhistory);
router.get('/history',middleware.userauth,userController.gethistory)
router.delete('/deletefilm', middleware.adminauth,userController.deletefilm);
router.post('/uploadfilm',
    middleware.adminauth,
    upload.single('poster'),
    validateform.validateuploadform,
    userController.uploadfilm);
router.post('/updatefilm/:slug',
    middleware.adminauth,
    upload.single('poster'),
    validateform.validateupdateform,
    userController.updatefilm);
router.post('/changepassword',
    middleware.userauth,
    validateform.validatechangepasswordform,
    userController.changepassword);
router.get('/allusers',middleware.adminauth,userController.viewallusers)
module.exports = router;
