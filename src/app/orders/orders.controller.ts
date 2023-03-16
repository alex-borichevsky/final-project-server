import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @ApiOperation({ summary: "Get orders list" })
    @Get('get')
    getOrders() {
        return this.ordersService.getOrders();
    }

    @ApiOperation({ summary: "Get order" })
    @Get(':id')
    getCartsById(@Body() id: string) {
        return this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: "Create order"})
    @ApiBody({ type: CreateOrderDto })
    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(dto);
    }

    @ApiOperation({ summary: "Delete order" })
    @Delete(':id') 
    deleteOrder(@Param() orderId : string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
