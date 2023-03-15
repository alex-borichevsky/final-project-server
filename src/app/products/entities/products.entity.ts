import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { CartEntity } from "../../cart/entities/cart.entity";
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

  @OneToMany(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;

  @ManyToOne(() => CategoryEntity)
  category?: CategoryEntity;
}