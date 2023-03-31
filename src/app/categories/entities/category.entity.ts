import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { ProductsEntity } from "../../products/entities/products.entity";
import { IDEntity } from '../../../shared/entities/id.entity';

@Entity("categories")
export class CategoryEntity extends IDEntity{
  @Column({name: 'name'})
  name: string;

  @Column({name: 'description'})
  description: string;

  @Column({
    name: 'image_url', 
    default: 'https://res.cloudinary.com/dzouilf8r/image/upload/v1680113277/photo-1631679706909-1844bbd07221_qkpg37.avif'
  })
  image: string;

  @OneToMany(() => ProductsEntity, product => product.category)
  products?: ProductsEntity[];

}