import { ListProductUseCase } from "./list.product.usecase"

const productA = {
  id: 'productA',
  name: 'Chair',
  price: 90
}

const productB = {
  id: 'productB',
  name: 'Cellphone',
  price: 1000
}

const productsOutput = [productA, productB]

const ProductMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue(productsOutput),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("list product use case unit test", () => {

  it("should list products", async () => {
    const listProductUseCase = new ListProductUseCase(ProductMockRepository())
    const output = await listProductUseCase.execute({})
    expect(output).toEqual({products: productsOutput})
  })
})