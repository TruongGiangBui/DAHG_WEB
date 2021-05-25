

class IntroController {
  //[GET] /
  index(req, res, next) {
      res.render("intro");
  }
}
module.exports = new IntroController();
