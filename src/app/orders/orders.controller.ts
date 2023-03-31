import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';

// ============ Permissions ================
import { UserPermissions } from '../roles/enums/user-permissions.enum';

// ============ Decorators ================
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { User } from '../users/decorators/user.decorator';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ DTOs ================
import { CreateOrderDto } from './dtos/create-order.dto';
import { ProductOrderDto } from './dtos/order-products.dto';
import { UserSessionDto } from '../security/dtos/userSession.dto';

// ============ Services ================
import { OrdersService } from './orders.service';


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
    @Get('user/:id')
    @RequirePermissions(UserPermissions.GetOrderById)
    getOrderById(@Param("id") id: string) {
        return this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: "Get order by user id" })
    @ApiResponse({
      status: HttpStatus.OK,
      description: "HttpStatus:200:OK",
      type: ProductOrderDto
    })
    @RequirePermissions(UserPermissions.GetOrderByUserId)
    @Get('/user')
    getOrderByUserId(@User() user: UserSessionDto) {
      return this.ordersService.getOrdersByUserId(user);
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
    createOrder(@User() user: UserSessionDto, @Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(user, dto);
    }

    @ApiOperation({ summary: "Delete order" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: ProductOrderDto
      })
    @Delete(':id') 
    @RequirePermissions(UserPermissions.DeleteOrder)
    deleteOrder(@Param("id") orderId : string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
