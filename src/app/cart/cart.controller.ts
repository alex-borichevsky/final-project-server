import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

// =========== Enums =======================
import { UserPermissions } from '../roles/enums/user-permissions.enum';

// =========== Decorators =======================
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { User } from '../users/decorators/user.decorator';

// =========== Guards =======================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// =========== DTOs =======================
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { UserSessionDto } from '../security/dtos/userSession.dto';

// =========== Services =======================
import { CartService } from './cart.service';

// =========== Entities =======================
import { CartEntity } from './entities/cart.entity';


@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtPermissionsGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

    @ApiOperation({ summary: "Get carts list" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
        isArray: true,
      })
    @Get()
    @RequirePermissions(UserPermissions.GetCart)
    getCarts() {
        return this.cartService.getCarts();
    }

    @ApiOperation({ summary: "Add product to cart" })
    @ApiBody({ type: AddProductToCartDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: AddProductToCartDto,
      })
    @Post('/product')
    @RequirePermissions(UserPermissions.AddProductToCart)
    addProductToCart(@User() user: UserSessionDto, @Body() dto : AddProductToCartDto) {
        return this.cartService.addProductToCart(user, dto);
    }

    @Delete()
    @RequirePermissions(UserPermissions.DeleteCartByUserId)
    deleteCartByUserId(@User() user: UserSessionDto) {
    return this.cartService.deleteCartByUserId(user);
    }


    @ApiOperation({ summary: "Delete product from cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: DeleteResult,
      })
    @Delete(':id')
    @RequirePermissions(UserPermissions.DeleteProductFromCart)
    deleteProductFromCart(@Param("recordId") recordId : string) {
        return this.cartService.deleteProductFromCart(recordId);
    }

    @ApiOperation({ summary: "Update product quantity" })
    @ApiBody({ type: UpdateQuantityDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: UpdateQuantityDto,
      })
    @Put()
    @RequirePermissions(UserPermissions.UpdateProductQuantity)
    updateProductQuantity(@Body() body : UpdateQuantityDto) {
        return this.cartService.updateProductQuantity(body);
    }

    @ApiOperation({ summary: "Get cart by user id" })
    @ApiResponse({
      status: HttpStatus.OK,
      description: "HttpStatus:200:OK",
      type: CartEntity,
    })
    @RequirePermissions(UserPermissions.GetCartByUserId)
    @Get('/user')
    getCartByUserId(@User() user:UserSessionDto) {
    return this.cartService.getCartByUserId(user);
  }
}
