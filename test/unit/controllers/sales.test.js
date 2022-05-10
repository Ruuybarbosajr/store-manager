const { expect } = require('chai')
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

   
    it('deve retornar um array com as vendas dentro de um objeto', async () => {
      await controller.sales.getAll(req, res)
      expect(res.json.calledWith(result)).to.be.equal(true)
    })
  })
})