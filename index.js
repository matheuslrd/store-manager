const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const Product = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
  .get(Product.getById)
  .put(Product.validateName, Product.validateQuantity, Product.update)
  .delete(Product.deleteProduct);

app.route('/products')
  .post(Product.validateName, Product.findByName, Product.validateQuantity, Product.create)
  .get(Product.getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
