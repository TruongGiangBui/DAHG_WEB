const Film=require('../models/Films')
const { mongooseToObject } = require('../../util/mongoose');

class UpdateFilmController {
  //[GET] /
  index(req, res, next) {        
    var err = {
      1: "Vui lòng điền đầy đủ thông tin",
      2: "Vui lòng điền đúng định dạng liên kết đến trailer",
      3: "Vui lòng điền đúng định dạng liên kết đến phim",
      4: "Phim đã tồn tại"
        }
        
      Film.findOne({ slug: req.params.slug })
        .then(film => {
          film.trailer_link = "https://www.youtube.com/watch?v=" + film.trailer_link.split("embed/")[1]
          film.film_link = film.film_link.split("preview")[0] + "view";
          if(req.query.err)
          res.render(`user/updatefilm`, {film:mongooseToObject(film), alert: err[req.query.err] })
          else
          res.render("user/updatefilm", {
            film:mongooseToObject(film)
          })
        }).catch((err) => {
        res.send(err);
      })
        
    }
}
module.exports = new UpdateFilmController();
