import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { CreateCartDto } from './dtos/create-cart.dto';

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
    getCartsById(@Body() id: string) {
        return this.cartService.getCartById(id);
    }

    @Post()
    addProductToCart( @Body() body : AddProductToCartDto) {
        return this.cartService.addProductToCart(body);
    }
}
