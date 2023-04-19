const router = require('express').Router();
const { productsController } = require('../controllers');

// All products related product routes goes here
router.get('/', productsController.getProducts);
router.post('/create', productsController.createProduct);
router.delete('/:id', productsController.deleteProductById);
router.put('/:id/update_quantity', productsController.updateProduct);


module.exports = router;