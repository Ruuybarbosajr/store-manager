const model = require('../models');

async function getAll() {
  const response = model.sales.getAll();
  return response;
}

async function getSalesById(id) {
  const response = await model.sales.getSalesById(id);
  if (!response.length) {
    const error = { status: 404, message: 'Sale not found' };
    throw error;
  }
  return response;
}

async function createNewSales(sales) {
  const arrProduct = await Promise.all(sales.map(({ productId }) => 
  model.products.getProductById(productId)));

  const hasStock = sales.some((sale, index) => sale.quantity > arrProduct[index].quantity);

  if (hasStock) {
    const error = { status: 422, message: 'Such amount is not permitted to sell' };
    throw error;
  }

  const response = await model.sales.createNewSales(sales);
  await model.products.updateQuantity(response.itemsSold, '-');
  return response;
}

async function updateSales(id, sales) {
  const response = await model.sales.updateSales(id, sales);
  return response;
}

async function deleteSales(id) {
  const findSale = await model.sales.getSalesById(id);
  if (!findSale.length) {
    const error = { status: 404, message: 'Sale not found' };
    throw error;
  }

  await model.products.updateQuantity(findSale, '+');
  await model.sales.deleteSales(id);
}

module.exports = {
  getAll,
  getSalesById,
  createNewSales,
  updateSales,
  deleteSales,
};