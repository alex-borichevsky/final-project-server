import { Column } from "typeorm";
import { UserRoleTypes } from "../enums/user-role-types.enum";
import { UserPermissions } from "../enums/user-permissions.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty()
  readonly type: UserRoleTypes;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly permissions: UserPermissions[];
}