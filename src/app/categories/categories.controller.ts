import { Controller, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
@UseGuards(JwtPermissionsGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @RequirePermissions(UserPermissions.CreateCategory)
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateCategory)
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetCategoryById)
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get()
  @RequirePermissions(UserPermissions.GetAllCategories)
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteCategory)
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
