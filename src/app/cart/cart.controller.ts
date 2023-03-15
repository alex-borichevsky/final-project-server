import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/create-cart.dto';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Get('get')
    getCarts() {
        return this.cartService.getCarts();
    }

    @Get(':id')
    getCartsById(@Body() id: string) {
        return this.cartService.getCartById(id);
    }

    @Post('')
    crateOrder(@Body() dto: CreateCartDto) {
        return this.cartService.createCart(dto)
    }

    @Post('update')
    updateCart(@Body() id: number, dto: CreateCartDto) {
        return this.cartService.updateCart(id, dto)
    }

    @Post('delete')
    deleteCart(@Body() id: number) {
        return this.cartService.deleteCart(id)
    }
}
