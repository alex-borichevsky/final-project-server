import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { Delete, Get, Param, Put } from '@nestjs/common/decorators';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { CreateCategoryDto } from '../categories/dtos/create-category.dto';
import { ApiBody } from '@nestjs/swagger';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
  }

  @ApiOperation({ summary: "Create product" })
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(@Body() body: CreateProductDto, @UploadedFile() image) {
    return await this.productService.createProduct(body, image)
  }

  @ApiOperation({ summary: "Get product" })
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @ApiOperation({ summary: "Get products list" })
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: "Delete product" })
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @ApiOperation({ summary: "Update product" })
  @ApiBody({ type: CreateProductDto })
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.updateProduct(id, dto);
  }

}
