var Laptop = require("../models/ComputerModel");
var Nhasanxuat = require("../models/NhaSanXuatModel");
var async = require("async");
var DDH = require("../models/DonDatHang");
var User = require("../models/user");
var CMT = require("../models/comment")
var cart = [];
var Image = require("./UploadImage");

var dp1 = "";
var dp2 = "";
var dp3 = "none";
var dp4 = "none";
var username = "";
var userurl = "";
var related_nsx = "";
var related_nsx2 = "";
var related_nsx3 = "";
var tensp = "";
exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      res.render("index", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        active1: "active",
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.homepage = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      user: function (callback) {
        User.findOne({
          username: req.params.username
        }).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      username = results.user.name;

      if (results.user.role == "admin") {
        userurl = "/catalog/admin/admin";
      } else {
        userurl = results.user.url;
      }

      res.render("homepage", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        active1: "active",
        userurl: userurl,
        username: results.user.name,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.laptop_list = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback);
      },
      lapCount: function (callback) {
        Laptop.count({}).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      res.render("list", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        active2: "active",
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4,
        pages: Math.ceil(results.lapCount / perPage),
        current: page
      });
    }
  );
};

exports.laptop_detail = function (req, res, next) {
  var moinhat = [];
  var lienquan = [];
  var dpname = ""
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    dpname = "none"
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    dpname = ""
  }
  async.series({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptop: function (callback) {
        Laptop.findById(req.params.id, function (err, lapinfo) {
            related_nsx = lapinfo.nhasanxuat.id;
            tensp = lapinfo.ten;
          })
          .populate("nhasanxuat")
          .exec(callback);
      },
      laptop_brand: function (callback) {
        Laptop.find({
            nhasanxuat: related_nsx
          })
          .populate("nhasanxuat")
          .exec(callback);
      },
      cmt: function (callback) {
        CMT.find({
          tenSP: tensp
        }).exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results == null) {
        // No results.
        var err = new Error("Laptop not found");
        err.status = 404;
        return next(err);
      }
      results.laptop.luotxem++;
      results.laptop.save()
      for (var i = 0; i < 4; i++) {
        moinhat.push(results.laptops[Math.floor(Math.random() * 49)]);
      }

      for (var i = 0; i < 3; i++) {
        lienquan.push(results.laptop_brand[Math.floor(Math.random() * 9)]);
      }
      //results.laptop.giaban = results.laptop.giaban.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      res.render("laptop", {
        detail: results,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        cmt: results.cmt,
        moinhat: moinhat,
        lienquan: lienquan,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4,
        dpname: dpname
      });
    }
  );
};

