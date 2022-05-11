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

    it('array com os produtos dentro de um objeto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await service.products.getAll()
      expect(response).to.have.all.keys('id', 'name' ,'quantity')
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
      const response = await service.products.getProductById()
      expect(response).to.have.all.keys('id', 'name' ,'quantity')
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

describe('Testa a função createNewProduct da camada de services da "products"', () => {
  describe('quando não existe um produto com o mesmo nome cadastrado no banco', () => {
    
    const result = {
      "id": 45,
      "name": "Escada do Uno da escada",
      "quantity": 1
    }

    before(() => {
      sinon.stub(model.products, 'createNewProduct').resolves(result)
      sinon.stub(model.products, 'getProductByName').resolves([])
    })

    after(() => {
      model.products.createNewProduct.restore()
      model.products.getProductByName.restore()
    })

    it('deve retornar um objeto', async () => {
      const response = await service.products.createNewProduct()
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id", "name" e "quantity"', async () => {
      const response = await service.products.createNewProduct()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })

  describe('quando existe um produto com o mesmo nome cadastrado', () => {

    const result = [{
      "id": 45,
      "name": "Escada do Uno da escada",
      "quantity": 1
    }]

    before(() => {

      sinon.stub(model.products, 'getProductByName').resolves(result)
    })

    after(() => model.products.getProductByName.restore())

    it('deve dar um error', async () => {
      try {
        await service.products.createNewProduct()
      } catch (error) {
        expect(error).to.have.all.keys('status', 'message')
      }
    })

    it('o objeto de error deve conter a messagem "Product already exists"', async () => {
      try {
        await service.products.createNewProduct()
      } catch (error) {
        expect(error).to.have.property('message', 'Product already exists')
      }
    })
  })
})

describe('Testa a função updateProduct da camada de services da "products"', () => {
  describe('quando existe o id', () => {

    const result = {
      id: 1,
      name: 'havaina com prego',
      quantity: 5
    }
   

    before(() => {
      sinon.stub(model.products,'updateProduct').resolves(result)
      sinon.stub(model.products, 'getProductById').resolves({})
    })

    after(() => {
      model.products.updateProduct.restore()
      model.products.getProductById.restore()
    })

    it('deve retornar um objeto', async () => {
      const response = await service.products.updateProduct()
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id", "name" e "quantity"', async () => {
      const response =  await service.products.updateProduct()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })

  describe('quando não existe o id', () => {
    const result = undefined

    before(() => {
      sinon.stub(model.products, 'getProductById').resolves(result)
    })

    after(() => model.products.getProductById.restore())

    it('deve retornar um error', async () => {
      try {
        await service.products.updateProduct()
      } catch (error) {
        expect(error).to.have.all.keys('status', 'message')
      }
    })

    it('o objeto de error deve conter a messagem "Product not found"', async () => {
      try {
        await service.products.updateProduct()
      } catch (error) {
        expect(error).to.have.property('message', 'Product not found')
      }
    })
  })
})