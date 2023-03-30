import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserEntity } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    const mockUsersService = {
        getUsers: jest.fn(() => {
            return "test"
        }),
        getUserById: jest.fn(() => {
            return "test"
        }),
        deleteUser: jest.fn(() => {
            return null
        }),
        updateUserPassword: jest.fn(() => {
            return "test"
        }),
        getUserInfo: jest.fn(() => {
            return "test"
        }),
        updateUserInfo: jest.fn(() => {
            return "test"
        }),
        assignRole: jest.fn(() => {
            return "test"
        }),
        getUsersFromView: jest.fn().mockResolvedValue('test'),
        getUserByIdFromView: jest.fn().mockResolvedValue('test')
    }

    const mockPermissionGuard = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .overrideGuard(JwtPermissionsGuard)
            .useValue(mockPermissionGuard)
            .compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
    });
    it('should get users', async () => {
        expect(await usersController.getUsers()).toEqual('test');
    });

    it('should get user by id', async () => {
        expect(await usersController.getUserById("test")).toEqual("test");
    });

    // it('should delete user', () => {
    //     expect(usersController.deleteUser("test")).toBeNull();
    // });

    it('should get user info', async () => {
        expect(await usersController.getUserInfoById({
            id: 'test',
            email: 'test',
            roleId: 1
        })).toEqual("test");
    });

    it('should be defined', async () => {
        expect(await usersController.updateUserInfo({
            id: 'test',
            email: 'test',
            roleId: 1
        }, {
            firstName: "test",
            lastName: "test",
            phone: "test",
            address: "test"
        })).toEqual("test");
    });

    it('should be defined', async () => {
        expect(await usersController.updateUserPassword({
            id: 'test',
            email: 'test',
            roleId: 1
        }, {
            password: "test",
            newPassword: "newTest",
            newPasswordConfirm: "testNew"
        })).toEqual("test");
    });

    it('should be defined', async () => {
        expect(await usersController.assignRoleToUser('test', {
            type: UserRoleTypes.Client,
            name: "test",
        })).toEqual("test");
    });


});