const { expect } = require('chai')
const sinon = require('sinon')
const controller = require('../../../controllers')
const service =  require('../../../services')

describe('Testa o controller getAll da camada de controllers da "products"', () => {
  describe('quando ocorre com sucesso', () => {
    const result = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]

    const res = {}
    const req = {}

    before(() => {

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(result)

      sinon.stub(service.products, 'getAll').resolves(result)
    })

    after(() => service.products.getAll.restore())
 
    it('deve retorna um status code 200', async () => {
      await controller.products.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um array com os produtos dentro de um objeto', async () => {

      await controller.products.getAll(req, res)
      expect(res.json.calledWith(result)).to.be.equal(true)
    })
  })
})

describe('Testa o controller getProductById da camada de controllers da "products"', () => {
  describe('quando ocorre com sucesso', () => {
    const product = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }
    const req = {}
    const res = {}

    before(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(product)
      
      sinon.stub(service.products, 'getProductById').resolves(product)
    })

    after(() => {
      service.products.getProductById.restore()
    })

    it('deve retorna um status code 200', async () => {
      await controller.products.getProductById(req, res)
      expect(res.status.calledWith(200)).to.be.true
    })

    it('deve retornar um objeto com as chaves "id", "name" e "quantity"', async () => {
      await controller.products.getProductById(req, res)
      expect(res.json.calledWith(product)).to.be.true
    })
  })
})
