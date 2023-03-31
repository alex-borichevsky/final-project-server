import { Injectable } from '@nestjs/common';

// ============ Repos ================
import { CartRepo } from "./repos/cart.repo";

// ============ DTOs ================
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
    const record = await this.cartRepo.findOne({where: {productId: dto.productId}});
    if (record) {
      record.quantity = record.quantity + dto.quantity;
      return await this.cartRepo.save(record);
    }
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
  async updateProductQuantity(dto: UpdateQuantityDto) {
    if (dto.quantity <= 0 )
      return await this.cartRepo.delete(dto.recordId);
    return await this.cartRepo.update(
      dto.recordId, 
      { quantity: dto.quantity, updated: new Date()}
    );
  }
}
