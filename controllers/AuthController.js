var mongoose = require("mongoose");
var passport = require("passport");
var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2");
var User = require("../models/user");

var userController = {};

var dp1 = "";
var dp2 = "";
var dp3 = "none";
var dp4 = "none";
var dp5 = "none";
var dp6 = "none";

var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "frozenheart5455@gmail.com",
    pass: "intheend54"
  },
  tls: { rejectUnauthorized: false }
});

var rand, mailOptions, host, link;
var us, pw, name, email;
// Restrict access to root page
userController.home = function(req, res) {
  res.redirect("/catalog");
};
//  { user : req.user }
// Go to registration page
userController.register = function(req, res) {
  res.render("register", {
    display1: dp1,
    display2: dp2,
    display3: dp3,
    display4: dp4,
    dpbrand: dp5,
    dpsearch: dp6
  });
};

// Post registration
userController.doRegister = function(req, res, next) {
  if (req.body.password != req.body.repass) {
    res.render("register", {
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4,
      dpbrand: dp5,
      dpsearch: dp6,
      thongbao: "Mật khẩu không trùng khớp"
    });
  } else {
    rand = Math.floor(Math.random() * 100 + 54);
    console.log(rand);
    host = req.get("host");
    link = "http://" + host + "/auth/verify?id=" + rand;
    mailOptions = {
      to: req.body.mail,
      subject: "Please confirm your email account",
      html:
        "To register successfully, please click on the link to verify your email.<br><a href=" +
        link +
        "> Click here to verify</a>"
    };
    smtpTransport.sendMail(mailOptions, function(err, response) {
      if (err) return next(err);
      else {
        us = req.body.username;
        pw = req.body.password;
        name = req.body.name;
        email = req.body.mail;
        res.render("register", {
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4,
          dpbrand: dp5,
          dpsearch: dp6,
          thongbao: "Đã gửi email kích hoạt. Vui lòng kích hoạt email"
        });
      }
    });
  }
};

userController.verify = function(req, res) {
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      password = pw;
      User.register(
        new User({
          username: us,
          name: name,
          email: email
        }),
        password,
        function(err, user) {
          if (err) {
            return res.render("register", {
              thongbao: "Tên đăng nhập đã tồn tại",
              display1: dp1,
              display2: dp2,
              display3: dp3,
              display4: dp4,
              dpbrand: dp5,
              dpsearch: dp6
            });
          }
          res.render("login", {
            thongbao: "Xác thực thành công!",
            display1: dp1,
            display2: dp2,
            display3: dp3,
            display4: dp4,
            dpbrand: dp5,
            dpsearch: dp6
          });
        }
      );
    } else {
      console.log("email is not verified");
      res.end("Bad request");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};

// Go to login page
userController.login = function(req, res) {
  if (!req.isAuthenticated())
    res.render("login", {
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
userController.doLogin = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        thongbao: "Sai mật khẩu hoặc không tồn tại tài khoản",
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4,
        dpbrand: dp5,
        dpsearch: dp6
      });
    }
    req.login(user, function(err) {
      if (err) return next(err);
      if (req.body.username == "admin") {
            res.redirect("/catalog/admin/" + req.user.username);
          } else {
            res.redirect("/catalog/homepage/" + req.user.username);
          }
    });
  })(req, res, next);
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

//forgot page

userController.forgot = function(req, res) {
  res.render("forgot", {
    display1: dp1,
    display2: dp2,
    display3: dp3,
    display4: dp4,
    dpbrand: dp5,
    dpsearch: dp6
  });
};

var rand2, mailOptions2, host2, link2;
var us2;

userController.retrieve = function(req, res) {
  var us = req.body.username;
  var email = req.body.email;
  User.find({ username: us }, function(err, result) {
    if (err) return next(err);
    if (result[0].email != email) {
      res.render("forgot", {
        thongbao: "Email không trùng khớp",
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4,
        dpbrand: dp5,
        dpsearch: dp6
      });
    } else {
      rand2 = Math.floor(Math.random() * 100 + 54);
      host2 = req.get("host");
      link2 = "http://" + host2 + "/auth/verify2?id=" + rand2;
      mailOptions2 = {
        to: email,
        subject: "Please confirm your email account",
        html:
          "To reset your password, please click on the link to verify your email.<br><a href=" +
          link2 +
          "> Click here to verify</a> <br> After clicking on the link your password will be reset to <strong>ishoplaptop</strong>"
      };
      smtpTransport.sendMail(mailOptions2, function(err, response) {
        if (err) return next(err);
        else {
          us2 = req.body.username;
          res.render("forgot", {
            display1: dp1,
            display2: dp2,
            display3: dp3,
            display4: dp4,
            dpbrand: dp5,
            dpsearch: dp6,
            thongbao: "Đã gửi. Vui lòng kiểm tra email"
          });
        }
      });
    }
  });
};

userController.verify2 = function(req, res) {
  if (req.protocol + "://" + req.get("host") == "http://" + host2) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand2) {
      User.find({ username: us2 }, function(err, result) {
        result[0].setPassword("ishoplaptop", function(err) {
          if (err) return next(err);
          result[0].save();
          res.render("login", {
            display1: dp1,
            display2: dp2,
            display3: dp3,
            display4: dp4,
            dpbrand: dp5,
            dpsearch: dp6,
            thongbao: "Lấy lại mật khẩu thành công"
          });
        });
      });
    } else {
      console.log("email is not verified");
      res.end("Bad request");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};

module.exports = userController;
