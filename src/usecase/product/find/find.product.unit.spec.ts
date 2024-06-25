import { FindProductUseCase } from "./find.product.useCase"

const product = {
  id: "123",
  name: "SpaceX",
  price: 9999
}

const MockProductRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("find product unit tests", () => {

  it("should find a product by id", async () => {
    const findProductUseCase = new FindProductUseCase(MockProductRepository())
    const inputFindProductDto = {id: "123"}

    const findedProduct = await findProductUseCase.execute(inputFindProductDto)
    expect(findedProduct).toEqual(product)
  })

  it('should thown an error when product not exists', async () => {
    const mockRepository = MockProductRepository()
    mockRepository.find = jest.fn().mockImplementation(() => {
      throw new Error("Product not found")
    }) 
    const findProductUseCase = new FindProductUseCase(mockRepository)
    const inputFindProductDto = {id: "456"}

    expect( () => {
      return findProductUseCase.execute(inputFindProductDto)
    }).rejects.toThrow("Product not found")
  })
})