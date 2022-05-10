const service = require('../services');

async function getAll(_req, res, next) {
  try {
    const response = await service.products.getAll();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  const { id } = req.params;
  try {
    const response = await service.products.getProductById(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getProductById,
};