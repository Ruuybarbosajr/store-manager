const model = require('../models');

async function getAll() {
  const products = await model.products.getAll();
  return products;
}

async function getProductById(id) {
  const product = await model.products.getProductById(id);
  if (!product) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  return product;
}

module.exports = {
  getAll,
  getProductById,
};