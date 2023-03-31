import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ============ Controllers ================
import { CartController } from './cart.controller';

// ============ Services ================
import { CartService } from './cart.service';
import { ScheduledTasksService } from './scheduled-tasks.service';

// ============ Entities ================
import { CartEntity } from "./entities/cart.entity";
import { UserEntity } from '../users/entities/users.entity';

// ============ Repos ================
import { CartRepo } from "./repos/cart.repo";
import { UsersRepo } from '../users/repos/users.repo';

// ============ Modules ================
import { SecurityModule } from '../security/security.module';

// ============ Listeners ================
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
