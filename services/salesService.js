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

const getAllSales = async () => {
  const products = await SalesModel.getAllSales();

  return products;
};

const getSaleById = async ({ id }) => {
  const sale = await SalesModel.getSaleById({ id });

  return sale;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAllSales,
  getSaleById,
};