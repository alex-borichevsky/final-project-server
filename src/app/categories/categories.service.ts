import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './repos/category.repo';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepo) {}

  async getCategoryById(id: number) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async createCategory(dto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create({
      ...dto,
    });
    return await this.categoryRepository.save(newCategory);
  }
}
