import { UserRoleTypes } from '../../roles/enums/user-role-types.enum';

export class AddRoleDto {
  
  readonly type: UserRoleTypes;

  readonly name: string;
}