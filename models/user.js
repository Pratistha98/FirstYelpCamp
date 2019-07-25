 
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    Username: String,
    Password: String
});

UserSchema.plugin(passportLocalMongoose); //gives all the methods and important functionality to the user module

module.exports = mongoose.model("User", UserSchema);