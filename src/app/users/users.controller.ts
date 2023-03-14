import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';

@Controller('users') 
@UseGuards(JwtPermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Users 

  @Get()
  @RequirePermissions(UserPermissions.GetUsers)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetUserById)
  async getUserById(@Param('id') id : string) {
    return await this.usersService.getUserById(id);
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteUser)
  async deleteUser(@Param('id') id : string) {
    return await this.usersService.deleteUser(id);
  }

  @Put(':id')
  @RequirePermissions(UserPermissions.UpdatePassword)
  async updateUserPassword(@Param('id') id : string, @Body() body: UpdateUserPasswordDto) {
    return await this.usersService.updateUserPassword(id, body);
  }

  // User info
  @Get('info/:id')
  @RequirePermissions(UserPermissions.GetUserInfo)
  async getUserUserById(@Param('id') id : string) {
    return await this.usersService.getUserInfo(id);
  }

  @Put('info/:id')
  @RequirePermissions(UserPermissions.UpdateUserInfo)
  async updateUserInfo(@Param('id') id : string, @Body() body: UpdateUserPasswordDto) {
    return await this.usersService.updateUserPassword(id, body);
  }

}
