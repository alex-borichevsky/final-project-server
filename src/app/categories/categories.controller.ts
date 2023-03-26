import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateProductDto } from '../products/dtos/create-product.dto';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @ApiOperation({ summary: "Create category" })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateCategoryDto,
  })
  @Post()
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.CreateCategory)
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @ApiOperation({ summary: "Update category" })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateCategoryDto,
  })
  @Put(':id')
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.UpdateCategory)
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Get category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateCategoryDto
  })
  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiOperation({ summary: "Get categories list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateCategoryDto,
    isArray: true
  })
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: "Get product" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: Array<CreateProductDto>
  })
  @Get('products/:id')
  getProductsByCategoryId(@Param('id') id: number) {
    return this.categoriesService.getProductsByCategoryId(id);
  }

  @ApiOperation({ summary: "Delete category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: CreateCategoryDto
  })
  @Delete(':id')
  @UseGuards(JwtPermissionsGuard)
  @RequirePermissions(UserPermissions.DeleteCategory)
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
