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
    manhinh: manhinh
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
          "14.890.000",
          "12.656.000",
          "4 GB",
          "Intel Core i5-7200U",
          "15.6 inch, HD(1366x768)",
          nhasanxuats[0],
          callback
        );
      },
      function(callback) {
        computerCreate(
            "Dell102",
            "Laptop Dell Vostro 3568DS132FDDS",
            "/images/Laptop_2.jpg",
            "15.490.000",
            "13.170.000",
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD(1366x768)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell103",
            "Laptop Dell Inspiron 5468VCTRH4",
            "/images/Laptop_3.jpg",
            "15.990.000",
            "13.590.000",
            "4 GB",
            "Intel Core i5-7200U",
            "14 inch, HD (1366 x 768)",
            nhasanxuats[0],
            callback
          );
      },

      function(callback) {
        computerCreate(
            "Dell104",
            "Laptop Dell Inspiron 556GFGF12A7",
            "/images/Laptop_4.jpg",
            "16.790.000",
            "14.270.000",
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell105",
            "Laptop Dell Inspiron 557SDSA780",
            "/images/Laptop_5.jpg",
            "17.990.000",
            "15.300.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell106",
            "Laptop Dell Vostro 556DSAD128",
            "/images/Laptop_6.jpg",
            "17.990.000",
            "15.300.000",
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell107",
            "Laptop Dell Vostro 35DSADA23168",
            "/images/Laptop_7.jpg",
            "18.490.000",
            "15.700.000",
            "4 GB",
            "Intel Core i7-7500",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell108",
            "Laptop Dell Inspiron 5379 DASD487H",
            "/images/Laptop_8.jpg",
            "24.490.000",
            "20.815.000",
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell109",
            "Laptop Dell Inspiron 7577ABVYT78",
            "/images/Laptop_9.jpg",
            "29.990.000",
            "25.500.000",
            "8 GB",
            "Intel Core i7-7700HQ",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Dell110",
            "Laptop Dell Inspiron 7373FSD12UTWE",
            "/images/Laptop_10.jpg",
            "29.990.000",
            "25.500.000",
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[0],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP201",
            "Laptop HP Pavilion 14 bf019TUJFGFD",
            "/images/Laptop_11.jpg",
            "12.990.000",
            "11.050.000",
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP202",
            "Laptop HP Pavilion 14 bf034TUSHDSSDQ",
            "/images/Laptop_12.jpg",
            "12.990.000",
            "11.050.000",
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP203",
            "Laptop HP Pavilion x360 ba063TU2425",
            "/images/Laptop_13.jpg",
            "13.490.000",
            "11.500.000",
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, HD (1366 x 768)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP204",
            "Laptop HP Pavilion X360 ad026788TU",
            "/images/Laptop_14.jpg",
            "13.490.000",
            "11.500.000",
            "4 GB",
            "Intel Core i3-7100U",
            "11.6 inch, HD (1366 x 768)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP205",
            "Laptop HP 15 bs161TUGK adxF21213dU",
            "/images/Laptop_15.jpg",
            "13.990.000",
            "11.900.000",
            "4 GB",
            "Intel Core i5-8250",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP206",
            "Laptop HP 15 bs76887GRTNTX",
            "/images/Laptop_16.jpg",
            "17.890.000",
            "15.200.000",
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP207",
            "Laptop HP Envy 13 ad158TU-HJ45675IO",
            "/images/Laptop_17.jpg",
            "19.990.000",
            "16.990.000",
            "4 GB",
            "Intel Core i5-8250U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP208",
            "Laptop HP Envy 13 ad160TUTTH-3WGFD",
            "/images/Laptop_18.jpg",
            "26.490.000",
            "22.500.000",
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP209",
            "Laptop HP EliteBook X360 15457S030 G2",
            "/images/Laptop_19.jpg",
            "36.490.000",
            "31.000.000",
            "8 GB",
            "Intel Core i5-7200U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "HP210",
            "Laptop HP EliteBook X360 10SDVFGD30 G2",
            "/images/Laptop_20.jpg",
            "43.490.000",
            "36.700.000",
            "8 GB",
            "Intel Core i7-7600U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[2],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo301",
            "Laptop Lenovo Ideapad 320 14IGDFGDFGDSK",
            "/images/Laptop_21.jpg",
            "8.990.000",
            "7.650.000",
            "4 GB",
            "Intel Core i3-6006U",
            "14 inch, HD (1366 x 768)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo302",
            "Laptop Lenovo Ideapad 320 14EWTRWEISK",
            "/images/Laptop_22.jpg",
            "9.690.000",
            "8.250.000",
            "4 GB",
            "Intel Core i3-6006U",
            "14 inch,Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo303",
            "Laptop Lenovo IdeaPad 320 15IRWERWKBN",
            "/images/Laptop_23.jpg",
            "10.490.000",
            "8.920.000",
            "4 GB",
            "Intel Core i3-7130U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo304",
            "Laptop Lenovo Yoga 520 14REWGIKB",
            "/images/Laptop_24.jpg",
            "11.990.000",
            "10.200.000",
            "4 GB",
            "Intel Core i3-7130U",
            "14 inch, HD (1366 x 768)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo305",
            "Laptop Lenovo IdeaPad 320S 14GDFIKBR",
            "/images/Laptop_25.jpg",
            "12.490.000",
            "10.600.000",
            "4 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo306",
            "Laptop Lenovo IdeaPad 320 15GDFGIKB",
            "/images/Laptop_26.jpg",
            "14.990.000",
            "12.750.000",
            "4 GB",
            "Intel Core i5-8250U",
            "	15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo307",
            "Laptop Lenovo Yoga 520 14IKGDFGDFBR",
            "/images/Laptop_27.jpg",
            "15.490.000",
            "13.150.000",
            "4 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo308",
            "Laptop Lenovo IdeaPad 320 15IKBN",
            "/images/Laptop_28.jpg",
            "17.490.000",
            "14.900.000",
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo309",
            "Laptop Lenovo IdeaPad 720S 13FIKB",
            "/images/Laptop_29.jpg",
            "22.990.000",
            "19.550.000",
            "8 GB",
            "Intel Core i5-8250U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Lenovo310",
            "Laptop Lenovo IdeaPad 720S 13FDSIKB",
            "/images/Laptop_30.jpg",
            "24.990.000",
            "21.250.000",
            "8 GB",
            "Intel Core i7-8550U",
            "13.3 inch, Full HD (1920 x 1080)",
            nhasanxuats[1],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus401",
            "Laptop Asus A540UFDSFSDP",
            "/images/Laptop_31.jpg",
            "13.490.000",
            "11.500.000",
            "4 GB",
            "Intel Core i5-7200U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus402",
            "Laptop Asus X542VXCVUQ",
            "/images/Laptop_32.jpg",
            "13.990.000",
            "11.800.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus403",
            "Laptop Asus TP41BVEW50UA",
            "/images/Laptop_33.jpg",
            "13.990.000",
            "11.800.000",
            "4 GB",
            "Intel Core i3-7100U",
            "14 inch, Full HD (1920 x 1080)", 
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus404",
            "Laptop Asus X515436GD0UA",
            "/images/Laptop_34.jpg",
            "14.190.000",
            "12.050.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus405",
            "Laptop Asus X51TGFD530UQ",
            "/images/Laptop_35.jpg",
            "15.190.000",
            "12.900.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus406",  
            "Laptop Asus S51435GFDG0UA",
            "/images/Laptop_36.jpg",
            "16.290.000",
            "13.850.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus407",
            "Laptop Asus S5DFGEFDE43510UQ",
            "/images/Laptop_37.jpg",
            "17.290.000",
            "14.700.000",
            "4 GB",
            "Intel Core i5-8250U",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus408",
            "Laptop Asus X510T3453GE55UQ",
            "/images/Laptop_38.jpg",
            "17.990.000",
            "15.300.000",
            "4 GB",
            "Intel Core i7-8550U",
            "15.6 inch, HD (1366 x 768)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus409",
            "Laptop Asus UX4305454GDFCA",
            "/images/Laptop_39.jpg",
            "21.990.000",
            "18.700.000",
            "8 GB",
            "Intel Core i5-8250U",
            "14 inch, Full HD (1920 x 1080)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Asus410",
            "Laptop Asus FX503032S1VWS8VD",
            "/images/Laptop_40.jpg",
            "24.490.000",
            "20.800.000",
            "8 GB",
            "Intel Core i7-7700HQ",
            "15.6 inch, Full HD (1920 x 1080)",
            nhasanxuats[3],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac501",
            "Laptop Apple Macbook Air MQD32SA/A",
            "/images/Laptop_41.jpg",
            "23.990.000",
            "20.400.000",
            "8 GB",
            "Intel Core i5 Broadwell, 1.80 GHz",
            "13.3 inch, WXGA+(1440 x 900)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac502",
            "Laptop Apple Macbook Air MQD42SA/A",
            "/images/Laptop_42.jpg",
            "28.990.000",
            "24.650.000",
            "8 GB",
            "Intel Core i5 Broadwell, 1.80 GHz",
            "13.3 inch, WXGA+(1440 x 900)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac503",
            "Laptop Apple Macbook Pro MPXR2SA/A",
            "/images/Laptop_43.jpg",
            "33.990.000",
            "28.900.000",
            "8 GB",
            "Intel Core i5 Kabylake, 2.30 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac504",
            "Laptop Apple Macbook 12' MNYK2SA/A",
            "/images/Laptop_44.jpg",
            "33.990.000",
            "28.900.000",
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "12 inch, Retina (2304 x 1440)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac505",
            "Laptop Apple Macbook 12' MNYF2SA/A",
            "/images/Laptop_45.jpg",
            "33.990.000",
            "28.900.000",
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "12 inch, Retina (2304 x 1440)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac506",
            "Laptop Apple Macbook 12' MNYF3SA/A",
            "/images/Laptop_46.jpg",
            "33.990.000",
            "28.900.000",
            "8 GB",
            "Intel Core M, M3, 1.20 GHz",
            "13.3 inch, Retina (2304 x 1440)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac507",
            "Laptop Apple Macbook Pro MPXT2SA/A",
            "/images/Laptop_47.jpg",
            "38.990.000",
            "33.150.000",
            "8 GB",
            "Intel Core i5 Kabylake, 2.30 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac508",
            "Laptop Apple Macbook Pro Touch MPXV2SA/A",
            "/images/Laptop_48.jpg",
            "44.990.000",
            "38.250.000",
            "8 GB",
            "Intel Core i5 Kabylake, 3.10 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac509",
            "Laptop Apple Macbook Pro Touch MPXX2SA/A",
            "/images/Laptop_49.jpg",
            "44.990.000",
            "38.250.000",
            "8 GB",
            "Intel Core i5 Kabylake, 3.10 GHz",
            "13.3 inch, Retina (2560 x 1600)",
            nhasanxuats[4],
            callback
          );
      },
      function(callback) {
        computerCreate(
            "Mac510",
            "Laptop Apple Macbook Pro Touch MPTR2SA/A",
            "/images/Laptop_50.jpg",
            "59.990.000",
            "50.990.000",
            "16 GB",
            "Intel Core i7 Kabylake, 2.80 GHz",
            "15.4 inch, Retina (2880 x 1800)",
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
