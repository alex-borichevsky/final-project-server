import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

// ============ Repos ================
import { RolesRepo } from '../roles/repos/roles.repo';
import { UsersRepo } from '../users/repos/users.repo';

// ============ DTOs ================
import { UserSessionDto } from './dtos/userSession.dto';


@Injectable()
export class SecurityService {
  constructor(
    private readonly rolesRepository: RolesRepo,
    private readonly usersRepository: UsersRepo,
    private jwtService: JwtService
  ) { }

  public async getUserById(userId: string) {
    return await this.usersRepository.getUserById(userId);
  }

  public async getRoleById(roleId: number) {
    return await this.rolesRepository.getRoleById(roleId);
  }

  public async getUser(user: UserSessionDto) {
    return await this.usersRepository.getUserById(user.id);
  }

  async generateToken(user: UserSessionDto) {
    const payload = UserSessionDto.fromPayload(user);

    return {
      access_token: this.jwtService.sign(payload),
      expired_at: (Number(new Date().getTime()) + 3600000)
    }
  }
}
