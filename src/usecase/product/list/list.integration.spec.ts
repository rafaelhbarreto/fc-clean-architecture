import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

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
    const useCase = new ListProductUseCase(productRepository)
    
    const productA = ProductFactory.create("a", 'Chair', 100)
    const productB = ProductFactory.create("b", 'Cellphone', 1000)
    
    await productRepository.create(productA as Product)
    await productRepository.create(productB as Product)


    const result = await useCase.execute({})

    const output = {
      products: [
        {
          id: productA.id,
          name: productA.name,
          price: productA.price
        },
        {
          id: productB.id,
          name: productB.name,
          price: productB.price
        },
      ]
    }

    expect(result).toEqual(output)
  })
})