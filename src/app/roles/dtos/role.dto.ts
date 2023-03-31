import { ApiProperty } from "@nestjs/swagger";

// ============ Enums ================
import { UserRoleTypes } from "../../roles/enums/user-role-types.enum";
import { UserPermissions } from "../enums/user-permissions.enum";

// ============ Entities ================
import { UserRoleEntity } from "../entities/user-role.entity";

// ============ DTOs ================
import { UUIDDto } from "../../../shared/dtos/id.dto";

export class RoleDto extends UUIDDto {
  @ApiProperty({
    description: "Role types",
    enum: UserRoleTypes
  })
  type: UserRoleTypes;

  @ApiProperty({
    description: "Permissions"
  })
  permissions: UserPermissions[];

  static fromEntity(entity: UserRoleEntity) {
    const it = new RoleDto();
    it.id = entity.id;
    it.type = entity.type;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.permissions = entity.permissions;

    return it;
  }
}