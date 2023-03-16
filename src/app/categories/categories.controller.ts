import { Controller, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags('categories')
@Controller('categories')
@UseGuards(JwtPermissionsGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @ApiOperation({ summary: "Create category" })
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  @RequirePermissions(UserPermissions.CreateCategory)
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @ApiOperation({ summary: "Update category" })
  @ApiBody({ type: CreateCategoryDto })
  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateCategory)
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Get category" })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetCategoryById)
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiOperation({ summary: "Get categories list" })
  @Get()
  @RequirePermissions(UserPermissions.GetAllCategories)
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: "Delete category" })
  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteCategory)
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
