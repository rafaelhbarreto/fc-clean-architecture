import ProductInterface from "../../../domain/product/entity/product.interface";
import { OutputListProductDto } from "./list.product.dto";

export class OutputProductMapper
{
  static toOutput(products: ProductInterface[]): OutputListProductDto {
    const result = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price
      }
    })

    return {products: result}
  }
}