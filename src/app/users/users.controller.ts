import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { AddUserInfoDto } from './dtos/add-user-info.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import {I18n, I18nContext} from "nestjs-i18n";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { RegistrationDto } from '../auth/dtos/registration.dto';
import { UserEntity } from './entities/users.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserInfoEntity } from './entities/user-info.entity';

@ApiTags('users')
@Controller('users') 
@UseGuards(JwtPermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // User

  @ApiOperation({ summary: "Get user list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
    isArray: true
  })
  @Get()
  @RequirePermissions(UserPermissions.GetUsers)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @ApiOperation({ summary: "Get user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity
  })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetUserById)
  async getUserById(@Param('id') id : string) {
    return await this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: DeleteResult
  })
  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteUser)
  async deleteUser(@Param('id') id : string) {
    return await this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UpdateResult,
  })
  @Put(':id')
  @RequirePermissions(UserPermissions.UpdatePassword)
  async updateUserPassword(@Param('id') id : string, @Body() body: UpdateUserPasswordDto) {
    return await this.usersService.updateUserPassword(id, body);
  }

  // User info
  
  @ApiOperation({ summary: "Get user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserInfoEntity
  })
  @Get('info/:id')
  @RequirePermissions(UserPermissions.GetUserInfo)
  async getUserUserById(@Param('id') id : string) {
    return await this.usersService.getUserInfo(id);
  }

  @ApiOperation({ summary: "Update user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UpdateResult,
  })
  @Put('info/:id')
  @RequirePermissions(UserPermissions.UpdateUserInfo)
  async updateUserInfo(@Param('id') id : string, @Body() body: AddUserInfoDto) {
    return await this.usersService.updateUserInfo(id, body);
  }

  // Assign role
  @ApiOperation({ summary: "Assign role to user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserEntity,
  })
  @Put('assign/:id')
  @RequirePermissions(UserPermissions.AssignRole)
  async assignRoleToUser(@Param('id') id : string, @Body() body: AddRoleDto) {
    return await this.usersService.assignRole(id, body);
  }

}
