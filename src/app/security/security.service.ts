import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { RolesRepo } from '../roles/repos/roles.repo';
import { RolesService } from '../roles/roles.service';
import { UsersRepo } from '../users/repos/users.repo';
import { UsersService } from '../users/users.service';
import { UserSessionDto } from './dtos/userSession.dto';


@Injectable()
export class SecurityService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  public async getUserById(userId: string) {
    return await this.usersService.getUserById(userId);
  }

  public async getRoleById(roleId: number) {
    return await this.rolesService.getRoleById(roleId);
  }

  public async getUser(user: UserSessionDto) {
    return await this.usersService.getUserById(user.id);
  }

  async generateToken(user: UserSessionDto) {
    const payload = UserSessionDto.fromPayload(user);

    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000)
    }
  }
}
