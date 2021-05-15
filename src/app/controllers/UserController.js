const { notify } = require('../../routes/apis');
const Film = require('../models/Films');
const User=require('../models/User')

class UserController {
    //post login 
    //post
    login_post(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ username: username})
            .then(user => {
                if (user.username === username) {
                    if (user.password === password) {
                        res.cookie("user", user.username);
                        res.cookie("role", user.role);
                        res.redirect("/")
                    }
                    else res.redirect("/user/login?err=1")
                }
                else 
                res.redirect("/user/login?err=2")
            }).catch(() => {
                res.redirect("/user/login?err=2")
            })
    }
    logout(req, res, next) {
        res.clearCookie('user');
        res.clearCookie('role');
        res.redirect("/")
    }
    //create new user
    //post
    create_user(req, res, next) {
        if (req.body.username != null) {
            console.log(req.body.username)
            var user = new User({ username: req.body.username, password:req.body.password })
            user.save()
            .then(user => {
                res.cookie("user", user.username);
                res.cookie("role", user.role);
                res.redirect("/")
            }).catch(() => {
                res.redirect("/user/signup?err=1")
            })
        } 
    }
    //role all
    //userinfo
    //get
    userinfo(req, res, next) {
        User.findOne({ username: req.cookies.user })
        .then(user => {
            res.send({username:user.username,role:user.role});
        }).catch(() => {
            res.send({"err":"Bạn chưa đăng nhập"});
        })
    }
    //role all
    addhistory(req, res, next) {
        if (req.body.slug)
        {
            User.findOneAndUpdate(
                { username: req.cookies.user },
                {
                    $push:{history:req.body.slug}
                }
            ).then(() => res.send({ info:"success"}))
                .catch(() => {
                    res.send({ info: "fail" })
            }) 
        }else res.send({ info: "fail" })
    }
    gethistory(req, res, next) {
        var page = 1;
        if (req.query.page) page = Number(req.query.page)
        var begin = (page - 1) * 10
        var end = page * 10;
        User.findOne({ username: req.cookies.user })
            .then(user =>{
                res.send(user.history.reverse().slice(begin, end));
        }).catch(next)
        
        
    }

    //role admin
    //delete
    deleteuser(req, res, next) {
        User.findOneAndDelete({ "username": req.body.username })
            .then(user => {
            res.send(user)
        }).catch(next)
    }
    //user notification
    //get
    notification(req, res, next) {
        User.findOne({ username: req.cookies.user })
        .then(user => {
            res.send(user.notification);
        }).catch(() => {
            res.send([]);
        })
    }
    //views user
    //role admin
    //get
    viewallusers(req, res, next) {
        res.send("all users")
    }

    //role admin
    //delete
    deletefilm(req, res, next) {
        res.send("delete film")
    }
    //role admin
    //post
    modifyfilm(req, res, next) {
        res.send("modify film")
    }
    //upload film
    //role admin
    //post
    uploadfilm(req, res, next) {
        res.send("uploadfilm")
    }
}
module.exports = new UserController();
