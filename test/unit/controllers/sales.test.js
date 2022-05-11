const { expect } = require('chai')
const { any } = require('joi')
const sinon = require('sinon')
const controller = require('../../../controllers')
const service =  require('../../../services')

describe('Testa o controller getAll da camada de controllers da "sales"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = [
      {
        saleId: 1,
        date: '2022-05-10T18:50:31.000Z',
        productId: 1,
        quantity: 5
      },
      {
        saleId: 1,
        date: '2022-05-10T18:50:31.000Z',
        productId: 2,
        quantity: 10
      },
      {
        saleId: 2,
        date: '2022-05-10T18:50:31.000Z',
        productId: 3,
        quantity: 15
      }
    ]

    const res = {}
    const req = {}

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(result)

      sinon.stub(service.sales, 'getAll').resolves(result)
    })

    after(() => {
      service.sales.getAll.restore()
    })

    it('deve retorna um status code 200', async () => {
      await controller.sales.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

   
    it('deve retornar um array com as vendas dentro de um objeto com as chaves "saleId", "date", "productId" e "quantity"', async () => {
      await controller.sales.getAll(req, res)
      const [sale] = result
      expect(sale).to.have.all.keys('saleId', 'date', 'productId' ,'quantity')
      expect(res.json.calledWith(result)).to.be.equal(true)
    })
  })
})

describe('Testa o controller getSalesById da camada de controllers da "sales"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = [
      {
        "date": "2022-05-10 20:57:48",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-05-10 20:57:48",
        "productId": 2,
        "quantity": 10
      }
    ]

    const req = {}
    const res = {}

    before(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(result)

      sinon.stub(service.sales, 'getSalesById').resolves(result)
    })

    after(() => service.sales.getSalesById.restore())

    it('deve retorna um status code 200', async () => {
      await controller.sales.getSalesById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um array', async () => {
      await controller.sales.getSalesById(req, res)
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
    })

    it('dentro do array deve conter um objeto com as chaves "date", "productId" e "quantity"', async () => {
      await controller.sales.getSalesById(req, res)
      const [sale] = result
      expect(sale).to.have.all.keys('date', 'productId' ,'quantity')
      expect(res.json.calledWith(result)).to.be.equal(true)
    })

  })

  describe('quando não ocorre com sucesso', () => {
    const error = {status: 404, message: 'Sales not found'}

    const req = {}
    const res = {}
    const next = sinon.stub()

    before(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(service.sales, 'getSalesById').throws(error)
    })

    after(() => service.sales.getSalesById.restore())

    it('next é chamado com um objeto de error', async () => {
        await controller.sales.getSalesById(req, res, next)
        expect(next.calledWith(error)).to.be.equal(true)
    })

    it('o objeto deve conter a chave "message" com a messagem "Sales not found"', async () => {
        await controller.sales.getSalesById(req, res, next)
        expect(error).to.be.a('object').to.have.property('message', 'Sales not found')
    })
  })
})