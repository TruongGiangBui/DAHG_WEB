const Film = require('../models/Films');
const { mongooseToObject } = require('../../util/mongoose');

class FilmController {
  //[GET] /films/:slug
  detail(req, res, next) {
    Film.findOne({ slug: req.params.slug })
      .then((film) => {
        res.render('films/detail', {
          film: mongooseToObject(film),
        });
      })
      .catch(next);
  }
    watch(req, res, next) {
        Film.findOne({ slug: req.params.slug })
          .then((film) => {
            Film.findOneAndUpdate(
              { slug: film.slug },
              {views:Number(film.views)+1}
            ).catch(next)
            
            res.render('films/watch', {
              film: mongooseToObject(film),
            });
            return
          })
          .catch();
      }
}
module.exports = new FilmController();
