import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../entities/users.entity";

export class UsersRepo extends Repository<UserEntity> {

  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUserById(id : string) {
    return await this.findOne({ where: { id }, relations: ["userInfo"] });
  }

  async getAllUsers() {
    return await this.find({ relations: ["userInfo"] });
  }

  async getUserByEmail(email: string) {
    return await this.findOne({ where: {email}, relations: ["userInfo"] });
  }
}