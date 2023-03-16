import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { UpdateResult } from 'typeorm';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @ApiOperation({ summary: "Get carts list" })
    @Get()
    getCarts() {
        return this.cartService.getCarts();
    }

    @ApiOperation({ summary: "Get cart" })
    @Get(':id')
    getCartsById(@Param() id: string) {
        return this.cartService.getCartById(id);
    }

    @ApiOperation({ summary: "Add product to cart" })
    @ApiBody({ type: AddProductToCartDto })
    @Post()
    addProductToCart(@Body() body : AddProductToCartDto) {
        return this.cartService.addProductToCart(body);
    }

    @ApiOperation({ summary: "Delete product from cart" })
    @Delete(':id')
    deleteProductFromCart(@Param() recordId : string) {
        return this.cartService.deleteProductToCart(recordId);
    }

    @ApiOperation({ summary: "Update product quantity" })
    @ApiBody({ type: UpdateQuantityDto })
    @Put()
    updateProductQuantity(@Body() body : UpdateQuantityDto) {
        return this.cartService.updateProdictQuantity(body);
    }
}
