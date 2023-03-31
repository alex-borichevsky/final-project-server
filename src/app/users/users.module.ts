import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

// ============ Services ================
import { UsersService } from './users.service';

// ============ Controllers ================
import { UsersController } from './users.controller';

// ============ Repos ================
import { UsersRepo } from './repos/users.repo';


// ============ Entities ================
import { UserEntity } from "./entities/users.entity";
import { CartEntity } from "../cart/entities/cart.entity";
import { UserRoleEntity } from "../roles/entities/user-role.entity";
import { OrdersEntity } from "../orders/entities/orders.entity";
import { UserInfoEntity } from "./entities/user-info.entity";
import { CategoryEntity } from "../categories/entities/category.entity";
import { ProductsEntity } from "../products/entities/products.entity";

// ============ Modules ================
import { SecurityModule } from '../security/security.module';

// ============ Repos ================
import { RolesRepo } from '../roles/repos/roles.repo';
import { InfoRepo } from './repos/info.repo';
import { InfoViewRepo } from './repos/info.view.repo';

// ============ Views ================
import { UserInfoView } from './views/user-info.view';

@Module({
  providers: [UsersService, UsersRepo, RolesRepo, InfoRepo, InfoViewRepo],
  controllers: [UsersController],
  exports: [
    UsersRepo, UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserInfoEntity,
      CartEntity,
      UserRoleEntity,
      OrdersEntity,
      UserInfoEntity,
      CategoryEntity,
      ProductsEntity,
      UserInfoView
    ]),
    SecurityModule
  ]
})
export class UsersModule {}
