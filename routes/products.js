const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/', controller.products.getAll);
router.get('/:id', controller.products.getProductById);
router.post(
  '/',
  middleware.valid.bodyProducts,
  middleware.valid.contentBodyProducts,
  controller.products.createNewProduct,
);

router.put(
  '/:id', 
  middleware.valid.bodyProducts,
  middleware.valid.contentBodyProducts,
  controller.products.updateProduct,
);

router.delete('/:id', controller.products.deleteProduct);

module.exports = router;