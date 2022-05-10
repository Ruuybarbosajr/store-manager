const model = require('../models');

async function getAll() {
  const products = await model.products.getAll();
  return products;
}

module.exports = {
  getAll,
};