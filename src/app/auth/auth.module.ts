import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// =========== Services =======================
import { AuthService } from './auth.service';

// =========== Controllers =======================
import { AuthController } from './auth.controller';

// =========== Strategies =======================
import { JwtStrategy } from './strategies/jwt.strategy';

// =========== Repos =======================
import { UsersRepo } from '../users/repos/users.repo';

// =========== Entities =======================
import { UserEntity } from '../users/entities/users.entity';

// =========== Modules =======================
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';
import { UsersModule } from '../users/users.module';

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
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy,UsersRepo],
  controllers: [AuthController]
})
export class AuthModule { }
