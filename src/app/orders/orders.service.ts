import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepo } from "./repos/orders.repo";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UsersRepo } from '../users/repos/users.repo';

@Injectable()
export class OrdersService {

  constructor(
    private readonly ordersRepo: OrdersRepo,
    private readonly usersRepo: UsersRepo
  ) { }

  async getOrders() {
    return await this.ordersRepo.getAllOrders();
  }

  async getOrderById(id : string) {
    return await this.ordersRepo.getOrderById(id);
  }

  async createOrder(dto: CreateOrderDto) {
    const user = await this.usersRepo.getUserById(dto.userId);
    if (!user) {
      throw new BadRequestException("Invalid user id");
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

  public deleteOrder(id: number) {
    return this.ordersRepo.delete(id);
  }
}
