const Film = require("../app/models/Films")
const User=require("../app/models/User")
const fs = require('fs')
const md5=require('md5')
module.exports = {
    validatesignupform(req, res, next) {
        for (var key in req.body) {
            if(req.body[key]=="") res.redirect("/user/signup?err=3")
        }
        if (!(req.body.password === req.body.confirmpassword))
            res.redirect("/user/signup?err=2")
        
        next();
    },
    validatechangepasswordform(req, res, next) {
        for (var key in req.body) {
            if(req.body[key]=="") res.redirect("/user/manageaccount?err=1")
        }
        if (!(req.body.newpassword === req.body.confirmnewpassword))
            res.redirect("/user/manageaccount?err=2")     
        User.findOne({ username: req.signedCookies.user })
            .then(user => {
                if (!(user.password === md5(req.body.oldpassword))) {
                res.redirect("/user/manageaccount?err=3")    
                }
                next();
            }).catch(() => {
                res.redirect("/user/manageaccount?err=3")
        })
    },
    validateuploadform(req, res, next) {
        var err = 0;
        for (var key in req.body)
        {
            if (req.body[key].trim() == "") err = 1;
        }
        if (!validateYouTubeUrl(req.body.trailer_link)) err = 2;
        if (!validateDriveUrl(req.body.film_link)) err = 3;
        if (err != 0) res.redirect(`/user/uploadfilm?err=${err}`)
        else {
            req.body.slug= req.body.movie_name_eng.trim().split(" ").join("-")
            Film.find({ slug: req.body.slug })
                .then(films => {
                    
                    if (films.length != 0) {
                        req.body.slug = req.body.movie_name_eng.trim().split(" ").join("-") + "-" + req.body.director.trim().split(" ").join("-");            
                        
                    }
                    req.body.trailer_link = "https://www.youtube.com/embed/" + req.body.trailer_link.split("watch?v=")[1]
                    req.body.film_link = req.body.film_link.split("view")[0] + "preview"
                    req.body.views = 0;
                    req.body.poster_link = `/appdata/filmposters/${req.body.slug}.jpg`
                    if (fs.existsSync("src/public/appdata/filmposters/newposter.jpg"))
                    {fs.rename("src/public/appdata/filmposters/newposter.jpg", `src/public/appdata/filmposters/${req.body.slug}.jpg`, function (err) { console.log(err) })}
                    next();
                }).catch(() => {})
            
        }
        
        
        
        function validateYouTubeUrl(urlToParse){
            if (urlToParse) {
                var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                if (urlToParse.match(regExp)) {
                    return true;
                }
            }
            return false;
        }
        function validateDriveUrl(urlToParse){
            if (urlToParse) {
                var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:drive\.google\.com\/(?:file\/(?:d\/)))(?:\S+)?$/;
                if (urlToParse.match(regExp)) {
                    return true;
                }
            }
            return false;
        }
    },
    validateupdateform(req, res, next) {
        var err = 0;
        for (var key in req.body)
        {
            if (req.body[key].trim() == "") err = 1;
        }
        if (!validateYouTubeUrl(req.body.trailer_link)) err = 2;
        if (!validateDriveUrl(req.body.film_link)) err = 3;
        if (err != 0) res.redirect(`/user/updatefilm/${req.params.slug}?err=${err}`)
        else {
            req.body.slug= req.params.slug            
            req.body.trailer_link = "https://www.youtube.com/embed/" + req.body.trailer_link.split("watch?v=")[1]
            req.body.film_link = req.body.film_link.split("view")[0] + "preview"
            req.body.poster_link = `/appdata/filmposters/${req.body.slug}.jpg`
            if (req.file) {
                if (fs.existsSync(`src/public/appdata/filmposters/${req.body.slug}.jpg`))
                    fs.unlinkSync(`src/public/appdata/filmposters/${req.body.slug}.jpg`)
                if (fs.existsSync("src/public/appdata/filmposters/newposter.jpg")) {
                    fs.rename("src/public/appdata/filmposters/newposter.jpg", `src/public/appdata/filmposters/${req.body.slug}.jpg`, function (err) { console.log(err) })
                }
            }
            next();
            
        }
        
        
        
        function validateYouTubeUrl(urlToParse){
            if (urlToParse) {
                var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                if (urlToParse.match(regExp)) {
                    return true;
                }
            }
            return false;
        }
        function validateDriveUrl(urlToParse){
            if (urlToParse) {
                var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:drive\.google\.com\/(?:file\/(?:d\/)))(?:\S+)?$/;
                if (urlToParse.match(regExp)) {
                    return true;
                }
            }
            return false;
        }
    }
}