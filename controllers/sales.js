const service = require('../services');

async function getAll(_req, res, next) {
  try {
    const response = await service.sales.getAll();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getSalesById(req, res, next) {
  const { id } = req.params;
  try {
    const response = await service.sales.getSalesById(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function createNewSales(req, res, next) {
  try {
    const response = await service.sales.createNewSales(req.body);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function updateSales(req, res, next) {
  const { id } = req.params;
  try {
    const response = await service.sales.updateSales(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteSales(req, res, next) {
  const { id } = req.params;
  try {
    await service.sales.deleteSales(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getSalesById,
  createNewSales,
  updateSales,
  deleteSales,
};