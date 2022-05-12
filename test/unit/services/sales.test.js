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

    beforeEach(() => {
      sinon.stub(model.sales, 'getAll').resolves(result)
    })

    afterEach(() =>  {
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

    beforeEach(() => {
      sinon.stub(model.sales, 'getSalesById').resolves(result)
    })

    afterEach(() => model.sales.getSalesById.restore())

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

    beforeEach(() => {
      sinon.stub(model.sales, 'getSalesById').resolves(result)
    })

    afterEach(() => model.sales.getSalesById.restore())
  
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

describe('Testa a função createNewSales da camada de services da "sales"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }

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
      sinon.stub(model.sales, 'createNewSales').resolves(result)
    })

    afterEach(() => {
      model.sales.createNewSales.restore()
    })

    it('deve retornar um objeto', async () => {
      const response = await service.sales.createNewSales(sales)
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id" e "itemsSold"', async () => {
      const response = await service.sales.createNewSales(sales)
      expect(response).to.have.all.keys('id', 'itemsSold')
    })

  })
})

describe('Testa a função updateSales da camada de services  da "sales"', () => {
  describe('quando encontra o id', () => {

    const id = 1

    const sales = [{
        "productId": 1,
        "quantity": 6
      }]
    
    const result = {
      saleId: 1,
      itemUpdated: [{
        "productId": 1,
        "quantity": 6
      }]
    }

    beforeEach(() => {
      sinon.stub(model.sales, 'updateSales').resolves(result)
    })

    afterEach(() => model.sales.updateSales.restore())

    it('deve retornar um objeto', async () => {
      const response = await service.sales.updateSales(id, sales)
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "saleId" e "itemUpdated"', async () => {
      const response = await service.sales.updateSales(id, sales)
      expect(response).to.have.all.keys('saleId','itemUpdated')
    })

    it('as chaves devem conter as informações da atualização', async () => {
      const response = await service.sales.updateSales(id, sales)
      expect(response).to.have.property('saleId', id)
      expect(response).to.have.deep.property('itemUpdated', sales)
    })
  })
})

describe('Testa a função deleteSales da camada de services da "sales"', () => {
  describe('quando encontra o id', () => {
    const id = 1

    beforeEach(() => {

      sinon.stub(model.sales, 'deleteSales').resolves()
    })

    afterEach(() => model.sales.deleteSales.restore())

    it('a função "model.deleSales deve ser chamada" com o id', async () =>{
      await service.sales.deleteSales(id)
      expect(model.sales.deleteSales.calledWith(id)).to.be.equal(true)
    })
  });

  describe('quando não encontra o id', () => {

    const id = 1

    beforeEach(() => {
      sinon.stub(model.sales, 'deleteSales').resolves()
      sinon.stub(model.sales, 'getSalesById').resolves([])
    })

    afterEach(() => {
      model.sales.getSalesById.restore()
      model.sales.deleteSales.restore()
    })

    it('deve retornar um error', async () => {
      try {
        await service.sales.deleteSales(id)
      } catch (error) {
        expect(error).to.have.all.keys('status', 'message')
      }
    });

    it('a chave "message" deve ter a mensagem "Sale not found"', async () => {
       try {
         await service.sales.deleteSales(id)
       } catch (error) {
         expect(error).to.have.property('message', 'Sale not found')
       }
    });
  });
});