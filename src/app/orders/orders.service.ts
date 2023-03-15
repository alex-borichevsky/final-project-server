import { Injectable } from '@nestjs/common';
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

  private countPrice(dto: CreateOrderDto) : number {
    let totalPrice = 0;

    dto.products.forEach(product => {
      totalPrice += product.price;
    })
    return totalPrice;
  }

  async createOrder(dto: CreateOrderDto) {
    const user = await this.usersRepo.getUserById(dto.userId);

    const newOrder = this.ordersRepo.create({
      ...dto, totalPrice: this.countPrice(dto), created: new Date()
    })

    user.orders.push(newOrder);
    await this.usersRepo.save(user);
    return await this.ordersRepo.save(newOrder);
  }

  public updateOrder(updateId: number, dto: CreateOrderDto) {
    return this.ordersRepo.update(updateId, { ...dto, updated: new Date() });
  }

  public deleteOrder(id: number) {
    return this.ordersRepo.delete(id);
  }

}
