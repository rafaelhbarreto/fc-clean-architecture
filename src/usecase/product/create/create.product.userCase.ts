import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputProductDto, OutputProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private ProductRepository: ProductRepositoryInterface; 
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository
  }

  async execute(input: InputProductDto): Promise<OutputProductDto> {
    const {type, name, price} = input
    const product = ProductFactory.create(type, name, price)

    await this.ProductRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}