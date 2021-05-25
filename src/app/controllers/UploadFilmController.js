const Film=require('../models/Films')
const { multipleMongooseToObject } = require('../../util/mongoose');

class UploadFilmController {
  //[GET] /
  index(req, res, next) { 
    var err = {
      1: "Vui lòng điền đầy đủ thông tin",
      2: "Vui lòng điền đúng định dạng liên kết đến trailer",
      3: "Vui lòng điền đúng định dạng liên kết đến phim",
      4: "Phim đã tồn tại"
        }
        if(req.query.err)
          res.render("user/uploadfilm", { alert: err[req.query.err] })
      else res.render("user/uploadfilm")
    }
}
module.exports = new UploadFilmController();