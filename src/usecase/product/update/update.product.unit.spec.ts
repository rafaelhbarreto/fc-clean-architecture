import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Chair", 90)
const input = {
  id: product.id,
  name: "Chair updated",
  price: 100
}



const ProductMockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("update product use case unit test", () => {

  it("should update product", async () => {
    const updateProductUsecase = new UpdateProductUseCase(ProductMockRepository())
    const output = await updateProductUsecase.execute(input)
    expect(output).toEqual(input)
  })

  it("should not update when product not exist", async () => {
    const productMockRepository = ProductMockRepository()
    productMockRepository.find = jest.fn().mockImplementation(() => {
      throw new Error("Product not found")
    })

    const updateProductUsecase = new UpdateProductUseCase(productMockRepository)
    expect(() => {
      return updateProductUsecase.execute(input)
    }).rejects.toThrow("Product not found")
  })
});