
const vendorController = require('../controllers/vendorController');

const express = require('express')

const router = express.Router();

router.post('/register' , vendorController.VendorRegister);

router.post('/login' , vendorController.vendorLogin);

router.get('/vendor-All', vendorController.getAllVendors);

router.get('/vendor-single/:apple', vendorController.getVendorById);



module.exports = router;