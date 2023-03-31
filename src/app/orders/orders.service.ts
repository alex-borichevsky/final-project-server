import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from "nestjs-i18n";

// ============ Repos ================
import { OrdersRepo } from "./repos/orders.repo";
import { CartRepo } from '../cart/repos/cart.repo';

// ============ DTOs ================
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UserSessionDto } from '../security/dtos/userSession.dto';

@Injectable()
export class OrdersService {

  constructor(
    private readonly i18n: I18nService,
    private readonly ordersRepo: OrdersRepo,
    private readonly cartRepo: CartRepo,
  ) { }

  async getOrders() {
    return await this.ordersRepo.getAllOrders();
  }

  async getOrderById(id: string) {
    return await this.ordersRepo.getOrderById(id);
  }

  async getOrdersByUserId(user: UserSessionDto) {
    return await this.ordersRepo.getOrdersByUserId(user.id);
  }

  async createOrder(user: UserSessionDto, dto: CreateOrderDto) {
    if (!user) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.InvalidUserIdException'));
    }

    const userCart = await this.cartRepo.getCartByUserId(user.id);

    const products = [];

    userCart.forEach(cart => {
      products.push({product: cart.products, quantity: cart.quantity})
    })

    const newOrder = this.ordersRepo.create({
      created: new Date(),
      updated: new Date(),
      userId: user.id,
      products: products,
      totalPrice: dto.totalPrice
    })
    return await this.ordersRepo.save(newOrder);
  }

  async deleteOrder(id: string) {
    return await this.ordersRepo.delete(id);
  }
}
