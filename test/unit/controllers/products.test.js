const { expect } = require('chai')
const sinon = require('sinon')
const controller = require('../../../controllers')
const service =  require('../../../services')

describe('Testa o controller getAll da camada de controllers da "products"', () => {
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

    const res = {}
    const req = {}

    beforeEach(() => {

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(result)

      sinon.stub(service.products, 'getAll').resolves(result)
    })

    afterEach(() => service.products.getAll.restore())
 
    it('deve retorna um status code 200', async () => {
      await controller.products.getAll(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um array com os produtos dentro de um objeto com as chaves "id", "name" e "quantity"', async () => {

      await controller.products.getAll(req, res)
      const [product] = result
      expect(product).to.have.all.keys('id', 'name', 'quantity')
      expect(res.json.calledWith(result)).to.be.equal(true)
    })
  })
})

describe('Testa o controller getProductById da camada de controllers da "products"', () => {
  describe('quando ocorre com sucesso', () => {

    const product = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }

    const req = {}
    const res = {}
    const next = sinon.stub().returns()

    beforeEach(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(product)

      sinon.stub(service.products, 'getProductById').resolves(product)
    })

    afterEach(() => {
      service.products.getProductById.restore()
    })

    it('deve retorna um status code 200', async () => {
      await controller.products.getProductById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um objeto com as chaves "id", "name" e "quantity"', async () => {
      await controller.products.getProductById(req, res)
      expect(product).to.have.all.keys('id', 'name', 'quantity')
      expect(res.json.calledWith(product)).to.be.equal(true)
    })

  })
})

describe('Testa o controller createNewProduct da camada de controllers da "products"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = {
      "id": 45,
      "name": "Escada do Uno da escada",
      "quantity": 1
    }

    const req = {}
    const res = {}

    beforeEach(() => {
      req.body = {name: 'Escada do Uno da escada', 'quantity': 1}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(service.products, 'createNewProduct').resolves(result)
    })

    afterEach(() => service.products.createNewProduct.restore())

    it('deve retornar um status 201', async () => {
      await controller.products.createNewProduct(req, res)
      expect(res.status.calledWith(201)).to.be.equal(true)
    })

    it('deve retornar um objeto', async () => {
      await controller.products.createNewProduct(req, res)
      expect(res.json.calledWith(result)).to.be.equal(true)
    })
  })
})

describe('Testa o controller updateProduct da camada de controllers da "prodcuts"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = {
      id: 1,
      name: 'havaina com prego',
      quantity: 5
    }

    const req = {}
    const res = {}

    beforeEach(() => {
      req.params = {id: 1}
      req.body = {name: 'havainas', quantity: 5}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon.stub(service.products, 'updateProduct').resolves(result)
    })

    afterEach(()=> service.products.updateProduct.restore())
    
    it('deve retornar um status code 200', async () => {
      await controller.products.updateProduct(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('deve retornar um objeto', async () => {
      await controller.products.updateProduct(req, res)
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
})

describe('Testa o controller deleteProduct da camada de controllers da "prodcuts"', () => {
  describe('quando ocorre com sucesso', () => {

    const req = {}
    const res = {}

    beforeEach(() => {
      req.params = {id: 1}
      res.status = sinon.stub().returns(res)
      res.end = sinon.stub().returns()

      sinon.stub(service.products, 'deleteProduct').resolves()
    })

    afterEach(() => service.products.deleteProduct.restore())

    it('retorna um status code de 204', async () => {
        await controller.products.deleteProduct(req, res)
        expect(res.status.calledWith(204)).to.be.equal(true)
    })

  })
})