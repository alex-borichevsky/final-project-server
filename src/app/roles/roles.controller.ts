import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
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
    type: UserRoleEntity,
    isArray: true
  })
  @Get()
  @RequirePermissions(UserPermissions.GetRoles)
  async getRoles() {
    return await this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: "Get role" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserRoleEntity
  })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetRoleById)
  async getRoleById(@Param('id') id : number) {
    return await this.rolesService.getRoleById(id);
  }

  @ApiOperation({ summary: "Crdate role" })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserRoleEntity,
  })
  @Post()
  @RequirePermissions(UserPermissions.CreateRole)
  async createRole(@Body() body : CreateRoleDto) {
    return await this.rolesService.createRole(body);
  }

  @ApiOperation({ summary: "Delete role" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: DeleteResult
  })
  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteRole)
  async deleteRole(@Param('id') id : number) {
    return await this.rolesService.deleteRole(id);
  }

  @ApiOperation({ summary: "Update role" })
  @ApiBody({type: CreateRoleDto})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UpdateResult,
  })
  @Put(':id')
  @RequirePermissions(UserPermissions.UpdateRole)
  async updateRole(@Param('id') id : number, @Body() body: CreateRoleDto) {
    return await this.rolesService.updateRole(id, body);
  }
  
}
