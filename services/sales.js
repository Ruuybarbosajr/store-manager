const model = require('../models');

async function getAll() {
  const response = model.sales.getAll();
  return response;
}

module.exports = {
  getAll,
};