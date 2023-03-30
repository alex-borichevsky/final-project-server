import { Test, TestingModule } from '@nestjs/testing';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  const mockCategoriesService = {
    createCategory: jest.fn((dto) => {
      return {
          ...dto
      }
  }),

  updateCategory: jest.fn(() => {
      return {
        name: "test",
        description: "testdescr"
      }
  }),

  getCategoryById: jest.fn(() => {
      return {
        name: "test",
        description: "testdescr"
      }
  }),

  getAllCategories: jest.fn(() => {
      return {
        name: "test",
        description: "testdescr"
      }
  }),

  deleteCategory: jest.fn(()=>{
    return null
  }),
  }

  const mockPermissionGuard = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [CategoriesController],
        providers: [CategoriesService],
    }).overrideProvider(CategoriesService).useValue(mockCategoriesService)
    .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
    .compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesController = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  it('should create category', () => {
    expect(categoriesController.createCategory({
      name: "test",
      description: "testdescr"
    })).toEqual({
      name: "test",
      description: "testdescr"
    });
  });

  it('should delete category', () => {
    expect(categoriesController.deleteCategory(1)).toBeNull();
  });

  it('should return categories', () => {
    expect(categoriesController.getAllCategories()).toEqual({
      name: "test",
      description: "testdescr"
    });
  });

  it('should return category by id', () => {
    expect(categoriesController.getCategoryById(1)).toEqual({
      name: "test",
      description: "testdescr"
    });
  });

  it('should update category', () => {
    expect(categoriesController.updateCategory(1,{
      name: "test",
      description: "testdescr"
    })).toEqual({
      name: "test",
      description: "testdescr"
    });
  });

});