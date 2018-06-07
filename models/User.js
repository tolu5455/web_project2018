var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    role: String
});

UserSchema.virtual('url').get(function(){
    return '/catalog/user/' + this._id;
  })

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);