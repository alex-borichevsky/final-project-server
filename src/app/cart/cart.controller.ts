import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserPermissions } from '../roles/enums/user-permissions.enum';
import { RequirePermissions } from '../security/decorators/permissions.decorator';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtPermissionsGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

    @ApiOperation({ summary: "Get carts list" })
    @Get()
    @RequirePermissions(UserPermissions.GetCart)
    getCarts() {
        return this.cartService.getCarts();
    }

    @ApiOperation({ summary: "Get cart" })
    @Get(':id')
    @RequirePermissions(UserPermissions.GetCartById)
    getCartsById(@Param() id: string) {
        return this.cartService.getCartById(id);
    }

    @ApiOperation({ summary: "Add product to cart" })
    @ApiBody({ type: AddProductToCartDto })
    @Post()
    @RequirePermissions(UserPermissions.AddProductToCart)
    addProductToCart(@Body() body : AddProductToCartDto) {
        return this.cartService.addProductToCart(body);
    }

    @ApiOperation({ summary: "Delete product from cart" })
    @Delete(':id')
    @RequirePermissions(UserPermissions.DeleteProductFromCart)
    deleteProductFromCart(@Param() recordId : string) {
        return this.cartService.deleteProductToCart(recordId);
    }

    @ApiOperation({ summary: "Update product quantity" })
    @ApiBody({ type: UpdateQuantityDto })
    @Put()
    @RequirePermissions(UserPermissions.UpdateProductQuantity)
    updateProductQuantity(@Body() body : UpdateQuantityDto) {
        return this.cartService.updateProdictQuantity(body);
    }
}
