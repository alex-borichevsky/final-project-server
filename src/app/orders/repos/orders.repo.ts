import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ============ Entities ================
import { OrdersEntity } from "../entities/orders.entity";


export class OrdersRepo extends Repository<OrdersEntity> {

  constructor(
    @InjectRepository(OrdersEntity) repository: Repository<OrdersEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getOrderById(id : string) {
    return await this.findOne({ where: { id }, relations: ["user"] });
  }

  async getAllOrders() {
    return await this.find({relations: ["user"]});
  }

  async getOrdersByUserId(id: string) {
    return await this.find({where:{userId: id}});
  }

}