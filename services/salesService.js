const SalesModel = require('../models/salesModel');

const createSale = async ({ body }) => {
  const salesProducts = await SalesModel.createSale({ body });
  return salesProducts;
};

const serialize = (product) => ({
  productId: product.product_id,
  quantity: product.quantity,
});

const createSalesProducts = async ({ body }) => {
  const { id } = await SalesModel.createSale({ body });
  const products = body
    .map(serialize)
    .map((product) => [id, product.productId, product.quantity]);

  await SalesModel.createProductSales({ products });
};

module.exports = {
  createSale,
  createSalesProducts,
};