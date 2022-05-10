const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM products';
  const [response] = await connection.execute(query);
  return response;
}

async function getProductById(id) {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[response]] = await connection.execute(query, [id]);
  return response;
}

module.exports = {
  getAll,
  getProductById,
};