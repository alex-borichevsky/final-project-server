import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersRepo } from '../users/repos/users.repo';
import { UserEntity } from '../users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';

@Module({
  imports: [
    SecurityModule,
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([
      UserEntity
  ]),
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy,UsersRepo],
  controllers: [AuthController]
})
export class AuthModule { }
