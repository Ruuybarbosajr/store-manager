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

describe('Testa a função createNewSales da camada de models da "sales"', () => {
  describe('quando ocorre com sucesso', () => {
    const result = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]

    const sales = [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() =>  connection.execute.restore())

    it('deve retornar um objeto', async () => {
      const response = await model.sales.createNewSales(sales)
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id" e "itemsSold"', async () => {
      const response = await model.sales.createNewSales(sales)
      expect(response).to.have.all.keys('id', 'itemsSold')
    })
  })
})

describe('Testa a função updateSales da camada de models da "sales"', () => {
  describe('quando ocorre com sucesso', () => {
    const id = 1

    const sales = [{
        "productId": 1,
        "quantity": 6
      }]
    
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves()
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('deve retornar um objeto com as informações atualizada', async () => {
      const response = await model.sales.updateSales(id, sales)
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "saleId" e "itemUpdated"', async () => {
      const response = await model.sales.updateSales(id, sales)
      expect(response).to.have.all.keys('saleId','itemUpdated')
    })

    it('as chaves devem conter as informações da atualização', async () => {
      const response = await model.sales.updateSales(id, sales)
      expect(response.saleId).to.be.equal(id)
      expect(response.itemUpdated).to.be.equal(sales)
    })
  })
})

describe('Testa a função deleteSales da camada de models da "sales"', () => {
  describe('quando ocorre com sucesso', () => {
    const id = 1

    const result = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())

    it('"connection.execute" deve ser chamada', async () => {
      await model.sales.deleteSales(id)
      expect(connection.execute.calledWith()).to.be.equal(true)
    })
  })
})