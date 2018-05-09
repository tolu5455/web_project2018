var express = require('express');
var router = express.Router();


var laptop_controller = require('../controllers/laptopController');

router.get('/', laptop_controller.index);

router.get('/laptop/:id', laptop_controller.laptop_detail);

router.get('/laptops', laptop_controller.laptop_list);

module.exports = router;