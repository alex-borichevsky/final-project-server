import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";

// ============ Entities ================
import { UUIDEntity } from '../../../shared/entities/uuid.entity';
import { UserEntity } from "../../users/entities/users.entity";

// ============ DTOs ================
import { ProductOrderDto } from "../dtos/order-products.dto";

@Entity('orders')
export class OrdersEntity extends UUIDEntity{
  @Column({name: 'totalPrice'})
  totalPrice: number;

  @Column({name:"user_id"})
  userId: string;


  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
    name: "products"
  })
  products?: ProductOrderDto[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: UserEntity;
}