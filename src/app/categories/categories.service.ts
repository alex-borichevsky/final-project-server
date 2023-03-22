import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './repos/category.repo';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ProductsRepo } from '../products/repos/products.repo';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepo,
    private readonly productsRepository: ProductsRepo
  ) {}

  async getCategoryById(id: number) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async getProductsByCategoryId(id: number) {
    return await this.productsRepository.getProductsByCategoryId(id);
  }

  async getCategoryByName(name: string) {
      return await this.categoryRepository.getCategoryByName(name);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async createCategory(dto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create({
      ...dto,
      created: new Date(),
    });
    return await this.categoryRepository.save(newCategory);
  }

  public updateCategory(updateId: number, dto: CreateCategoryDto) {
    return this.categoryRepository.update(updateId, {
      ...dto,
      updated: new Date(),
    });
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
