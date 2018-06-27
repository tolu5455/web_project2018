#! /usr/bin/env node

console.log(
  "This script populates some test computers, nhasanxuats to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith("mongodb://")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

var async = require("async");
var Computer = require("./models/ComputerModel");
var Nhasanxuat = require("./models/NhaSanXuatModel");

var mongoose = require("mongoose");
var mongoDB = "mongodb://tolu5455:intheend54@ds121730.mlab.com:21730/computer";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

var nhasanxuats = [];
var computers = [];

function nhasanxuatCreate(ten, hinh, trungtambaohanh, cb) {
  nhasanxuatdetail = { ten: ten, hinh: hinh, trungtambaohanh: trungtambaohanh };

  var nhasanxuat = new Nhasanxuat(nhasanxuatdetail);

  nhasanxuat.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("Tạo mới nhà sản xuất: " + nhasanxuat);
    nhasanxuats.push(nhasanxuat);
    cb(null, nhasanxuat);
  });
}

function computerCreate(
  maso,
  ten,
  hinh,
  giaban,
  gianhap,
  ram,
  cpu,
  manhinh,
  soluongton,
  nhasanxuat,
  cb
) {
  computerdetail = {
    maso: maso,
    ten: ten,
    hinh: hinh,
    giaban: giaban,
    gianhap: gianhap,
    ram: ram,
    cpu: cpu,
    manhinh: manhinh,
    soluongton: soluongton
  };
  if (nhasanxuat != false) computerdetail.nhasanxuat = nhasanxuat;

  var computer = new Computer(computerdetail);
  computer.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("Tạo mới laptop: " + computer);
    computers.push(computer);
    cb(null, computer);
  });
}

