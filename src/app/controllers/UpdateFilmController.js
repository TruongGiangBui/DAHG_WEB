const Film=require('../models/Films')
const { multipleMongooseToObject } = require('../../util/mongoose');

class UpdateFilmController {
  //[GET] /
    index(req, res, next) {        
       
        res.render("user/updatefilm")
    }
}
module.exports = new UpdateFilmController();
