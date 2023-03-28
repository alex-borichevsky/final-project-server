import { UserRoleTypes } from "src/app/roles/enums/user-role-types.enum";
import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  expression: `
    SELECT 
      users.id AS user_id,
      users.email, 
      users.status,
      CONCAT(user_info.first_name, ' ', user_info.last_name) AS user_full_name,
      user_info.phone,
      user_info.address,
      user_roles.name AS role_name,
	    user_roles.type AS role_type
    FROM users
      JOIN user_info ON user_info.id = users."userInfoId"
      JOIN user_roles ON users.role_id = user_roles.id
  `
})
export class UserInfoView {
  @ViewColumn({name: "user_id"})
  id: string;

  @ViewColumn({name: "email"})
  email: string;

  @ViewColumn({name: "status"})
  status: boolean;

  @ViewColumn({name: "user_full_name"})
  fullName: string;

  @ViewColumn({name: "phone"})
  phone: string;

  @ViewColumn({name: "address"})
  address: string;

  @ViewColumn({name: "role_name"})
  roleName: string;

  @ViewColumn({name: "role_type"})
  roleType: UserRoleTypes;
}