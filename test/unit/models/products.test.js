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
     
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())
 
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

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())
  
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

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())
  
    it('deve retornar undefined' ,async () => {
      const response = await model.products.getProductById()
      expect(response).to.be.undefined
    })
  })
})

describe('Testa a função createNewProduct da camada de models da "products"', () => {
  describe('quando ocorre com sucesso', () => {

    const result = [[{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())

    it('retorna um objeto', async () => {
        const response = await model.products.createNewProduct()
        expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id", "name" e "quantity"', async () => {
      const response = await model.products.createNewProduct()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })
})

describe('Testa a função getProductByName da camada de models da "products"' , () => {
  describe('quando encontra um name', () => {
    
    const result = [[{
      id: 1,
      name: 'Ovo do carro do ovo',
      quantity: 30
    }]]

    beforeEach(() => {

      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())

    it('deve retornar um array', async () => {
      const response = await model.products.getProductByName()
      expect(response).to.be.an('array')
    })

    it('deve retornar apenas um objeto dentro o array', async () => {
      const response = await model.products.getProductByName()
      expect(response).to.have.length(1)
    })

    it('o obejto deve conter as chaves "id", "name" e "quantity"',async () => {
      const [response] = await model.products.getProductByName()
      expect(response).to.have.all.keys('id','name', 'quantity')
    })
  })

  describe('quando não encontra um name', () => {
    const result = [[]]

    beforeEach(() => {

      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() => connection.execute.restore())

    it('deve retornar um array', async () => {
      const response = await model.products.getProductByName()
      expect(response).to.be.an('array')
    })

    it('deve retornar um array vazio', async () => {
      const response = await model.products.getProductByName()
      expect(response).to.have.length(0)
    })
  })
})

describe('Testa a função updateProduct da camada de models da "products"', () => {
  describe('quando ocorre com sucesso', () => {

    beforeEach(() => {

      sinon.stub(connection, 'execute').resolves()
    })

    afterEach(() => connection.execute.restore())

    it('deve retornar um objeto', async () => {
      const response = await model.products.updateProduct()
      expect(response).to.be.a('object')
    })

    it('o objeto deve conter as chaves "id", "name" e ""quantity', async () => {
      const response = await model.products.updateProduct()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })
})

describe('Testa a função deleteProduct da camada de models da "products"', () => {
  describe('quando ocorre com sucesso', () => {
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

    it('retorna o número de linhas afetadas', async () => {
      const response = await model.products.deleteProduct()
      expect(response).to.be.equal(1)
    })
  })
})

// describe('Testa a função updateQuantity da camada de models da "products"', () => {
//   describe('quando ocorre com sucesso', () => {
    
//     beforeEach(() => {
//       sinon.stub(connection, 'execute').resolves()
//     })

//     afterEach(() => {
//       connection.execute.restore()
//     })

//     it('deve chamar o "connection.execute" com 2 argumentos', async () => {
//       await model.products.updateQuantity(1, 10)
//       expect(connection.execute.calledWith(sinon.match.string, sinon.match.array)).to.be.equal(true)
//     });
//   });
// })