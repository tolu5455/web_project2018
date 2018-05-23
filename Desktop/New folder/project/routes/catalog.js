var express = require('express');
var router = express.Router();


var laptop_controller = require('../controllers/laptopController');

router.get('/', laptop_controller.index);

router.get('/laptop/:id', laptop_controller.laptop_detail);

router.get('/laptops', laptop_controller.laptop_list);

router.get('/nhasanxuat/:id', laptop_controller.laptop_brand);

router.get('/search', laptop_controller.laptop_search);

router.get('/admin', laptop_controller.laptop_admin);

router.get('/danhsachlaptop_admin', laptop_controller.laptop_list_admin);

router.get('/danhsachnsx_admin', laptop_controller.nsx_list_admin);

router.get('/updatelaptopform', laptop_controller.laptop_update_form);

router.get('/updatensxform', laptop_controller.nsx_update_form);

router.get('/themlaptopform',laptop_controller.laptop_themlaptop);

router.get('/add',laptop_controller.laptop_add);

router.get('/themnsxform',laptop_controller.laptop_themlaptop);

router.get('/addnsx',laptop_controller.laptop_addnsx);

router.get('/update', laptop_controller.laptop_update);

router.get('/update2', laptop_controller.laptop_update2);
module.exports = router;