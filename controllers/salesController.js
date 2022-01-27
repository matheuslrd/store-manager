const SalesService = require('../services/salesService');

const salesCreate = (req, res) => {
  const { body } = req;

  const productsSales = SalesService.createSale({ body });

  return res.status(200).json(productsSales);
};

module.exports = {
  salesCreate,
};
