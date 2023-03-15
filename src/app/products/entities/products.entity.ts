import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm";

import { CartEntity } from "../../cart/entities/cart.entity";
import { OrdersEntity } from "../../orders/entities/orders.entity";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { UUIDEntity } from '../../../shared/entities/uuid.entity';

@Entity('products')
export class ProductsEntity extends UUIDEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({default: ''})
  image: string

  @Column({default: ''})
  brand: string;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity[];

  @ManyToOne(() => OrdersEntity, (order) => order.products)
  orders: OrdersEntity[];

  @ManyToOne(() => CategoryEntity)
  category?: CategoryEntity;
}