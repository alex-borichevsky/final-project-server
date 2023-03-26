import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepo } from "./repos/orders.repo";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UsersRepo } from '../users/repos/users.repo';
import {I18nService} from "nestjs-i18n";

@Injectable()
export class OrdersService {

  constructor(
      private readonly i18n: I18nService,
    private readonly ordersRepo: OrdersRepo,
    private readonly usersRepo: UsersRepo
  ) { }

  async getOrders() {
    return await this.ordersRepo.getAllOrders();
  }

  async getOrderById(id : string) {
    return await this.ordersRepo.getOrderById(id);
  }

  async getOrdersByUserId(id: string) {
    return await this.ordersRepo.getOrdersByUserId(id);
  }

  async createOrder(dto: CreateOrderDto) {
    const user = await this.usersRepo.getUserById(dto.userId);
    if (!user) {
      throw new BadRequestException(this.i18n.t('errors.ERRORS.InvalidUserIdException'));
    } 
    const newOrder = this.ordersRepo.create({
      created: new Date(),
      updated: new Date(),
      userId: dto.userId,
      products: dto.products,
      totalPrice: dto.totalPrice
    })

    return await this.ordersRepo.save(newOrder);
  }

  async deleteOrder(id: string) {
    return await this.ordersRepo.delete(id);
  }
}
