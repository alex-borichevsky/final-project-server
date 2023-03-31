import { Entity, Column } from "typeorm";

// ============ Entities ================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

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