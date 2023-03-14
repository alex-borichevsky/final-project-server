import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepo } from '../users/repos/users.repo';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dtos/registration.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { Payload } from './dtos/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async registration(dto: RegistrationDto) {

    const user = await this.usersRepo.getUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException("User exists");
    }
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException("Passwords does not match");
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.createUser({
      ...dto, password: hashPassword
    })
    const payload = { email: newUser.email, id: newUser.id, roleId: newUser.roleId  };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.getUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    const payload = { email: user.email, id: user.id, roleId: user.roleId };
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (isMatch) {
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
    throw new BadRequestException("Incorrect password");
  }


  async validateUser(payload: Payload) {
    const user = await this.usersRepo.getUserByEmail(payload.email);
    if (user) {
      return user;
    }
    throw new BadRequestException("User does not exist");
  }
}
