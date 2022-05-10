const { expect } = require('chai')
const sinon = require('sinon')
const model = require('../../../models')
const service =  require('../../../services')

describe('Testa a função getAll da camada de services da "sales"', () => {
  describe('quando ocorre com sucesso', () => {

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
   
    before(() => {
      sinon.stub(model.sales, 'getAll').resolves(result)
    })

    after(() =>  {
      model.sales.getAll.restore()
    })

    it('retorna um array', async () => {
      const response = await service.sales.getAll()
      expect(response).to.be.an('array')
    })
  
    it('array com as vendas dentro de um objeto com as chaves "saleId", "date", "productId" e "quantity"', async () => {
      const [response] = await service.sales.getAll()
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    })

  })
})

describe('Testa a função getSalesById da camada de services da "sales"', () => {
  describe('quando encontra o id', () => {

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

    before(() => {
      sinon.stub(model.sales, 'getSalesById').resolves(result)
    })

    after(() => model.sales.getSalesById.restore())

    it('deve retornar um array', async () => {
      const response = await service.sales.getSalesById()
      expect(response).to.be.an('array')
    })

    it('o array deve conter um objeto com as chaves "date", "productId" e "quantity"', async () => {
      const [response] = await service.sales.getSalesById()
      expect(response).to.have.all.keys('date', 'productId', 'quantity')
    })
  })

  describe('quando não encontra o id', () => {
    const result = []

    before(() => {
      sinon.stub(model.sales, 'getSalesById').resolves(result)
    })

    after(() => model.sales.getSalesById.restore())
  
    it('deve retornar um error' , async () => {
      try {
        await service.sales.getSalesById()
      } catch (error) {
        expect(error).to.be.a('object').to.have.property('status', 404)
      }
    })

    it('deve conter a chave "message" com a messagem "Sale not found"', async () => {
      try {
        await service.sales.getSalesById()
      } catch (error) {
        expect(error).to.be.a('object').to.have.property('message', 'Sale not found')
      }
    })

  })
})