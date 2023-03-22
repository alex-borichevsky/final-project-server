import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ App ================
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from "./entities/category.entity";
import { CategoryRepo } from './repos/category.repo';
import { SecurityModule } from './../security/security.module';
import { ProductsModule } from '../products/products.module';
import { ProductsRepo } from '../products/repos/products.repo';
import { ProductsEntity } from '../products/entities/products.entity';

@Module({
  providers: [CategoriesService, CategoryRepo, ProductsRepo],
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductsEntity]), SecurityModule, ProductsEntity, ProductsModule],
  exports: [CategoryRepo]
})
export class CategoriesModule {}
