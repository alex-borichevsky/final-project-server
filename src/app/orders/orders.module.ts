import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

// ============ App ================
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersEntity } from "./entities/orders.entity";


@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity
    ])
  ]
})
export class OrdersModule {}
