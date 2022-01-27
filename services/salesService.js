const SalesModel = require('../models/salesModel');

const createSale = ({ body }) => {
  const salesProducts = SalesModel.createSale({ body });

  return salesProducts;
};

module.exports = {
  createSale,
};