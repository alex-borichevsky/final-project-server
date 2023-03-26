import { Injectable } from '@nestjs/common';
import { CartRepo } from "./repos/cart.repo";
import { UsersRepo } from '../users/repos/users.repo';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { UserSessionDto } from '../security/dtos/userSession.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepo
  ) { }

  async getCarts() {
    return await this.cartRepo.getAllCarts();
  }

  async getCartByUserId(user: UserSessionDto) {
    return await this.cartRepo.getCartByUserId(user.id);
  }

  async getCartById(id : string) {
    return await this.cartRepo.getCartById(id);
  }

  async addProductToCart(user: UserSessionDto, dto: AddProductToCartDto) {
    const cartRecord = this.cartRepo.create({
      quantity: dto.quantity,
      productId: dto.productId,
      userId: user.id
    });

    return await this.cartRepo.save(cartRecord);
  }

  async deleteCartByUserId(user: UserSessionDto) {
    return await this.cartRepo.deleteByUserId(user.id);
  }

  async deleteProductFromCart(recordId: string) {
    return await this.cartRepo.delete(recordId);
  }
  updateProductQuantity(dto: UpdateQuantityDto) {
    return this.cartRepo.update(dto.recordId, { quantity: dto.quantity, updated: new Date()});
  }
}
