import { ApiProperty } from '@nestjs/swagger';
import { UserRoleTypes } from '../../roles/enums/user-role-types.enum';

export class AddRoleDto {
  @ApiProperty()
  readonly type: UserRoleTypes;

  @ApiProperty()
  readonly name: string;
}