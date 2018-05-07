var Laptop = require("../models/ComputerModel");
var async = require('async');
var basicUrl, basicUrl1;

exports.index = function(req, res) {
  Laptop.find({}, "ten hinh giaban")
    .populate("nhasanxuat")
    .exec(function(err, list_laptops) {
      if (err) {
        return next(err);
      }
      basicUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      res.render("index", { laptop_list: list_laptops, URL: basicUrl, urlList: basicUrl +"/laptops" });
    });
};

exports.laptop_list = function(req, res) {
  Laptop.find({}, "ten hinh giaban")
    .populate("nhasanxuat")
    .exec(function(err, list_laptops) {
      if (err) {
        return next(err);
      }
      basicUrl1 = req.protocol + "://" + req.get("host") + req.originalUrl;
      res.render("list", { laptop_list: list_laptops, url: basicUrl, urlList: basicUrl1});
    });
};

exports.laptop_detail = function(req, res) {
  async.parallel({
    laptop: function(callback) {

        Laptop.findById(req.params.id)
          .populate('nhasanxuat')
          .exec(callback);
    },
}, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        var err = new Error('Laptop not found');
        err.status = 404;
        return next(err);
    }
    res.render('laptop', { detail:  results});
});
};
