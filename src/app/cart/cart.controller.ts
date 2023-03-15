import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Get()
    getCarts() {
        return this.cartService.getCarts();
    }

    @Get(':id')
    getCartsById(@Param() id: string) {
        return this.cartService.getCartById(id);
    }

    @Post()
    addProductToCart(@Body() body : AddProductToCartDto) {
        return this.cartService.addProductToCart(body);
    }

    @Delete(':id')
    deleteProductFromCart(@Param() recordId : string) {
        return this.cartService.deleteProductToCart(recordId);
    }

    @Put()
    updateProductQuantity(@Body() body : UpdateQuantityDto) {
        return this.cartService.updateProdictQuantity(body);
    }
}
