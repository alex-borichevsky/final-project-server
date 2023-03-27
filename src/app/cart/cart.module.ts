import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ App ================
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from "./entities/cart.entity";
import { CartRepo } from "./repos/cart.repo";
import { UsersRepo } from '../users/repos/users.repo';
import { UserEntity } from '../users/entities/users.entity';
import { SecurityModule } from '../security/security.module';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { AbadonedCartListener } from './listeners/abadoned-cart.listener';

@Module({
  providers: [CartService, CartRepo, UsersRepo, ScheduledTasksService, AbadonedCartListener],
  exports: [CartRepo],
  controllers: [CartController],
  imports: [
    TypeOrmModule.forFeature([
        CartEntity, UserEntity
    ]),
    SecurityModule,
  ]
})
export class CartModule {}
