var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    role: String,
    sex: String,
    birthday: String,
    address: String,
    phone: String
});

UserSchema.virtual('url').get(function () {
    return '/catalog/user/' + this._id;
})

UserSchema.methods.changePassword = function (oldPassword, newPassword, cb) {
    if (!oldPassword || !newPassword) {
        return cb(new errors.MissingPasswordError(options.errorMessages.MissingPasswordError));
    }

    var self = this;

    this.authenticate(oldPassword, function (err, authenticated) {
        if (err) {
            return cb(err);
        }

        if (!authenticated) {
            return cb(new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError));
        }

        self.setPassword(newPassword, function (setPasswordErr, user) {
            if (setPasswordErr) {
                return cb(setPasswordErr);
            }

            self.save(function (saveErr) {
                if (saveErr) {
                    return cb(saveErr);
                }

                cb(null, user);
            });
        });
    });
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);