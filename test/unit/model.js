const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel');

describe('--------PRODUTO-------', () => {

  describe('Produto - Criação', () => {
    const payloadProduct = {
      name: 'Product',
      quantity: 3,
    };

    before(() => {
      const execute = [{ insertId: 1 }]

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('Quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await productModel.create(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('retorna o insertId do produto inserido', async () => {
        const response = await productModel.create(payloadProduct);

        expect(response).to.have.a.property('insertId');
      });
    });
  });

  describe('Produto - Atualiza produto pelo ID', () => {
    const id = 1;
    const payloadProduct = {
      name: 'Produto',
      quantity: 2,
    };

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando a busca é feita com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await productModel.update({ id, body: payloadProduct })

        expect(response).to.be.an('undefined');
      });
    });
  });

  describe('Produto - Listagem', () => {
    const payloadProduct = [
      {
        name: 'Produto',
        quantity: 2,
      },
    ];

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando a listagem ocorre com sucesso', () => {
      it('retorna um objeto dentro de array', async () => {
        const response = await productModel.getAll();

        expect(response).to.be.a('array');
        expect(response[0]).to.be.a('object');
      });
    });
  });

  describe('Produto - Lista produto por id', () => {
    const id = 1;

    const payloadProduct = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    };

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando a listagem ocorre com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await productModel.getById({ id });

        expect(response).to.be.an('undefined');
      });
    });
  });

  describe('Produto - Lista produto por id', () => {
    const id = 1;

    const payloadProduct = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    };

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando a listagem ocorre com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await productModel.getById({ id });

        expect(response).to.be.an('undefined');
      });
    });
  });

  describe('Produto - Deleta produto', () => {
    const id = 1;

    const payloadProduct = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    };

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando ocorre com sucesso', () => {
      it('retorna o produto', async () => {
        const response = await productModel.deleteProduct({ id });

        expect(response).to.be.an('undefined');
      });
    });
  });

  describe('Produto - Pesquisando pelo nome', () => {
    const name = 'Produto';

    const payloadProduct = {
      id: 1,
      name: 'Produto',
      quantity: 2,
    };

    before(() => {
      const execute = [payloadProduct];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando ocorre com sucesso', () => {
      it('retorna o produto', async () => {
        const response = await productModel.findByName({ name });

        expect(response).to.be.an('undefined');
      });
    })
  });
});

describe('--------VENDA-------', () => {
  describe('Venda - Criação products sales', () => {
    const payloadProduct = [[1, 3, 4], [3, 4, 6]];

    before(() => {
      const execute = undefined;

      sinon.stub(connection, 'query').resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });

    describe('Quando a venda é inserida com sucesso na productsSales', () => {
      it('retorna um objeto', async () => {
        const response = await salesModel.createProductSales(payloadProduct);
        expect(response).to.be.an('undefined');
      });
    });
  });

  describe('Venda - Criação', () => {
    const payloadSale = {
      body: [{
        name: 'Produto',
        quantity: 3,
      }],
    };

    before(async () => {
      const execute = [{
        id: 1,
        itemsSold: {},
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await salesModel.createSale(payloadSale);

        expect(response).to.be.a('object');
      });

      it('objeto possui a propriedade id', async () => {
        const response = await salesModel.createSale(payloadSale);

        expect(response).to.have.a.property('id');
      })
    });
  });

  describe('Venda - Pegar todas as vendas', () => {
    before(() => {
      const execute = [[{}]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('Quando as vendas são retornadas com sucesso', () => {
      it('retorna um array', async () => {
        const response = await salesModel.getAllSales();
        expect(response).to.be.a('array');
      });
    });
  });

  /* describe('Venda - Pegar venda por id', () => {
    const payloadProduct = { id: 1 };
  
    before(() => {
      const execute = { id: 1 };
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    describe('Quando a venda é retornada com sucesso', () => {
      it('retorna um objeto', async () => {
        const response = await salesModel.getSaleById(payloadProduct);
        console.log(response);
      });
    });
  }); */

});