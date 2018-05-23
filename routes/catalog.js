var express = require('express');
var router = express.Router();


var laptop_controller = require('../controllers/laptopController');

router.get('/', laptop_controller.index);

router.get('/laptop/:id', laptop_controller.laptop_detail);

router.get('/laptops/:page', laptop_controller.laptop_list);

router.get('/nhasanxuat/:id/:page', laptop_controller.laptop_brand);

router.get('/search', laptop_controller.laptop_search);

router.get('/admin', laptop_controller.laptop_admin);

router.get('/danhsachlaptop_admin', laptop_controller.laptop_list_admin);



router.get('/danhsachnsx_admin', laptop_controller.nsx_list_admin);

router.get('/updatelaptopform', laptop_controller.laptop_update_form);

router.get('/updatensxform', laptop_controller.nsx_update_form);
router.get('/removelaptopform',laptop_controller.laptop_remove_form);
router.get('/removensxform',laptop_controller.nsx_remove_form);




router.get('/update', laptop_controller.laptop_update);
router.get('/remove', laptop_controller.laptop_remove);
router.get('/remove2', laptop_controller.laptop_remove2);


router.get('/update2', laptop_controller.nxs_update);
module.exports = router;