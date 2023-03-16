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

@Controller('cart')
@UseGuards(JwtPermissionsGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @RequirePermissions(UserPermissions.GetCart)
  getCarts() {
    return this.cartService.getCarts();
  }

  @Get(':id')
  @RequirePermissions(UserPermissions.GetCartById)
  getCartsById(@Param() id: string) {
    return this.cartService.getCartById(id);
  }

  @Post()
  @RequirePermissions(UserPermissions.AddProductToCart)
  addProductToCart(@Body() body: AddProductToCartDto) {
    return this.cartService.addProductToCart(body);
  }

  @Delete(':id')
  @RequirePermissions(UserPermissions.DeleteProductFromCart)
  deleteProductFromCart(@Param() recordId: string) {
    return this.cartService.deleteProductToCart(recordId);
  }

  @Put()
  @RequirePermissions(UserPermissions.UpdateProductQuantity)
  updateProductQuantity(@Body() body: UpdateQuantityDto) {
    return this.cartService.updateProductQuantity(body);
  }
}
