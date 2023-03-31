import { BadRequestException, HttpException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';

// ============ Enums ================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

// ============ Entities ================
import { UserEntity } from '../users/entities/users.entity';

// ============ Services ================
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SecurityService } from '../security/security.service';

// ============ Controllers ================
import { AuthController } from './auth.controller';


describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let securityService: SecurityService;
  let i18n: I18nService;

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

  const sameUser: UserEntity = {
    id: "sdgfajipagr",
    email: "test",
    password: "test",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date()
  }

  const userRegistration = {
    email: "test",
    password: "test",
    confirmPassword: "test"
  }

  const userLogin = {
    email: "test",
    password: "test",
  }

  const incorrectRegistration = {
    email: "test",
    password: "test",
    confirmPassword: "notest"
  }

  const anotherUser = {
    id: "sdgfajipagrgsras",
    name: "user2",
    email: "test2",
    password: "test2",
    roleId: 2
  }


  const mockI18nService = {
    t: jest.fn().mockResolvedValue('some error')
  }

  const mockUsersService = {
    getUserByEmail: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue(user)
  }

  const mockSecurityService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, I18nService, SecurityService],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({ secretOrPrivateKey: "SECRET" })
      ]
    })
    .overrideProvider(SecurityService).useValue(mockSecurityService)
      .overrideProvider(I18nService).useValue(mockI18nService)
      .overrideProvider(UsersService).useValue(mockUsersService)
      // .overrideProvider(JwtService).useValue(mockJwtService)
      .compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    securityService = module.get<SecurityService>(SecurityService);
    i18n = module.get<I18nService>(I18nService);
  });

  afterEach(() => jest.clearAllMocks());


  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  describe('auth service methods', () => {
    describe('registration', () => {

      test('registration returns token', async () => {
        // i18n.t = jest.fn().mockResolvedValue('userExists')
        // jwtService.sign = jest.fn().mockResolvedValue(String("test"))
        securityService.generateToken = jest.fn().mockResolvedValue({
          access_token: 'token',
          expired_at: (Number(new Date().getTime()) + 3600000)
        })
        let result = await authService.registration(userRegistration);
        expect(result).toEqual({ 
          access_token: expect.any(String),
          expired_at: expect.any(Number)
         });
      });

      test('registration fails with an error user exists', async () => {
        usersService.getUserByEmail = jest.fn().mockResolvedValue(user)
        i18n.t = jest.fn().mockResolvedValue('User exists')
        try {
          await authService.registration(userRegistration);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });

      test('registration fails with an error wrong confirm password', async () => {
        usersService.getUserByEmail = jest.fn().mockResolvedValue(null)
        i18n.t = jest.fn().mockResolvedValue('Wrong confirm password')
        try {
          await authService.registration(incorrectRegistration);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      })
    });

    describe('login', () => {
      it('should login and return token', async () => {
        user.password = await bcrypt.hash(user.password, 10)
        securityService.generateToken = jest.fn().mockResolvedValue({
          access_token: 'token',
          expired_at: (Number(new Date().getTime()) + 3600000)
        })
        usersService.getUserByEmail = jest.fn().mockResolvedValue(user)
        expect(await authService.login(userLogin)).toEqual({ 
          access_token: expect.any(String),
          expired_at: expect.any(Number)
         })
      }
      )

      it('should fail with error user does not exist', async () => {
        usersService.getUserByEmail = jest.fn().mockResolvedValue(null)
        i18n.t = jest.fn().mockResolvedValue('User does not exists')
        try {
          await authService.login(userLogin);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      }
      )

      it('should fail with error password does not match', async () => {
        user.password = await bcrypt.hash(user.password, 10)
        usersService.getUserByEmail = jest.fn().mockResolvedValue(anotherUser)
        i18n.t = jest.fn().mockResolvedValue('password does not match')
        try {
          await authService.login(userLogin);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      })
    })

    describe('validate user', () => {
      it('validate', async () => {
        usersService.getUserByEmail = jest.fn().mockResolvedValue(user)
        expect(await authService.validateUser({
          email: "test",
          id: 'sdgfajipagr',
          exp: new Date(),
          iat: new Date(),
        })).toEqual(user)
      })

      it('should not validate', async () => {
        usersService.getUserByEmail = jest.fn().mockResolvedValue(null)
        i18n.t = jest.fn().mockResolvedValue('user does not exist')
        try {
          await authService.validateUser(
            {
              email: "test",
              id: 'sdgfajipagr',
              exp: new Date(),
              iat: new Date(),
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      })
    })
  })
})