const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.products.getAll);
router.get('/:id', controller.products.getProductById);

module.exports = router;