 const express = require('express');
 const productController = require('../controllers/productController');
const router = require('./vendorRoutes');

 router.post('/add-product/:firmId', productController.addProduct);
 router.get('/:firmId/products', productController.getProductByFirm);

 router.get('/uploads/:imageName', (req, res)=>{
    imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
});

router.delete('/:productId', productController.deleteProductById)


 module.exports = router;