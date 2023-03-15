import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfoEntity } from "./user-info.entity";
import { UserRoleEntity } from "../../roles/entities/user-role.entity";
import { CartEntity } from "../../cart/entities/cart.entity";
import { OrdersEntity } from "../../orders/entities/orders.entity";
import { UUIDEntity } from "src/shared/entities/uuid.entity";
import { UserRoleTypes } from "src/app/roles/enums/user-role-types.enum";

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
  @JoinColumn()
  userInfo?: UserInfoEntity;

  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart?: CartEntity;

  @OneToMany(() => OrdersEntity, order => order.user)
  orders?: OrdersEntity[];

  @ManyToOne(() => UserRoleEntity)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  userRole?: UserRoleEntity;
}