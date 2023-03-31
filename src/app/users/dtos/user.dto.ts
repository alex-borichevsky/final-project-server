import { ApiProperty } from "@nestjs/swagger";

// ============ DTOs ================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";

// ============ Enums ================
import { UserRoleTypes } from "../../roles/enums/user-role-types.enum";

// ============ Entities ================
import { UserEntity } from "../entities/users.entity";

export class UserDto extends UUIDDto {
  @ApiProperty({
    description: "User email"
  })
  email!: string;

  @ApiProperty({
    description: "Role id"
  })
  roleId!: number;

  @ApiProperty({
    description: "Role type",
    enum: UserRoleTypes
  })
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