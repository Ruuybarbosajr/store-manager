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

async function createNewProduct(name, quantity) {
  const existName = await model.products.getProductByName(name);
  if (existName.length) {
    const error = { status: 409, message: 'Product already exists' };
    throw error;
  }
  const response = await model.products.createNewProduct(name, quantity);
  return response;
}

async function updateProduct(id, name, quantity) {
  const findProduct = await model.products.getProductById(id);
  if (!findProduct) {
    const error = { status: 404, message: 'Product not found' };
    throw error;
  }
  const response = await model.products.updateProduct(id, name, quantity);
  return response;
}

module.exports = {
  getAll,
  getProductById,
  createNewProduct,
  updateProduct,
};