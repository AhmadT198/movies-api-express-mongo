const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength: 3,
        maxlength : 255
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength: 3,
        maxlength : 255
    },
    password : {
        type : String,
        required : true,
        minlength: 5,
        maxlength : 1024
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
    console.log("--",token)
    return token;
}

const User = mongoose.model("User", userSchema)

exports.User = User