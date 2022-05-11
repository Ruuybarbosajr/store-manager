const error = require('./error');
const bodyProducts = require('./body.products');
const bodySales = require('./body.sales');
const contentBodyProducts = require('./contentBody.products');
const contentBodySales = require('./contentBody.sales');

module.exports = {
  error,
  valid: {
    bodyProducts,
    bodySales,
    contentBodyProducts,
    contentBodySales,
  },
};