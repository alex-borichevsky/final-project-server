import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mockPermissionGuard = {}

  const mockProductsService = {
    createProduct: jest.fn((dto) => {
      return {
        ...dto,

        description: "test",

        image: "test",

        quantity: 5,

        brand: 'test',
      }
    }),

    getAllProducts: jest.fn(() => {
      return "test"
    }),

    getProductById: jest.fn(() => {
      return "test"
    }),

    deleteProduct: jest.fn(() => {
      return null
    }),

    updateProduct: jest.fn(() => {
      return "test"
    })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).overrideProvider(ProductsService).useValue(mockProductsService)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should create product', async () => {
    productsService.createProduct = jest.fn().mockResolvedValue({
      name: "test",
      price: 100,
      description: "test",
      quantity: 5,
      image: 'test',
      brand: 'test',
    })
    expect(await productsController.createProduct({
      name: "test",
      price: 100,
      categoryId: 1
    })).toEqual({
      name: "test",
      price: 100,
      description: "test",
      quantity: 5,
      image: 'test',
      brand: 'test',
    });
  });
  it('should get all products', () => {
    expect(productsController.getAllProducts()).toEqual('test');
  });
  it('should get product by id', async () => {
    expect(await productsController.getProductById("test")).toEqual("test");
  });
  it('should delete product', async () => {
    productsService.delete = jest.fn().mockResolvedValue('deleted')
    expect(await productsController.deleteProduct("test")).toEqual('deleted');
  });
  it('should update product', async () => {
    expect(await productsController.updateProduct("test", {
      name: "test",
      price: 100,
      categoryId: 1
    })).toEqual("test");
  });

});