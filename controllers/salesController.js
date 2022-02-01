const SalesService = require('../services/salesService');

const validateProductId = (req, res, next) => {
  const { body } = req;

  body.forEach((product) => {
    if (!product.product_id) {
      return res.status(400).json({ message: '"product_id" is required' });
    }
  });

  next();
};

const createSales = async (req, res) => {
  const { body } = req;

  const productsSales = await SalesService.createSale({ body });
  await SalesService.createSalesProducts({ body });

  return res.status(201).json(productsSales);
};

module.exports = {
  createSales,
  validateProductId,
};
