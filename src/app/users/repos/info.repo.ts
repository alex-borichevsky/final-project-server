import { InjectRepository } from "@nestjs/typeorm";;
import { Repository } from "typeorm";
import { UserInfoEntity } from "../entities/user-info.entity";

export class InfoRepo extends Repository<UserInfoEntity> {

  constructor(
    @InjectRepository(UserInfoEntity) repository: Repository<UserInfoEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUserInfo(id: string) {
    return await this.findOne({ where: { id } });
  }
}