import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ============ Entities ================
import { UserRoleEntity } from "../entities/user-role.entity";



export class RolesRepo extends Repository<UserRoleEntity> {

  constructor(
    @InjectRepository(UserRoleEntity) repository: Repository<UserRoleEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getRoleById(id : number) {
    return await this.findOne({ where: { id } });
  }

  async getAllRoles() {
    return await this.find();
  }

  async getRoleByName(name: string) {
    return await this.findOne({where: {name}});
  }
}