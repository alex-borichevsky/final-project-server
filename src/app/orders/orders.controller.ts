import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtPermissionsGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @RequirePermissions(UserPermissions.GetOrders)
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetOrderById)
  getOrderById(@Body() id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @RequirePermissions(UserPermissions.CreateOrder)
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteOrder)
  deleteOrder(@Param() orderId: string) {
    return this.ordersService.deleteOrder(orderId);
  }
}
