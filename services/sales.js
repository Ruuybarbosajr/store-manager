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
  // poderia ter uma verificação dos ids dos produtos
  const response = await model.sales.createNewSales(sales);
  return response;
}

module.exports = {
  getAll,
  getSalesById,
  createNewSales,
};