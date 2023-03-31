import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ Services ================
import { RolesService } from './roles.service';

// ============ Controllers ================
import { RolesController } from './roles.controller';

// ============ Repos ================
import { RolesRepo } from './repos/roles.repo';

// ============ Modules ================
import { SecurityModule } from '../security/security.module';

// ============ Entities ================
import { UserRoleEntity } from './entities/user-role.entity';

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
