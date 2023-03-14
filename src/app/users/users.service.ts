import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from './repos/users.repo';
import { CreateUserDto } from "./dtos/create-user.dto";
import { AddUserInfoDto } from "./dtos/add-user-info.dto";
import { UserInfoEntity } from "./entities/user-info.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddRoleDto } from './dtos/add-role.dto';
import { RolesRepo } from '../roles/repos/roles.repo';
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepo,
    private readonly rolesRepository: RolesRepo,
    @InjectRepository(UserInfoEntity) private infoRepository: Repository<UserInfoEntity>
  ) { }

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

    return await this.usersRepository.save(newUser);
  }

  public updateUser(updateId: number, dto: CreateUserDto) {
    return this.usersRepository.update(updateId, { ...dto, updated: new Date() });
  }

  public delete(id: number) {
    return this.usersRepository.delete(id);
  }

  public async addUserInfo(dto: AddUserInfoDto) {
    const user = await this.usersRepository.getUserById(dto.userId);
    const userInfo = await this.infoRepository.save(dto);
    user.userInfo = userInfo;
    return await this.usersRepository.save(user);
  }

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
