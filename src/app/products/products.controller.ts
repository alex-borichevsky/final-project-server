import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { Delete, Get, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { UserPermissions } from '../roles/enums/user-permissions.enum';

@Controller('products')
@UseGuards(JwtPermissionsGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @RequirePermissions(UserPermissions.CreateProduct)
  async createProduct(@Body() body: CreateProductDto, @UploadedFile() image) {
    return await this.productService.createProduct(body, image);
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetProductById)
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get()
  @RequirePermissions(UserPermissions.GetAllProducts)
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteProduct)
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateProduct)
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
}
