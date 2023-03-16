import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
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

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtPermissionsGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: "Get orders list" })
    @Get('get')
    @RequirePermissions(UserPermissions.GetOrders)
    getOrders() {
        return this.ordersService.getOrders();
    }

    @ApiOperation({ summary: "Get order" })
    @Get(':id')
    @RequirePermissions(UserPermissions.GetOrderById)
    getCartsById(@Body() id: string) {
        return this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: "Create order"})
    @ApiBody({ type: CreateOrderDto })
    @Post()
    @RequirePermissions(UserPermissions.CreateOrder)
    createOrder(@Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(dto);
    }

    @ApiOperation({ summary: "Delete order" })
    @Delete(':id') 
    @RequirePermissions(UserPermissions.DeleteOrder)
    deleteOrder(@Param() orderId : string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
