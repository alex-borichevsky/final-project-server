import { Test, TestingModule } from '@nestjs/testing';

// ============ Enums ================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { UserPermissions } from './enums/user-permissions.enum';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ Entities ================
import { UserEntity } from '../users/entities/users.entity';

// ============ Repos ================
import { RolesRepo } from './repos/roles.repo';

// ============ Controllers ================
import { RolesController } from './roles.controller';

// ============ Services ================
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let rolesService: RolesService;
  let rolesRepo: RolesRepo

  const user: UserEntity = {
    id: "sdgfajipagr",
    email: "test",
    password: "test",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date()
  }

  const role = {
    type: UserRoleTypes.Client,
    name: 'test',
    permissions: UserPermissions.All,
    user: {
      id: "sdgfajipagr",
      email: "test",
      password: "test",
      roleId: 1,
      status: true,
      roleType: UserRoleTypes.Client,
      created: new Date(),
      updated: new Date()
    }
  }

  const mockRolesRepo = {

  }

  const mockPermissionGuard = {}


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService, RolesRepo, RolesRepo],
    })
      .overrideProvider(RolesRepo).useValue(mockRolesRepo)
      .overrideProvider(RolesRepo).useValue(mockRolesRepo)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    rolesService = module.get<RolesService>(RolesService);
    rolesRepo = module.get<RolesRepo>(RolesRepo)
  });

  it('should be defined', () => {
    expect(rolesService).toBeDefined();
  });

  describe('roles service functions', () => {
    it('should return roless', async () => {
      rolesRepo.getAllRoles = jest.fn().mockResolvedValue([role])
      expect(await rolesService.getAllRoles()).toEqual([role])
    })

    it('should return roles by id', async () => {
      rolesRepo.getRoleById = jest.fn().mockResolvedValue(role)
      expect(await rolesService.getRoleById(1)).toEqual(role)
    })

    it('should create role', async () => {
      rolesRepo.create = jest.fn().mockResolvedValue(role)
      rolesRepo.save = jest.fn().mockResolvedValue(role)
      expect(await rolesService.createRole({
        type: UserRoleTypes.Client,
        name: 'test',
        permissions: [UserPermissions.All, UserPermissions.CreateCategory]
      })).toEqual(role)
    })

    it('should delete role', async () => {
      rolesRepo.delete = jest.fn().mockResolvedValue('deleted')
      expect(await rolesService.deleteRole(1)).toEqual('deleted')
    })

    it('should update role', async () => {
      const result = {
        id: 1,
        type: UserRoleTypes.Client,
        name: 'test',
        permissions: [UserPermissions.All, UserPermissions.CreateCategory],
        updated: new Date()
      }
      rolesRepo.save = jest.fn().mockResolvedValue(result)
      expect(await rolesService.updateRole(1, {
        type: UserRoleTypes.Client,
        name: 'test',
        permissions: [UserPermissions.All, UserPermissions.CreateCategory]
      })).toEqual(result)
    })
  })

});