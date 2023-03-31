import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { I18nService } from "nestjs-i18n";
import { UserPermissions } from "../roles/enums/user-permissions.enum";
import { UserRoleTypes } from "../roles/enums/user-role-types.enum";
import { RolesService } from "../roles/roles.service";
import { UserEntity } from "../users/entities/users.entity";
import { UsersService } from "../users/users.service";
import { UserSessionDto } from "./dtos/userSession.dto";
import { SecurityService } from "./security.service";

describe('SecurityService', () => {
    let usersService: UsersService;
    let rolesService: RolesService;
    let securityService: SecurityService;

    const user: UserEntity = {
        id: "test",
        email: "test",
        password: "test",
        roleId: 1,
        status: true,
        roleType: UserRoleTypes.Client,
        created: new Date(),
        updated: new Date()
    }

    const role = {
        id: 1,
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

    const mockUsersService = {
        getUserByEmail: jest.fn().mockResolvedValue(null),
        createUser: jest.fn().mockResolvedValue(user)
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, RolesService, SecurityService],
            imports: [
                ConfigModule.forRoot(),
                JwtModule.register({ secretOrPrivateKey: "SECRET" })
            ]
        })
            .overrideProvider(RolesService).useValue(mockRolesService)
            .overrideProvider(UsersService).useValue(mockUsersService)
            // .overrideProvider(JwtService).useValue(mockJwtService)
            .compile();

        usersService = module.get<UsersService>(UsersService);
        rolesService = module.get<RolesService>(RolesService);
        securityService = module.get<SecurityService>(SecurityService);
    });

    afterEach(() => jest.clearAllMocks());


    it('should be defined', () => {
        expect(securityService).toBeDefined();
    });

    test('should return user by id', async () => {
        usersService.getUserById = jest.fn().mockResolvedValue(user)
        expect(await securityService.getUserById('test')).toEqual(user);
    });

    test('should return role by id', async () => {
        rolesService.getRoleById = jest.fn().mockResolvedValue(role)
        expect(await securityService.getRoleById(1)).toEqual(role);
    });

    test('should return id by user session', async () => {
        usersService.getUserById = jest.fn().mockResolvedValue(user)
        expect(await securityService.getUser(
            {
                email: 'test',
                id: 'test',
                roleId: 1
            }
        )).toEqual(user);
    });

    test('should return token', async () => {
        UserSessionDto.fromPayload(user)
        expect(await securityService.generateToken(
            {
                email: 'test',
                id: 'test',
                roleId: 1
            }
        )).toEqual({ 
            access_token: expect.any(String),
            expired_at: expect.any(Number)
           });
    });

})