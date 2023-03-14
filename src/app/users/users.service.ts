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

@Injectable()
export class UsersService {
  constructor(
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

    const newUser = this.usersRepository.create({
      ...dto, 
      created: new Date(),
      updated: new Date(),
      roleType: UserRoleTypes.Client,
      roleId: 1
    });
    // const newUserInfo = await this.infoRepository.create({
    //   id: newUser.id,
    //   firstName: '',
    //   lastName: '',
    //   phone: '',
    //   address: ''
    // });
    const newUserInfo : AddUserInfoDto = {
      userId: newUser.id,
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    }
    const userInfo = await this.infoRepository.save(newUserInfo);
    newUser.userInfo = userInfo;
    return await this.usersRepository.save(newUser);
  }

  public async updateUserPassword(updateId: string, dto: UpdateUserPasswordDto) {
    const user = await this.getUserById(updateId);

    if (user.email !== dto.email) {
      throw new HttpException({message: "Forbidden to change the password"}, HttpStatus.FORBIDDEN);
    }

    // Check current password
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid current password");
    }

    // Check new password
    if (dto.newPassword != dto.newPasswordConfirm) {
      throw new BadRequestException("New passwords does not match");
    }

    const newHashPassword = await bcrypt.hash(dto.newPassword, 10);
    return await this.usersRepository.update(updateId,{password: newHashPassword, updated: new Date()});
  }

  public deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }

  // User Info

  public async getUserInfo(id: string) {
    return await this.infoRepository.findOne({ where: { id } });
  }

  public async updateUserInfo(dto: AddUserInfoDto) {
    const user = await this.usersRepository.getUserById(dto.userId);
    const userInfo = await this.infoRepository.save(dto);
    user.userInfo = userInfo;
    return await this.usersRepository.save(user);
  }


  // Roles

  public async addRole(dto: AddRoleDto) {
    const id = dto.userId;
    const user = await this.usersRepository.getUserById(id);
    const role = await this.rolesRepository.getRoleByName(dto.name);
    if(user && role) {
      user.roleId = role.id;
      user.roleType = dto.type;
      return await this.usersRepository.save(user);

    }
    throw new HttpException("User or Role not found", HttpStatus.NOT_FOUND);
  }
}
