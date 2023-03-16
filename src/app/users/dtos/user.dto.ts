import { UUIDDto } from "src/shared/dtos/uuid.dto";

import { UserRoleTypes } from "src/app/roles/enums/user-role-types.enum";
import { UserEntity } from "../entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto extends UUIDDto {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  roleId!: number;

  @ApiProperty()
  roleType!: UserRoleTypes;

  static fromEntity(entity: UserEntity) {
    const it = new UserDto();
    it.id = entity.id;
    it.email = entity.email;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.roleId = Number(entity.roleId);
    it.roleType = entity.roleType;

    return it;
  }
}