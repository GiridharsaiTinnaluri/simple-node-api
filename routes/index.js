const router = require('express').Router();
const productRoutes = require('./products');

//root folder for all routes
router.use('/products', productRoutes);

module.exports = router;