import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe("product 2e2 tests", () => {

  const HTTP_CREATED = 201;
  const HTTP_OK = 200

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async() => {
    const productPayload = {
      type: "a",
      name: "chair",
      price: 1000
    }

    const response = await request(app).post('/products').send(productPayload)
    expect(response.status).toBe(HTTP_CREATED)
  });

  it('should list all products', async() => {
    const productRepository = new ProductRepository(); 

    const productA = ProductFactory.create("a", 'Chair', 100)
    const productB = ProductFactory.create("b", 'Cellphone', 1000)
    
    await productRepository.create(productA as Product)
    await productRepository.create(productB as Product)

    const response = await request(app).get('/products').send()
    
    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(2)

  });

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository(); 
    
    const product = ProductFactory.create("a", 'Chair', 100)
    await productRepository.create(product as Product)
    
    const response = await request(app).get('/products/' + product.id).send()

    expect(response.status).toBe(HTTP_OK)
    expect(response.body.id).toBe(product.id)
    expect(response.body.name).toBe(product.name)
    expect(response.body.price).toBe(product.price)
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository(); 
    
    const product = ProductFactory.create("a", 'Chair', 100)
    await productRepository.create(product as Product)
    
    const response = await request(app).put('/products/' + product.id).send({
      id: product.id,
      name: "Chair updated",
      price: 1000
    })

    expect(response.status).toBe(HTTP_OK)
    expect(response.body.name).toBe("Chair updated")
    expect(response.body.price).toBe(1000)
  })
  
});