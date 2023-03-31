import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Delete, Get, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ DTOs ================
import { CreateProductDto } from './dtos/create-product.dto';

// ============ Services ================
import { ProductsService } from './products.service';

// ============ Decorators ================
import { RequirePermissions } from '../security/decorators/permissions.decorator';

// ============ Enums ================
import { UserPermissions } from '../roles/enums/user-permissions.enum';


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
  @Post()
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.CreateProduct)
  async createProduct(@Body() body: CreateProductDto,
  ) {
    return await this.productService.createProduct(body);
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
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.UpdateProduct)
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
}
