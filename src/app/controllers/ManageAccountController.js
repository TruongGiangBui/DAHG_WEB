const User=require('../models/User')
const { mongooseToObject } = require('../../util/mongoose');

class ManageAccountController {
  //[GET] /
    index(req, res, next) {        
        var alerterr = {
            1: "Vui lòng điền đủ thông tin",
            2: "Xác minh mật khẩu sai",
            3: "Sai mật khẩu cũ",
            4: "Đã xảy ra lỗi, vui lòng thử lại"
        }
        var info = ""
        
        if (req.query.err) {
            info=alerterr[req.query.err]
        }
        User.findOne({ username: req.signedCookies.user })
            .then(user => {
                res.render("user/manageaccount", {
                    user: mongooseToObject(user),
                    alert:info
            })
        })
    }
}
module.exports = new ManageAccountController();
