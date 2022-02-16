/* const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const server = require('../../index');

describe('Rota GET /products', () => {
  describe('Adiciona um produto', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/products');
    });

    it(
      `A requisição GET para a rota traz uma lista inicial 
      contendo dois registros de pessoas usuárias`,
      () => {
        expect(response.body).to.have.length(2);
      }
    );
  });
}); */