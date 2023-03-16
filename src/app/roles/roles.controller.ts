import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UserPermissions } from './enums/user-permissions.enum';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtPermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService : RolesService) {}

  @ApiOperation({ summary: "Get roles list" })
  @Get()
  @RequirePermissions(UserPermissions.GetRoles)
  async getRoles() {
    return await this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: "Get role" })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetRoleById)
  async getRoleById(@Param('id') id : number) {
    return await this.rolesService.getRoleById(id);
  }

  @ApiOperation({ summary: "Crdate role" })
  @ApiBody({ type: CreateRoleDto })
  @Post()
  @RequirePermissions(UserPermissions.CreateRole)
  async createRole(@Body() body : CreateRoleDto) {
    return await this.rolesService.createRole(body);
  }

  @ApiOperation({ summary: "Delete role" })
  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteRole)
  async deleteRole(@Param('id') id : number) {
    return await this.rolesService.deleteRole(id);
  }

  @ApiOperation({ summary: "Update role" })
  @ApiBody({type: CreateRoleDto})
  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateRole)
  async updateRole(@Param('id') id : number, @Body() body: CreateRoleDto) {
    return await this.rolesService.updateRole(id, body);
  }
  
}
