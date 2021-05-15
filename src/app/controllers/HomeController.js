const Film = require('../models/Films');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
  //[GET] /
  index(req, res, next) {
    Film.find({})
      .then((films) => {
        res.render('home', {
          films: multipleMongooseToObject(films),
        });
      })
      .catch(next);
  }
}
module.exports = new HomeController();
