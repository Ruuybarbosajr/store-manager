const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/', controller.sales.getAll);
router.get('/:id', controller.sales.getSalesById);

router.post(
  '/',
  middleware.valid.bodySales,
  middleware.valid.contentBodySales,
  controller.sales.createNewSales,
);

module.exports = router;