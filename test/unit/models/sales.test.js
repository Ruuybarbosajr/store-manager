const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../models/connection')
const model = require('../../../models')

describe('Testa a função getAll da camada de models da "sales"', () => {
  describe('quando ocorre com sucesso', () => {

    const result =  [[
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
    ]]
    
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() =>  {
      connection.execute.restore()
    })

    it('retorna um array', async () => {
      const response = await model.sales.getAll()
      expect(response).to.be.an('array')
    })
  
    it('array com as vendas dentro de um objeto com as chaves "saleId", "date", "productId" e "quantity"', async () => {
      const [response] = await model.sales.getAll()
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    })
  })
})

describe('Testa a função getSalesById da camada de models da "sales"', () => {
  describe('quando encontra o id', () => {
    const result = [[
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
    ]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('deve retornar um array', async () => {
      const id = 1
      const response = await model.sales.getSalesById(id)
      expect(response).to.be.an('array')
    })

    it('o array deve conter um objeto com as chaves "date", "productId" e "quantity"', async () => {
      const [response] = await model.sales.getSalesById()
      expect(response).to.have.all.keys('date', 'productId', 'quantity')
    })
  })

  describe('quando não encontra o id', () => {
    const result = [[]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())
  
    it('deve retornar um array vazio' ,async () => {
      const response = await model.sales.getSalesById()
      expect(response).to.be.empty
    })

  })
})