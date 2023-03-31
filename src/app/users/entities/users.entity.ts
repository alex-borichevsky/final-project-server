import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

// ============ Entities ================
import { UserInfoEntity } from "./user-info.entity";
import { UserRoleEntity } from "../../roles/entities/user-role.entity";
import { CartEntity } from "../../cart/entities/cart.entity";
import { OrdersEntity } from "../../orders/entities/orders.entity";
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ============ Enums ================
import { UserRoleTypes } from "../../roles/enums/user-role-types.enum";

@Entity('users')
export class UserEntity extends UUIDEntity {

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "status", default : true})
  status!: boolean;

  @Column({ name: "role_id" })
  roleId!: number;

  @Column({ name: "role_type" })
  roleType!: UserRoleTypes;

  @OneToOne(() => UserInfoEntity)
  @JoinColumn({name: "userInfoId"})
  userInfo?: UserInfoEntity;

  @OneToMany(() => CartEntity, cart => cart.user)
  carts?: CartEntity[];

  @OneToMany(() => OrdersEntity, order => order.user)
  orders?: OrdersEntity[];

  @ManyToOne(() => UserRoleEntity)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  userRole?: UserRoleEntity;
}