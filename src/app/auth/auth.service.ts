import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepo } from '../users/repos/users.repo';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dtos/registration.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { Payload } from './dtos/payload.dto';
import {I18nService} from "nestjs-i18n";

@Injectable()
export class AuthService {
  constructor(
      private readonly i18n: I18nService,
    private usersRepo: UsersRepo,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async registration(dto: RegistrationDto) {

    const user = await this.usersRepo.getUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.UserExistsException'));
    }
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.PasswordsDoesntMatchException'));
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.createUser({
      ...dto, password: hashPassword
    })
    const payload = { email: newUser.email, id: newUser.id, roleId: newUser.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.getUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.UserDoesntExistException'));
    }
    if (!user.status)
      throw new HttpException({message:`${this.i18n.t('errors.ERRORS.UserForbiddenException')}`}, HttpStatus.FORBIDDEN);
      
    const payload = { email: user.email, id: user.id, roleId: user.roleId };
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (isMatch) {
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
    throw new BadRequestException(this.i18n.t('errors.ERRORS.IncorrectPasswordException'));
  }


  async validateUser(payload: Payload) {
    const user = await this.usersRepo.getUserByEmail(payload.email);
    if (user) {
      return user;
    }
    throw new BadRequestException(this.i18n.t('errors.ERRORS.UserDoesntExistException'));
  }
}
