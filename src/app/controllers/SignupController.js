

class SignupController {
    index(req, res, next) {
      var param={errs:[]}
      if (req.query.err == 1) param.errs = ["Người dùng đã tồn tại"]
          res.render('user/signup',param)
    }
  }
  module.exports = new SignupController();
  