const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../models/connection')
const model = require('../../../models')

describe('Testa a função getAll da camada de models da "products"', () => {
  describe('quando ocorre com sucesso', () => {
    
    const result = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]]
     
    before(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    after(() => connection.execute.restore())
 
    it('deve retorna um array', async () => {
      const response = await model.products.getAll()
      expect(response).to.be.an('array')
    })

    it('array com os produtos dentro de um objeto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await model.products.getAll()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })
})

describe('Testa a função getProductById da camada de models da "products"', () => {
  describe('quando encontra o id', () => {

    const result =  [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]]

    before(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    after(() => connection.execute.restore())
  
    it('deve retornar um array' ,async () => {
      const response = await model.products.getProductById()
      expect(response).to.be.an('object')
    })

    it('deve ter um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await model.products.getProductById()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })

  describe('quando não encontra o id', () => {
    const result = [[]]

    before(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    after(() => connection.execute.restore())
  
    it('deve retornar undefined' ,async () => {
      const response = await model.products.getProductById()
      expect(response).to.be.undefined
    })
  })
})