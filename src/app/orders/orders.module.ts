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


@Module({
  providers: [OrdersService, OrdersRepo, UsersRepo],
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([OrdersEntity, UserEntity]),
    SecurityModule
  ],
})
export class OrdersModule {}
