import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RoleDto } from 'src/app/roles/dtos/role.dto';

import { UserPermissions } from 'src/app/roles/enums/user-permissions.enum';
import { UserRoleTypes } from 'src/app/roles/enums/user-role-types.enum';
import { UserDto } from 'src/app/users/dtos/user.dto';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { UserSessionDto } from '../dtos/userSession.dto';
import { SecurityService } from '../security.service';

@Injectable()
export class JwtPermissionsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly securityService: SecurityService
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const requiredPemissions = this.reflector.getAllAndOverride<UserPermissions []>(
        PERMISSION_KEY, 
        [
          context.getHandler(),
          context.getClass(),
        ]
      );

      if (!requiredPemissions) {
        return true;
      }
      
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer !== 'Bearer' || !token) {
        throw new HttpException({message: "User unauthorized"}, HttpStatus.UNAUTHORIZED);
      }
      
      const decodedUser = UserSessionDto.fromPayload(this.jwtService.verify(token));
  
      const userEntity = await this.securityService.getUserById(decodedUser.id)
      if (!userEntity) {
        throw new HttpException({message: "User unauthorized"}, HttpStatus.UNAUTHORIZED);
      }

      const user = UserDto.fromEntity(userEntity)

      if (!(Number(decodedUser.roleId) === user.roleId)) {
        throw new HttpException({message: "User unauthorized"}, HttpStatus.UNAUTHORIZED);
      }
      req.user = decodedUser;
      
      const roleEntity = await this.securityService.getRoleById(decodedUser.roleId);
      if (!roleEntity) {
        throw new HttpException({message: "User unauthorized"}, HttpStatus.UNAUTHORIZED);
      }
      
      const role = RoleDto.fromEntity(roleEntity)

      if (role.type === UserRoleTypes.SuperAdmin)
        return true;
      
      return requiredPemissions.some((permission) => role.permissions?.includes(permission));
    } catch (error) {
      throw new HttpException({message: "User unauthorized"}, HttpStatus.UNAUTHORIZED);
    }
  }
}