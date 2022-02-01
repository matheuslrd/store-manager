const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const {
    getById,
    validateName,
    validateQuantity,
    update,
    deleteProduct,
    findByName,
    create,
    getAll } = require('./controllers/productController');
const SalesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
  .get(getById)
  .put(validateName, validateQuantity, update)
  .delete(deleteProduct);

app.route('/sales')
  .post(
    SalesController.validateProductId,
    SalesController.validateQuantity,
    SalesController.createSales,
  );

app.route('/products')
  .post(validateName, findByName, validateQuantity, create)
  .get(getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
