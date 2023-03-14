import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
  }
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProduct(@Body() body: CreateProductDto, @UploadedFile() image) {
    return await this.productService.createProduct(body, image)
  }
}
