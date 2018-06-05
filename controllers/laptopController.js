var Laptop = require("../models/ComputerModel");
var Nhasanxuat = require("../models/NhaSanXuatModel");
var async = require('async');
var passport = require("passport");
var User = require("../models/user");
var cart = [];

var dp1 = ""
var dp2 = ""
var dp3 = "none"
var dp4 = "none"
var username = ""
var related_nsx = "";
exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    res.render("index", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      active1: 'active',
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

exports.homepage = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
    user: function (callback) {
      User.findOne({
        'username': req.params.username
      }).exec(callback)
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    username = results.user.name;
    res.render("homepage", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      active1: 'active',
      username: results.user.name,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

exports.laptop_list = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  var page = req.params.page || 1;
  var perPage = 12;
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .populate("nhasanxuat")
        .exec(callback);
    },
    lapCount: function (callback) {
      Laptop.count({})
        .exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    res.render("list", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      active2: 'active',
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4,
      pages: Math.ceil(results.lapCount / perPage),
      current: page
    });
  });
};

exports.laptop_detail = function (req, res, next) {
  var moinhat = [];
  var lienquan = [];
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.series({
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptop: function (callback) {

      Laptop.findById(req.params.id, function (err, lapinfo) {
          related_nsx = lapinfo.nhasanxuat.id;
        })
        .populate('nhasanxuat')
        .exec(callback);
    },
    laptop_brand: function (callback) {
      Laptop.find({
          'nhasanxuat': related_nsx
        })
        .populate('nhasanxuat')
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results == null) { // No results.
      var err = new Error('Laptop not found');
      err.status = 404;
      return next(err);
    }
    for (var i = 0; i < 4; i++) {
      moinhat.push(results.laptops[Math.floor((Math.random() * 49))])
    }

    for (var i = 0; i < 3; i++) {
      lienquan.push(results.laptop_brand[Math.floor((Math.random() * 9))])
    }
    //console.log(results.laptop_brand);
    res.render('laptop', {
      detail: results,
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      moinhat: moinhat,
      lienquan: lienquan,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

exports.laptop_brand = function (req, res) {
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
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
      Nhasanxuat.find()
        .exec(callback);
    },
    nhasanxuat: function (callback) {
      Nhasanxuat.findById(req.params.id)
        .exec(callback);
    },

    lap_brand: function (callback) {
      Laptop.find({
          'nhasanxuat': req.params.id
        })
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .populate("nhasanxuat")
        .exec(callback);
    },
    lapCount: function (callback) {
      Laptop.count({
          'nhasanxuat': req.params.id
        })
        .exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }

    res.render('listbrand', {
      laptop_list1: results.lap_brand,
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuats,
      pages: Math.ceil(results.lapCount / perPage),
      current: page,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};


exports.laptop_search = function (req, res, next) {
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptop: function (callback) {
      Laptop.findOne({
          'ten': req.query.ten
        })
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results == null) { // No results.
      var err = new Error('Laptop not found');
      err.status = 404;
      return next(err);
    }

    res.render('laptopsearch', {
      detail: results.laptop,
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

exports.laptop_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
      user: function (callback) {
        User.findOne({
          'username': req.params.username
        }).exec(callback)
      }
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      username = results.user.name;
      res.render("admin", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}


exports.laptop_list_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("list_laptop_admin", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
};

exports.nsx_list_admin = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("list_nsx_admin", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
};


exports.laptop_update_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("updatelaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.nsx_update_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("updatensxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.laptop_remove_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("removelaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}


exports.nsx_remove_form = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("removensxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}
exports.laptop_update = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
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
          'ten': _ten
        }, function (err, laptop) {
          if (err) return next(err);
          if (laptop == null) {
            var err = new Error('Không tìm thấy laptop');
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
            'ten': _ten
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
          }, function (err, laptop) {
            if (err) return next(err);
          })
        }).exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("updatelaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Cập nhật thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.nxs_update = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    var _ten = req.body.ten;
    var _ten1 = req.body.ten1;
    var _ttbh = req.body.ttbh;

    async.series({
      nsxupdate: function (callback) {
        Nhasanxuat.findOne({
          'ten': _ten
        }, function (err, nsx) {
          if (err) return next(err);
          if (nsx == null) {
            var err = new Error('Không tìm thấy nhà sản xuất');
            err.status = 404;
            return next(err);
          }
          if (_ten1 == "") _ten1 = nsx.ten;
          if (_ttbh == "") _ttbh = nsx.trungtambaohanh;
          Nhasanxuat.findOneAndUpdate({
            'ten': _ten
          }, {
            $set: {
              ten: _ten1,
              trungtambaohanh: _ttbh
            }
          }, {
            new: true
          }, function (err, nsxresult) {
            if (err) return next(err);
          })
        }).exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("updatensxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Cập nhật thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}



exports.laptop_remove = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    var _ten = req.body.ten;

    async.series({
      laptopupdate: function (callback) {
        Laptop.findOne({
          'ten': _ten
        }, function (err, laptop) {
          if (err) return next(err);
          if (laptop == null) {
            var err = new Error('Không tìm thấy laptop');
            err.status = 404;
            return next(err);
          }
          Laptop.findOneAndRemove({
            'ten': _ten
          }, function (err, laptop) {
            if (err) return next(err);
          })
        }).exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("removelaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Xóa thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.laptop_remove2 = function (req, res, next) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    var _ten = req.body.ten;

    async.series({
      nsxupdate: function (callback) {
        Nhasanxuat.findOne({
          'ten': _ten
        }, function (err, nsx) {
          if (err) return next(err);
          if (nsx == null) {
            var err = new Error('Không tìm thấy nhà sản xuất');
            err.status = 404;
            return next(err);
          }
          Laptop.find({
            'nhasanxuat': nsx.id
          }).remove().exec();

          Nhasanxuat.findOneAndRemove({
            'ten': _ten
          }, function (err, nsxresult) {
            if (err) return next(err);
          })
        }).exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("removensxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Xóa thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}


exports.laptop_themlaptop = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({

      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("themlaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.laptop_add = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    var _nsx = req.body.nsx;
    var _maso = req.body.maso;
    var _ten = req.body.ten;
    var _giaban = req.body.giaban;
    var _gianhap = req.body.gianhap;
    var _ram = req.body.ram;
    var _cpu = req.body.cpu;
    var _manhinh = req.body.manhinh;
    var _imagepath = "/images/DellAdd1.png";

    async.series({
      laptopadd: function (callback) {
        Nhasanxuat.findOne({
          'ten': _nsx
        }, function (err, nsx) {
          if (err) return next(err);
          var newlaptop = new Laptop({
            maso: _maso,
            ten: _ten,
            giaban: _giaban,
            gianhap: _gianhap,
            ram: _ram,
            cpu: _cpu,
            manhinh: _manhinh,
            hinh: _imagepath,
            nhasanxuat: nsx.id
          })
          Laptop.create(newlaptop);
        }).exec(callback);
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("themlaptopform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Thêm thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}


exports.nsx_themnsx = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("themnsxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}

exports.nsx_add = function (req, res) {
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    var _nsx = req.body.nsx;
    var _ttbh = req.body.ttbh;
    var _imagepath = "/images/Huawei.jpg";

    async.series({
      nsxadd: function (callback) {
        var newnsx = new Nhasanxuat({
          ten: _nsx,
          trungtambaohanh: _ttbh,
          hinh: _imagepath
        })
        Nhasanxuat.create(newnsx);
        callback();
      },
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },

    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("themnsxform", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        thongbao: "Thêm thành công",
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  }
}


exports.list_taikhoan = function(req, res){
  if (!req.isAuthenticated()) {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
    res.redirect("/auth/login")
  } else {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
    async.parallel({
      nhasanxuat: function (callback) {
        Nhasanxuat.find()
          .exec(callback);
      },
      laptops: function (callback) {
        Laptop.find()
          .populate("nhasanxuat")
          .exec(callback);
      },
      users: function (callback) {
        User.find()
          .exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.nhasanxuat == null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
      }
      res.render("list_tk_admin", {
        laptop_list: results.laptops,
        nhasanxuat_list: results.nhasanxuat,
        taikhoan_list: results.users,
        username: username,
        display1: dp1,
        display2: dp2,
        display3: dp3,
        display4: dp4
      });
    });
  } 
}

// cart

exports.cart = function (req, res) {
  var moinhat = [];
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    for (var i = 0; i < 4; i++) {
      moinhat.push(results.laptops[Math.floor((Math.random() * 49))])
    }
    res.render("cart", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      active3: 'active',
      moinhat: moinhat,
      carttable: cart,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

exports.xoacart = function (req, res) {
  var moinhat = [];
  var ten = req.body.ten
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    for (var i = 0; i < 4; i++) {
      moinhat.push(results.laptops[Math.floor((Math.random() * 49))])
    }
    for(var i = 0; i < cart.length; i++){
      if(ten == cart[i].ten) cart.splice(i,1);
    }


    res.render("cart", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      active3: 'active',
      moinhat: moinhat,
      carttable: cart,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};


exports.doCart = function (req, res) {
  var moinhat = [];
  var ten = req.body.ten
  if (req.isAuthenticated()) {
    dp1 = "none"
    dp2 = "none"
    dp3 = ""
    dp4 = ""
  } else {
    dp1 = ""
    dp2 = ""
    dp3 = "none"
    dp4 = "none"
  }
  async.parallel({
    nhasanxuat: function (callback) {
      Nhasanxuat.find()
        .exec(callback);
    },
    laptops: function (callback) {
      Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
    laptop_cart: function (callback) {
      Laptop.findOne({"ten": ten}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.nhasanxuat == null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
    }
    for (var i = 0; i < 4; i++) {
      moinhat.push(results.laptops[Math.floor((Math.random() * 49))])
    }
    
    cart.push(results.laptop_cart)
    res.render("cart", {
      laptop_list: results.laptops,
      nhasanxuat_list: results.nhasanxuat,
      carttable: cart,
      active3: 'active',
      moinhat: moinhat,
      username: username,
      display1: dp1,
      display2: dp2,
      display3: dp3,
      display4: dp4
    });
  });
};

