import { Injectable } from '@nestjs/common';
import { CartRepo } from "./repos/cart.repo";
import { UsersRepo } from '../users/repos/users.repo';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepo,
    private readonly usersRepo: UsersRepo
  ) { }

  async getCarts() {
    return await this.cartRepo.getAllCarts();
  }

  async getCartById(id : string) {
    return await this.cartRepo.getCartById(id);
  }

  async addProductToCart(dto: AddProductToCartDto) {
    const cartRecord = this.cartRepo.create({
      quantity: dto.quantity,
      productId: dto.productId,
      userId: dto.userId
    });

    return await this.cartRepo.save(cartRecord);
  }

  async deleteProductToCart(recordId : string) {
    return await this.cartRepo.delete(recordId);
  }

  updateProdictQuantity(dto: UpdateQuantityDto) {
    return this.cartRepo.update(dto.recordId, { quantity: dto.quantity, updated: new Date()});
  }
}
