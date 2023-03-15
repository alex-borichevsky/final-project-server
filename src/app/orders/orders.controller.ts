import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Get('get')
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Get(':id')
    getCartsById(@Body() id: string) {
        return this.ordersService.getOrderById(id);
    }

    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(dto);
    }

    @Delete(':id') 
    deleteOrder(@Param() orderId : string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
