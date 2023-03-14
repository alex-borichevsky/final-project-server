import { Injectable } from '@nestjs/common';
import { CartRepo } from "./repos/cart.repo";
import { CreateCartDto } from "./dtos/create-cart.dto";
import { UsersRepo } from '../users/repos/users.repo';

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



  private countPrice(dto: CreateCartDto) : number {
    let totalPrice = 0;

    dto.products.forEach(product => {
      totalPrice += product.price;
    })
    return totalPrice;
  }


  async createCart(dto: CreateCartDto) {
    const user = await this.usersRepo.getUserById(dto.userId);

    const newCart = this.cartRepo.create({
      ...dto, created: new Date(), totalPrice: this.countPrice(dto)
    });
    user.cart = newCart;
    await this.usersRepo.save(user);
    return await this.cartRepo.save(newCart);
  }

  public updateCart(updateId: number, dto: CreateCartDto) {
    return this.cartRepo.update(updateId, { ...dto, updated: new Date()});
  }

  public delete(id: number) {
    return this.cartRepo.delete(id);
  }


}
