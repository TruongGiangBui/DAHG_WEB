const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname:{ type : String , required : true},
    username:{ type : String , unique : true, required : true},
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    history: [{ type: String }],
    notification: [{
        img: { type: String },
        info:{type:String}
    }]
});

module.exports = mongoose.model('User', User);
