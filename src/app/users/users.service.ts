import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from './repos/users.repo';
import { CreateUserDto } from "./dtos/create-user.dto";
import { AddUserInfoDto } from "./dtos/add-user-info.dto";
import { UserInfoEntity } from "./entities/user-info.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddRoleDto } from './dtos/add-role.dto';
import { RolesRepo } from '../roles/repos/roles.repo';
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import * as bcrypt from 'bcrypt';
import {I18nService} from "nestjs-i18n";

@Injectable()
export class UsersService {
  constructor(
      private readonly i18n: I18nService,
    private readonly usersRepository: UsersRepo,
    private readonly rolesRepository: RolesRepo,
    @InjectRepository(UserInfoEntity) private infoRepository: Repository<UserInfoEntity>
  ) { }

  // Users

  async getUsers() {
    return await this.usersRepository.getAllUsers();
  }

  async getUserById(id : string) {
    return await this.usersRepository.getUserById(id);
  }

  async createUser(dto: CreateUserDto) {
    const role = await this.rolesRepository.getRoleByName('user');
    const newUser = this.usersRepository.create({
      ...dto, 
      created: new Date(),
      updated: new Date(),
      roleType: UserRoleTypes.Client,
      roleId: role.id
    });
    const userInfo = await this.infoRepository.save( {
      id: newUser.id,
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    });
    newUser.userInfo = userInfo;
    return await this.usersRepository.save(newUser);
  }

  public async updateUserPassword(updateId: string, dto: UpdateUserPasswordDto) {
    const user = await this.getUserById(updateId);

    if (user.email !== dto.email) {
      throw new HttpException({message: `${this.i18n.t('errors.ERRORS.ChangePasswordException')}`}, HttpStatus.FORBIDDEN);
    }

    // Check current password
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.IncorrectPasswordException'));
    }

    // Check new password
    if (dto.newPassword != dto.newPasswordConfirm) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.NewPasswordException'));
    }

    const newHashPassword = await bcrypt.hash(dto.newPassword, 10);
    return await this.usersRepository.update(updateId,{password: newHashPassword, updated: new Date()});
  }


  public async deleteUser(id: string) {
    const user = await this.getUserById(id);
    user.status = false;
    return await this.usersRepository.save(user);
  }

  // User Info

  public async getUserInfo(id: string) {
    return await this.infoRepository.findOne({ where: { id } });
  }

  public async updateUserInfo(userId: string, dto: AddUserInfoDto) {
    const user = await this.usersRepository.getUserById(userId);

    if (user.email !== dto.email) {
      throw new HttpException({message: `${this.i18n.t('errors.ERRORS.UpdateInfoException')}`}, HttpStatus.FORBIDDEN);
    }
    const userInfo = await this.infoRepository.findOne({ where: { id: user.userInfo.id } });
    return this.infoRepository.update(userInfo.id, { 
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      address: dto.address,
      updated: new Date() 
    });
  }

  // Roles

  public async assignRole(userId: string, dto: AddRoleDto) {
    const id = userId;
    const user = await this.usersRepository.getUserById(id);
    const role = await this.rolesRepository.getRoleByName(dto.name);
    if(user && role) {
      user.roleId = role.id;
      user.roleType = dto.type;
      return await this.usersRepository.save(user);

    }
    throw new HttpException(`${this.i18n.t('errors.ERRORS.NotFoundException')}`, HttpStatus.NOT_FOUND);
  }

}
