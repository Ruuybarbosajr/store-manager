const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.sales.getAll);
router.get('/:id', controller.sales.getSalesById);

module.exports = router;