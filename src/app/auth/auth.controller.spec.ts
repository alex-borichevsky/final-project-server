import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { SecurityService } from '../security/security.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dtos/registration.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let securityService: SecurityService;
  let i18n: I18nService;

  const mockAuthService = {

    registration: jest.fn(() => {
      return {
        access_token: "token"
      }
    }),

    login: jest.fn(() => {
      return {
        access_token: "token"
      }
    }),

    logout: jest.fn(() => {
      return null
    })
  }

  const mockI18nService = {}

  const mockSecurityService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, I18nService, JwtPermissionsGuard, SecurityService],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({ secretOrPrivateKey: "SECRET" })
      ]
    })
      .overrideProvider(SecurityService).useValue(mockSecurityService)
      .overrideProvider(AuthService).useValue(mockAuthService)
      .overrideProvider(I18nService).useValue(mockI18nService)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    securityService = module.get<SecurityService>(SecurityService);
    i18n = module.get<I18nService>(I18nService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });


  it('should create a user and return token', () => {
    expect(authController.registration({
      email: "test@test.com",
      password: "test",
      confirmPassword: "test"
    }))
      .toEqual({ access_token: expect.any(String) })
  });

  it('should login a user and return token', () => {
    expect(authController.login({
      email: "test@test.com",
      password: "test"
    }))
      .toEqual({ access_token: expect.any(String) })
  });

  it('should return null', async () => {
    expect(await authController.logOut())
      .toEqual(null)
  });


});