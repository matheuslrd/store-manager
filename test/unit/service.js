const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../services/ProductService');

describe('Produto - Criação', () => {
  const payloadProduct = {
    name: 'Produto',
    quantity: 2,
  }

  before(() => {
    const productCreated = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    }

    sinon.stub(ProductService, 'create')
    .resolves(productCreated);
  });

  after(() => {
    ProductService.create.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('o objeto contem um id', async () => {
      const response = await ProductService.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });
});

describe('Produto - Atualizacao do produto pelo id', () => {
  const id = 1;
  const payloadProduct = {
    name: 'Produto',
    quantity: 2,
  }

  before(() => {
    const productUpdated = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    }

    sinon.stub(ProductService, 'update')
      .resolves(productUpdated);
  });

  after(() => {
    ProductService.update.restore();
  });

  describe('quando é atualizado com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await ProductService.update({ id, name: payloadProduct.name, quantity: payloadProduct.quantity });

      expect(response).to.be.a('object');
    });
  });
});

describe('Produto - FindByName', () => {
  const payloadProduct = { name: 'Produto' }

  before(() => {
    const findByName = true;

    sinon.stub(ProductService, 'findByName')
    .resolves(findByName);
  });

  after(() => {
    ProductService.findByName.restore();
  });

  describe('quando acha o produto com sucesso', () => {

    it('retorna um boolean', async () => {
      const response = await ProductService.findByName(payloadProduct);

      expect(response).to.be.a('boolean');
    });
  });
});

describe('Produto - GetAll', () => {

  before(() => {
    const productList = [{}];

    sinon.stub(ProductService, 'getAll')
    .resolves(productList);
  });

  after(() => {
    ProductService.getAll.restore();
  });

  describe('quando lista os produtos com sucesso', () => {
    it('retorna um array de objeto', async () => {
      const response = await ProductService.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });
  });
});

describe('Produto - deleteProduct', () => {
  const id = 1;

  before(() => {
    const productList = { id: 1 };

    sinon.stub(ProductService, 'deleteProduct')
    .resolves(productList);
  });

  after(() => {
    ProductService.deleteProduct.restore();
  });

  describe('quando lista os produtos com sucesso', () => {
    it('retorna um array de objeto', async () => {
      const response = await ProductService.deleteProduct();

      expect(response).to.be.a('object');
    });
  });
});


