const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM products';
  const [response] = await connection.execute(query);
  return response;
}

module.exports = {
  getAll,
};