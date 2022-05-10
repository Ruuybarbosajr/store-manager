const { expect } = require('chai')
const sinon = require('sinon')
const model = require('../../../models')
const service =  require('../../../services')

describe('Testa a função getAll da camada de services da "sales"', () => {
  describe('quando ocorre com sucesso', () => {
    before(() => {
      const result =  [
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

      sinon.stub(model.sales, 'getAll').resolves(result)
    })

    after(() =>  {
      model.sales.getAll.restore()
    })

    it('retorna um array', async () => {
      const response = await service.sales.getAll()
      expect(response).to.be.an('array')
    })
  
    it('array com as vendas dentro de um objeto', async () => {
      const sale = {
        saleId: 1,
        date: '2022-05-10T18:50:31.000Z',
        productId: 1,
        quantity: 5
      }
      const [response] = await service.sales.getAll()
      expect(response).to.be.includes(sale)
    })

  })
})