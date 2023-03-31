import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ Repos ================
import { ProductsRepo } from './repos/products.repo';
import { CategoryRepo } from '../categories/repos/category.repo';

// ============ Entities ================
import { ProductsEntity } from "./entities/products.entity";
import { CategoryEntity } from '../categories/entities/category.entity';

// ============ Services ================
import { ProductsService } from './products.service';

// ============ Controllers ================
import { ProductsController } from './products.controller';

// ============ Modules ================
import { SecurityModule } from '../security/security.module';

@Module({
  providers: [ProductsService, ProductsRepo, CategoryRepo],
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, CategoryEntity]),
    SecurityModule
  ],
  exports: [ProductsRepo]
})
export class ProductsModule {}
