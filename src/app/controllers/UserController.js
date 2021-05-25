const { notify } = require('../../routes/apis');
const Film = require('../models/Films');
const User=require('../models/User')
const md5=require('md5')
class UserController {
    //post login 
    //post
    login_post(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ username: username})
            .then(user => {
                if (user.username === username) {
                    if (user.password === md5(password)) {
                        res.cookie("user", user.username, {
                            signed:true
                        });
                        res.cookie("role", user.role,{
                            signed:true
                        });
                        res.redirect("/home")
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
        res.redirect("/home")
    }
    //create new user
    //post
    create_user(req, res, next) {
        
            var user = new User({fullname:req.body.fullname, username: req.body.username, password:md5(req.body.password) })
            user.save()
            .then(user => {
                res.cookie("user", user.username,{
                    signed:true
                });
                res.cookie("role", user.role,{
                    signed:true
                });
                res.redirect("/home")
            }).catch(() => {
                res.redirect("/user/signup?err=1")
            })
    }
    //role all
    //userinfo
    //get
    userinfo(req, res, next) {
        User.findOne({ username: req.signedCookies.user })
        .then(user => {
            res.send({fullname:user.fullname,username:user.username,role:user.role});
        }).catch(() => {
            res.send({"err":"Bạn chưa đăng nhập"});
        })
    }
    //role all
    addhistory(req, res, next) {
        if (req.body.slug)
        {
            
            User.findOneAndUpdate(
                { username: req.signedCookies.user },
                {
                    $push:{history:req.body.slug}
                }
            ).then(() => res.send({ info:"success"}))
                .catch((err) => {
                    res.send({ info: err })
            }) 
        }else res.send({ info: "fail" })
    }
    gethistory(req, res, next) {
        var page = 1;
        if (req.query.page) page = Number(req.query.page)
        var begin = (page - 1) * 10
        var end = page * 10;
        User.findOne({ username: req.signedCookies.user })
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
        User.findOne({ username: req.signedCookies.user })
        .then(user => {
            res.send(user.notification.reverse().slice(0,7));
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
        console.log(req.query.slug)
        Film.findOneAndDelete({ slug: req.query.slug })
            .then(film => {
                console.log(film)
                var notification = {
                    img: `/img/delete.png`,
                    info: "Xóa thành công "+film.movie_name_eng
                }
                
                try {
                    if (fs.existsSync(`src/public/appdata/filmposters/${film.slug}.jpg`)) {
                        fs.unlinkSync(`src/public/appdata/filmposters/${film.slug}.jpg`,function (err) { console.log(err) })
                    }
                } catch (error) {
                    
                }
                
                
                User.findOneAndUpdate(
                    { username: req.signedCookies.user }, 
                    { $push: { notification: notification} }
                ).then(() => {
                    res.send({info:"success"})
                }).catch((err) => {
                    res.send({ info: err })
                })
        }).catch((err) => {
            res.send({ info: err })
        })
    }
    //role admin
    //post
    updatefilm(req, res, next) {
        console.log(req.params.slug)
        Film.findOneAndUpdate({ slug: req.params.slug },
            req.body
        ).then(film => {
            var notification = {
                img: `/appdata/filmposters/${film.slug}.jpg`,
                info: "Phim cập nhật hoàn tất"
            }
            User.findOneAndUpdate(
                { username: req.signedCookies.user }, 
                { $push: { notification: notification} }
            ).then(() => {
                
                res.redirect(`/films/${film.slug}`);
            }).catch(() => {
                res.redirect(`/films/${film.slug}`);
            })
                
        })
    }
    //upload film
    //role admin
    //post
    uploadfilm(req, res, next) {
        var newfilm = new Film(req.body);
        newfilm.save()
            .then((film) => { 
                var notification = {
                    img: `/appdata/filmposters/${film.slug}.jpg`,
                    info: "Phim tải lên hoàn tất"
                }
                User.findOneAndUpdate(
                    { username: req.signedCookies.user }, 
                    { $push: { notification: notification} }
                ).then(() => {
                    
                    res.redirect(`/films/${film.slug}`);
                }).catch(() => {
                    res.redirect(`/films/${film.slug}`);
                })
                    
                })   
            .catch((err) => { 
                var notification = {
                    img: `/img/err.jpg`,
                    info: "Lỗi trong quá trình tải lên"
                }
                User.findOneAndUpdate(
                    { username: req.signedCookies.user }, 
                    { $push: { notification: notification} }
                ).then(() => {
                    
                    res.redirect(`/films/${film.slug}`);
                }).catch(() => {
                    res.redirect(`/films/${film.slug}`);
                })
            })
    }

    changepassword(req, res, next)
    {
        User.findOneAndUpdate(
            { username: req.signedCookies.user }, 
            {password:md5(req.body.newpassword)}
        ).then(user => {
            res.redirect("/user/manageaccount")
        }).catch(() => {
            res.redirect("/user/manageaccount?err=4")
        })
    }
}
module.exports = new UserController();
