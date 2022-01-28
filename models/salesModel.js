const connection = require('./connection');

/*
 Solução para inserção multipla de dados
  https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js/56241509
  https://github.com/tryber/sd-014-b-store-manager/blob/ivanielson-store-manager/models/salesModel.js
*/

const serialize = (product) => ({
  productId: product.product_id,
  quantity: product.quantity,
});

const createProductSales = async ({ body, id }) => {
  const productList = body
    .map(serialize)
    .map((product) => [id, product.productId, product.quantity]);

  const query = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity) VALUE ?`;

  await connection.query(query, [productList]);
};

const createSale = async ({ body }) => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';
  const [row] = await connection.execute(query);

  return { id: row.insertId, itemsSold: body };
};

module.exports = {
  createSale,
  createProductSales,
};
