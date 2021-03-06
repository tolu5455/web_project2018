var express = require('express');
var router = express.Router();


var laptop_controller = require('../controllers/laptopController');

router.get('/', laptop_controller.index);

router.get('/homepage/:username', laptop_controller.homepage);

router.get('/laptop/:id', laptop_controller.laptop_detail);

router.get('/laptops/:page', laptop_controller.laptop_list);

router.get('/nhasanxuat/:id/:page', laptop_controller.laptop_brand);

router.get('/search', laptop_controller.laptop_search);

router.get('/admin/:username', laptop_controller.laptop_admin);

router.get('/danhsachlaptop_admin', laptop_controller.laptop_list_admin);

router.get('/danhsachnsx_admin', laptop_controller.nsx_list_admin);

router.get('/updatelaptopform', laptop_controller.laptop_update_form);

router.get('/updatensxform', laptop_controller.nsx_update_form);

router.get('/removelaptopform',laptop_controller.laptop_remove_form);
router.get('/removensxform',laptop_controller.nsx_remove_form);

router.get('/themlaptopform',laptop_controller.laptop_themlaptop);
router.post('/add',laptop_controller.laptop_add);
router.get('/themnsxform',laptop_controller.nsx_themnsx);
router.post('/addnsx',laptop_controller.nsx_add);

router.post('/update', laptop_controller.laptop_update);
router.post('/remove', laptop_controller.laptop_remove);
router.post('/remove2', laptop_controller.laptop_remove2);
router.post('/update2', laptop_controller.nxs_update);

router.get('/danhsachtk_admin', laptop_controller.list_taikhoan)

router.get('/cart', laptop_controller.cart);
router.post('/doCart', laptop_controller.doCart);
router.post('/xoacart', laptop_controller.xoacart);

router.get('/capquyentk', laptop_controller.capquyentkform)
router.post('/capquyentk', laptop_controller.capquyentk)

router.post('/datmua', laptop_controller.datmua);

router.post('/thanhtoan', laptop_controller.thanhtoan);

router.get('/dondathanglist', laptop_controller.dondathanglist);

router.post('/luuSP', laptop_controller.luuSP);

router.get('/laptopless10/:page', laptop_controller.laptop_less_10);
router.get('/laptop1020/:page', laptop_controller.laptop_10_20);
router.get('/laptop2030/:page', laptop_controller.laptop_20_30);
router.get('/laptopmore30/:page', laptop_controller.laptop_more_30);

router.get('/themtkform', laptop_controller.themtk);
router.get('/removetkform', laptop_controller.removetk);
router.get('/updatetkform', laptop_controller.updatetk);
router.get('/user/:id',laptop_controller.client_information);

router.post('/saveinformation',laptop_controller.saveClient_information);
router.post('/comment', laptop_controller.comment)

router.get('/timkiem',laptop_controller.timkiemform)
router.post('/timkiem', laptop_controller.timkiem)

router.get('/doimatkhau', laptop_controller.changePassword);

router.post('/doimatkhau',laptop_controller.doChangepassword);

module.exports = router;