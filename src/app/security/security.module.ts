import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtModule } from "@nestjs/jwt";

import { SecurityService } from "./security.service";

import { RolesRepo } from "../roles/repos/roles.repo";
import { UsersRepo } from "../users/repos/users.repo";

import { UserRoleEntity } from "../roles/entities/user-role.entity";
import { UserEntity } from "../users/entities/users.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '30s'
      }
    }),
    TypeOrmModule.forFeature([
      UserEntity, UserRoleEntity
    ])
  ],
  providers: [ 
    SecurityService,
    UsersRepo,
    RolesRepo
  ], 
  exports: [
    JwtModule,
    SecurityService
  ]
})
export class SecurityModule { }
