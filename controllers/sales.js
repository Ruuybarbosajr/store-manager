const service = require('../services');

async function getAll(_req, res, next) {
  try {
    const response = await service.sales.getAll();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
};