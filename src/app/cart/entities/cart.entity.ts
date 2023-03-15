import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { ProductsEntity } from "../../products/entities/products.entity";
import { UUIDEntity } from '../../../shared/entities/uuid.entity';

@Entity("carts")
export class CartEntity extends UUIDEntity{

  @Column({name: 'totalPrice'})
  totalPrice: number;

  @OneToMany(() => ProductsEntity, (product) => product.cart)
  products: ProductsEntity[];
}