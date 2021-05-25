

class SignupController {
    index(req, res, next) {
      var param={errs:[]}
      if (req.query.err == 1) param.errs = ["Người dùng đã tồn tại"]
      else if (req.query.err == 2) param.errs = ["Xác nhận sai mật khẩu"]
      else if (req.query.err == 3) param.errs = ["Vui lòng điền đầy đủ thông tin"]
      else if(req.query.err==4) param.errs=["Ký tự không hợp lệ"]
          res.render('user/signup',param)
    }
  }
  module.exports = new SignupController();
  