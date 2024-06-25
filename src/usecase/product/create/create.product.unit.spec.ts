import {InputProductDto} from './create.product.dto'
import CreateProductUseCase from './create.product.userCase'

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const productInput: InputProductDto = {
  name: "Macbook", 
  type: "a",
  price: 1000
}

describe("product usecase unit testes", () => {
  
  it("should create a product", async () => {
    const createProductUseCase = new CreateProductUseCase(MockProductRepository())
    const output = await createProductUseCase.execute(productInput)

    expect(output).toEqual({
      id:expect.any(String),
      name: productInput.name,
      price: productInput.price
    })
  })

  it("should throw error when product name is missing", async () => {
    const createProductUseCase = new CreateProductUseCase(MockProductRepository())

    expect(() => {
      return createProductUseCase.execute({...productInput, name: ""})
    }).rejects.toThrow("Name is required")
  })

  it("should throw error when price is missing", async () => {
    const createProductUseCase = new CreateProductUseCase(MockProductRepository())

    productInput.price = -1

    expect(() => {
      return createProductUseCase.execute({...productInput, price: -1})
    }).rejects.toThrow("Price must be greater than zero")
  })
})


