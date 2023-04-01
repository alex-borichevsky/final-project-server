import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

// ============ Repos ================
import { UsersRepo } from './repos/users.repo';
import { RolesRepo } from '../roles/repos/roles.repo';
import { InfoRepo } from './repos/info.repo';
import { InfoViewRepo } from './repos/info.view.repo';

// ============ DTOs ================
import { CreateUserDto } from './dtos/create-user.dto';
import { AddUserInfoDto } from './dtos/add-user-info.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { UserSessionDto } from '../security/dtos/userSession.dto';
import { UpdateUserStatusDto } from './dtos/update-status.dto';

// ============ Enums ================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly i18n: I18nService,
    private readonly usersRepository: UsersRepo,
    private readonly rolesRepository: RolesRepo,
    private readonly infoRepository: InfoRepo,
    private readonly userInfoViewRepository: InfoViewRepo
  ) { }

  // Users

  async getUsers() {
    return await this.usersRepository.getAllUsers();
  }

  async getUsersFromView() {
    const users = await this.getUsers();
    let admin = null;
    users.forEach((user) => {
      if(user.roleType == UserRoleTypes.SuperAdmin && !user.userInfo) {
        admin = user;
      }
    })
    if (admin) {
      const userInfo = await this.infoRepository.save( {
        id: admin.id,
        firstName: 'admin',
        lastName: 'adminov',
        phone: '+375292786576',
        address: 'amuratorskaya 4a'
      });
      admin.userInfo = userInfo;
      await this.usersRepository.save(admin);
    }
    return await this.userInfoViewRepository.getUsersFromView();
  }

  async getUserById(id : string) {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async getUserByIdFromView(id : string) {
    return await this.userInfoViewRepository.getUserByIdFromView(id);
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
      firstName: 'first name',
      lastName: 'last name',
      phone: 'phone',
      address: 'address'
    });
    newUser.userInfo = userInfo;
    return await this.usersRepository.save(newUser);
  }

  public async updateUserPassword(userDto: UserSessionDto, dto: UpdateUserPasswordDto) {
    const user = await this.getUserById(userDto.id);

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
    return await this.usersRepository.update(userDto.id,{password: newHashPassword, updated: new Date()});
  }


  public async deleteUser(id: string) {
    const user = await this.getUserById(id);
    user.status = false;
    return await this.usersRepository.save(user);
  }

  public async updateUserStatus(id: string, dto: UpdateUserStatusDto) {
    const user = await this.getUserById(id);
    user.status = dto.status;
    return await this.usersRepository.save(user);
  }

  // User Info

  public async getUserInfo(userDto: UserSessionDto) {
    return await this.usersRepository.getUserById(userDto.id);
  }

  public async updateUserInfo(userDto: UserSessionDto, dto: AddUserInfoDto) {
    const user = await this.usersRepository.getUserById(userDto.id);

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
