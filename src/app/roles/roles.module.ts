import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ App ================
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepo } from './repos/roles.repo';
import { UserRoleEntity } from './entities/user-role.entity';
import { SecurityModule } from '../security/security.module';

@Module({
  providers: [RolesService,RolesRepo],
  controllers: [RolesController],
  exports: [
    RolesRepo
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserRoleEntity
    ]),
    SecurityModule
  ]
})
export class RolesModule {}
