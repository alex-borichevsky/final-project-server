import { UserRoleTypes } from "src/app/roles/enums/user-role-types.enum";
import { UserPermissions } from "../enums/user-permissions.enum";

import { UserRoleEntity } from "../entities/user-role.entity";
import { UUIDDto } from "src/shared/dtos/id.dto";

export class RoleDto extends UUIDDto {
  type: UserRoleTypes;
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