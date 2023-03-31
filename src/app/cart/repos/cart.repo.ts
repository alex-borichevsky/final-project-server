import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

// =========== Entities =======================
import { CartEntity } from "../entities/cart.entity";

export class CartRepo extends Repository<CartEntity> {

  constructor(
    @InjectRepository(CartEntity) repository: Repository<CartEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getCartById(id : string) {
    return await this.findOne({ where: { id }, relations: ["products", "user"] });
  }

  async getAllCarts() {
    return await this.find({relations: ["products", "user"]});
  }

  async getCartByUserId(id: string) {
    return await this.find({where:{userId: id}, relations: ["products"]});
  }

  async deleteByUserId(id: string) {
    return await this.delete({"userId": id});
  }


}