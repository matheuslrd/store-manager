const SalesService = require('../services/salesService');

const createSales = async (req, res) => {
  const { body } = req;

  const productsSales = await SalesService.createSale({ body });
  await SalesService.createSalesProducts({ body });

  return res.status(201).json(productsSales);
};

module.exports = {
  createSales,
};
