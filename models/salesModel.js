const connection = require('./connection');

const serialize = (product) => ({
  productId: product.product_id,
  quantity: product.quantity,
});

const createSale = ({ body }) => {
  body.map(serialize).forEach(async ({ productId, quantity }) => {
    const query = 'INSERT INTO StoreManager.sales (product_id, quantity) VALUES (?, ?)';

    await connection.execute(query, [productId, quantity]);
  });

  return body;
};

module.exports = {
  createSale,
};
