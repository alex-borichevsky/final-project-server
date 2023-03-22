import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';

@Injectable()
export class ProductsRepo extends Repository<ProductsEntity> {
  constructor(
    @InjectRepository(ProductsEntity)
    repository: Repository<ProductsEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getProductById(id: string) {
    return await this.findOne({
      where: { id },
      relations: ['cart', 'category'],
    });
  }

  async getProductsByCategoryId(id: number) {
    return await this.find({
      where: { categoryId: id }
    });
  }

  async getAllProducts() {
    return await this.find({relations: ['cart', 'category']});
  }
}
