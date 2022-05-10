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

module.exports = {
  getAll,
  getSalesById,
};