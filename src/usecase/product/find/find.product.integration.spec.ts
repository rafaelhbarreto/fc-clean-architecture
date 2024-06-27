import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.useCase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("create product use case integration test", () => {
  let sequelize: Sequelize; 

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository(); 
    const useCase = new FindProductUseCase(productRepository)
    
    const product = ProductFactory.create("a", 'Chair', 100)

    await productRepository.create(product as Product)


    const result = await useCase.execute({id: product.id})
    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }
    expect(result).toEqual(output)
  })
})