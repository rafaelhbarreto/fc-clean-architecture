import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

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
    const useCase = new UpdateProductUseCase(productRepository)
    
    const product = ProductFactory.create("a", 'Chair', 100)
    await productRepository.create(product as Product)

    const productUpdated = {
      id: product.id,
      name: "ChairUpdated",
      price: 2000
    }

    const result = await useCase.execute(productUpdated)
    expect(result).toEqual(productUpdated)
  })
})