import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEntity } from "../../products/entities/products.entity";
import { BrandEntity } from "../../brand/entities/brand.entity";
import { IDEntity } from '../../../shared/entities/id.entity';

@Entity("categories")
export class CategoryEntity extends IDEntity{
  @Column({name: 'name'})
  name: string;

  @Column({name: 'description'})
  description: string;

  @OneToMany(() => ProductsEntity, product => product.category)
  products?: ProductsEntity[];

  @ManyToMany(() => BrandEntity, (brand) => brand.categories)
  brands: BrandEntity[];
}