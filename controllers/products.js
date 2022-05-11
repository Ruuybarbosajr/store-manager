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

async function createNewProduct(req, res, next) {
  const { name, quantity } = req.body;
  try {
    const response = await service.products.createNewProduct(name, quantity);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const response = await service.products.updateProduct(id, name, quantity);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  const { id } = req.params;
  try {
    await service.products.deleteProduct(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};