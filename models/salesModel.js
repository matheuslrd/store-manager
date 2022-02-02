const connection = require('./connection');

/*
 Solução para inserção multipla de dados
  https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js/56241509
  https://github.com/tryber/sd-014-b-store-manager/blob/ivanielson-store-manager/models/salesModel.js
*/

const createProductSales = async ({ products }) => {
  const query = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) VALUE ?`;

  await connection.query(query, [products]);
};

const createSale = async ({ body }) => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [row] = await connection.execute(query);

  return { id: row.insertId, itemsSold: body };
};

const getAllSales = async () => {
  const query = `SELECT s.id AS saleId,
  s.date,
  sp.product_id,
  sp.quantity
  FROM StoreManager.sales as s
  JOIN StoreManager.sales_products as sp
  ON s.id = sp.sale_id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getSaleById = async ({ id }) => {
  const query = `SELECT s.date,
  sp.product_id,
  sp.quantity
  FROM StoreManager.sales as s
  JOIN StoreManager.sales_products as sp
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ?
  ORDER BY sp.product_id`;

  const [sales] = await connection.execute(query, [id]);

  return sales;
};

module.exports = {
  createSale,
  createProductSales,
  getAllSales,
  getSaleById,
};
