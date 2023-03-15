import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { ProductsEntity } from "../../products/entities/products.entity";
import { IDEntity } from '../../../shared/entities/id.entity';

@Entity("categories")
export class CategoryEntity extends IDEntity{
  @Column({name: 'name'})
  name: string;

  @Column({name: 'description'})
  description: string;

  @OneToMany(() => ProductsEntity, product => product.category)
  products?: ProductsEntity[];

}