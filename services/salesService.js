const SalesModel = require('../models/salesModel');

const createSale = async ({ body }) => {
  const salesProducts = await SalesModel.createSale({ body });
  return salesProducts;
};

const serialize = (product) => ({
  productId: product.product_id,
  quantity: product.quantity,
});

const createSalesProducts = async ({ body, id }) => {
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

const updateSale = async ({ id, body }) => {
  const { product_id: productId, quantity } = body[0];
  const itemUpdate = body[0];
  const saleUpdated = await SalesModel.updateSale({ id, productId, quantity, itemUpdate });

  return saleUpdated;
};

const deleteSales = async ({ id }) => {
  const sales = await SalesModel.deleteSales({ id });
  return sales;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSales,
};