import { ApiProperty } from '@nestjs/swagger';

// ============ Enums ================
import { UserRoleTypes } from '../../roles/enums/user-role-types.enum';

export class AddRoleDto {
  @ApiProperty({
    description: "Role types",
    enum: UserRoleTypes
  })
  readonly type: UserRoleTypes;

  @ApiProperty({
    description: "Role name"
  })
  readonly name: string;
}