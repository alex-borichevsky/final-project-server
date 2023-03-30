import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { IDEntity } from "../../../shared/entities/id.entity";

import { UserRoleTypes } from "../enums/user-role-types.enum";
import { UserPermissions } from "../enums/user-permissions.enum";
import { UserEntity } from "../../users/entities/users.entity";

@Entity({ name: "user_roles" })
export class UserRoleEntity extends IDEntity{

  @Column({ name: "type", enum: UserRoleTypes })
  type: UserRoleTypes;

  @Column({ name: "name" })
  name: string;

  @Column("text", { name: "permissions", array: true })
  permissions: UserPermissions[]

  @OneToMany(() => UserEntity, user => user.userRole)
  @JoinColumn({ name: "id", referencedColumnName: "role_id" })
  users?: UserEntity[];
}
