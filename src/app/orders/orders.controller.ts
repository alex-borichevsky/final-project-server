import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';
import { OrdersEntity } from './entities/orders.entity';
import { DeleteResult } from 'typeorm';
import { ProductOrderDto } from './dtos/order-products.dto';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtPermissionsGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: "Get orders list" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductOrderDto,
        isArray: true
      })
    @Get('get')
    @RequirePermissions(UserPermissions.GetOrders)
    getOrders() {
        return this.ordersService.getOrders();
    }

    @ApiOperation({ summary: "Get order" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductOrderDto
      })
    @Get(':id')
    @RequirePermissions(UserPermissions.GetOrderById)
    getCartsById(@Body() id: string) {
        return this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: "Create order"})
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CreateOrderDto,
      })
    @Post()
    @RequirePermissions(UserPermissions.CreateOrder)
    createOrder(@Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(dto);
    }

    @ApiOperation({ summary: "Delete order" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductOrderDto
      })
    @Delete(':id') 
    @RequirePermissions(UserPermissions.DeleteOrder)
    deleteOrder(@Param() orderId : string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
