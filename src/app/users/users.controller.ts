import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { I18n, I18nContext } from "nestjs-i18n";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users') 
// @UseGuards(JwtPermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/hello')
  getHello(@I18n() i18n: I18nContext) {
    return i18n.t(`test.here`);
  }


  @Get()
  // @RequirePermissions(UserPermissions.GetUsers)
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetUserById)
  async getUserById(@Param('id') id : string) {
    return await this.usersService.getUserById(id);
  }
}
