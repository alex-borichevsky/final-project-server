import {
  Body,
  Controller,
  HttpStatus,
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
import { ApiBody } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiOperation({ summary: "Create product" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateProductDto
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  // @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.CreateProduct)
  async createProduct(@Body() body: CreateProductDto, 
  // @UploadedFile() image
  ) {
    return await this.productService.createProduct(body
      // ,image
      );
  }

  @ApiOperation({ summary: "Get product" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateProductDto
  })
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @ApiOperation({ summary: "Get products list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateProductDto,
    isArray: true
  })
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: "Delete product" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateProductDto
  })
  @Delete(':id')
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.DeleteProduct)
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @ApiOperation({ summary: "Update product" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateProductDto,
  })
  @Put(':id')
  // @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.UpdateProduct)
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
}
