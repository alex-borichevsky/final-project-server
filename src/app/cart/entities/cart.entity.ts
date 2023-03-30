import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ProductsEntity } from "../../products/entities/products.entity";
import { UUIDEntity } from '../../../shared/entities/uuid.entity';
import { UserEntity } from "../../users/entities/users.entity";

@Entity("carts")
export class CartEntity extends UUIDEntity{

  @Column({name: 'quantity'})
  quantity: number;

  @Column({name: 'product_id'})
  productId: string;

  @Column({name: 'user_id'})
  userId: string;

  @ManyToOne(() => ProductsEntity, (product) => product.cart)
  @JoinColumn({ name: "product_id", referencedColumnName: "id" })
  products: ProductsEntity;

  @ManyToOne(() => UserEntity, user => user.carts)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user : UserEntity;
}