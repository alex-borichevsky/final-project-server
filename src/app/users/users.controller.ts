import { Body, Controller, Get, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

// ============ Services ================
import { UsersService } from './users.service';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ Enums ================
import { UserPermissions } from '../roles/enums/user-permissions.enum';


// ============ Decorators ================
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { User } from './decorators/user.decorator';

// ============ DTOs ================
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { AddUserInfoDto } from './dtos/add-user-info.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { UserDto } from './dtos/user.dto';
import { UserSessionDto } from '../security/dtos/userSession.dto';
import { UpdateUserStatusDto } from './dtos/update-status.dto';

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
    type: UserDto,
    isArray: true
  })
  @Get()
  @RequirePermissions(UserPermissions.GetUsers)
  async getUsers() {
    return await this.usersService.getUsersFromView();
  }

  @ApiOperation({ summary: "Get user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDto
  })
  @Get(':id')
  @RequirePermissions(UserPermissions.GetUserById)
  async getUserById(@Param('id') id : string) {
    return await this.usersService.getUserByIdFromView(id);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDto,
  })
  @Put('/status/:id')
  @RequirePermissions(UserPermissions.UpdateUserStatus)
  async updateUserStatus(@Param('id') id : string, @Body() body: UpdateUserStatusDto) {
    return await this.usersService.updateUserStatus(id, body);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDto,
  })
  @Put()
  @RequirePermissions(UserPermissions.UpdatePassword)
  async updateUserPassword(@User() user: UserSessionDto, @Body() body: UpdateUserPasswordDto) {
    return await this.usersService.updateUserPassword(user, body);
  }

  // User info
  
  @ApiOperation({ summary: "Get user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: AddUserInfoDto
  })
  @Get('/info/user')
  @RequirePermissions(UserPermissions.GetUserInfo)
  async getUserInfoById(@User() user: UserSessionDto) {
    return await this.usersService.getUserInfo(user);
  }

  @ApiOperation({ summary: "Update user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: AddUserInfoDto,
  })
  @Put('/info/user')
  @RequirePermissions(UserPermissions.UpdateUserInfo)
  async updateUserInfo(@User() user: UserSessionDto, @Body() body: AddUserInfoDto) {
    return await this.usersService.updateUserInfo(user, body);
  }

  // Assign role
  @ApiOperation({ summary: "Assign role to user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDto,
  })
  @Put('assign/:id')
  @RequirePermissions(UserPermissions.AssignRole)
  async assignRoleToUser(@Param('id') id : string, @Body() body: AddRoleDto) {
    return await this.usersService.assignRole(id, body);
  }

}
