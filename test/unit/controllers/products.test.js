const { expect } = require('chai')
const sinon = require('sinon')
const controller = require('../../../controllers')
const service =  require('../../../services')

describe('Testa o middleware de products da camada de controller', () => {
  describe('quando ocorre com sucesso', () => {
    const response = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]

    const res = {}
    const req = {}

    before(() => {

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(response)

      sinon.stub(service.products, 'getAll').resolves(response)
    })

    after(() => service.products.getAll.restore())
 
    it('deve retorna um status code 200', async () => {
      await controller.products.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um array com os produtos dentro de um objeto', async () => {

      await controller.products.getAll(req, res)
      expect(res.json.calledWith(response)).to.be.equal(true)
    })
  })
})