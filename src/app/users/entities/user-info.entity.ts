import { Entity, Column, OneToOne } from "typeorm";

import { UUIDEntity } from "src/shared/entities/uuid.entity";
import { UserEntity } from "./users.entity";

@Entity({ name: "user_info"})

export class UserInfoEntity extends UUIDEntity{

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @Column({name: "phone"})
  phone: string;

  @Column({name: "address"})
  address: string;
}