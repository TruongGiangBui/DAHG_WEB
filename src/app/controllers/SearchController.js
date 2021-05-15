const Film = require('../models/Films');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SearchController {
  //[GET] /
  index(req, res, next) {
    var query = { $text: { $search: '' } };

    if (req.query.keyword != '') query.$text.$search = req.query.keyword;
    else query = {};
    Film.find(query)
      .then((films) => {
        res.render('search', {
          films: multipleMongooseToObject(films),
        });
      })
      .catch(next);
  }
}
module.exports = new SearchController();
