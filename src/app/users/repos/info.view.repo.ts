import { InjectRepository } from "@nestjs/typeorm";;
import { Repository } from "typeorm";

// ============ Views ================
import { UserInfoView } from "../views/user-info.view";

export class InfoViewRepo extends Repository<UserInfoView> {

  constructor(
    @InjectRepository(UserInfoView) repository: Repository<UserInfoView>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUserByIdFromView(id : string) {
    return await this.findOne({ where: { id } });;
  }

  async getUsersFromView() {
    return await this.find();
  }
}