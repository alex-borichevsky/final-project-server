import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './../entities/category.entity';

export class CategoryRepo extends Repository<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    repository: Repository<CategoryEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getCategoryById(id: number) {
    return await this.findOne({
      where: { id },
      relations: ['products', 'brands'],
    });
  }

  async getCategoryByName(name: string) {
    return await this.findOne({
      where: { name },
      relations: ['products', 'brands'],
    });
  }



  async getAllCategories() {
    return await this.find({
      relations: ['products', 'brands'],
    });
  }
}
 