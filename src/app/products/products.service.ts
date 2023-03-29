import { Injectable } from '@nestjs/common';

import { ProductsRepo } from './repos/products.repo';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilesService } from '../files/files.service';
import { CategoryRepo } from '../categories/repos/category.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepo,
              private readonly categoryRepository: CategoryRepo,
              ) {}

  async getProductById(id: string) {
    return await this.productsRepository.getProductById(id);
  }

  async getAllProducts() {
    return await this.productsRepository.getAllProducts();
  }

  async createProduct(dto: CreateProductDto
    ) {
      return await this.productsRepository.save(dto);
  }

  async updateProduct(updateId: string, dto: CreateProductDto) {
    return await this.productsRepository.update(updateId, {...dto, updated: new Date()});
  }

  async delete(id: string) {
    return await this.productsRepository.delete(id);
  }
} 
