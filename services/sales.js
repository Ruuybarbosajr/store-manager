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
  await model.sales.deleteSales(id);
}

module.exports = {
  getAll,
  getSalesById,
  createNewSales,
  updateSales,
  deleteSales,
};