const connection = require('./connection');

async function getAll() {
  const query = `
  SELECT sp.sale_id AS saleId,
  sl.date,
  sp.product_id AS productId,
  sp.quantity
  FROM sales_products AS sp
  JOIN sales AS sl
  ON sp.sale_id = sl.id`;
  const [response] = await connection.execute(query);
  return response;
}

async function getSalesById(id) {
  const query = `
  SELECT sl.date,
  sp.product_id AS productId,
  sp.quantity
  FROM sales_products AS sp
  JOIN sales AS sl
  ON sl.id = sp.sale_id
  WHERE sl.id = ?`;
  const [response] = await connection.execute(query, [id]);
  return response;
}

async function createNewSales(sales) {
  const insertSale = `
  INSERT INTO sales (date)
  VALUES (NOW())`;

  const insertProducts = `
  INSERT INTO sales_products (sale_id, product_Id, quantity)
  VALUES (?, ?, ?)`;

  const [{ insertId }] = await connection.execute(insertSale);

  const arrPromise = sales.map(({ quantity, productId }) => 
    connection.execute(insertProducts, [insertId, productId, quantity]));
  
  await Promise.all(arrPromise);

  return {
    id: insertId,
    itemsSold: sales, 
  };
}

module.exports = {
  getAll,
  getSalesById,
  createNewSales,
};
