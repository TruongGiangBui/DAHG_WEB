const Film = require('../models/Films');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SearchController {
  //[GET] /
  index(req, res, next) {
    var query = { $text: { $search: '' } };
    var page = 1;
    if (req.query.page) page = Number(req.query.page);
    var begin = (page - 1) * 12
    var end = page * 12;
    if (req.query.keyword != '') query.$text.$search = req.query.keyword;
    else query = {};
    Film.find(query)
      .then((films) => {
        res.render('search', {
          films: multipleMongooseToObject(films).slice(begin, end),
          keyword:req.query.keyword
        });
      })
      .catch(next);
  }
}
module.exports = new SearchController();
