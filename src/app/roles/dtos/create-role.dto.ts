import { Column } from "typeorm";
import { UserRoleTypes } from "../enums/user-role-types.enum";
import { UserPermissions } from "../enums/user-permissions.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    description: "Role types",
    enum: UserRoleTypes
  })
  readonly type: UserRoleTypes;

  @ApiProperty({
    description: "Role name"
  })
  readonly name: string;

  @ApiProperty({
    description: "Permissions"
  })
  readonly permissions: UserPermissions[];
}