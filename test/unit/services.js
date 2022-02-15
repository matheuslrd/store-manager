const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../services/ProductService');
const ProductModel = require('../../models/productModel');
const SalesService = require('../../services/salesService');
const SalesModel = require('../../models/salesModel');

describe('--------PRODUTO-------', () => {
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

      sinon.stub(ProductModel, 'create')
        .resolves(productCreated);
    });

    after(() => {
      ProductModel.create.restore();
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
    const body = {
      name: 'Produto',
      quantity: 2,
    }

    before(() => {
      const productUpdated = {
        id: 1,
        name: 'Produto',
        quantity: 2,
      }

      sinon.stub(ProductModel, 'update').resolves(productUpdated);
    });

    after(() => {
      ProductModel.update.restore();
    });

    describe('quando é atualizado com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await ProductService.update({ id, body });

        expect(response).to.be.a('object');
      });
    });
  });

  describe('Produto - Procura produto por id', () => {
    const payloadProduct = { id: 1 };

    before(() => {
      const getById = {
        id: 1,
      };

      sinon.stub(ProductModel, 'getById').resolves(getById);
    });

    after(() => {
      ProductModel.getById.restore();
    });

    describe('Quando acha o produto', () => {
      it('retorna um objeto do produto que foi procurado', async () => {
        const response = await ProductService.getById(payloadProduct);

        expect(response).to.be.a('object');
      });
    });
  });

  describe('Produto - FindByName', () => {
    const payloadProduct = { name: 'Produto' }

    before(() => {
      const findByName = true;

      sinon.stub(ProductModel, 'findByName')
        .resolves(findByName);
    });

    after(() => {
      ProductModel.findByName.restore();
    });

    describe('quando acha o produto com sucesso', () => {

      it('retorna um boolean true', async () => {
        const response = await ProductService.findByName(payloadProduct);

        expect(response).to.be.a('boolean');
      });
    });
  });

  describe('Produto - GetAll', () => {

    before(() => {
      const productList = [{}];

      sinon.stub(ProductModel, 'getAll')
        .resolves(productList);
    });

    after(() => {
      ProductModel.getAll.restore();
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

      sinon.stub(ProductModel, 'deleteProduct')
        .resolves(productList);
    });

    after(() => {
      ProductModel.deleteProduct.restore();
    });

    describe('quando lista os produtos com sucesso', () => {
      it('retorna um array de objeto', async () => {
        const response = await ProductService.deleteProduct({ id });

        expect(response).to.be.a('object');
      });
    });
  });
});

describe('--------VENDA-------', () => {
  /* describe('Venda - Criação', () => {
    const payloadSale = {
      body: [{
        productId: 3,
        quantity: 2,
      }],
    }

    before(() => {
      const salesCreated = {
        id: 1,
        itemsSold: [{}],
      }

      sinon.stub(SalesModel, 'createSale').resolves(salesCreated);
    });

    after(() => {
      SalesModel.createSale.restore();
    });

    describe('quando é inserido com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await SalesService.createSale(payloadSale);

        expect(response).to.be.a('object');
      });
    });
  }); */

  describe('Venda - Pegar todas as vendas', () => {
    before(() => {
      const getAllSales = [{
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }];

      sinon.stub(SalesModel, 'getAllSales').resolves(getAllSales);
    });

    after(() => {
      SalesModel.getAllSales.restore();
    });

    describe('quando a listagem é concluida com sucesso', () => {
      it('retorna um array', async () => {
        const response = await SalesService.getAllSales();

        expect(response).to.be.a('array');
      });
    });
  });

  describe('Venda - Pegar venda por id', () => {
    const payloadSale = { id: 1 };

    before(() => {
      const getSaleById = { saleId: 1 };

      sinon.stub(SalesModel, 'getSaleById').resolves(getSaleById);
    });

    after(() => {
      SalesModel.getSaleById.restore();
    });

    describe('quando é encontrado a venda com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await SalesService.getSaleById(payloadSale);

        expect(response).to.be.a('object');
      });
    });
  });

  describe('Venda - Atualizar venda', () => {
    const payloadSale = {
      id: 1,
      body: [{
        product_id: 1,
        quantity: 3,
      }],
    };

    before(() => {
      const updateSale = { saleId: 1, itemUpdated: [{}] };

      sinon.stub(SalesModel, 'updateSale').resolves(updateSale);
    });

    after(() => {
      SalesModel.updateSale.restore();
    });

    describe('quando é atualizado a venda com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await SalesService.updateSale(payloadSale);

        expect(response).to.be.a('object');
      });
    });
  });

  describe('Venda - Deletar venda', () => {
    const payloadSale = { id: 1 };

    before(() => {
      const deleteSales = { id: 1 };

      sinon.stub(SalesModel, 'deleteSales').resolves(deleteSales);
    });

    after(() => {
      SalesModel.deleteSales.restore();
    });

    describe('quando é deletado a venda com sucesso', () => {

      it('retorna um objeto', async () => {
        const response = await SalesService.deleteSales(payloadSale);

        expect(response).to.be.a('object');
      });
    });
  });
});
