const Film = require('../models/Films');

class ApiController {
    allfilms(req,res,next) {
        var query = {};
        var page = 1;
        if (req.query.page) page = Number(req.query.page)
        var begin = (page - 1) * 10
        var end = page * 10;
        if (req.query.keyword) query ={ $text: { $search: req.query.keyword} } ;
        Film.find(query)
        .then((films) => {
            res.send(films.slice(begin,end))
      })
      .catch(next);
    }
    mostviewsfilms(req, res, next) {
        Film.find(
            {},//search filter
            ['movie_name_eng','poster_link','slug','views'],//column return
            {
                skip: 0, //starting row
                limit: 10,//end
                sort: {
                    views:-1//DESC
                }
            }
        ).then(films => {
            res.send(films);
        }).catch(next)
    }
    getfilm(req, res, next) {
        Film.findOne(
            {slug:req.params.slug}
        ).then(film => {
            res.send(film);
        }).catch(next)
    }
}
module.exports = new ApiController();
