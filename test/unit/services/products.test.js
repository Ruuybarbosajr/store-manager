const { expect } = require('chai')
const sinon = require('sinon')
const model = require('../../../models')
const service =  require('../../../services')

describe('Testa a função de products da camada de service', () => {
  describe('quando ocorre com sucesso', () => {
    const response = [
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
    ]

    before(() => {
      sinon.stub(model.products, 'getAll').resolves(response)
    })

    after(() => model.products.getAll.restore())
 
    it('deve retorna um array', async () => {
      const result = await service.products.getAll()
      expect(result).to.be.an('array')
    })

    it('array com os produtos dentro de um objeto', async () => {

      const product = {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }

      const [result] = await service.products.getAll()
      expect(result).to.be.includes(product)
    })
  })
})