exports.laptop_brand = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuats: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.findById(req.params.id).exec(callback);
      },

      lap_brand: function (callback) {
        Laptop.find({
            nhasanxuat: req.params.id
          })
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback);
      },
      lapCount: function (callback) {
        Laptop.count({
          nhasanxuat: req.params.id
        }).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }

      res.render("listbrand", {
        laptop_list1: results.lap_brand,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuats,
        pages: Math.ceil(results.lapCount / perPage),
        current: page,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.laptop_search = function (req, res, next) {
  var moinhat = [];
  var lienquan = [];
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  if (req.query.ten != "") {
    async.series({
        laptops: function (callback) {
          Laptop.find({}, "ten hinh giaban")
            .populate("nhasanxuat")
            .exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptop: function (callback) {
          Laptop.findOne({
              ten: req.query.ten
            }, function (err, lapinfo) {
              related_nsx2 = lapinfo.nhasanxuat.id;
            })
            .populate("nhasanxuat")
            .exec(callback);
        },
        laptop_brand: function (callback) {
          Laptop.find({
              nhasanxuat: related_nsx2
            }, function (err, lapinfo) {})
            .populate('nhasanxuat')
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results == null) {
          // No results.
          var err = new Error("Laptop not found");
          err.status = 404;
          return next(err);
        }
        results.laptop.luotxem++;
        results.laptop.save()
        for (var i = 0; i < 4; i++) {
          moinhat.push(results.laptops[Math.floor((Math.random() * 49))])
        }

        for (var i = 0; i < 3; i++) {
          lienquan.push(results.laptop_brand[Math.floor((Math.random() * 9))])
        }
        res.render("laptopsearch", {
          detail: results.laptop,
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          moinhat: moinhat,
          lienquan: lienquan,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  } else {
    var err = new Error("Laptop not found");
    return next(err)
  }
};

exports.laptop_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  }
  if (req.isAuthenticated()) {
    User.findOne({
      name: username
    }, function (err, biguser) {
      console.log(biguser)
      if (err) return next(err);
      if (biguser.role != "admin") res.redirect("/catalog");
      else {
        dp1 = "none";
        dp2 = "none";
        dp3 = "";
        dp4 = "";
        async.parallel({
            nhasanxuat: function (callback) {
              Nhasanxuat.find().exec(callback);
            },
            laptops: function (callback) {
              Laptop.find()
                .populate("nhasanxuat")
                .exec(callback);
            },

          },
          function (err, results) {
            if (err) {
              return next(err);
            }
            if (results.nhasanxuat == null) {
              var err = new Error("Nha san xuat not found");
              err.status = 404;
              return next(err);
            }


            res.render("admin", {
              laptop_list: results.laptops,
              nhasanxuat_list: results.nhasanxuat,
              userurl: userurl,
              username: username,
              display1: dp1,
              display2: dp2,
              display3: dp3,
              display4: dp4
            });
          }
        );
      }
    })
  }
};

exports.laptop_list_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("list_laptop_admin", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.nsx_list_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("list_nsx_admin", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_update_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("updatelaptopform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.nsx_update_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("updatensxform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_remove_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("removelaptopform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.nsx_remove_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("removensxform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};
exports.laptop_update = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var _ten = req.body.ten;
    var _maso = req.body.maso;
    var _ten1 = req.body.ten1;
    var _giaban = req.body.giaban;
    var _gianhap = req.body.gianhap;
    var _ram = req.body.ram;
    var _cpu = req.body.cpu;
    var _manhinh = req.body.manhinh;

    //_maso = lap;
    //console.log(lap);
    async.series({
        laptopupdate: function (callback) {
          Laptop.findOne({
              ten: _ten
            },
            function (err, laptop) {
              if (err) return next(err);
              if (laptop == null) {
                var err = new Error("Không tìm thấy laptop");
                err.status = 404;
                return next(err);
              }
              if (_maso == "") _maso = laptop.maso;
              if (_ten1 == "") _ten1 = laptop.ten;
              if (_giaban == "") _giaban = laptop.giaban;
              if (_gianhap == "") _gianhap = laptop.gianhap;
              if (_ram == "") _ram = laptop.ram;
              if (_cpu == "") _cpu = laptop.cpu;
              if (_manhinh == "") _manhinh = laptop.manhinh;
              Laptop.findOneAndUpdate({
                  ten: _ten
                }, {
                  $set: {
                    ten: _ten1,
                    maso: _maso,
                    giaban: _giaban,
                    gianhap: _gianhap,
                    ram: _ram,
                    cpu: _cpu,
                    manhinh: _manhinh
                  }
                }, {
                  new: true
                },
                function (err, laptop) {
                  if (err) return next(err);
                }
              );
            }
          ).exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("updatelaptopform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Cập nhật thành công",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.nxs_update = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var _ten = req.body.ten;
    var _ten1 = req.body.ten1;
    var _ttbh = req.body.ttbh;

    async.series({
        nsxupdate: function (callback) {
          Nhasanxuat.findOne({
              ten: _ten
            },
            function (err, nsx) {
              if (err) return next(err);
              if (nsx == null) {
                var err = new Error("Không tìm thấy nhà sản xuất");
                err.status = 404;
                return next(err);
              }
              if (_ten1 == "") _ten1 = nsx.ten;
              if (_ttbh == "") _ttbh = nsx.trungtambaohanh;
              Nhasanxuat.findOneAndUpdate({
                  ten: _ten
                }, {
                  $set: {
                    ten: _ten1,
                    trungtambaohanh: _ttbh
                  }
                }, {
                  new: true
                },
                function (err, nsxresult) {
                  if (err) return next(err);
                }
              );
            }
          ).exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("updatensxform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Cập nhật thành công",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_remove = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var _ten = req.body.ten;

    async.series({
        laptopupdate: function (callback) {
          Laptop.findOne({
              ten: _ten
            },
            function (err, laptop) {
              if (err) return next(err);
              if (laptop == null) {
                var err = new Error("Không tìm thấy laptop");
                err.status = 404;
                return next(err);
              }
              Laptop.findOneAndRemove({
                  ten: _ten
                },
                function (err, laptop) {
                  if (err) return next(err);
                }
              );
            }
          ).exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("removelaptopform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Xóa thành công",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_remove2 = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var _ten = req.body.ten;

    async.series({
        nsxupdate: function (callback) {
          Nhasanxuat.findOne({
              ten: _ten
            },
            function (err, nsx) {
              if (err) return next(err);
              if (nsx == null) {
                var err = new Error("Không tìm thấy nhà sản xuất");
                err.status = 404;
                return next(err);
              }
              Laptop.find({
                  nhasanxuat: nsx.id
                })
                .remove()
                .exec();

              Nhasanxuat.findOneAndRemove({
                  ten: _ten
                },
                function (err, nsxresult) {
                  if (err) return next(err);
                }
              );
            }
          ).exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("removensxform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Xóa thành công",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_themlaptop = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("themlaptopform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_add = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.series({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        Image.Upload(req, res, (err) => {
          if (err) {
            console.log(err);
            return res.render("themlaptopform", {
              laptop_list: results.laptops,
              nhasanxuat_list: results.nhasanxuat,
              thongbao: "Upload ảnh thất bại,hãy thử lại",
              userurl: userurl,
              username: username,
              display1: dp1,
              display2: dp2,
              display3: dp3,
              display4: dp4
            });
          } else {
            if (req.file == undefined) {
              console.log('Chưa có ảnh được chọn');
              return res.render("themlaptopform", {
                laptop_list: results.laptops,
                nhasanxuat_list: results.nhasanxuat,
                thongbao: "Chưa có hình được chọn",
                userurl: userurl,
                username: username,
                display1: dp1,
                display2: dp2,
                display3: dp3,
                display4: dp4
              });
            } else {
              var _nsx = req.body.nsx;
              var _maso = req.body.maso;
              var _ten = req.body.ten;
              var _giaban = req.body.giaban;
              var _gianhap = req.body.gianhap;
              var _ram = req.body.ram;
              var _cpu = req.body.cpu;
              var _manhinh = req.body.manhinh;
              var _soluongton = req.body.soluonglaptop;
              var _imagepath = '/images/' + req.file.filename;
              Nhasanxuat.findOne({
                ten: _nsx
              }, function (err, nsx) {
                if (err) return next(err);
                var newlaptop = new Laptop({
                  maso: _maso,
                  ten: _ten,
                  soluongton: _soluongton,
                  giaban: _giaban,
                  gianhap: _gianhap,
                  ram: _ram,
                  cpu: _cpu,
                  manhinh: _manhinh,
                  hinh: _imagepath,
                  nhasanxuat: nsx.id
                });
                Laptop.create(newlaptop);
              });
              res.render("themlaptopform", {
                laptop_list: results.laptops,
                nhasanxuat_list: results.nhasanxuat,
                thongbao: "Thêm thành công",
                userurl: userurl,
                username: username,
                display1: dp1,
                display2: dp2,
                display3: dp3,
                display4: dp4
              });
            }
          }
        })
      }
    );
  }
};

exports.nsx_themnsx = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("themnsxform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.nsx_add = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.series({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        Image.Upload(req, res, (err) => {
          if (err) {
            console.log(err);
            return res.render("themnsxform", {
              laptop_list: results.laptops,
              nhasanxuat_list: results.nhasanxuat,
              thongbao: "Upload ảnh thất bại,hãy thử lại",
              userurl: userurl,
              username: username,
              display1: dp1,
              display2: dp2,
              display3: dp3,
              display4: dp4
            });
          } else {
            if (req.file == undefined) {
              console.log('Chưa có ảnh được chọn');
              return res.render("themnsxform", {
                laptop_list: results.laptops,
                nhasanxuat_list: results.nhasanxuat,
                thongbao: "Chưa có hình được chọn",
                userurl: userurl,
                username: username,
                display1: dp1,
                display2: dp2,
                display3: dp3,
                display4: dp4
              });
            } else {
              var _nsx = req.body.nsx;
              var _ttbh = req.body.ttbh;
              var _imagepath = '/images/' + req.file.filename;
              var newnsx = new Nhasanxuat({
                ten: _nsx,
                trungtambaohanh: _ttbh,
                hinh: _imagepath
              });
              Nhasanxuat.create(newnsx);
              res.render("themnsxform", {
                laptop_list: results.laptops,
                nhasanxuat_list: results.nhasanxuat,
                thongbao: "Thêm thành công",
                userurl: userurl,
                username: username,
                display1: dp1,
                display2: dp2,
                display3: dp3,
                display4: dp4
              });
            }
          }
        })

      }
    );

  }
};

exports.list_taikhoan = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        users: function (callback) {
          User.find().exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("list_tk_admin", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          taikhoan_list: results.users,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

// cart

exports.cart = function (req, res) {
  var moinhat = [];
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      for (var i = 0; i < 4; i++) {
        moinhat.push(results.laptops[Math.floor(Math.random() * 49)]);
      }
      res.render("cart", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        active3: "active",
        moinhat: moinhat,
        carttable: cart,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.xoacart = function (req, res) {
  var moinhat = [];
  var ten = req.body.ten;
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      for (var i = 0; i < 4; i++) {
        moinhat.push(results.laptops[Math.floor(Math.random() * 49)]);
      }
      for (var i = 0; i < cart.length; i++) {
        if (ten == cart[i].ten) {
          cart.splice(i, 1);
          break
        }
      }

      res.render("cart", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        active3: "active",
        moinhat: moinhat,
        carttable: cart,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.doCart = function (req, res) {
  var moinhat = [];
  var ten = req.body.ten;
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      laptop_cart: function (callback) {
        Laptop.findOne({
            ten: ten
          }, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      for (var i = 0; i < 4; i++) {
        moinhat.push(results.laptops[Math.floor(Math.random() * 49)]);
      }

      cart.push(results.laptop_cart);
      res.render("cart", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        carttable: cart,
        active3: "active",
        moinhat: moinhat,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};


exports.capquyentkform = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("capquyentkform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.capquyentk = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var us = req.body.username
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        user: function (callback) {
          User.findOne({
              username: us
            })
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.user == null) {
          var err = new Error("User not found");
          err.status = 404;
          return next(err);
        }
        results.user.role = "admin"
        results.user.save()
        res.render("capquyentkform", {
          thongbao: "Cấp quyền thành công",
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.datmua = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    var tongtien = 0;
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        user: function (callback) {
          User.findOne({
              name: username
            })
            .exec(callback)
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        for (var i = 0; i < cart.length; i++) {
          tongtien += (parseFloat(cart[i].giaban))
        }
        res.render("datmuaform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          cart: cart,
          tongtien: tongtien,
          userurl: userurl,
          user: results.user,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.thanhtoan = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var tenTK = req.body.tenTK
    var tenKH = req.body.tenKH
    var sdt = req.body.sdt
    var diachi = req.body.diachi
    var tenSP = req.body.tenSP
    var tongtien = req.body.tongtien
    var tongtien1 = tongtien.split(" ")[0]
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        ddh: function (callback) {
          var dondathang = new DDH({
            tenTK: tenTK,
            tenKH: tenKH,
            sdt: sdt,
            diachi: diachi,
            tenSP: tenSP,
            tongtien: tongtien1,
            trangthai: "Chưa giao"
          })
          DDH.create(dondathang)
          callback();
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        cart = [];
        res.render("datmuaform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Đặt mua thành công",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });

      }
    );
  }
};


exports.dondathanglist = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        ddhs: function (callback) {
          DDH.find()
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("list_ddh_admin", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          ddh_list: results.ddhs,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.luuSP = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var id = req.body.id;
    var trangthai = req.body.trangthai;
    async.series({
        ddh: function (callback) {
          DDH.findById(id, function (err, dondathang) {
              dondathang.trangthai = trangthai;
              dondathang.save();
            })
            .exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },

        ddhs: function (callback) {
          DDH.find()
            .exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("list_ddh_admin", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          ddh_list: results.ddhs,
          thongbao: "Đã lưu",
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.laptop_less_10 = function (req, res, next) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuats: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptopless10: function (callback) {
        Laptop.find({
            giaban: {
              $lt: 10000000
            }
          })
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback)
      },
      lapCount: function (callback) {
        Laptop.count({
            giaban: {
              $lt: 10000000
            }
          })
          .exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("listless10", {
        laptop_list1: results.laptopless10,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuats,
        pages: Math.ceil(results.lapCount / perPage),
        current: page,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.laptop_10_20 = function (req, res, next) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuats: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptopless10: function (callback) {
        Laptop.find({
            giaban: {
              $gt: 10000000,
              $lt: 20000000
            }
          })
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback)
      },
      lapCount: function (callback) {
        Laptop.count({
            giaban: {
              $gt: 10000000,
              $lt: 20000000
            }
          })
          .exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("list1020", {
        laptop_list1: results.laptopless10,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuats,
        pages: Math.ceil(results.lapCount / perPage),
        current: page,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.laptop_20_30 = function (req, res, next) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuats: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptopless10: function (callback) {
        Laptop.find({
            giaban: {
              $gt: 20000000,
              $lt: 30000000
            }
          })
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback)
      },
      lapCount: function (callback) {
        Laptop.count({
            giaban: {
              $gt: 20000000,
              $lt: 30000000
            }
          })
          .exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("list2030", {
        laptop_list1: results.laptopless10,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuats,
        pages: Math.ceil(results.lapCount / perPage),
        current: page,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.laptop_more_30 = function (req, res, next) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      nhasanxuats: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptopless10: function (callback) {
        Laptop.find({
            giaban: {
              $gt: 30000000
            }
          })
          .limit(perPage)
          .skip(perPage * page - perPage)
          .populate("nhasanxuat")
          .exec(callback)
      },
      lapCount: function (callback) {
        Laptop.count({
            giaban: {
              $gt: 30000000
            }
          })
          .exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render("listmore30", {
        laptop_list1: results.laptopless10,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuats,
        pages: Math.ceil(results.lapCount / perPage),
        current: page,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.comment = function (req, res, next) {
  var us = ""
  var comment = ""
  var moinhat = [];
  var lienquan = [];
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    dpname = "none"
    us = username
    comment = req.body.comment
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    dpname = ""
    us = req.body.username
    comment = req.body.comment
  }
  async.series({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      laptop: function (callback) {
        Laptop.findOne({
            ten: tensp
          }, function(err, lapinfo){
            related_nsx3 = lapinfo.nhasanxuat.id
          })
          .populate("nhasanxuat")
          .exec(callback)
      },
      laptop_brand: function(callback){
        Laptop.find({nhasanxuat: related_nsx3})
          .populate("nhasanxuat")
          .exec(callback);
      },
      comment: function (callback) {
        CMT.findOne({
          tenSP: tensp
        }, function (err, bl) {
          var cmt = new CMT({
            tenSP: req.body.ten,
            tenKH: us,
            noidung: comment
          })
          CMT.create(cmt)
        }).exec(callback)
      },
      cmt: function (callback) {
        CMT.find({
          tenSP: tensp
        }).exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      for (var i = 0; i < 4; i++) {
        moinhat.push(results.laptops[Math.floor(Math.random() * 49)]);
      }

      for (var i = 0; i < 3; i++) {
        lienquan.push(results.laptop_brand[Math.floor(Math.random() * 9)]);
      }
      res.render("laptop", {
        detail: results,
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        cmt: results.cmt,
        moinhat: moinhat,
        lienquan: lienquan,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.themtk = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("themtkform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.removetk = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("removetkform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.updatetk = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("updatetkform", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.client_information = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  } else {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find({}, "ten hinh giaban")
          .populate("nhasanxuat")
          .exec(callback);
      },
      user: function (callback) {
        User.findOne({
          name: username
        }).exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error("Nha san xuat not found");
        err.status = 404;
        return next(err);
      }
      console.log(username);
      var _hovaten = results.user.name;
      var _gioitinh = results.user.sex;
      var _ngaysinh = results.user.birthday;
      var _diachi = results.user.address;
      var _sdt = results.user.phone;
      res.render("client_information", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        userurl: userurl,
        username: results.user.name,
        hovaten1: _hovaten,
        gioitinh1: _gioitinh,
        ngaysinh1: _ngaysinh,
        diachi1: _diachi,
        sdt1: _sdt,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};


exports.saveClient_information = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var _hovaten = req.body.hovaten;
    var _sdt = req.body.sdt;
    var _gioitinh = req.body.gioitinh;
    var _ngaysinh = req.body.ngaysinh;
    var _diachi = req.body.diachi;

    async.series({
        clientupdate: function (callback) {
          User.findOne({
              name: username
            },
            function (err, user) {
              if (err) return next(err);
              if (user == null) {
                var err = new Error("Không tìm thấy user");
                err.status = 404;
                return next(err);
              }
              User.findOneAndUpdate({
                  name: username
                }, {
                  $set: {
                    name: _hovaten,
                    phone: _sdt,
                    sex: _gioitinh,
                    birthday: _ngaysinh,
                    address: _diachi
                  }
                }, {
                  new: true
                },
                function (err, user) {
                  if (err) return next(err);
                }
              );
            }
          ).exec(callback);
        },
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        user: function (callback) {
          User.findOne({
            name: _hovaten
          }).exec(callback);
        },
        updateusername: function (callback) {
          username = _hovaten;
          callback();
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("client_information", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          thongbao: "Lưu thông tin thành công",
          userurl: userurl,
          username: results.user.name,
          hovaten1: _hovaten,
          gioitinh1: _gioitinh,
          ngaysinh1: _ngaysinh,
          diachi1: _diachi,
          sdt1: _sdt,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};

exports.timkiemform = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  }
  async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("timkiemform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.timkiem = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
  }
  var brand = req.body.brand
  brand = brand.toUpperCase()
  console.log(brand)
  var low_pr = req.body.low_pr
  var high_pr = req.body.high_pr
  var brand2 = [];
  async.series({
      nhasanxuat: function (callback) {
        Nhasanxuat.find().exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
      laptop: function (callback) {
        Laptop.find({
            giaban: {
              $gt: low_pr,
              $lt: high_pr
            }
          })
          .populate("nhasanxuat")
          .exec(callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < results.laptop.length; i++) {
        if (results.laptop[i].nhasanxuat.ten == brand) brand2.push(results.laptop[i])
      }
      res.render("list2", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        brand2: brand2,
        userurl: userurl,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    }
  );
};

exports.changePassword = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    async.parallel({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        user: function (callback) {
          User.findOne({
            username: req.params.username
          }).exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        res.render("doimatkhau", {
          laptop_list: results.laptops,
          nhasanxuat_list: results.nhasanxuat,
          userurl: userurl,
          username: username,
          display1: dp1,
          display2: dp2,
          display3: dp3,
          display4: dp4
        });
      }
    );
  }
};


exports.doChangepassword = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = "";
    dp2 = "";
    dp3 = "none";
    dp4 = "none";
    res.redirect("/auth/login");
  } else {
    dp1 = "none";
    dp2 = "none";
    dp3 = "";
    dp4 = "";
    var oldpassword = req.body.oldpass;
    var newpassword = req.body.newpass;
    var confirmpassword = req.body.confirm;

    async.series({
        nhasanxuat: function (callback) {
          Nhasanxuat.find().exec(callback);
        },
        laptops: function (callback) {
          Laptop.find()
            .populate("nhasanxuat")
            .exec(callback);
        },
        user: function (callback) {
          User.findOne({
            username: req.params.username
          }).exec(callback);
        }
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.nhasanxuat == null) {
          var err = new Error("Nha san xuat not found");
          err.status = 404;
          return next(err);
        }
        if (oldpassword == "" || newpassword == "" || confirmpassword == "") {
          res.render("doimatkhau", {
            laptop_list: results.laptops,
            nhasanxuat_list: results.nhasanxuat,
            userurl: userurl,
            username: username,
            display1: dp1,
            display2: dp2,
            display3: dp3,
            display4: dp4,
            thongbao: "Bạn phải điền đủ dữ liệu vào các ô"
          });
        } else {

          if (newpassword == confirmpassword) {
            User.findById(req.user._id).exec(function (err, user) {
              user.changePassword(oldpassword, newpassword, function (err) {
                if (err) {
                  res.render("doimatkhau", {
                    laptop_list: results.laptops,
                    nhasanxuat_list: results.nhasanxuat,
                    userurl: userurl,
                    username: username,
                    display1: dp1,
                    display2: dp2,
                    display3: dp3,
                    display4: dp4,
                    thongbao: "Mật khẩu cũ không đúng , hãy thử lại !"
                  });
                }
                res.render("doimatkhau", {
                  laptop_list: results.laptops,
                  nhasanxuat_list: results.nhasanxuat,
                  userurl: userurl,
                  username: username,
                  display1: dp1,
                  display2: dp2,
                  display3: dp3,
                  display4: dp4,
                  thongbao: "Đổi mật khẩu thành công"
                });
              })
            })
          } else {
            res.render("doimatkhau", {
              laptop_list: results.laptops,
              nhasanxuat_list: results.nhasanxuat,
              userurl: userurl,
              username: username,
              display1: dp1,
              display2: dp2,
              display3: dp3,
              display4: dp4,
              thongbao: "Mật khẩu xác nhận không đúng"
            });
          }
        }
      }
    );
  }
};