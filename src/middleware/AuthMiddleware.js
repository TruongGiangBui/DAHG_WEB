const User=require('../app/models/User')
module.exports = {
    userauth(req, res, next)
    {
        if (req.signedCookies.user) {
            User.findOne({ username: req.signedCookies.user})
            .then(user => {
                if (user.username === req.signedCookies.user&&(user.role==="user"||user.role==="admin")) {
                    next();
                }
                else res.send({ err: "Access denies" })
            }).catch(() => {
                res.send({ err: "Access denies" })
            })
        }else res.send({ err: "Access denies" })
    },
    adminauth(req, res, next) { 
        if (req.signedCookies.user) {
            User.findOne({ username: req.signedCookies.user})
            .then(user => {
                if (user.username === req.signedCookies.user&&user.role==="admin") {
                    next();
                }
                else res.send({ err: "Access denies" })
            }).catch(() => {
                res.send({ err: "Access denies" })
            })
        }else res.send({ err: "Access denies" })
    }
    
}