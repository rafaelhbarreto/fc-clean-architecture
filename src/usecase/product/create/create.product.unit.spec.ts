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
})


