const User=require('../models/User')
const { multipleMongooseToObject } = require('../../util/mongoose');

class ManageFilmController {
  //[GET] /
    index(req, res, next) {        
        var page = 1;
        if (req.query.page) page = Number(req.query.page);
        res.render("user/managefilm",{page:page})
    }
}
module.exports = new ManageFilmController();
