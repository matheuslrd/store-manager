const connection = require('./connection');

const findByName = async ({ name }) => {
  const query = 'SELECT name FROM StoreManager.products WHERE name = ?';
  const [rows] = await connection.execute(query, [name]);
  console.log(findByName);
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');

  return rows[0];
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';

  const [rows] = await connection.execute(query, [name, quantity]);
  console.log(rows);
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');
  return rows;
};

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);
  console.log(products);
  console.log(products);
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');

  return products;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  console.log(product);
  console.log('String');
  console.log(product);
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');

  return product[0];
};

const update = async ({ id, body }) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [body.name, body.quantity, id]);

  const product = await getById({ id });
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');

  return product;
};

const deleteProduct = async ({ id }) => {
  const product = await getById({ id });

  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
  console.log('deleteProduct');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');
  console.log('update');
  console.log('Update');
  console.log('String');
  console.log('Update');

  return product;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  deleteProduct,
};