var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

var dp1 = ""
var dp2 = ""
var dp3 = "none"
var dp4 = "none"
var dp5 = "none"
var dp6 = "none"

// Restrict access to root page
userController.home = function (req, res) {
  res.redirect('/catalog');
};
//  { user : req.user }
// Go to registration page
userController.register = function (req, res) {
  res.render('register', {
    display1: dp1,
    display2: dp2,
    display3: dp3,
    display4: dp4,
    dpbrand: dp5,
    dpsearch: dp6
  });
};

// Post registration
userController.doRegister = function (req, res) {
  if (req.body.password != req.body.repass) {
    res.render('register', {
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4,
      dpbrand: dp5,
      dpsearch: dp6,
      thongbao: "Mật khẩu không trùng khớp"
    })
  } else {
    User.register(new User({
      username: req.body.username,
      name: req.body.name
    }), req.body.password, function (err, user) {
      if (err) {
        return res.render('register', {
          thongbao: "Tên đăng nhập đã tồn tại",
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4,
          dpbrand: dp5,
          dpsearch: dp6
        });
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/catalog/homepage/'+req.body.username);
      });
    });
  }
};

// Go to login page
userController.login = function (req, res) {
  if (!req.isAuthenticated())
    res.render('login', {
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4,
      dpbrand: dp5,
      dpsearch: dp6
    });
  //else res.redirect('/');
};

// Post login
userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, function (err) {
    if (err) req.flash("login fail", err)
    if (req.body.username == "admin") {
      res.redirect('/catalog/admin/' + req.user.username);
    } else {
      res.redirect('/catalog/homepage/' + req.user.username);
    }
  });
};

// logout
userController.logout = function (req, res) {
  req.logout();
  res.redirect("/");
};

module.exports = userController;