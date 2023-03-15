import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UserPermissions } from './enums/user-permissions.enum';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtPermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService : RolesService) {}

  @Get()
  @RequirePermissions(UserPermissions.GetRoles)
  async getRoles() {
    return await this.rolesService.getAllRoles();
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetRoleById)
  async getUserById(@Param('id') id : number) {
    return await this.rolesService.getRoleById(id);
  }

  @Post()
  @RequirePermissions(UserPermissions.CreateRole)
  async createRole(@Body() body : CreateRoleDto) {
    return await this.rolesService.createRole(body);
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteRole)
  async deleteUser(@Param('id') id : number) {
    return await this.rolesService.deleteRole(id);
  }

  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateRole)
  async updateUserPassword(@Param('id') id : number, @Body() body: CreateRoleDto) {
    return await this.rolesService.updateRole(id, body);
  }
  
}
