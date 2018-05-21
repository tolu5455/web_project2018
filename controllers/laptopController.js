var Laptop = require("../models/ComputerModel");
var Nhasanxuat = require("../models/NhaSanXuatModel");
var async = require('async');
var page = 1, start = 0;

exports.index = function(req, res) {

  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find({}, "ten hinh giaban")
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("index", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, active1: 'active'});
    });
};
 // exports.removelaptopform = function(req, res) {
   // res.render("removelaptopform");
//}

exports.laptop_list = function(req, res) {
    async.parallel({
      nhasanxuat: function(callback){
        Nhasanxuat.find()
        .exec(callback) ;
      },
      laptops: function(callback){
        Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback); 
      },
    }, function(err, results){
      if(err){ return next(err); }
      if (results.nhasanxuat==null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
    }
        res.render("list", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, active2: 'active'});
      });
};

exports.laptop_detail = function(req, res) {

  async.parallel({
    laptops: function(callback){
      Laptop.find({}, "ten hinh giaban")
      .populate("nhasanxuat")
      .exec(callback);
    },
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
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
    res.render('laptop', { detail:  results, laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
});
};

exports.laptop_brand = function(req, res) {

  async.parallel({
    laptops: function(callback){
      Laptop.find({}, "ten hinh giaban")
      .populate("nhasanxuat")
      .exec(callback);
    },
    nhasanxuats: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    nhasanxuat: function(callback) {
        Nhasanxuat.findById(req.params.id)
          .exec(callback);
    },

    lap_brand: function(callback) {
      Laptop.find({ 'nhasanxuat': req.params.id })
      .exec(callback);
    },

}, function(err, results) {
    if (err) { return next(err); }
    if (results.nhasanxuat==null) {
        var err = new Error('Nha san xuat not found');
        err.status = 404;
        return next(err);
    }
    
    res.render('listbrand', { laptop_list1: results.lap_brand, laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuats });
});
};


exports.laptop_search = function(req, res, next) {

  async.parallel({
      laptops: function(callback){
        Laptop.find({}, "ten hinh giaban")
        .populate("nhasanxuat")
        .exec(callback);
      },
      nhasanxuat: function(callback){
        Nhasanxuat.find()
        .exec(callback) ;
      },
      laptop: function(callback) {
        Laptop.findOne({'ten' : req.query.ten})
            .exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Laptop not found');
          err.status = 404;
          return next(err);
      }

      res.render('laptopsearch', { detail:  results.laptop, laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
  });
};

exports.laptop_admin = function(req,res){
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("admin", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
}


exports.laptop_list_admin = function(req, res) {
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("list_laptop_admin", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
};

exports.nsx_list_admin = function(req, res) {
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("list_nsx_admin", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
};


exports.laptop_update_form = function(req,res){
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("updatelaptopform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
}

exports.nsx_update_form = function(req,res){
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("updatensxform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
}



exports.laptop_remove_form = function(req,res){
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("removelaptopform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
}


exports.nsx_remove_form = function(req,res){
  async.parallel({
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback); 
    },
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("removensxform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat});
    });
}
exports.laptop_update = function(req,res){
  var _ten = req.query.ten;
  var _maso = req.query.maso;
  var _ten1 = req.query.ten1;
  var _giaban = req.query.giaban;
  var _gianhap = req.query.gianhap;
  var _ram = req.query.ram;
  var _cpu = req.query.cpu;
  var _manhinh = req.query.manhinh;

//_maso = lap;
  //console.log(lap);
  async.parallel({
    laptopupdate: function(callback){
      Laptop.findOne({'ten' : _ten}, function(err, laptop){
        if(err) return next(err);
        if(_maso == "") _maso = laptop.maso;
        if(_ten1 == "") _ten1 = laptop.ten;
        if(_giaban == "") _giaban = laptop.giaban;
        if(_gianhap == "") _gianhap = laptop.gianhap;
        if(_ram == "") _ram = laptop.ram;
        if(_cpu == "") _cpu = laptop.cpu;
        if(_manhinh == "") _manhinh = laptop.manhinh;
        Laptop.findOneAndUpdate({'ten' : _ten}, {$set: {ten: _ten1, maso: _maso, giaban: _giaban, gianhap: _gianhap, ram: _ram, cpu: _cpu, manhinh: _manhinh}}, {new: true}, function(err, laptop){
        if(err) return next(err);
        })
      }).exec(callback);  
    },
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback);
    },
    
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("updatelaptopform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, thongbao: "Cập nhật thành công"});
    });
}

exports.laptop_update2 = function(req,res){
  var _ten = req.query.ten;
  var _ten1 = req.query.ten1;
  var _ttbh = req.query.ttbh;

//_maso = lap;
  //console.log(lap);
  async.parallel({
    nsxupdate: function(callback){
      Nhasanxuat.findOne({'ten' : _ten}, function(err, nsx){
        if(err) return next(err);
        if(_ten1 == "") _ten1 = nsx.ten;
        if(_ttbh == "") _ttbh = nsx.trungtambaohanh;
        Nhasanxuat.findOneAndUpdate({'ten' : _ten}, {$set: {ten: _ten1, trungtambaohanh: _ttbh}}, {new: true}, function(err, nsxresult){
        if(err) return next(err);
        })
      }).exec(callback);  
    },
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback);
    },
    
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("updatensxform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, thongbao: "Cập nhật thành công"});
    });
}





exports.laptop_remove = function(req,res){

  var _ten = req.query.ten;

  async.parallel({
    laptopupdate: function(callback){
      Laptop.findOne({'ten' : _ten}, function(err, laptop){
        if(err) return next(err);
        Laptop.findOneAndRemove({'ten' : _ten},function(err, laptop){
        if(err) return next(err);
        })
      }).exec(callback);  
    },
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback);
    },
    
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("removelaptopform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, thongbao: "Xóa thành công"});
    });

}

exports.laptop_remove2 = function(req,res){
  var _ten = req.query.ten;

  async.parallel({
    nsxupdate: function(callback){
      Nhasanxuat.findOne({'ten' : _ten}, function(err, nsx){
        if(err) return next(err);
       
        Nhasanxuat.findOneAndRemove({'ten' : _ten},function(err, nsxresult){
        if(err) return next(err);
        })
      }).exec(callback);  
    },
    nhasanxuat: function(callback){
      Nhasanxuat.find()
      .exec(callback) ;
    },
    laptops: function(callback){
      Laptop.find()
      .populate("nhasanxuat")
      .exec(callback);
    },
    
  }, function(err, results){
    if(err){ return next(err); }
    if (results.nhasanxuat==null) {
      var err = new Error('Nha san xuat not found');
      err.status = 404;
      return next(err);
  }
      res.render("removensxform", { laptop_list: results.laptops, nhasanxuat_list: results.nhasanxuat, thongbao: "Xóa thành công"});
    });
}

