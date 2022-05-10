const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../models/connection')
const model = require('../../../models')

describe.skip('Testa a função getAll da camada de model', () => {
  describe('quando ocorre com sucesso', () => {
    const response = [[
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
      sinon.stub(connection, 'execute').resolves(response)
    })

    after(() => connection.execute.restore())
 
    it('deve retorna um array', async () => {
      const result = await model.products.getAll()
      expect(result).to.be.an('array')
    })

    it('array com os produtos dentro de um objeto', async () => {

      const product = {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }

      const [result] = await model.products.getAll()
      expect(result).to.be.includes(product)
    })
  })
})

describe.skip('Testa a função getProductById da camada de model', () => {
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
      const id = 1
      const response = await model.products.getProductById(id)
      expect(response).to.be.an('object')
    })

    it('deve ter um objeto com as chaves "id", "name" e "quantity"', async () => {
      const id = 1
      const product = {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
      const response = await model.products.getProductById(id)
      expect(response).to.be.includes(product)
    })
  })

  describe('quando não encontra o id', () => {
    const result = [[]]

    before(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    after(() => connection.execute.restore())
  
    it('deve retornar undefined' ,async () => {
      const id = 1
      const response = await model.products.getProductById(id)
      expect(response).to.be.undefined
    })
  })
})