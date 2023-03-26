import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

// ============ App ================
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEntity } from "./entities/orders.entity";
import { OrdersRepo } from "./repos/orders.repo";
import { UsersRepo } from '../users/repos/users.repo';
import { UserEntity } from '../users/entities/users.entity';
import { SecurityModule } from '../security/security.module';
import { CartModule } from '../cart/cart.module';
import { CartRepo } from '../cart/repos/cart.repo';
import { CartEntity } from '../cart/entities/cart.entity';


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
