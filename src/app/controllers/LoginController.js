const User=require('../models/User')
class LoginController {
  //[GET] /
  index(req, res, next) {
    if (req.signedCookies.user) {
      User.findOne({ username: req.signedCookies.user})
      .then(user => {
          if (user.username === req.signedCookies.user&&(user.role==="user"||user.role==="admin")) {
            res.redirect("/");
          }
          else loadpage(req, res, next)
      }).catch(() => {
        loadpage(req, res, next)
      })
    } else loadpage(req, res, next)
    function loadpage(req, res, next)
    {
      var param={errs:[]}
      if (req.query.err == 1) param.errs = ["Sai mật khẩu"]
      else if(req.query.err == 2) param.errs = ["Người dùng không tồn tại"]
        res.render('user/login',param)
    }        
  }  
}
module.exports = new LoginController();
