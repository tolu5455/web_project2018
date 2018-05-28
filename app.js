var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var authRouter = require('./routes/auth');
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();
mongoose.Promise = global.Promise;



var mongoDB = "mongodb://tolu5455:intheend54@ds121730.mlab.com:21730/computer";
mongoose.connect(mongoDB)
  .then(() => {

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({
      extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/catalog', catalogRouter);
    app.use('/auth', authRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });



  })
  .catch((err) => console.log(err));

module.exports = app;