import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

// ============ Controllers ================
import { OrdersController } from './orders.controller';

// ============ Services ================
import { OrdersService } from './orders.service';

// ============ Entities ================
import { OrdersEntity } from "./entities/orders.entity";
import { CartEntity } from '../cart/entities/cart.entity';
import { UserEntity } from '../users/entities/users.entity';

// ============ Repos ================
import { OrdersRepo } from "./repos/orders.repo";
import { UsersRepo } from '../users/repos/users.repo';
import { CartRepo } from '../cart/repos/cart.repo';


// ============ Modules ================
import { SecurityModule } from '../security/security.module';
import { CartModule } from '../cart/cart.module';


@Module({
  providers: [OrdersService, OrdersRepo, UsersRepo, CartRepo],
  controllers: [OrdersController],
  imports: [
    CartModule,
    TypeOrmModule.forFeature([OrdersEntity, UserEntity, CartEntity]),
    SecurityModule
  ],
})
export class OrdersModule {}