function createNhasanxuats(cb) {
  async.parallel(
    [
      function(callback) {
        nhasanxuatCreate("Dell", "/images/Dell_brand.png", "84, đường 3-2, quận 10, TPHCM", callback);
      },
      function(callback) {
        nhasanxuatCreate("HP", "/images/Hp_brand.png", "1023, đường Võ Văn Kiệt, quận 5, TPHCM", callback);
      },
      function(callback) {
        nhasanxuatCreate("Lenovo", "/images/Lenovo_brand.png", "1, đường Cách Mạng Tháng 8, quận Tân Bình, TPHCM", callback);
      },
      function(callback) {
        nhasanxuatCreate("Asus", "/images/Asus_brand.png", "36, đường D2, quận Bình Thạnh, TPHCM", callback);
      },
      function(callback) {
        nhasanxuatCreate("Mac", "/images/Mac_brand.png", "171, đường Cao Thắng, quận 10, TPHCM", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createComputers(cb) {
  async.parallel(
    [
      function(callback) {
        computerCreate(
          "Dell101",
          "Laptop Dell Inspiron 3567FDDW",
          "/images/Laptop_1.jpg",
          14890000,
          12656000,
          "4 GB",
          "Intel Core i5-7200U",
          "15.6 inch, HD(1366x768)",
          50,
          nhasanxuats[0],
          callback
        );
      },
      function(callback) {
        computerCreate(
            "Dell102",
            "Laptop Dell Vostro 3568DS132FDDS",
            "/images/Laptop_2.jpg",
            15490000,
            13170000,
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD(1366x768)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell103",
            "Laptop Dell Inspiron 5468VCTRH4",
            "/images/Laptop_3.jpg",
            15990000,
            13590000,
            "4 GB",
            "Intel Core i5-7200U",
            "14 inch, HD (1366 x 768)",
            50,
            nhasanxuats[0],
            callback
          );
      },

      function(callback) {
        computerCreate(
            "Dell104",
            "Laptop Dell Inspiron 556GFGF12A7",
            "/images/Laptop_4.jpg",
            16790000,
            14270000,
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell105",
            "Laptop Dell Inspiron 557SDSA780",
            "/images/Laptop_5.jpg",
            17990000,
            15300000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell106",
            "Laptop Dell Vostro 556DSAD128",
            "/images/Laptop_6.jpg",
            17990000,
            15300000,
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell107",
            "Laptop Dell Vostro 35DSADA23168",
            "/images/Laptop_7.jpg",
            18490000,
            15700000,
            "4 GB",
            "Intel Core i7-7500",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell108",
            "Laptop Dell Inspiron 5379 DASD487H",
            "/images/Laptop_8.jpg",
            24490000,
            20815000,
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell109",
            "Laptop Dell Inspiron 7577ABVYT78",
            "/images/Laptop_9.jpg",
            29990000,
            25500000,
            "8 GB",
            "Intel Core i7-7700HQ",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell110",
            "Laptop Dell Inspiron 7373FSD12UTWE",
            "/images/Laptop_10.jpg",
            29990000,
            25500000,
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP201",
            "Laptop HP Pavilion 14 bf019TUJFGFD",
            "/images/Laptop_11.jpg",
            14990000,
            11050000,
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP202",
            "Laptop HP Pavilion 14 bf034TUSHDSSDQ",
            "/images/Laptop_12.jpg",
            12990000,
            11050000,
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP203",
            "Laptop HP Pavilion x360 ba063TU2425",
            "/images/Laptop_13.jpg",
            13490000,
            11500000,
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, HD (1366 x 768)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP204",
            "Laptop HP Pavilion X360 ad026788TU",
            "/images/Laptop_14.jpg",
            13490000,
            11500000,
            "4 GB",
            "Intel Core i3-7100U",
            "11.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP205",
            "Laptop HP 15 bs161TUGK adxF21213dU",
            "/images/Laptop_15.jpg",
            13990000,
            11900000,
            "4 GB",
            "Intel Core i5-8250",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP206",
            "Laptop HP 15 bs76887GRTNTX",
            "/images/Laptop_16.jpg",
            17890000,
            15200000,
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP207",
            "Laptop HP Envy 13 ad158TU-HJ45675IO",
            "/images/Laptop_17.jpg",
            19990000,
            16990000,
            "4 GB",
            "Intel Core i5-8250U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP208",
            "Laptop HP Envy 13 ad160TUTTH-3WGFD",
            "/images/Laptop_18.jpg",
            26490000,
            22500000,
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP209",
            "Laptop HP EliteBook X360 15457S030 G2",
            "/images/Laptop_19.jpg",
            36490000,
            31000000,
            "8 GB",
            "Intel Core i5-7200U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP210",
            "Laptop HP EliteBook 2018 New Generation X360 10SDVFGD30",
            "/images/Laptop_20.jpg",
            43490000,
            36700000,
            "8 GB",
            "Intel Core i7-7600U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo301",
            "Laptop Lenovo Ideapad 320 14IGDFGDFGDSK",
            "/images/Laptop_21.jpg",
            8990000,
            7650000,
            "4 GB",
            "Intel Core i3-6006U",
            "14 inch, HD (1366 x 768)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo302",
            "Laptop Lenovo Ideapad 320 14EWTRWEISK",
            "/images/Laptop_22.jpg",
            9690000,
            6250000,
            "4 GB",
            "Intel Core i3-6006U",
            "14 inch,Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo303",
            "Laptop Lenovo IdeaPad 320 15IRWERWKBN",
            "/images/Laptop_23.jpg",
            10490000,
            89200000,
            "4 GB",
            "Intel Core i3-7130U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo304",
            "Laptop Lenovo Yoga 520 14REWGIKB",
            "/images/Laptop_24.jpg",
            11990000,
            10200000,
            "4 GB",
            "Intel Core i3-7130U",
            "14 inch, HD (1366 x 768)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo305",
            "Laptop Lenovo IdeaPad 320S 14GDFIKBR",
            "/images/Laptop_25.jpg",
            12490000,
            10600000,
            "4 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo306",
            "Laptop Lenovo IdeaPad 320 15GDFGIKB",
            "/images/Laptop_26.jpg",
            14990000,
            12750000,
            "4 GB",
            "Intel Core i5-8250U",
            "	15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo307",
            "Laptop Lenovo Yoga 520 14IKGDFGDFBR",
            "/images/Laptop_27.jpg",
            15490000,
            13150000,
            "4 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo308",
            "Laptop Lenovo IdeaPad 320 15IKBN",
            "/images/Laptop_28.jpg",
            17490000,
            14900000,
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo309",
            "Laptop Lenovo IdeaPad 720S 13FIKB",
            "/images/Laptop_29.jpg",
            22990000,
            19550000,
            "8GB",
            "Intel Core i5-8250U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo310",
            "Laptop Lenovo IdeaPad 720S 13FDSIKB",
            "/images/Laptop_30.jpg",
            24990000,
            21250000,
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus401",
            "Laptop Asus A540UFDSFSDP",
            "/images/Laptop_31.jpg",
            13490000,
            11500000,
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus402",
            "Laptop Asus X542VXCVUQ Full HD",
            "/images/Laptop_32.jpg",
            13990000,
            11800000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus403",
            "Laptop Asus TP41BVEW50UA",
            "/images/Laptop_33.jpg",
            13990000,
            11800000,
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)", 
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus404",
            "Laptop Asus X515436GD0UA",
            "/images/Laptop_34.jpg",
            14190000,
            12050000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus405",
            "Laptop Asus X51TGFD530UQ",
            "/images/Laptop_35.jpg",
            15190000,
            12900000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus406",  
            "Laptop Asus S51435GFDG0UA",
            "/images/Laptop_36.jpg",
            16290000,
            13850000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus407",
            "Laptop Asus S5DFGEFDE43510UQ",
            "/images/Laptop_37.jpg",
            17290000,
            14700000,
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus408",
            "Laptop Asus X510T3453GE55UQ",
            "/images/Laptop_38.jpg",
            17990000,
            15300000,
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, HD (1366 x 768)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus409",
            "Laptop Asus UX4305454GDFCA",
            "/images/Laptop_39.jpg",
            21990000,
            18700000,
            "8 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus410",
            "Laptop Asus FX503 Full HD Led iPs",
            "/images/Laptop_40.jpg",
            24490000,
            20800000,
            "8 GB",
            "Intel Core i7-7700HQ",
            "15.6 inch, Full HD (1920 x 1080)",
            50,
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac501",
            "Laptop Apple Macbook Air MQD32SA/A",
            "/images/Laptop_41.jpg",
            23990000,
            20400000,
            "8 GB",
            "Intel Core i5 Broadwell, 1.80 GHz",
            "13.3 inch, WXGA+(1440 x 900)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac502",
            "Laptop Apple Macbook Air MQD42SA/A",
            "/images/Laptop_42.jpg",
            28990000,
            24650000,
            "8 GB",
            "Intel Core i5 Broadwell, 1.80 GHz",
            "13.3 inch, WXGA+(1440 x 900)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac503",
            "Laptop Apple Macbook Pro MPXR2SA/A",
            "/images/Laptop_43.jpg",
            33990000,
            28900000,
            "8 GB",
            "Intel Core i5 Kabylake, 2.30 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac504",
            "Laptop Apple Macbook 12' MNYK2SA/A",
            "/images/Laptop_44.jpg",
            33990000,
            28900000,
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "12 inch, Retina (2304 x 1440)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac505",
            "Laptop Apple Macbook 12' MNYF2SA/A",
            "/images/Laptop_45.jpg",
            33990000,
            28900000,
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "12 inch, Retina (2304 x 1440)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac506",
            "Laptop Apple Macbook 12' MNYF3SA/A",
            "/images/Laptop_46.jpg",
            33990000,
            28900000,
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "13.3 inch, Retina (2304 x 1440)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac507",
            "Laptop Apple Macbook Pro MPXT2SA/A",
            "/images/Laptop_47.jpg",
            38990000,
            33150000,
            "8 GB",
            "Intel Core i5 Kabylake, 2.30 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac508",
            "Laptop Apple Macbook Pro Touch MPXV2SA/A",
            "/images/Laptop_48.jpg",
            44990000,
            38250000,
            "8 GB",
            "Intel Core i5 Kabylake, 3.10 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac509",
            "Laptop Apple Macbook Pro Touch MPXX2SA/A",
            "/images/Laptop_49.jpg",
            44990000,
            38250000,
            "8 GB",
            "Intel Core i5 Kabylake, 3.10 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            50,
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac510",
            "Laptop Apple Macbook Pro Touch MPTR2SA/A",
            "/images/Laptop_50.jpg",
            59990000,
            50990000,
            "16 GB",
            "Intel Core i7 Kabylake, 2.80 GHz",
            "15.4 inch, Retina (2880 x 1800)",
            50,
            nhasanxuats[4],
            callback
          );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createNhasanxuats, createComputers],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("All Laptop: " + computers);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
