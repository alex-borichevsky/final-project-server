import { Test, TestingModule } from '@nestjs/testing';
import { CartEntity } from '../cart/entities/cart.entity';
import { CategoryRepo } from '../categories/repos/category.repo';
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepo } from './repos/products.repo';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepo: ProductsRepo
  let categoryRepo: CategoryRepo

  const product = {
    quantity: 2341,
    productId: "prod",
    userId: "user",
    products: {
      id: 'test',
      name: 'test',
      price: 123,
      description: "test",
      quantity: 12345,
      brand: 'test',
    },
    user: {
      id: "sdgfajipagr",
      email: "test",
      password: "test",
      roleId: 1,
      status: true,
      roleType: UserRoleTypes.Client,
      created: new Date(),
      updated: new Date()
    }
  }

  const mockProductsRepo = {

  }

  const mockPermissionGuard = {}

  const mockCategoryRepo = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ProductsRepo, CategoryRepo],
    })
      .overrideProvider(CategoryRepo).useValue(mockCategoryRepo)
      .overrideProvider(ProductsRepo).useValue(mockProductsRepo)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepo = module.get<ProductsRepo>(ProductsRepo)
    categoryRepo = module.get<CategoryRepo>(CategoryRepo)
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('products service functions', () => {
    it('should return products', async () => {
      productsRepo.getAllProducts = jest.fn().mockResolvedValue([product])
      expect(await productsService.getAllProducts()).toEqual([product])
    })

    it('should return products by id', async () => {
      productsRepo.getProductById = jest.fn().mockResolvedValue(product)
      expect(await productsService.getProductById('test')).toEqual(product)
    })

    it('should create product', async () => {
      productsRepo.create = jest.fn().mockResolvedValue(product)
      productsRepo.save = jest.fn().mockResolvedValue(product)
      categoryRepo.getCategoryByName = jest.fn().mockResolvedValue({
        name: "test",
        description: "test"
      })
      expect(await productsService.createProduct({
        name: 'test',
        price: 123,
        categoryId: 1
      })).toEqual(product)
    })

    it('should create product with furniture category', async () => {
      productsRepo.create = jest.fn().mockResolvedValue(product)
      productsRepo.save = jest.fn().mockResolvedValue(product)
      categoryRepo.getCategoryByName = jest.fn().mockResolvedValue({
        name: "furniture",
        description: "test"
      })
      expect(await productsService.createProduct({
        name: 'test',
        price: 123,
        categoryId: 1
      })).toEqual(product)
    })

    it('should delete product', async () => {
      productsRepo.delete = jest.fn().mockResolvedValue('deleted')
      expect(await productsService.delete('test')).toEqual('deleted')
    })

    it('should update product', async () => {
      productsRepo.update = jest.fn().mockResolvedValue('updated')
      expect(await productsService.updateProduct('test', {
        name: 'test',
        price: 123,
        categoryId: 1
      })).toEqual('updated')
    })
  })

});