import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserDto } from '../users/dtos/user.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleDto } from './dtos/role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserPermissions } from './enums/user-permissions.enum';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtPermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService : RolesService) {}

  @ApiOperation({ summary: "Get roles list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleDto,
    isArray: true
  })
  @Get()
  @RequirePermissions(UserPermissions.GetRoles)
  getRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: "Get role" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleDto
  })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetRoleById)
  getRoleById(@Param('id') id : number) {
    return this.rolesService.getRoleById(id);
  }

  @ApiOperation({ summary: "Crdate role" })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleDto,
  })
  @Post()
  @RequirePermissions(UserPermissions.CreateRole)
  createRole(@Body() body : CreateRoleDto) {
    return this.rolesService.createRole(body);
  }

  @ApiOperation({ summary: "Delete role" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleDto
  })
  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteRole)
  deleteRole(@Param('id') id : number) {
    return this.rolesService.deleteRole(id);
  }

  @ApiOperation({ summary: "Update role" })
  @ApiBody({type: CreateRoleDto})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: RoleDto,
  })
  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateRole)
  updateRole(@Param('id') id : number, @Body() body: CreateRoleDto) {
    return this.rolesService.updateRole(id, body);
  }
  
}
