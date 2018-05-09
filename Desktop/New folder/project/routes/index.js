var express = require("express");
var router = express.Router();
var ComputerModel = require("../models/ComputerModel");
var NhaSanXuatModel = require("../models/NhaSanXuatModel");
var mongoose = require("mongoose");

/* GET home page. */
router.get("/", function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
