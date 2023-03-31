import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ============ Entities ================
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
      relations: ['products'],
    });
  }

  async getCategoryByName(name: string) {
    return await this.findOne({
      where: { name },
      relations: ['products'],
    });
  }



  async getAllCategories() {
    return await this.find({
      relations: ['products'],
    });
  }
}
 