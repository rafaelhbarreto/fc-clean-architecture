import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.userCase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import { FindProductUseCase } from "../../../usecase/product/find/find.product.useCase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

const productRouter = express.Router(); 


/** 
 * POST /products 
 */
productRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository())

  try {
    const {type, name, price} = req.body
    const productDto = {type, name, price}

    const output = await useCase.execute(productDto);
    res.status(201).send(output)

  } catch (err) {
    res.status(500).send(err);
  }
}); 

/** 
 * GET /products
 */
productRouter.get('/', async(req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await useCase.execute({})
    res.send(output)
  } catch (err) {
    res.status(500).send(err);
  }
});

/** 
 * GET /products/:id
 */
productRouter.get('/:id', async(req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository())

  try {
    const findInputDto = {id: req.params.id}
    const output = await useCase.execute(findInputDto)
    res.status(200).send(output)

  } catch (err) {
    res.status(500).send(err);
  }
});

/** 
 * PUT /products/:id
 */
productRouter.put('/:id', async(req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(new ProductRepository())

  try {
    const {id, name, price} = req.body
    const updateProductDto = {id, name, price}

    const output = await useCase.execute(updateProductDto)
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err);
  }
});

export {productRouter}