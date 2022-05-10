const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../models/connection')
const model = require('../../../models')

describe('Testa a função de products da camada de model', () => {
  describe('quando ocorre com sucesso', () => {
    const response = [[
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]]

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
        "name": "produto A",
        "quantity": 10
      }

      const [result] = await model.products.getAll()
      expect(result).to.be.includes(product)
    })
  })
})