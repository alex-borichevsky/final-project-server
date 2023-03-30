import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { UserRoleEntity } from '../roles/entities/user-role.entity';
import { UserPermissions } from '../roles/enums/user-permissions.enum';

import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { RolesRepo } from '../roles/repos/roles.repo';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserInfoEntity } from './entities/user-info.entity';
import { UserEntity } from './entities/users.entity';
import { InfoRepo } from './repos/info.repo';
import { UsersRepo } from './repos/users.repo';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpException } from '@nestjs/common';
import { InfoViewRepo } from './repos/info.view.repo';


describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepo: UsersRepo
  let rolesRepo: RolesRepo
  let infoRepo: InfoRepo
  let infoViewRepo: InfoViewRepo
  let i18n: I18nService;

  const userInfo: UserInfoEntity = {
    created: new Date(),
    updated: new Date(),
    id: 'test',
    firstName: 'test',
    lastName: 'test',
    phone: 'test',
    address: 'test'
  }


  const user: UserEntity = {
    id: "sdgfajipagr",
    email: "test",
    password: "test",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date(),
    userInfo: userInfo
  }

  const userIncorrect: UserEntity = {
    id: "sdgfajipagr",
    email: "incorrect",
    password: "test",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date()
  }

  const userUpdated: UserEntity = {
    id: "sdgfajipagr",
    email: "test",
    password: "test1",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date()
  }

  const userRole: UserRoleEntity = {
    created: new Date(),
    updated: new Date(),
    id: 1,
    type: UserRoleTypes.Client,
    name: 'test',
    permissions: [UserPermissions.All, UserPermissions.AssignRole]
  }

  
  const mockUsersRepo = {

  }

  const mockRolesRepo = {

  }

  const mockPermissionGuard = {}

  const mockInfoRepo = {}

  const mockI18nService = {}

  const mockInfoViewRepo = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepo, RolesRepo, InfoRepo, I18nService, InfoViewRepo],
    })
      .overrideProvider(I18nService).useValue(mockI18nService)
      .overrideProvider(InfoRepo).useValue(mockInfoRepo)
      .overrideProvider(InfoViewRepo).useValue(mockInfoViewRepo)
      .overrideProvider(RolesRepo).useValue(mockRolesRepo)
      .overrideProvider(UsersRepo).useValue(mockUsersRepo)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepo = module.get<UsersRepo>(UsersRepo)
    rolesRepo = module.get<RolesRepo>(RolesRepo)
    infoRepo = module.get<InfoRepo>(InfoRepo)
    i18n = module.get<I18nService>(I18nService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('users functions', () => {
    it('should return users', async () => {
      usersRepo.getAllUsers = jest.fn().mockResolvedValue([user])
      expect(await usersService.getUsers()).toEqual([user])
    })

    it('should return user by id', async () => {
      usersRepo.getUserById = jest.fn().mockResolvedValue(user)
      expect(await usersService.getUserById('test')).toEqual(user)
    })

    it('should return user by email', async () => {
      usersRepo.getUserByEmail = jest.fn().mockResolvedValue(user)
      expect(await usersService.getUserByEmail('test')).toEqual(user)
    })

    it('should create user', async () => {
      rolesRepo.getRoleByName = jest.fn().mockResolvedValue(userRole)
      usersRepo.create = jest.fn().mockResolvedValue(user)
      infoRepo.save = jest.fn().mockResolvedValue(userInfo)
      usersRepo.save = jest.fn().mockResolvedValue(user)
      expect(await usersService.createUser(user)).toEqual(user)
    })

    it('should update user password', async () => {
      user.password = await bcrypt.hash(user.password, 10)
      usersRepo.getUserById = jest.fn().mockResolvedValue(user)
      usersRepo.update = jest.fn().mockResolvedValue(userUpdated)
      expect(await usersService.updateUserPassword({
        id: 'test',
        email: 'test',
        roleId: 1,
      }, {
        password: 'test',
        newPassword: 'test1',
        newPasswordConfirm: 'test1',
      })).toEqual(userUpdated)
    })

    // it('should fail with error email is incorrect', async () => {
    //   user.password = await bcrypt.hash(user.password, 10)
    //   usersRepo.getUserById = jest.fn().mockResolvedValue({ email: 'testIncorrect' })
    //   i18n.t = jest.fn().mockResolvedValue('User email is incorerct')
    //   try {
    //     await usersService.updateUserPassword({
    //       id: 'test',
    //       email: 'test',
    //       roleId: 1,
    //     }, {
    //       password: 'test',
    //       newPassword: 'test1',
    //       newPasswordConfirm: 'test1',
    //     })
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(HttpException);
    //   }
    // }
    // )

    it('should fail with error password is incorrect', async () => {
      userUpdated.password = await bcrypt.hash(user.password, 10)
      usersRepo.getUserById = jest.fn().mockResolvedValue(userUpdated)
      i18n.t = jest.fn().mockResolvedValue('Password is incorrect')
      try {
        await usersService.updateUserPassword({
          id: 'test',
          email: 'test',
          roleId: 1,
        }, {
          password: 'test',
          newPassword: 'test1',
          newPasswordConfirm: 'test1',
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    }
    )

    it('should fail with error confirm password is incorrect', async () => {
      user.password = await bcrypt.hash(user.password, 10)
      usersRepo.getUserById = jest.fn().mockResolvedValue(user)
      usersRepo.update = jest.fn().mockResolvedValue(userUpdated)
      i18n.t = jest.fn().mockResolvedValue('Confirm password is incorrect')
      try {
        await usersService.updateUserPassword({
          id: 'test',
          email: 'test',
          roleId: 1,
        }, {
          password: 'test',
          newPassword: 'test1',
          newPasswordConfirm: 'test2',
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    }
    )

    it('should delete user', async () => {
      const newUser = user
      usersRepo.getUserById = jest.fn().mockResolvedValue(newUser)
      usersRepo.save = jest.fn().mockResolvedValue('deleted')
      expect(await usersService.deleteUser('test')).toEqual('deleted')
    })
  })

  describe('user info functions', () => {
    it('should get user info', async () => {
      usersRepo.getUserById = jest.fn().mockResolvedValue(user)
      expect(await usersService.getUserInfo({
        id: 'test',
        email: 'test',
        roleId: 1,
      })).toEqual(user.userInfo)
    })

    it('should fail with error email is incorrect', async () => {
      usersRepo.getUserById = jest.fn().mockResolvedValue(userIncorrect)
      infoRepo.getUserInfo = jest.fn().mockResolvedValue(userInfo)
      i18n.t = jest.fn().mockResolvedValue('User email is incorerct')
      try {
        await usersService.getUserInfo({
          id: 'test',
          email: 'test',
          roleId: 1,
        })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    })
  })


  describe('role functions', () => {
    it('should assing role', async () => {
      usersRepo.getUserById = jest.fn().mockResolvedValue(user)
      rolesRepo.getRoleByName = jest.fn().mockResolvedValue(userRole)
      usersRepo.save = jest.fn().mockResolvedValue(user)
      expect(await usersService.assignRole('test', {
        type: UserRoleTypes.Client,
        name: 'client'
      })).toEqual(user)
    })

    it('User or role does not exist', async () => {
      usersRepo.getUserById = jest.fn().mockResolvedValue(null)
      rolesRepo.getRoleByName = jest.fn().mockResolvedValue(null)
      i18n.t = jest.fn().mockResolvedValue('User email is incorerct')
      try {
        await usersService.assignRole('test', {
          type: UserRoleTypes.Client,
          name: 'client'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    })

  })

});