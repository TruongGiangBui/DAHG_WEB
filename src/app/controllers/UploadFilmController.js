const Film=require('../models/Films')
const { multipleMongooseToObject } = require('../../util/mongoose');

class UploadFilmController {
  //[GET] /
    index(req, res, next) {        
        console.log("call")
        res.render("user/uploadfilm")
    }
}
module.exports = new UploadFilmController();