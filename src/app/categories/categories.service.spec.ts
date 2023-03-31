import { Test, TestingModule } from '@nestjs/testing';

// =========== Repos =======================
import { CategoryRepo } from '../categories/repos/category.repo';
import { ProductsRepo } from '../products/repos/products.repo';

// =========== Enums =======================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

// =========== Guards =======================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// =========== Controllers =======================
import { CategoriesController } from './categories.controller';

// =========== Services =======================
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoryRepo: CategoryRepo
  let productsRepo: ProductsRepo

  const category = {
    quantity: 2341,
    categoryId: "prod",
    userId: "user",
    categories: {
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

  const mockCategoryRepo = {

  }

  const mockPermissionGuard = {}

  const mockProductsRepo = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, CategoryRepo, CategoryRepo, ProductsRepo],
    })
      .overrideProvider(ProductsRepo).useValue(mockProductsRepo)
      .overrideProvider(CategoryRepo).useValue(mockCategoryRepo)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoryRepo = module.get<CategoryRepo>(CategoryRepo)
    productsRepo = module.get<ProductsRepo>(ProductsRepo)
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  describe('categories service functions', () => {
    it('should return categoriess', async () => {
      categoryRepo.getAllCategories = jest.fn().mockResolvedValue([category])
      expect(await categoriesService.getAllCategories()).toEqual([category])
    })

    it('should return categories by id', async () => {
      categoryRepo.getCategoryById = jest.fn().mockResolvedValue(category)
      expect(await categoriesService.getCategoryById(1)).toEqual(category)
    })

    it('should return categories by name', async () => {
      categoryRepo.getCategoryByName = jest.fn().mockResolvedValue(category)
      expect(await categoriesService.getCategoryByName('test')).toEqual(category)
    })

    it('should create category', async () => {
      categoryRepo.create = jest.fn().mockResolvedValue(category)
      categoryRepo.save = jest.fn().mockResolvedValue(category)
      categoryRepo.getCategoryByName = jest.fn().mockResolvedValue({
        name: "test",
        description: "test"
      })
      expect(await categoriesService.createCategory({
        name: 'test',
        description: "test"
      })).toEqual(category)
    })

    it('should delete category', async () => {
      categoryRepo.delete = jest.fn().mockResolvedValue('deleted')
      expect(await categoriesService.deleteCategory(1)).toEqual('deleted')
    })

    it('should update category', async () => {
      categoryRepo.update = jest.fn().mockResolvedValue('updated')
      expect(await categoriesService.updateCategory(1, {
        name: 'test',
        description: 'test'
      })).toEqual('updated')
    })
  })

});