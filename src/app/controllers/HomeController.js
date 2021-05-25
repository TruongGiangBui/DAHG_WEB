const Film = require('../models/Films');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
  //[GET] /
  index(req, res, next) {
    Film.find({})
      .then((films) => {
        var page = 1;
        if (req.query.page) page = Number(req.query.page);
        var begin = (page - 1) * 12
        var end = page * 12;
        res.render('home', {
          films: multipleMongooseToObject(films).slice(begin,end),
        });
      })
      .catch(next);
  }
}
module.exports = new HomeController();
