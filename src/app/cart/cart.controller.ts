import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
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

    @ApiOperation({ summary: "Get cart" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: CartEntity,
      })
    @Get(':id')
    @RequirePermissions(UserPermissions.GetCartById)
    getCartById(@Param("id") id: string) {
        return this.cartService.getCartById(id);
    }

    @ApiOperation({ summary: "Add product to cart" })
    @ApiBody({ type: AddProductToCartDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "HttpStatus:200:OK",
        type: AddProductToCartDto,
      })
    @Post()
    @RequirePermissions(UserPermissions.AddProductToCart)
    addProductToCart(@Body() body : AddProductToCartDto) {
        return this.cartService.addProductToCart(body);
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

    @RequirePermissions(UserPermissions.GetCartByUserId)
    @Get('/user/:id')
    getCartByUserId(@Param('id') id: string) {
    return this.cartService.getCartByUserId(id);
  }
}
