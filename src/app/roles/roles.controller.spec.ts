import { Test, TestingModule } from '@nestjs/testing';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserPermissions } from './enums/user-permissions.enum';
import { UserRoleTypes } from './enums/user-role-types.enum';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;

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

  const mockRolesService = {
  }

  const mockPermissionGuard = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    }).overrideProvider(RolesService).useValue(mockRolesService)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    rolesService = module.get<RolesService>(RolesService);
    rolesController = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  it('should get roles', async () => {
    rolesService.getAllRoles = jest.fn().mockResolvedValue([role])
    expect(await rolesController.getRoles()).toEqual([role])
  });

  it('should get role by id', async () => {
    rolesService.getRoleById = jest.fn().mockResolvedValue(role)
    expect(await rolesController.getRoleById(1)).toEqual(role);
  });

  it('should create role', async () => {
    rolesService.createRole = jest.fn().mockResolvedValue(role)
    expect(await rolesController.createRole({
      type: UserRoleTypes.Client,
      name: "test",
      permissions: [UserPermissions.All]
    })).toEqual(role);
  });

  it('should update role', async () => {
    rolesService.updateRole = jest.fn().mockResolvedValue('updated')
    expect(await rolesController.updateRole(1, {
      type: null,
      name: "test",
      permissions: null
    })).toEqual('updated');
  });

  it('should delete role', async () => {
    rolesService.deleteRole = jest.fn().mockResolvedValue('deleted')
    expect(await rolesController.deleteRole(1)).toEqual('deleted');
  });

});