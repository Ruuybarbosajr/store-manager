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

async function updateProduct(id, name, quantity) {
  const query = `
  UPDATE products
  SET name = ?,
  quantity = ?
  WHERE id = ?`;

  await connection.execute(query, [name, quantity, id]);

  return {
    id,
    name,
    quantity,
  };
}

module.exports = {
  getAll,
  getProductById,
  createNewProduct,
  getProductByName,
  updateProduct,
};