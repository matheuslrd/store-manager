const SalesModel = require('../models/salesModel');

const createSale = async ({ body }) => {
  const salesProducts = await SalesModel.createSale({ body });
  return salesProducts;
};

const createSalesProducts = async ({ body }) => {
  const { id } = await SalesModel.createSale({ body });

  await SalesModel.createProductSales({ body, id });
};

module.exports = {
  createSale,
  createSalesProducts,
};