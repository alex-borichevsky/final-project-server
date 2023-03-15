import { Injectable } from '@nestjs/common';
import { CartRepo } from "./repos/cart.repo";
import { CreateCartDto } from "./dtos/create-cart.dto";
import { UsersRepo } from '../users/repos/users.repo';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';

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

  private countPrice(dto: CreateCartDto) : number {
    let totalPrice = 0;

    dto.products.forEach(product => {
      totalPrice += product.price;
    })
    return totalPrice;
  }


  async createCart(dto: CreateCartDto) {
    const user = await this.usersRepo.getUserById(dto.userId);

    // const newCart = this.cartRepo.create({
    //   ...dto, created: new Date(), totalPrice: this.countPrice(dto)
    // });
    // user.carts.push(newCart);
    // await this.usersRepo.save(user);
    // return await this.cartRepo.save(newCart);
  }

  public updateCart(updateId: number, dto: CreateCartDto) {
   // return this.cartRepo.update(updateId, { ...dto, updated: new Date()});
  }

  public deleteCart(id: number) {
    return this.cartRepo.delete(id);
  }


}
