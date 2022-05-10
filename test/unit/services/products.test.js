const { expect } = require('chai')
const sinon = require('sinon')
const model = require('../../../models')
const service =  require('../../../services')

describe('Testa a função getAll da camada de services da "products"', () => {
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

    before(() => {
      sinon.stub(model.products, 'getAll').resolves(result)
    })

    after(() => model.products.getAll.restore())
 
    it('deve retorna um array', async () => {
      const response = await service.products.getAll()
      expect(response).to.be.an('array')
    })

    it('array com os produtos dentro de um objeto', async () => {

      const product = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }

      const [response] = await service.products.getAll()
      expect(response).to.be.includes(product)
    })
  })
})

describe('Testa a função getProductById da camada de services da "products"', () => {
  describe('quando encontra o id', () => {

    const result =  {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }

    before(() => {
      sinon.stub(model.products, 'getProductById').resolves(result)
    })

    after(() => {
      model.products.getProductById.restore()
    })
  
    it('deve retornar um objeto' , async () => {
      const response = await service.products.getProductById()
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id", "name" e "quantity"', async () => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
      const response = await service.products.getProductById()
      expect(response).to.be.includes(product)
    })
  })

  describe('quando não encontra o id', () => {

    const result = undefined;

    before(() => {
      sinon.stub(model.products, 'getProductById').resolves(result)
    })

    after(() => {
      model.products.getProductById.restore()
    })
  
    it('deve retornar um error' , async () => {
      try {
        await service.products.getProductById()
      } catch (error) {
        expect(error).to.be.a('object').to.have.property('status', 404)
      }  
    })

    it('deve conter a chave "message" com a messagem "Product not found"', async () => {
      try {
        await service.products.getProductById()
      } catch (error) {
        expect(error).to.be.a('object').to.have.property('message', 'Product not found')
      }
    })
  })
})