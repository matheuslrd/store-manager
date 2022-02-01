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
  const query = 'SELECT * FROM StoreManager.sales';

  const [products] = await connection.execute(query);

  return products;
};

const getSaleById = async ({ id }) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [sales] = await connection.execute(query, [id]);

  return sales[0];
};

module.exports = {
  createSale,
  createProductSales,
  getAllSales,
  getSaleById,
};
