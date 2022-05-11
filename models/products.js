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

async function createNewProduct(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return {
    id: insertId,
    name,
    quantity,
  };
}

async function getProductByName(name) {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [response] = await connection.execute(query, [name]);
  return response;
}

module.exports = {
  getAll,
  getProductById,
  createNewProduct,
  getProductByName,
};